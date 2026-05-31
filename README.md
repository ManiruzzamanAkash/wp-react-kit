# WP-React-Kit
A simple starter kit to work in WordPress plugin development using WordPress Rest API, WP-script, React, React Router, @wordpress/components, @wordpress/dataviews, SCSS, PostCSS, Eslint, WP-Data, WP-Data Store, React Components, React CRUD, i18n, PHPUnit Test, JestUnit Test, WordPress Playwright e2e Test, Gutenberg blocks and PHP OOP plugin architecture easily in a minute.

----

## What's included?

1. WordPress Rest API
2. WP-script Setup
3. React
4. React Router
5. TypeScript
6. Scss
7. PostCSS
8. Eslint
9. WP-Data
10. WP-Data Redux Store [Redux Saga, Generator function, Thunk, Saga Middleware]
11. React Components
12. React CRUD Operations - Create, Reade, Update, Delete, Status changes and so many...
13. Internationalization - WP i18n
14. PHPUnit Test [Test + Fix]
15. JestUnit Test
16. WordPress Playwright e2e Test
17. PHP OOP plugin architecture [Traits + Interfaces + Abstract Classes]
18. Gutenberg blocks — admin + **public job board** (Interactivity API)
19. Block patterns with editor **Replace** layouts (jobs list + job detail)
20. Auto-created **Jobs** page on plugin activation

### Quick Start
```sh
# Clone the Git repository
git clone https://github.com/ManiruzzamanAkash/wp-react-kit.git

# Install PHP-composer dependencies [It's empty]
composer install

# Install node module packages
npm i

# Start development mode
npm start

# Start development with hot reload (Frontend components will be updated automatically if any changes are made)
npm run start:hot

# To run in production
npm run build
```

After running `start`, or `build` command, there will be a folder called `/build` will be generated at the root directory.

### Activate the plugin
You need activate the plugin from plugin list page.
http://localhost/wpex/wp-admin/plugins.php

### Zip making process [Build, Localization, Version replace & Zip]
```sh
# One by one.
npm run build
npm run makepot
npm run version
npm run zip

# Single release command - which actually will run the above all in single command.
npm run release
```

After running `release` command, there will be a folder called `/dist` will be generated at the root directory with `wp-react-kit.zip` project files.


### Run PHP Unit Test

```sh
composer run test
```

### Run all tests by single command - PHPCS, PHPUnit

```sh
composer run test:all
```

### Run Jest Unit Test

```sh
npm run test:unit
```

### Run Playwright e2e Test

Playwright doc link: https://playwright.dev/docs/running-tests

**Requirements:**
- Must have docker installed and running by ensuring these commands -
```
npm run env:stop
npm run env:start
```

**Normal e2e test**
```sh
npm run test:e2e
```

**Interactive e2e test**
```sh
npm run test:e2e:watch
```

For more about e2e Tests running please check - https://playwright.dev/docs/running-tests

### PHP Coding Standards - PHPCS

**Get all errors of the project:**
```sh
composer run phpcs
```

**Fix all errors of the project:**
```sh
composer run phpcbf
```

**Full Composer test run:**
```sh
composer run test:all
```

### Browse Plugin

http://localhost/wpex/wp-admin/admin.php?page=jobplace#/

Where, `/wpex` is the project root folder inside `/htdocs`.

Or, it could be your custom processed URL.

### REST API's

**Postman API Link** - https://www.getpostman.com/collections/f94073131fc1411506e8

#### REST API Documentation

1. **Job Types**
    - Method: `GET`
    - URL: http://localhost/wpex/wp-json/job-place/v1/job-types
1. **Companies dropdown**
    - Method: `GET`
    - URL: http://localhost/wpex/wp-json/job-place/v1/companies/dropdown
1. **Job Lists**
    - Method: `GET`
    - URL: http://localhost/wpex/wp-json/job-place/v1/jobs
1. **Job Details**
    - Method: `GET`
    - URL By ID: http://localhost/wpex/wp-json/job-place/v1/jobs/1
    - URL By Slug: http://localhost/wpex/wp-json/job-place/v1/jobs/first-job
1. **Create Job**
    - Method: `POST`
    - URL: http://localhost/wpex/wp-json/job-place/v1/Jobs
    - Body:
    ```json
    {
        "title": "Simple Job Post",
        "slug": "simple-job-post",
        "description": "Simple job post description",
        "company_id": 1,
        "job_type_id": 2,
        "is_active": 1
    }
    ```
1. **Update Job**
    - Method: `PUT`
    - URL: http://localhost/wpex/wp-json/job-place/v1/jobs/1
    - Body:
    ```json
    {
        "title": "Simple Job Post Updated",
        "slug": "simple-job-post-updated",
        "description": "Simple job post description",
        "company_id": 1,
        "job_type_id": 2,
        "is_active": 1
    }
    ```
