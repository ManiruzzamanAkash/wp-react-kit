# REST API Documentation

Job Place exposes a custom REST namespace for jobs, companies, categories, types, and plugin settings.

| | |
|---|---|
| **Namespace** | `job-place/v1` |
| **Base URL** | `{site_url}/wp-json/job-place/v1` |
| **Schema discovery** | `{site_url}/wp-json/job-place/v1` (index) or append `/jobs`, `/companies`, etc. for item schemas |

Replace `{site_url}` with your WordPress site root, for example `http://foodfruitservice.local` or `http://localhost/wpex`.

---

## Authentication

| Resource | Permission |
|---|---|
| `job-types` | Public (`GET` only) |
| `jobs`, `companies`, `job-categories` | Currently open to unauthenticated requests (see `RESTController::check_permission()`; capability checks are planned) |
| `settings` | WordPress user with `manage_options` |

**Logged-in admin (browser / same-origin):** send the WordPress REST nonce:

```http
X-WP-Nonce: {wp_rest_nonce}
```

**External clients:** use [Application Passwords](https://make.wordpress.org/core/2020/11/05/application-passwords-integration-guide/) (Basic auth) or another supported WordPress REST authentication method.

---

## Pagination & collection headers

List endpoints support standard WordPress collection query args where noted:

| Parameter | Type | Default | Description |
|---|---|---|---|
| `page` | integer | `1` | Current page |
| `per_page` | integer | `10` | Items per page |
| `search` | string | `''` | Full-text search (resource-specific fields) |
| `orderby` | string | `id` | Sort column |
| `order` | string | `DESC` | `ASC` or `DESC` |

Responses include:

```http
X-WP-Total: 42
X-WP-TotalPages: 5
```

---

## Endpoints overview

| Method | Route | Description |
|---|---|---|
| `GET` | `/job-types` | List job types (Full time, Part time, Remote, …) |
| `GET` | `/jobs` | List jobs |
| `GET` | `/jobs/stats` | Dashboard job counts |
| `GET` | `/jobs/{id\|slug}` | Single job by numeric ID or slug |
| `POST` | `/jobs` | Create job |
| `PUT` / `PATCH` | `/jobs/{id}` | Update job |
| `DELETE` | `/jobs` | Delete jobs (body: `{ "ids": [1, 2] }`) |
| `GET` | `/companies` | List companies |
| `GET` | `/companies/stats` | Company count |
| `GET` | `/companies/dropdown` | Lightweight list for selects |
| `GET` | `/companies/{id}` | Single company |
| `POST` | `/companies` | Create company |
| `PUT` / `PATCH` | `/companies/{id}` | Update company |
| `DELETE` | `/companies` | Delete companies (body: `{ "ids": [1] }`) |
| `GET` | `/job-categories` | List job categories |
| `GET` | `/job-categories/stats` | Category count |
| `GET` | `/job-categories/{id}` | Single category |
| `POST` | `/job-categories` | Create category |
| `PUT` / `PATCH` | `/job-categories/{id}` | Update category |
| `DELETE` | `/job-categories` | Delete categories (body: `{ "ids": [1] }`) |
| `GET` | `/settings` | Plugin settings (`manage_options`) |
| `PUT` / `PATCH` | `/settings` | Update settings (`manage_options`) |

---

## Job types

### List job types

```http
GET /wp-json/job-place/v1/job-types
```

**Query parameters:** `page`, `per_page`, `search`, `orderby`, `order` (via parent collection params; controller also accepts legacy `limit`, `s`).

**Example response:**

```json
[
  {
    "id": 1,
    "name": "Full time",
    "slug": "full-time",
    "description": "Full time job",
    "created_at": "2022-07-31 12:36:20",
    "updated_at": "2022-07-31 12:36:20",
    "_links": {
      "self": [{ "href": "{site_url}/wp-json/job-place/v1/job-types/1" }],
      "collection": [{ "href": "{site_url}/wp-json/job-place/v1/job-types" }]
    }
  }
]
```

---

## Jobs

### Job object (response shape)

Jobs returned from the API include nested `job_type`, `job_category`, and `company` objects plus derived fields:

| Field | Type | Notes |
|---|---|---|
| `id` | integer | |
| `title` | string | Required on create |
| `slug` | string | Auto-generated from title if omitted |
| `description` | string | Required on create; block HTML allowed |
| `status` | string | `published` or `draft` (from `is_active`) |
| `is_active` | boolean | Write as boolean; stored as active flag |
| `job_type_id` | integer | Required on create |
| `job_type` | object | `{ id, name, slug }` on read |
| `company_id` | integer | Required on create |
| `company` | object | `{ id, name, avatar_url }` on read |
| `job_category_id` | integer | Optional |
| `job_category` | object \| null | `{ id, name, slug }` on read |
| `category` | string | Legacy free-text department label |
| `location` | string | |
| `is_remote` | boolean | |
| `experience_level` | string | `entry`, `mid`, `senior`, `lead`, or empty |
| `vacancies` | integer | Default `1` |
| `salary_min` | number \| null | |
| `salary_max` | number \| null | |
| `salary_currency` | string | Default `USD` |
| `salary_period` | string | `hourly`, `monthly`, `yearly` |
| `is_negotiable` | boolean | |
| `application_deadline` | string \| null | `Y-m-d` or datetime |
| `apply_url` | string | External apply link |
| `apply_email` | string | Application email |
| `is_featured` | boolean | |
| `permalink` | string | Front-end single-job URL |
| `created_at` | string | Read-only |
| `updated_at` | string | Read-only |

### List jobs

```http
GET /wp-json/job-place/v1/jobs
```

**Query parameters (collection + filters):**

| Parameter | Type | Description |
|---|---|---|
| `page`, `per_page`, `search`, `orderby`, `order` | | Standard pagination |
| `status` | string | `published` or `draft` |
| `is_featured` | integer | `0` or `1` |
| `is_remote` | integer | `0` or `1` |
| `is_negotiable` | integer | `0` or `1` |
| `job_type_id` | integer | Filter by type |
| `job_category_id` | integer | Filter by category |
| `company_id` | integer | Filter by company |
| `experience_level` | string | `entry`, `mid`, `senior`, `lead` |

**Search** matches job title, description, location, category label, experience level, and company name.

**Example:**

```http
GET /wp-json/job-place/v1/jobs?page=1&per_page=10&search=senior&status=published
```

**Example response:**

```json
[
  {
    "id": 1,
    "title": "Senior Software Engineer",
    "slug": "senior-software-engineer",
    "job_type_id": 1,
    "job_type": { "id": 1, "name": "Full time", "slug": "full-time" },
    "job_category_id": 2,
    "job_category": { "id": 2, "name": "Engineering", "slug": "engineering" },
    "company_id": 1,
    "company": {
      "id": 1,
      "name": "Acme Corp",
      "avatar_url": "https://example.com/logo.png"
    },
    "status": "published",
    "is_active": true,
    "location": "Remote",
    "is_remote": true,
    "experience_level": "senior",
    "vacancies": 1,
    "salary_min": 80000,
    "salary_max": 120000,
    "salary_currency": "USD",
    "salary_period": "yearly",
    "is_negotiable": false,
    "application_deadline": null,
    "apply_url": "https://example.com/apply",
    "apply_email": "",
    "is_featured": false,
    "permalink": "{site_url}/jobs/senior-software-engineer/",
    "description": "<p>Build great software.</p>",
    "created_at": "2026-05-31 10:00:00",
    "updated_at": "2026-05-31 10:00:00",
    "_links": {
      "self": [{ "href": "{site_url}/wp-json/job-place/v1/jobs/1" }],
      "collection": [{ "href": "{site_url}/wp-json/job-place/v1/jobs" }]
    }
  }
]
```

### Job stats

```http
GET /wp-json/job-place/v1/jobs/stats
```

**Response:**

```json
{
  "total": 12,
  "published": 10,
  "draft": 2,
  "featured": 3,
  "remote": 4,
  "negotiable": 1
}
```

### Get single job

```http
GET /wp-json/job-place/v1/jobs/1
GET /wp-json/job-place/v1/jobs/senior-software-engineer
```

The `{id}` route accepts a numeric ID **or** a slug.

**404 response:**

```json
{
  "code": "job_place_rest_job_not_found",
  "message": "Job not found. May be job has been deleted or you don't have access to that.",
  "data": { "status": 404 }
}
```

### Create job

```http
POST /wp-json/job-place/v1/jobs
Content-Type: application/json
```

**Minimum body:**

```json
{
  "title": "Senior Software Engineer",
  "description": "<p>Build great software.</p>",
  "company_id": 1,
  "job_type_id": 1,
  "is_active": true
}
```

**Full example body:**

```json
{
  "title": "Senior Software Engineer",
  "slug": "senior-software-engineer",
  "description": "<p>Build great software.</p>",
  "company_id": 1,
  "job_type_id": 1,
  "job_category_id": 2,
  "is_active": true,
  "location": "Remote",
  "is_remote": true,
  "experience_level": "senior",
  "vacancies": 2,
  "salary_min": 80000,
  "salary_max": 120000,
  "salary_currency": "USD",
  "salary_period": "yearly",
  "is_negotiable": false,
  "application_deadline": "2026-12-31",
  "apply_url": "https://example.com/apply",
  "apply_email": "jobs@example.com",
  "is_featured": true
}
```

**Success:** `201 Created` with `Location` header pointing to the new job.

### Update job

```http
PUT /wp-json/job-place/v1/jobs/1
Content-Type: application/json
```

Send the fields to change (same schema as create). Numeric ID required in the URL.

### Delete jobs

```http
DELETE /wp-json/job-place/v1/jobs
Content-Type: application/json
```

**Body:**

```json
{
  "ids": [1, 2, 3]
}
```

**Response:**

```json
{
  "message": "Jobs deleted successfully.",
  "total": 3
}
```

---

## Companies

Companies live in the `jobplace_companies` table (not WordPress users). The dropdown endpoint is optimized for form selects; the collection endpoint returns full records with pagination.

### Company dropdown

```http
GET /wp-json/job-place/v1/companies/dropdown
```

**Response:**

```json
[
  {
    "id": 1,
    "name": "Acme Corp",
    "email": "hello@acme.test",
    "slug": "acme-corp"
  }
]
```

### List companies

```http
GET /wp-json/job-place/v1/companies?page=1&per_page=10&search=acme
```

### Company stats

```http
GET /wp-json/job-place/v1/companies/stats
```

**Response:** `{ "total": 5 }`

### Get company

```http
GET /wp-json/job-place/v1/companies/1
```

### Create company

```http
POST /wp-json/job-place/v1/companies
Content-Type: application/json
```

**Body:**

```json
{
  "name": "Acme Corp",
  "slug": "acme-corp",
  "email": "hello@acme.test",
  "website": "https://acme.test",
  "description": "We build things.",
  "avatar_url": "https://acme.test/logo.png"
}
```

Required: `name`. Slug is auto-generated from the name when omitted.

### Update company

```http
PUT /wp-json/job-place/v1/companies/1
```

### Delete companies

```http
DELETE /wp-json/job-place/v1/companies
Content-Type: application/json
```

**Body:** `{ "ids": [1] }`

---

## Job categories

### List categories

```http
GET /wp-json/job-place/v1/job-categories?page=1&per_page=10&search=eng
```

### Category stats

```http
GET /wp-json/job-place/v1/job-categories/stats
```

**Response:** `{ "total": 4 }`

### Get category

```http
GET /wp-json/job-place/v1/job-categories/1
```

### Create category

```http
POST /wp-json/job-place/v1/job-categories
Content-Type: application/json
```

**Body:**

```json
{
  "name": "Engineering",
  "slug": "engineering",
  "description": "Software and infrastructure roles"
}
```

### Update category

```http
PUT /wp-json/job-place/v1/job-categories/1
```

### Delete categories

```http
DELETE /wp-json/job-place/v1/job-categories
Content-Type: application/json
```

**Body:** `{ "ids": [1, 2] }`

---

## Settings

Requires `manage_options`.

### Get settings

```http
GET /wp-json/job-place/v1/settings
```

**Response (abbreviated):**

```json
{
  "job_detail_pattern": "jobplace/single-job-default",
  "jobs_per_page": 10,
  "default_apply_button_text": "Apply now",
  "jobs_page_id": 42,
  "permalink_base": "jobs",
  "choices": {
    "job_detail_patterns": [],
    "pages": [{ "value": 42, "label": "Jobs" }]
  },
  "urls": {
    "jobs_page_edit": "{site_url}/wp-admin/post.php?post=42&action=edit",
    "jobs_page_view": "{site_url}/jobs/",
    "permalinks": "{site_url}/wp-admin/options-permalink.php#jobplace_permalinks"
  }
}
```

### Update settings

```http
PUT /wp-json/job-place/v1/settings
Content-Type: application/json
```

**Writable fields:**

| Field | Type | Notes |
|---|---|---|
| `job_detail_pattern` | string | Registered block pattern slug |
| `jobs_per_page` | integer | `1`–`50` |
| `default_apply_button_text` | string | Front-end apply button label |
| `jobs_page_id` | integer | WordPress page ID for the jobs archive |

Job permalink structure is still managed under **Settings → Permalinks** in WordPress (`PermalinksSettings`); it is exposed read-only as `permalink_base` in the GET response.

---

## Postman collection

Import the maintained collection from the repository:

[`docs/postman/Job-Place-v1.postman_collection.json`](docs/postman/Job-Place-v1.postman_collection.json)

Set collection variables:

| Variable | Example |
|---|---|
| `site_url` | `http://foodfruitservice.local` |
| `rest_base` | `{{site_url}}/wp-json/job-place/v1` |
| `wp_rest_nonce` | From `wpApiSettings.nonce` in wp-admin (optional) |

The legacy Postman cloud collection (`f94073131fc1411506e8`) predates v1.0.0 and is no longer maintained.

---

## Related code

| Area | Path |
|---|---|
| Route registry | `includes/REST/Api.php` |
| Controllers | `includes/REST/*Controller.php` |
| Job response shape | `includes/Jobs/Job.php` (`to_array`) |
| PHPUnit coverage | `tests/phpunit/Api/` |
