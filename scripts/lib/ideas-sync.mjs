/**
 * The private ideas repo: backlog, real reference-blog URLs, scan bookkeeping, standing no-gos.
 *
 * This website repo is public, so none of that may ever land in its history. It lives in the
 * private repo NordWindGames/website-blog-context, cloned next to this checkout (ctx.mjs PRIVATE),
 * and every command that writes to it pulls first and pushes after. Working on several machines,
 * a backlog that is only synced "when someone remembers" is a backlog that forks. scan.json and
 * repos.local.json are per machine and ignored by that repo's own .gitignore.
 *
 * The rule is: refuse rather than write on top of a state that might be stale. If the pull fails
 * (offline, diverged) nothing is written. If the push fails, the write is committed locally and
 * the next command pushes it, because pull is fast-forward-only and a local-ahead branch passes.
 */
import { execFile } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { promisify } from 'node:util'

import { PRIVATE, rel } from './ctx.mjs'

const run = promisify(execFile)

export const BOOTSTRAP =
  'git clone https://github.com/NordWindGames/website-blog-context.git ../website-blog-context'

async function git(args) {
  try {
    const { stdout } = await run('git', args, {
      cwd: PRIVATE,
      encoding: 'utf8',
      env: { ...process.env, GIT_TERMINAL_PROMPT: '0' },
    })
    return { ok: true, out: stdout.trim() }
  } catch (err) {
    return { ok: false, out: (err.stderr || err.message || '').trim() }
  }
}

export class SyncError extends Error {}

/** Bring the private repo up to its upstream, or throw. Nothing may be written after a throw. */
export async function pullIdeas() {
  if (!existsSync(join(PRIVATE, '.git'))) {
    throw new SyncError(
      `${rel(PRIVATE)}/ is not a clone of the private ideas repo. Run:\n  ${BOOTSTRAP}`,
    )
  }

  const fetched = await git(['fetch', '--prune', '--quiet'])
  if (!fetched.ok) {
    throw new SyncError(
      `could not fetch the ideas repo (offline, or no access) - nothing written.\n  ${fetched.out}`,
    )
  }

  const upstream = await git(['rev-parse', '--abbrev-ref', '@{u}'])
  if (!upstream.ok) throw new SyncError(`${rel(PRIVATE)}/ has no upstream branch - nothing written`)

  const merged = await git(['merge', '--ff-only', '--quiet', '@{u}'])
  if (!merged.ok) {
    throw new SyncError(
      `the ideas repo has diverged from ${upstream.out} - nothing written. Resolve it by hand in\n` +
        `  ${rel(PRIVATE)}/ (git status, git pull --rebase), then run the command again.`,
    )
  }
}

/**
 * Commit whatever changed and push, including commits a previous failed push left behind.
 * Returns a warning string instead of throwing: the write already happened and is safe locally.
 */
export async function pushIdeas(message) {
  await git(['add', '--all'])
  const staged = await git(['diff', '--cached', '--quiet'])
  if (!staged.ok) {
    const committed = await git(['commit', '--quiet', '-m', message])
    if (!committed.ok) return `committed nothing: ${committed.out}`
  }

  const ahead = await git(['rev-list', '--count', '@{u}..HEAD'])
  if (ahead.ok && ahead.out === '0') return null

  const pushed = await git(['push', '--quiet'])
  if (!pushed.ok) {
    return (
      `written and committed locally, but NOT pushed: ${pushed.out}\n` +
      '  The next add/set/note/scan or `npm run blog:sync` pushes it.'
    )
  }
  return null
}

/**
 * Pull, run `write`, push. The push runs whatever `write` returned: an incomplete scan still
 * moved state.json, and a refused `add` simply leaves nothing to commit. `message` is called
 * after `write`, because only then is it known what was written.
 */
export async function withIdeasSync(message, write) {
  try {
    await pullIdeas()
  } catch (err) {
    if (!(err instanceof SyncError)) throw err
    console.error(`sync: ${err.message}`)
    return 1
  }

  const code = await write()

  const warning = await pushIdeas(message())
  if (warning) {
    console.error(`sync: ${warning}`)
    return code || 1
  }
  console.log('sync: private ideas repo is up to date on GitHub')
  return code
}