1. **Delete Jobs**
    - Method: `DELETE`
    - URL: http://localhost/wpex/wp-json/job-place/v1/jobs
    - Body:
    ```json
    {
        "ids": [1, 2]
    }
    ```

**Detailed Documentation** -
[View Detailed documentations with parameters and responses of the REST API](https://github.com/ManiruzzamanAkash/wp-react-kit/blob/main/Rest-API-Docs.MD)

### Version & Changelogs

**Unreleased (job board branch)**

1. New: Public job board blocks (`wrc/jobs-list`, `wrc/jobs-template`, field blocks, `wrc/job-page`).
2. New: Block patterns + editor **Replace** for list and detail layouts.
3. New: Default **Jobs** page on activation; single-job template and permalinks.
4. New: Interactivity API for client-side search and pagination.
5. Improve: Admin jobs list company column — avatar with initials when logo missing.
6. Improve: SCSS BEM nesting (`&__item`, `&--modifier`) for board styles.

**v0.9.0 - 20/12/2024**

1. Fix: Updated PHP version support > 8.0 and some more library support
1. Fix: When Editing a Job, last job is being edited
1. Update: Tested upto WordPress 6.7.1

**v0.8.0 - 24/05/2023**

1. New feature: WordPress Playwright test-e2e-utils added.
1. New feature: Some Gutenberg blocks has support for Playwright test.

**v0.7.0 - 01/01/2023**

1. Fix: Dynamic block renderer issue.
1. Fix: Asset registering multiple times issue.

**v0.5.0 - 15/11/2022**

1. New Feature : Job Create.
2. New Feature : Job Update.
3. New Feature : Job Delete.
4. New Feature : Job Status change.
5. New API: Company dropdown list.
6. New: Updated logo icon and plugin name.
7. New Components: Input Text-Editor, Improved design.
8. Refactor: Refactored codebase and updated docs.
9. New: Job type seeder.
10. Chore: Zip file generator.
11. Chore: i18n localization generator.

### Version & Changelogs
**v0.4.1 - 18/08/2022**

1. Added Jest Unit Test Setup.
2. Added some dummy Jest Unit Test.
3. Fix #11 - Version naming while installing.

**v0.4.0 - 12/08/2022**

1. Added many re-usable general components.
1. Header Component refactored and re-designed.
1. WP-Data setup and made Job Store.
1. Job List Page frontend added.

**v0.3.1 - 11/08/2022**

1. PHPUnit Test cases setup.
1. PHPUnit Test cases added for Job Manager and Job REST API's.

**v0.3.0 - 02/08/2022**

1. Necessary traits to handle - sanitization, query.
1. Advanced setup for migration, seeder, REST API.
1. Jobs, Job Types REST API developed.

<details>
    <summary>Options for specific files:</summary>

**Get specific file errors of the project:**
```sh
vendor/bin/phpcs job-place.php
```


**Fix specific file errors of the project:**
```sh
vendor/bin/phpcbf job-place.php
```
</details>

### Versions
<details>
    <summary>Simple Version with raw PHP</summary>

https://github.com/ManiruzzamanAkash/wp-react-kit/releases/tag/vSimple
</details>

<details>
    <summary>Version with EsLint and i18n Setup</summary>

https://github.com/ManiruzzamanAkash/wp-react-kit/releases/tag/vSimpleEslint
</details>


<details>
    <summary>Version with EsLint, i18n and React Router Setup</summary>

https://github.com/ManiruzzamanAkash/wp-react-kit/releases/tag/vReactRouter
</details>

<details>
    <summary>Version with PostCSS and Tailwind CSS Setup</summary>

https://github.com/ManiruzzamanAkash/wp-react-kit/releases/tag/vTailwindCss
</details>

<details>
    <summary>Version with PHPCS setup</summary>

https://github.com/ManiruzzamanAkash/wp-react-kit/releases/tag/vPHPCS
</details>

<details>
    <summary>Version with PHP OOP Architecture</summary>

https://github.com/ManiruzzamanAkash/wp-react-kit/releases/tag/vPhpOOP
</details>

### File structure:
<details>
    <summary>Simple Version Code-Structure:</summary>

![Simple Version](https://i.ibb.co/3fmYfks/wp-react-kit-simple-version.png "Demo in Simple Version")
</details>

### Demo with Simple Version

<details>
    <summary>Demo in WordPress plugin:</summary>

![Demo Plugin](https://i.ibb.co/NpVYrxN/wp-react-kit.png "Demo in WordPress plugin")
</details>


### Demo With React Router & Menu

![Demo Plugin](https://i.ibb.co/vPp9Mm9/Wp-Scripts-Demo.png "Demo in WordPress plugin")

### Final Demos

**Job List Page**

![Job List Page](https://i.ibb.co/0MXQ7y7/Job-List.png "Job List Page")

**Job List Page with Pagination in different primary color**

![Job List Page with Pagination](https://i.ibb.co/1vr6tXS/Job-Pagination.png "Job List Page with Pagination")

**Job List Page with search**

![Job List Page with Search](https://i.ibb.co/nr3pTXM/Jobs-Search.png "Job List Page with Search")

**Job Create Page**

![Job Create Page](https://i.ibb.co/ZXzgjzr/Job-Create.png "Job Create Page")


**Job Edit Page**

![Job Edit Page](https://i.ibb.co/2Sqpck3/Job-Edit.png "Job Edit Page")

![Job Edit Page Loading](https://i.ibb.co/hfxNg7G/Job-Create-Preloading.png "Job Edit Page Loading")

**Job Delete**

![Job Delete popup](
https://i.ibb.co/yfXBT8b/Job-Delete-Popup.png
 "Job Delete popup")

 **Responsive views**

![Mobile responsive views-1](
https://i.ibb.co/Ws6n1HW/Mobile-View-List.png
 "Mobile responsive views-1")

![Mobile responsive views-2](
https://i.ibb.co/QYgvD83/Mobile-View-Selected-Job.png
 "Mobile responsive views-2")

## Job board (front-end blocks)

Interactive job listings for block themes and classic themes with the block editor.
Requires `npm run build` so `build/blocks/*` exists.

### Quick setup

1. Activate the plugin — a **Jobs** page is created at `/jobs/` (customizable slug).
2. Edit the page in the Site Editor or block editor.
3. Select the **Jobs List** block → use **Replace** in the toolbar to pick a layout pattern.
4. Publish. Search and pagination work without full page reloads (Interactivity API).

Plugin row links: **View Jobs Board** / **Edit Jobs Board**.

### Block overview

| Block | Purpose |
|-------|---------|
| `wrc/jobs-list` | Board wrapper (query, search, list, pagination) |
| `wrc/jobs-template` | Layout repeated for each job |
| `wrc/job-page` | Single job detail (used in `single-job` template) |
| Field blocks | Title, company, location, salary, badges, apply button, etc. |

### Patterns (`templates/patterns/`)

**Jobs list:** Default, Grid, Compact, Featured  
**Job detail:** Default, Compact, Split  

Patterns register against `blockTypes` so **Replace** only shows relevant layouts.
Categories: `jobplace_jobs`, `jobplace_jobs_list`, `jobplace_job_detail`.

### Single job pages

- Block template: `templates/templates/single-job.html`
- Permalink settings: Job Manager → permalinks (see admin app)
- Router: `includes/Routing/JobDetailRouter.php`

### SEO-friendly markup

- List uses `role="list"`; each job is an `<article>`.
- Job titles link to the detail URL.
- Text fields are escaped in PHP `view.php` templates.

### Settings

Open **Job Manager → Settings** in wp-admin (`#/settings`).

| Setting | What it does |
|---------|----------------|
| Global job detail layout | Picks a job detail pattern (Default, Compact, Split) for all `/jobs/{slug}/` URLs |
| Jobs list page | Which WordPress page contains the Jobs List block |
| Default jobs per page | Fallback page size for listings |
| Default apply button text | Label when Apply blocks have no custom text |

REST: `GET/PUT /wp-json/job-place/v1/settings`. Permalink base is still under **Settings → Permalinks** in WordPress.

### Developer notes

- Block sources: `src/blocks/` — editor JS + `view.php` render callbacks.
- Interactivity store: `src/scripts/jobs/` (`@jobplace/jobs`).
- Global settings: `includes/Common/Settings.php`, `src/pages/settings/SettingsPage.tsx`.
- Shared styles: `src/styles/jobs-board.scss` (BEM: nest `&__element` under block roots).
- Agent/docs detail: see `AGENTS.md` and `CLAUDE.md`.

## Gutenberg blocks (legacy demo)

Inside `src/blocks` you'll also find sample blocks (e.g. header). Job board blocks
use the `wrc/*` namespace and dynamic PHP templates.

**Demo preview -**
![React Kit Header Block demo](
https://i.ibb.co/V2m7bPt/wp-react-kit-block-demo.png
"React Kit Header Block demo")

## Contribution

Contribution is open and kindly accepted. Before contributing, please check the issues tab if anything in enhancement or bug. If you want to contribute new, please create an issue first with your enhancement or feature idea.
Then, fork this repository and make your Pull-Request. I'll approve, if everything goes well.

## Contact
It's me, Maniruzzaman Akash. Find me at manirujjamanakash@gmail.com
