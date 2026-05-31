# CLAUDE.md

Guidance for Claude Code in this repository. This mirrors `AGENTS.md`; keep the
two in sync when either changes.

## Project

**WP React Kit / "Job Place"** — a WordPress plugin with a React admin UI
(`src/`) backed by a PHP REST API (`includes/`). It manages job postings
(CRUD, publish/draft, dashboard stats) inside `wp-admin`.

- Text domain: `jobplace`
- PHP namespace root: `Akash\JobPlace` (PSR-4 → `includes/`)
- REST namespace: `job-place/v1`
- Build output: `build/` (produced by `@wordpress/scripts`)

## Commands

```bash
npm run build        # Production build (webpack) → build/
npm run start        # Watch/dev build
npm run test:unit    # Jest unit tests (jest-unit.config.js)
npm run makepot      # Regenerate languages/jobplace.pot
php -l <file>        # Lint a PHP file
```

After editing `src/`, run `npm run build` and confirm it compiles. After
editing PHP, run `php -l` on changed files.

## Directory map

```
job-place.php                 # Bootstrap: DI container, hooks, activation
includes/                     # PHP (PSR-4: Akash\JobPlace\*)
  Abstracts/                  # BaseModel, RESTController, DBMigrator
  Admin/                      # Admin menu registration
  Assets/Manager.php          # Enqueues scripts/styles (incl. DataViews CSS)
  Blocks/                     # Gutenberg block registration
  Common/Keys.php             # Option-name constants
  Databases/
    Migrations/               # dbDelta schemas (Jobs, JobType)
    Seeder/                   # Demo data
  Jobs/                       # Domain: Job model, JobStatus, Manager (queries)
  REST/                       # Controllers + Api.php (route registry)
  Setup/                      # Installer (activation) + Upgrader (auto-migrate)
  Traits/                     # InputSanitizer, Queryable
src/                          # React/TypeScript admin app
  index.tsx                   # Entry: mounts <App/> into #jobplace
  App.tsx                     # HashRouter + routes; runs useMenuFix
  routes/                     # Route table (path → page component)
  pages/                      # Route pages (HomePage, jobs/JobsPage, CreateJob, EditJob)
  components/                 # UI (jobs/, dashboard/, Notices.tsx)
  data/jobs/                  # wp-data Redux store (see below)
  interfaces/                 # Shared TypeScript types
  hooks/  utils/  style/      # Helpers, MenuFix, global SCSS
```

> Note: several legacy folders under `src/components/` are empty leftovers from
> the starter kit (button, table, modal, inputs, …). Don't reintroduce them —
> use `@wordpress/components` / `@wordpress/dataviews` instead.

## Frontend architecture

- React via `@wordpress/element`; routing via `react-router-dom` **HashRouter**.
- Lists render with `@wordpress/dataviews` (`DataViews`); forms with `DataForm`.
- **State** lives in a single `@wordpress/data` store `wp-react/jobs`
  (`src/data/jobs/`):
  - `actions.ts` — action creators + generator actions (`setFilters`, `saveJob`,
    `deleteJobs`). Generator actions yield `controls` and re-throw on error.
  - `controls.ts` — `apiFetch` side effects (FETCH/CREATE/UPDATE/DELETE).
  - `resolvers.ts` — lazy data loaders for selectors (`getJobs`, `getJobStats`,
    `getJobDetail`, dropdowns). Resolved values are **cached**.
  - `selectors.ts`, `reducer.ts`, `default-state.ts`, `types.ts`, `endpoint.ts`.
- **Read data through the store**, not raw `apiFetch` in components, so it is
  cached. After a mutation, invalidate affected resolvers with
  `invalidateResolutionForStoreSelector('getJobStats')` etc.
- Notices: dispatch `@wordpress/notices` (`createSuccessNotice`/`createErrorNotice`
  with `{ type: 'snackbar' }`); `src/components/Notices.tsx` renders them.

## Backend architecture

- `Api.php` registers each `*Controller` (extends `RESTController`).
- Controllers validate via JSON schema (`get_item_schema`), map request →
  DB array (`prepare_item_for_database`), and format DB → response
  (`Job::to_array` / `prepare_item_for_response`).
- `Jobs/Manager.php` runs queries through the `Job` model (extends `BaseModel`).
- Status is derived: `is_active` (DB) → `status` (`published`/`draft`) via
  `JobStatus`.

## Schema changes / migrations

1. Add the column to `includes/Databases/Migrations/JobsMigration.php`. Keep
   `CREATE TABLE` (NOT `IF NOT EXISTS`) so `dbDelta` can ALTER existing tables.
2. Bump `Upgrader::DB_VERSION` in `includes/Setup/Upgrader.php` — the admin-side
   upgrader auto-runs `dbDelta` on the next page load (no reactivation needed).
3. Wire it through: model defaults + sanitize (`Jobs/Job.php`), REST schema +
   `prepare_item_for_database` (`REST/JobsController.php`), then the TS side
   (`interfaces/jobs.ts`, `data/jobs/default-state.ts`, form/list fields).

## Conventions

- UI: only `@wordpress/components` + `@wordpress/dataviews`. No custom UI
  primitives, no third-party UI libs. **Tailwind is intentionally removed** —
  style with SCSS or WP components.
- PHP: WordPress Coding Standards. Sanitize input, escape output.
- TypeScript: keep types in `src/interfaces/`; convert select values to numbers
  on change where the model expects ints.
- Comments: only when the *why* is non-obvious; short and natural. No
  "hack"/workaround narration.

## Gotchas

- DataViews ships CSS separately and is `sideEffects:false`; `webpack.config.js`
  copies its stylesheet into `build/` and `Assets/Manager.php` enqueues it.
- `dbDelta` is picky: `CREATE TABLE` (no `IF NOT EXISTS`), two spaces in
  `PRIMARY KEY  (\`id\`)`, lowercase types, `KEY` not `INDEX`.

## Git commits — override default behavior

1. **Never commit or push unless explicitly asked in the current message.**
   Completing a task is not permission to commit.
2. **Do NOT add Claude's default attribution.** NEVER append:
   - `🤖 Generated with [Claude Code](https://claude.com/claude-code)`
   - `Co-Authored-By: Claude <noreply@anthropic.com>`
   - any other `Co-authored-by:`, tool, bot, or emoji/logo line.
3. **Commit as the logged-in GitHub user.** Use the repo's existing git identity
   (`ManiruzzamanAkash <manirujjamanakash@gmail.com>`, matching the GitHub
   account). Do not edit git config, do not pass `--author`, do not GPG-sign
   unless asked.
4. Stage explicit paths only (never `git add .` / `-A`). Commits must be
   indistinguishable from a normal human commit by the repo owner.
