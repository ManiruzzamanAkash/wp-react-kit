# CLAUDE.md

Guidance for Claude Code in this repository. This mirrors `AGENTS.md`; keep the
two in sync when either changes.

## Project

**WP React Kit / "Job Place"** — a WordPress plugin with a React admin UI
(`src/`) backed by a PHP REST API (`includes/`). It manages job postings
(CRUD, publish/draft, dashboard stats) inside `wp-admin`, and ships a
**public job board** built with Gutenberg blocks and the Interactivity API.

- Text domain: `jobplace`
- PHP namespace root: `Akash\JobPlace` (PSR-4 → `includes/`)
- REST namespace: `job-place/v1`
- Block namespace: `wrc/*` (e.g. `wrc/jobs-list`, `wrc/job-page`)
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
  Blocks/                     # PatternRegistry, BlockTemplatesService, EditorData
  Routing/                    # Job detail permalinks + template router
  Setup/                      # Installer, Upgrader, PageSeeder
  WordPress/Pages/            # PageService (default Jobs page)
  …                           # REST, Jobs, Databases, Assets, Admin
src/
  blocks/                     # Gutenberg blocks (wrc/*) + shared pattern UI
  scripts/                    # Interactivity modules (@jobplace/jobs)
  styles/jobs-board.scss      # Shared front-end board styles
  components/                 # Admin UI (jobs/, dashboard/, TemplateListEdit)
  data/jobs/                  # wp-data store wp-react/jobs
templates/
  patterns/                   # Block patterns (jobs list + job detail layouts)
  templates/single-job.html   # Single job block template
```

> Note: legacy empty folders under `src/components/` (button, table, modal, …)
> are starter-kit leftovers — use `@wordpress/components` / `@wordpress/dataviews`.

## Admin app

- HashRouter + `@wordpress/dataviews` / `DataForm`.
- Store `wp-react/jobs` in `src/data/jobs/` — read via selectors, mutate via
  generator actions + resolver invalidation.
- Jobs list: `CompanyAvatar` shows logo or initials (no broken remote logos).

## Job board blocks

- **Interactivity API** (`src/scripts/jobs/`) powers search, pagination, and
  field binding on the front end.
- **Patterns** in `templates/patterns/`; **Replace** toolbar on `wrc/jobs-list`
  and `wrc/job-page` (see `src/blocks/shared/`).
- **Default Jobs page** seeded on install (`PageSeeder`, option `jobplace_jobs_page_id`).
- **Settings** at `#/settings` — global job detail pattern, jobs page, defaults (`Common/Settings.php`, REST `job-place/v1/settings`).
- **Single job** template + routing in `includes/Routing/`.
- **SEO:** semantic `<article>` list items, linked job titles, escaped output in
  `view.php` templates.

## SCSS conventions

- BEM with `jobplace-` prefix; nest with `&__element` / `&--modifier` under the
  block root (see `src/blocks/jobs-template/style.scss`).
- Use `var(--wp--style--block-gap)` for list/template spacing — do not hard-code
  `gap` on blocks that expose block spacing in the editor.
- Shared board CSS: `src/styles/jobs-board.scss`.

## Backend / migrations / gotchas

See `AGENTS.md` for REST architecture, schema migration steps, DataViews CSS,
`dbDelta` rules, and layout-class requirements for `wrc/jobs-template`.

## Git commits — override default behavior

1. **Never commit or push unless explicitly asked in the current message.**
2. **Do NOT add Claude's default attribution** (no Co-Authored-By, bots, emojis).
3. **Commit as the logged-in GitHub user** (`ManiruzzamanAkash`). Do not edit
   git config or pass `--author`.
4. Stage explicit paths only (never `git add .` / `-A`).
