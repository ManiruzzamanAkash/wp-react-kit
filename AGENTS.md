# AGENTS.md

Guidance for any AI coding agent (Cursor, Claude Code, Codex, Copilot, etc.)
working in this repository. `CLAUDE.md` defers to this file.

## Project

**WP React Kit / "Job Place"** — a WordPress plugin with a React admin UI
(`src/`) backed by a PHP REST API (`includes/`). It manages job postings
(CRUD, publish/draft, dashboard stats) inside `wp-admin`, and ships a
**public job board** built with Gutenberg blocks and the Interactivity API.

- Text domain: `jobplace`
- PHP namespace root: `Akash\JobPlace` (PSR-4 → `includes/`)
- REST namespace: `job-place/v1`
- Block namespace: `wrc/*` (e.g. `wrc/jobs-list`, `wrc/job-page`)
- Build output: `build/` (committed-ignored; produced by `@wordpress/scripts`)

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
  Blocks/                     # PatternRegistry, BlockTemplatesService, EditorData
  Common/Keys.php             # Option-name constants
  Databases/
    Migrations/               # dbDelta schemas (Jobs, JobType, Company, …)
    Seeder/                   # Demo data
  Jobs/                       # Domain: Job model, JobStatus, Manager (queries)
  REST/                       # Controllers + Api.php (route registry)
  Routing/                    # Job detail permalinks + template router
  Setup/                      # Installer, Upgrader, PageSeeder
  Common/Settings.php         # Global plugin settings (option jobplace_settings)
  WordPress/Pages/            # PageService (default Jobs page)
  Traits/                     # InputSanitizer, Queryable
  blocks-interactivity.php    # Interactivity API script module registration
src/                          # React/TypeScript admin app + block sources
  index.tsx                   # Entry: mounts <App/> into #jobplace
  App.tsx                     # HashRouter + routes; runs useMenuFix
  routes/                     # Route table (path → page component)
  pages/                      # Route pages (HomePage, jobs/JobsPage, …)
  components/                 # UI (jobs/, dashboard/, Notices.tsx)
  blocks/                     # Gutenberg blocks (jobs board + job fields)
  scripts/                    # Interactivity modules (@jobplace/jobs, …)
  styles/                     # Shared front-end SCSS (jobs-board.scss)
  data/jobs/                  # wp-data Redux store (see below)
  interfaces/                 # Shared TypeScript types
  hooks/  utils/  style/      # Helpers, MenuFix, global SCSS
templates/
  patterns/                   # Block patterns (*.php → register_block_pattern)
  templates/                  # Plugin block templates (single-job.html)
