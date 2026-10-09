/**
 * Our own development, read from git: what changed since the last published post.
 *
 * This is the actual topic source for the devlog. The reference blogs teach format and cadence;
 * what to write about comes from here.
 *
 * Two changes from the old blog-devlog.mjs: the three git calls per repo run concurrently instead
 * of blocking the event loop with execFileSync, and tag filtering happens in git rather than
 * pulling every tag in the repo and filtering the list in JS.
 */
import { execFile } from 'node:child_process'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { promisify } from 'node:util'

import { PRIVATE, ROOT, readIdeas } from './ctx.mjs'

const run = promisify(execFile)

// ASCII record/field separators: a commit body is arbitrary text, including newlines and any
// punctuation, so the delimiters have to be characters git will never emit inside one.
const RECORD_SEP = '\x1e'
const FIELD_SEP = '\x1f'

async function git(cwd, args) {
  try {
    const { stdout } = await run('git', args, {
      cwd,
      encoding: 'utf8',
      maxBuffer: 32 * 1024 * 1024,
      // A fetch against a private remote must fail, not sit waiting for a password prompt.
      env: { ...process.env, GIT_TERMINAL_PROMPT: '0' },
    })
    return stdout
  } catch {
    return null // not a git repo, no commits yet, or git is missing
  }
}

/**
 * Repos to scan: this one, plus anything in repos.json in the private ideas repo. In practice the
 * game repo, not the website, is where devlog-worthy activity happens; without it configured,
 * `configured` is false and the caller must say so rather than presenting website-only activity
 * as the whole picture.
 *
 * repos.json is synced across machines, so a relative path is resolved against the ideas clone:
 * `../GamePrototype_1` works on every machine that keeps the repos side by side. An absolute path
 * still works, but only on the machine it was written on.
 */
export function reposToScan() {
  const declared = readIdeas('repos.json')?.repos ?? []
  const repos = [{ id: 'website', label: 'Website', path: ROOT }]
  const missing = []

  for (const repo of declared) {
    if (!repo.path) continue
    const path = resolve(PRIVATE, repo.path)
    if (existsSync(path))
      repos.push({ id: repo.id, label: repo.label ?? repo.id, path, sync: true })
    else missing.push(path)
  }

  return { repos, configured: declared.length > 0, missing }
}

/**
 * Bring a declared repo up to its upstream before reading it. The game repo is worked on outside
 * this checkout, so a local clone that was never pulled would make a busy week look like a quiet
 * one - the same masking the expected_min guard exists to prevent for the reference blogs.
 *
 * Fast-forward only: this never creates a merge commit or touches a diverged branch in someone
 * else's working copy. Anything it cannot do cleanly is reported, and the repo is read as it is.
 */
async function syncRepo(path) {
  if ((await git(path, ['fetch', '--prune', '--quiet'])) === null)
    return { ok: false, detail: 'git fetch failed (offline, or no access to the remote)' }

  const upstream = (await git(path, ['rev-parse', '--abbrev-ref', '@{u}']))?.trim()
  if (!upstream) return { ok: false, detail: 'the checked-out branch has no upstream' }

  // The fetch above already has the commits; merging @{u} is `git pull` without a second fetch.
  if ((await git(path, ['merge', '--ff-only', '--quiet', '@{u}'])) === null)
    return {
      ok: false,
      detail: `cannot fast-forward to ${upstream} (diverged, or local changes in the way)`,
    }

  return { ok: true, detail: `up to date with ${upstream}` }
}

const commitType = (subject) =>
  subject.match(/^([a-z]+)(?:\([^)]*\))?!?:\s*/i)?.[1]?.toLowerCase() ?? 'other'
const topDir = (path) => (path.includes('/') ? path.split('/')[0] : '(root)')

function parseCommits(raw) {
  if (!raw?.trim()) return []

  return raw
    .split(RECORD_SEP)
    .filter((block) => block.trim())
    .map((block) => {
      // The last FIELD_SEP ends the header; what follows is --name-only's file list.
      const cut = block.lastIndexOf(FIELD_SEP)
      const [hash, date, subject, ...body] = block.slice(0, cut).replace(/^\n/, '').split(FIELD_SEP)
      return {
        hash,
        date,
        subject,
        body: body.join(FIELD_SEP).trim(),
        files: block
          .slice(cut + 1)
          .split('\n')
          .map((f) => f.trim())
          .filter(Boolean),
      }
    })
}

