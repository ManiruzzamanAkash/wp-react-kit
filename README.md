# wp-react-kit
A simple starter kit to work in WordPress with WP-script, React, React Router, Tailwind CSS, PostCSS, Eslint, WP-Data, WP-Data Store, React Components, React CRUD, i18n, PHP OOP plugin architecture easily in a minute.

----

### Quick Start
```sh
# Clone the Git repository
git clone https://github.com/ManiruzzamanAkash/wp-react-kit.git

# Install node module packages
npm i

# Install PHP-composer dependencies [It's empty]
composer install

# Start development mode
npm start

# Start development with hot reload (Frontend components will be updated automatically if any changes are made)
npm run start:hot

# To run in production
npm run build
```

### Run PHP Unit Test

```sh
./vendor/bin/phpunit
```

After running `start`, or `build` command, there will be a folder called `/build` will be generated at the root directory.

### Browse Plugin

http://localhost/wpex/wp-admin/admin.php?page=jobplace#/

Where, `/wpex` is the project root folder inside `/htdocs`.

Or, it could be your custom processed URL.

### REST API's

**Postman API Link** - https://www.getpostman.com/collections/f94073131fc1411506e8

#### REST API Documentation

1. **Job Types** http://localhost/wpex/wp-json/job-place/v1/job-types
    Method - GET
1. **Job Lists** http://localhost/wpex/wp-json/job-place/v1/jobs
    Method - GET
1. **Job Details**
    By ID - http://localhost/wpex/wp-json/job-place/v1/jobs/1
    By Slug - http://localhost/wpex/wp-json/job-place/v1/jobs/first-job
    Method - GET
1. **Create Job**
    http://localhost/wpex/wp-json/job-place/v1/jobs
    Method - POST
    Body -
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
    http://localhost/wpex/wp-json/job-place/v1/jobs/1
    Method - PUT
    Body -
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
    http://localhost/wpex/wp-json/job-place/v1/jobs
    Method - DELETE
    Body -
    ```json
    {
        "ids": [1, 2]
    }
    ```

**Detailed Documentation** -
[View Detailed documentations with parameters and responses of the REST API](https://github.com/ManiruzzamanAkash/wp-react-kit/blob/main/Rest-API-Docs.MD)

### Version & Changelogs

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

### PHP Coding Standards - PHPCS

**Get all errors of the project:**
```sh
vendor/bin/phpcs .
```

**Fix all errors of the project:**
```sh
vendor/bin/phpcbf .
```

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

![Job List Page](https://i.ibb.co/VJBb4Nq/Jobs-List.png "Job List Page")

**Job List Page with Pagination**

![Job List Page with Pagination](https://i.ibb.co/1vr6tXS/Job-Pagination.png "Job List Page with Pagination")

**Job List Page with search**

![Job List Page with Search](https://i.ibb.co/nr3pTXM/Jobs-Search.png "Job List Page with Search")