```

> Note: several legacy folders under `src/components/` are empty leftovers from
> the starter kit (button, table, modal, inputs, …). Don't reintroduce them —
> use `@wordpress/components` / `@wordpress/dataviews` instead.

## Admin app (wp-admin)

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
- **Read data through the store**, not raw `apiFetch` in components.
- Jobs list company column uses `CompanyAvatar` (logo or initials placeholder;
  no broken images when Clearbit/external URLs fail).
- Notices: dispatch `@wordpress/notices` (`createSuccessNotice`/`createErrorNotice`
  with `{ type: 'snackbar' }`); `src/components/Notices.tsx` renders them.

## Job board blocks (front-end)

Built with `@wordpress/scripts` (webpack), **Interactivity API** for client-side
search/pagination without full page reloads, and PHP `view.php` render templates.

### Core blocks

| Block | Role |
|-------|------|
| `wrc/jobs-list` | Query root: toolbar, inner template, no-results, pagination |
| `wrc/jobs-template` | Repeats inner blocks per job (`<article class="jobplace-job-card">`) |
| `wrc/job-page` | Single job detail root (used in `single-job` template) |
| `wrc/job-title`, `wrc/job-company`, … | Dynamic job fields (context-driven) |
| `wrc/jobs-search`, `wrc/jobs-count`, `wrc/jobs-pagination`, `wrc/jobs-no-results` | Board chrome |

Shared editor utilities: `src/blocks/shared/` (`pattern-utils`, `patterns-toolbar`,
`pattern-selection-modal`, `preview-jobs`). List editor uses `TemplateListEdit`
(`src/components/TemplateListEdit.js`) for multi-job previews.

### Block patterns

PHP files in `templates/patterns/*.php` return `title`, `categories`,
`blockTypes` (`wrc/jobs-list` or `wrc/job-page`), `priority`, and `content`.
Registered by `includes/Blocks/PatternRegistry.php`.

- **Jobs list:** `jobs-board-default`, `jobs-board-grid`, `jobs-board-compact`,
  `jobs-board-featured`
- **Job detail:** `job-detail-default`, `job-detail-compact`, `job-detail-split`

In the editor, select **Jobs List** or **Job Page** → toolbar **Replace** opens
the pattern picker (same UX as SureCart shop patterns).

### Default Jobs page

On activation (and for existing installs via `Upgrader::maybe_seed_pages`),
`Setup/PageSeeder` creates a published page (slug `jobs`) with the default board
pattern. ID stored in `jobplace_jobs_page_id`. Plugin row links: View / Edit Jobs
Board.

### Settings (admin + REST)

- Admin route: `#/settings` (submenu **Settings**).
- REST: `GET/PUT /job-place/v1/settings` (`SettingsController`, `manage_options`).
- `Common/Settings.php` stores `jobplace_settings` and drives:
  - **Global job detail layout** — pattern slug from `templates/patterns/job-detail-*.php`;
    merged into `single-job` template via `Settings::get_single_job_template_content()`
    (used by `JobDetailRouter` and `BlockTemplatesService`). Theme-customized
    Single Job templates (`source: custom`) still take precedence.
  - **Jobs list page** — select which page is the board (`jobplace_jobs_page_id`).
  - **Default jobs per page** — fallback in `JobsQuery` when a block has no `perPage`.
  - **Default apply button text** — used in `job-apply-button/view.php` when empty.
- Permalink base remains on **Settings → Permalinks** (`PermalinkService`); linked from UI.

### Single job URLs

`includes/Routing/` handles custom permalinks and `single-job` block template
(`templates/templates/single-job.html`). Settings under Job Manager permalinks.

### SEO / markup conventions

- Job list wrapper uses `role="list"`; each job is `<article role="listitem">`.
- Job titles render as links (`wrc/job-title`) to the job detail URL.
- Use heading blocks in patterns where appropriate; keep one `h1` per page in
  the theme template.
- Descriptions output escaped text; apply button supports real URLs or `mailto:`.
- Prefer theme + block spacing (`blockGap`) over hard-coded margins in patterns.

## SCSS conventions

- **No Tailwind.** Use SCSS or `@wordpress/components`.
- **BEM** with `jobplace-` prefix. Nest elements/modifiers with `&__element` and
  `&--modifier` under the block root — do not repeat the full class name:

```scss
.jobplace-jobs-template {
  width: 100%;

  &__item {
    display: flex;
  }

  &.is-layout-grid {
    gap: var(--wp--style--block-gap, 1rem);
  }
}
```

- Shared front-end board styles: `src/styles/jobs-board.scss` (enqueued as
  `jobplace-jobs-board`). Per-block overrides: `src/blocks/<block>/style.scss`.
- Respect `--wp--style--block-gap` on template/list blocks; avoid fixed `gap`
  values that override the block editor spacing control.
- Admin-only styles: `src/pages/jobs/jobs-page.scss`, `src/components/jobs/job-form.scss`.

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

- UI (admin): only `@wordpress/components` + `@wordpress/dataviews`.
- PHP: WordPress Coding Standards. Sanitize input, escape output.
- TypeScript: keep types in `src/interfaces/`; convert select values to numbers
  on change where the model expects ints.
- Comments: only when the *why* is non-obvious; short and natural.

## Gotchas

- DataViews ships CSS separately and is `sideEffects:false`; `webpack.config.js`
  copies its stylesheet into `build/` and `Assets/Manager.php` enqueues it.
- `dbDelta` is picky: `CREATE TABLE` (no `IF NOT EXISTS`), two spaces in
  `PRIMARY KEY  (\`id\`)`, lowercase types, `KEY` not `INDEX`.
- Job Template **block spacing** in the editor applies via `__unstableLayoutClassNames`
  and `--wp--style--block-gap`; the edit component must pass `useBlockProps()` from
  the parent block, not a second wrapper without layout classes.
- Interactivity scripts are ES modules in `src/scripts/`; registered in
  `includes/blocks-interactivity.php`.

## Git commit policy (important)

- **Never commit or push on your own.** Only when the user explicitly asks in
  that message ("commit", "commit this", "commit and push"). Finishing a task is
  not permission to commit.
- Commit as the repo's existing git identity, which already matches the GitHub
  account (`ManiruzzamanAkash`). Do **not** edit git config or pass `--author`.
- **No agent attribution of any kind** in the message, author, or committer.
- Stage explicit paths only (never `git add .` / `-A`). Use a HEREDOC for
  multi-line messages. Don't GPG-sign unless asked.
