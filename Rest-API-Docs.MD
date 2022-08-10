## REST API Documentation

Details about the REST API documentation of the plugin.

---

#### Job Type List API
**URL** - http://localhost/wpex/wp-json/job-place/v1/job-types
**Method** - GET
**Response** -
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
            "self": [
                {
                    "href": "http://localhost/wpex/wp-json/job-place/v1/job-types/1"
                }
            ],
            "collection": [
                {
                    "href": "http://localhost/wpex/wp-json/job-place/v1/job-types"
                }
            ]
        }
    },
    {
        "id": 2,
        "name": "Part time",
        "slug": "part-time",
        "description": "Part time job",
        "created_at": "2022-07-31 12:36:20",
        "updated_at": "2022-07-31 12:36:20",
        "_links": {
            "self": [
                {
                    "href": "http://localhost/wpex/wp-json/job-place/v1/job-types/2"
                }
            ],
            "collection": [
                {
                    "href": "http://localhost/wpex/wp-json/job-place/v1/job-types"
                }
            ]
        }
    },
    {
        "id": 3,
        "name": "Remote",
        "slug": "remote",
        "description": "Remote job",
        "created_at": "2022-07-31 12:36:20",
        "updated_at": "2022-07-31 12:36:20",
        "_links": {
            "self": [
                {
                    "href": "http://localhost/wpex/wp-json/job-place/v1/job-types/3"
                }
            ],
            "collection": [
                {
                    "href": "http://localhost/wpex/wp-json/job-place/v1/job-types"
                }
            ]
        }
    }
]
```


#### Job Lists API
**URL** - http://localhost/wpex/wp-json/job-place/v1/jobs
**Method** - `GET`
**Middleware** - WordPress user logged in.
**Parameters** -
```
page=1
per_page=10
search=first
orderby=id
order=asc
```
**Full Endpoint** with all of the supported params -
http://localhost/wpex/wp-json/job-place/v1/jobs?page=1&per_page=10&search=first

**API Response**
```json
[
    {
        "id": 1,
        "title": "First Job",
        "slug": "first-job",
        "job_type": {
            "id": "1",
            "name": "Full time",
            "slug": "full-time"
        },
        "is_remote": false,
        "status": "published",
        "company": {
            "name": "Agami Soft Ltd.",
            "avatar_url": "http://1.gravatar.com/avatar/737340ad976d2c52de2a26589ff116d2?s=96&d=mm&r=g"
        },
        "description": "",
        "created_at": "2022-07-31 10:05:21",
        "updated_at": "2022-07-31 10:05:21",
        "_links": {
            "self": [
                {
                    "href": "http://localhost/wpex/wp-json/job-place/v1/jobs/1"
                }
            ],
            "collection": [
                {
                    "href": "http://localhost/wpex/wp-json/job-place/v1/jobs"
                }
            ]
        }
    }
]
```

#### Job Detail API
**URL** - http://localhost/wpex/wp-json/job-place/v1/jobs/2
**Method** - `GET`
**Middleware** - WordPress user logged in.
**Response** -
```json
{
    "id": 2,
    "title": "Second Job",
    "slug": "second-job",
    "job_type": {
        "id": "2",
        "name": "Part time",
        "slug": "part-time"
    },
    "is_remote": false,
    "status": "published",
    "company": {
        "name": "Maniruzzaman Akash",
        "avatar_url": "http://1.gravatar.com/avatar/4c0a55ab2542912358b53b7c99dc73c3?s=96&d=mm&r=g"
    },
    "description": "",
    "created_at": "2022-07-31 10:05:21",
    "updated_at": "2022-07-31 10:05:21",
    "_links": {
        "self": [
            {
                "href": "http://localhost/wpex/wp-json/job-place/v1/jobs/2"
            }
        ],
        "collection": [
            {
                "href": "http://localhost/wpex/wp-json/job-place/v1/jobs"
            }
        ]
    }
}
```

**Response when job not found** -
```json
{
    "code": "job_place_rest_job_not_found",
    "message": "Job not found. May be job has been deleted.",
    "data": {
        "status": 404
    }
}
```

#### Job Create API
**URL** - http://localhost/wpex/wp-json/job-place/v1/jobs
**Method** - `POST`
**Middleware** - WordPress user logged in.
**Body** -
```json
{
    "title": "Simple Job Post Awesome",
    "slug": "simple-job-post-awesome",
    "description": "Simple job post description",
    "company_id": 1,
    "job_type_id": 2,
    "is_active": 1
}
```
**Response** -
```json
{
    "id": 49,
    "title": "Simple Job Post Awesome",
    "slug": "simple-job-post-awesome",
    "job_type": {
        "id": "2",
        "name": "Part time",
        "slug": "part-time"
    },
    "is_remote": false,
    "status": "published",
    "company": {
        "name": "admin",
        "avatar_url": "http://1.gravatar.com/avatar/1c82531094a13dc2b339ab5decf5c446?s=96&d=mm&r=g"
    },
    "description": "Simple job post description",
    "created_at": "2022-08-10 21:34:28",
    "updated_at": "2022-08-10 21:34:28",
    "_links": {
        "self": [
            {
                "href": "http://localhost/wpex/wp-json/job-place/v1/jobs/49"
            }
        ],
        "collection": [
            {
                "href": "http://localhost/wpex/wp-json/job-place/v1/jobs"
            }
        ]
    }
}
```
#### Job Update API
**URL** - http://localhost/wpex/wp-json/job-place/v1/jobs/2
**Method** - `PUT`
**Middleware** - WordPress user logged in.
**Body** -
```json
{
    "title": "Simple Job Post Awesome Updated",
    "slug": "simple-job-post-awesome-updated",
    "description": "Simple job post description",
    "company_id": 1,
    "job_type_id": 2,
    "is_active": 1
}
```

**Response**
```json
{
    "id": 49,
    "title": "Simple Job Post Awesome Updated",
    "slug": "simple-job-post-awesome-updated",
    "job_type": {
        "id": "2",
        "name": "Part time",
        "slug": "part-time"
    },
    "is_remote": false,
    "status": "published",
    "company": {
        "name": "admin",
        "avatar_url": "http://1.gravatar.com/avatar/1c82531094a13dc2b339ab5decf5c446?s=96&d=mm&r=g"
    },
    "description": "Simple job post description",
    "created_at": "2022-08-10 21:36:09",
    "updated_at": "2022-08-10 21:36:09",
    "_links": {
        "self": [
            {
                "href": "http://localhost/wpex/wp-json/job-place/v1/jobs/49"
            }
        ],
        "collection": [
            {
                "href": "http://localhost/wpex/wp-json/job-place/v1/jobs"
            }
        ]
    }
}
```


#### Jobs Delete API
**URL** - http://localhost/wpex/wp-json/job-place/v1/jobs
**Method** - `DELETE`
**Middleware** - WordPress user logged in.
**Body** -
```json
{
    "ids": [1, 2]
}
```

**Response**
```json
{
    "message": "Jobs deleted successfully.",
    "total": 1
}
```