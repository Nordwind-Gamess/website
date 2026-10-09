# The devlog pipeline

A devlog about Nordwind Games' own development. This document is the whole picture: what the
commands do, what the invariants are, and what is deliberately not automated.

**The one thing to understand:** topics come from **our own git history**. The reference blogs
(Factorio, Yacht Club Games, Stardew Valley, Archmage Rises) are there to learn cadence and format
from — never to mine for post ideas. A devlog about other people's devlogs is the failure mode this
pipeline is shaped to prevent.

## Commands

```bash
npm run blog          # status: what is new, what is approved, what to do next. Never fetches.
npm run blog:scan     # reference blogs + our git activity + our posts -> ../website-blog-context/scan.json
npm run blog:check    # the quality gates. Runs in CI on every PR.
```

Everything with flags runs directly:

```bash
node scripts/blog.mjs scan --probe          # endpoint reachability, writes nothing
node scripts/blog.mjs scan --full           # baseline: refetch all, ignore caches, no extraction
node scripts/blog.mjs scan --extract 40     # read the shape of more new posts (default 20)
node scripts/blog.mjs extract <url>         # one page's shape, as JSON on stdout

node scripts/blog.mjs idea                  # the backlog
node scripts/blog.mjs idea --next           # what blog-write would pick up
node scripts/blog.mjs add                   # append items from JSON on stdin, forced to "new"
node scripts/blog.mjs set approved <id>     # move through the state machine
node scripts/blog.mjs note <id> "..."       # append to an item's follow-up log

node scripts/blog.mjs check --only lint     # one gate at a time, when debugging
node scripts/blog.mjs --help
```

Statuses for a post idea: `new → approved → in_progress → drafted → published`, plus `blocked` and
`rejected`. For a practice: `new → adopted | deferred | rejected`. `set` enforces what each
transition requires — a reason to reject or block, a slug to start, and real files on disk before
`drafted`.

## The weekly routine

1. `npm run blog:scan`
2. `/blog-research` — turns the scan into scored ideas and practice observations
3. Review: `node scripts/blog.mjs idea`, then `set approved <id>` or
   `set rejected <id> --reason "..."`
4. `/blog-write` — writes the top-scored approved idea in EN and DE
5. `npm run blog:check` and `npm run build`, then merge

## Layout

Three layers:

- **Deterministic core** — `scripts/blog.mjs` (the CLI) and `scripts/lib/` (nine single-purpose
  modules). Zero dependencies, Node built-ins only. Fetch, parse, dedupe, check, write.
- **Reasoning layer** — `.claude/skills/blog-research/` and `.claude/skills/blog-write/`. Idea
  generation, scoring, drafting. Run via Claude Code.
- **State** — JSON in `content/ideas/`.

| `scripts/lib/` | does                                                                     |
| -------------- | ------------------------------------------------------------------------ |
| `ctx.mjs`      | root, config with defaults, paths, JSON and date helpers, argv parsing   |
| `posts.mjs`    | the single corpus reader: one pass over `src/content/blog/<locale>/*.md` |
| `http.mjs`     | conditional GET, one retry, a worker pool with a per-host cap            |
| `parse.mjs`    | sitemaps, RSS/Atom, HTML listings, article shape                         |
| `git.mjs`      | our own activity, clustered by conventional-commit type                  |
| `scan.mjs`     | one scan: discover, dedupe, extract, inventory — into one snapshot       |
| `backlog.mjs`  | load/save, the status machine, validation                                |
| `gates.mjs`    | the conventions and image gates                                          |

### State files

Two places, and only the first is in this public repo:

| file                   | lives in                     | what                                                                     |
| ---------------------- | ---------------------------- | ------------------------------------------------------------------------ |
| `blog.config.json`     | `content/ideas/` (this repo) | paths, locales, conventions, scoring weights. No URLs.                   |
| `sources.example.json` | `content/ideas/` (this repo) | schema template with fake URLs                                           |
| `repos.example.json`   | `content/ideas/` (this repo) | schema template with a fake path                                         |
| `sources.local.json`   | private repo, synced         | the real reference-blog URLs                                             |
| `state.json`           | private repo, synced         | seen URLs + per-endpoint cache validators. Bookkeeping, not for reading. |
| `backlog.json`         | private repo, synced         | ideas and practices, one array with a `kind`                             |
| `rejected.md`          | private repo, synced         | standing no-go areas, written by hand                                    |
| `repos.json`           | private repo, synced         | the other repos to scan (the game repo), as paths relative to the clone  |
| `scan.json`            | private repo, synced         | the one snapshot the reasoning layer reads, regenerated by every scan    |

This repo is **public**: our ideas, the reference-blog URLs and anything derived from them must
never land in its history, so they are not in this checkout at all — not even gitignored, where a
single `git add -f` would publish them. `.gitignore` still allowlists only the three files above in
`content/ideas/`, as a second line of defence.

### The private ideas repo