function parseMerges(raw) {
  const branches = new Set()
  for (const line of (raw ?? '').split('\n').filter(Boolean)) {
    const pr = line.match(/^Merge pull request #\d+ from \S+\/(.+)$/)
    const br = line.match(/^Merge branch '([^']+)'/)
    if (pr) branches.add(pr[1])
    else if (br) branches.add(br[1])
  }
  return [...branches]
}

/** One repo's activity since `since` (ISO date, or null for everything). */
export async function readRepo(repo, since) {
  const logArgs = [
    // Otherwise git wraps any path with a non-ASCII character in quotes and escapes it.
    '-c',
    'core.quotePath=false',
    'log',
    '--no-merges',
    `--pretty=format:${RECORD_SEP}${['%H', '%ad', '%s', '%b'].join(FIELD_SEP)}${FIELD_SEP}`,
    '--date=short',
    '--name-only',
  ]
  const mergeArgs = ['log', '--merges', '--pretty=format:%s']
  // Let git sort and cap the tags instead of reading every ref and filtering in JS.
  const tagArgs = [
    'for-each-ref',
    '--format=%(refname:short)|%(creatordate:short)',
    '--sort=-creatordate',
    '--count=25',
    'refs/tags',
  ]
  if (since) {
    logArgs.push(`--since=${since}`)
    mergeArgs.push(`--since=${since}`)
  }

  const [logRaw, mergeRaw, tagRaw] = await Promise.all([
    git(repo.path, logArgs),
    git(repo.path, mergeArgs),
    git(repo.path, tagArgs),
  ])

  const commits = parseCommits(logRaw)

  const byType = new Map()
  for (const c of commits) {
    const type = commitType(c.subject)
    if (!byType.has(type)) byType.set(type, [])
    byType.get(type).push(c)
  }

  const clusters = [...byType.entries()]
    .map(([type, list]) => {
      const dirs = new Map()
      for (const c of list) {
        for (const f of c.files) dirs.set(topDir(f), (dirs.get(topDir(f)) ?? 0) + 1)
      }
      return {
        type,
        commit_count: list.length,
        directories: [...dirs.entries()].sort((a, b) => b[1] - a[1]).map(([d]) => d),
        // `comment` is the full commit body, not the subject line. That is where "what I tried,
        // what did not work, why" lives - the raw material for a learning or deep-dive post. A
        // cluster whose comments are all null is a changelog with nothing to say yet.
        commits: list.map((c) => ({
          hash: c.hash.slice(0, 12),
          date: c.date,
          subject: c.subject,
          comment: c.body || null,
        })),
      }
    })
    .sort((a, b) => b.commit_count - a.commit_count)

  const dates = commits.map((c) => c.date).sort()
  const tags = (tagRaw ?? '')
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      const [name, date] = line.split('|')
      return { name, date }
    })
    .filter((t) => !since || t.date >= since)

  return {
    id: repo.id,
    label: repo.label,
    ok: logRaw !== null,
    commit_count: commits.length,
    span: commits.length ? { from: dates[0], to: dates[dates.length - 1] } : null,
    clusters,
    merged_branches: parseMerges(mergeRaw),
    tags,
  }
}

/**
 * All configured repos, scanned concurrently. With `sync`, declared repos are fetched and
 * fast-forwarded first; this checkout is never touched, it is the one being worked in.
 */
export async function readActivity(since, { sync = true } = {}) {
  const { repos, configured, missing } = reposToScan()
  const scanned = await Promise.all(
    repos.map(async (repo) => {
      const synced = sync && repo.sync ? await syncRepo(repo.path) : null
      return { ...(await readRepo(repo, since)), sync: synced }
    }),
  )

  return {
    // A repo that could not be brought up to date is read anyway, but the scan is not complete.
    ok: scanned.every((r) => r.ok && r.sync?.ok !== false),
    since: since ?? null,
    cold_start: !since,
    game_repo_configured: configured,
    unreachable_paths: missing,
    repos: scanned,
  }
}