The private repo `NordWindGames/website-blog-context` is cloned **next to** this checkout, to
`../website-blog-context/`. Clone both side by side on every machine and nothing needs configuring;
anywhere else, set `DEVLOG_IDEAS_DIR` to the clone's path. `scripts/lib/ctx.mjs` resolves the
location, `scripts/lib/ideas-sync.mjs` does the syncing. Every file in it is synced, so a scan on
one machine can be researched on another. That is why `repos.json` holds **relative** paths
(`../GamePrototype_1`), resolved against the clone: keep all repos side by side and the one shared
file is right on every machine. An absolute path still works, but only where it was written.

**Every command that writes there syncs**: `add`, `set`, `note` and `scan` fetch and fast-forward
the clone first and **refuse to write** if that fails (offline, or diverged). Afterwards they commit
and push. A failed push keeps the commit locally and the next command pushes it. `npm run blog:sync`
does only the pull and push, for a hand edit of `rejected.md`. `status`, `idea` and `check` read the
clone as it is and never touch the network.

A diverged clone is never resolved automatically. JSON merges are where a backlog silently loses an
item; resolve it by hand in the clone.

Everything generated is reproducible from the sources plus git history, except the dedup waterline
in `state.json`. Losing it means the next scan reports every reference post as new once — an
accepted inconvenience, not data loss.

Every repo in `repos.json` is brought up to date before it is read: `git fetch --prune`, then
a fast-forward-only merge of the checked-out branch's upstream. It never creates a merge commit and
never touches this checkout. If it cannot fast-forward (offline, no upstream, diverged, local
changes in the way) the repo is read as it is on disk, the scan prints `FAIL sync` and the snapshot
is marked `complete: false` — a stale clone must not look like a quiet week. `--probe` skips the
sync. The game repo is **private**: commit material may be paraphrased in a post, but nothing from
it is linked or pasted verbatim without asking.

**New machine:** clone the game repo and, from this checkout,
`git clone https://github.com/NordWindGames/website-blog-context.git ../website-blog-context` — all
three side by side. Nothing else to set up.

## Invariants — do not relitigate without a new reason

- **A silently broken source must never look like a quiet week.** Every source declares an
  `expected_min`; under it is a FAIL with `complete: false` and a non-zero exit.
- **A cached 304 is still checked against `expected_min`,** using the count from the last real
  fetch. Exempting cached sources would be exactly the masking the check exists to prevent. Stored
  validators also expire after `cadence_days`, so a server that answers 304 forever cannot hide a
  change indefinitely.
- **`status` never touches the network.** It is the command you run to orient yourself; it answers
  instantly and offline. Structurally guaranteed: nothing it imports can reach `http.mjs`.
- **`check` keeps going after a failing gate** so one run shows every problem.
- **The human approval gate is never bypassed.** `add` forces `status: "new"` and strips any
  supplied `reviewed_at`. Nothing in this pipeline approves its own output.
- **Derived data is not stored.** `scores.total` is computed from `scoring.weights` on read, so it
  cannot disagree with the axes it comes from. There is no post inventory file to go stale.
- **Never store full article text** from a reference blog. Outline plus counts is enough.
- **Image paths are checked case-exactly.** `existsSync` is case-insensitive on Windows; the deploy
  target is Linux.
- **The four score axes all point the same way** — `interest`, `evidence`, `ease`, `durability`,
  higher always better.

## Gates

`npm run blog:check` runs three, and keeps going after a failure.

**conventions** — frontmatter present and ISO-dated; slug kebab-case; hero image directly under the
frontmatter; no absolute link to our own domain; internal links root-relative with the right locale
prefix; link targets and routes actually exist; no self-links; DE/EN pairing. Also prints inbound
links per slug and the corpus word/H2 distribution.

**images** — path shape, existence, case-exactness, alt text, and a readable `viewBox` on every SVG.

**backlog** — required fields, id format, statuses inside the machine, axes as integers 1–5, and
that a `drafted` or `published` item's slug really has files in both locales. Self-skips when
`backlog.json` is absent, which is the case on a fresh CI checkout.

Route resolution walks `src/pages` recursively and accepts real files under `public/`, so a link to
`/imprint/does-not-exist` fails even when `/imprint` exists.

The DE/EN pairing is enforced **only here.** Astro does not care: an EN-only post builds and deploys
fine, `/de/blog/<slug>/` simply does not exist. Set `locales.require_pairing` to `false` and the
bilingual guarantee is gone with nothing else noticing.

Frontmatter _shape_ is owned by the zod `.strict()` schema in `src/content.config.ts` — `title`,
`description`, `date`, and an extra field is a build error. The gates defer to it rather than
re-declaring an allowlist.

## Cold start

`conventions.min_internal_links_ramp` is dormant by design: no floor until 3 posts exist, then 1,
then 2 at 5. There is deliberately no word or H2 band — `blog:check` prints the actual corpus
distribution instead, so the numbers to set a real band are in front of you when it becomes
relevant.

## What is deliberately not automated

There is no scheduler and no reminder hook. Discovery is cheap enough to run whenever; `npm run
blog` tells you where things stand. Approving an idea, deciding a practice, and publishing are all
human acts — `published` is set after the merge, and the merge is a decision, not a step.
