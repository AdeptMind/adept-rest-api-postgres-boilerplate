# AdeptMind Boilerplate NodeJS Service

## Overview

This repo is a boilerplate for setting up a new NodeJS based service in the AdeptMind namespace. The service is assumed to be [RESTful](https://blog.philipphauer.de/restful-api-design-best-practices/).

The technology stack is:
- NodeJS (& NPM)
- PostgreSQL
- [ExpressJS](https://expressjs.com/en/guide/routing.html): server framework
- [Knex.js](http://knexjs.org/): query builder for simplifying database interactions
- [Objection.js](http://vincit.github.io/objection.js/): ORM built on top of Knex.js
  - [See here for more info](https://dev.to/aspittel/objection--knex--painless-postgresql-in-your-node-app--6n6)

Resources on the additional modules included in this project:
- [bodymen](https://github.com/diegohaz/bodymen): for validating and normalizing JSON body params
- [request-promise](https://github.com/request/request-promise): promisified version of the `request` package for simple outbound requests
- Test dependencies:
  - [Jest](https://facebook.github.io/jest/docs/en/getting-started.html): basic JS test framework
  - [Supertest](https://github.com/visionmedia/supertest): for constructing adhoc servers, testing queries, and verifying responses
  - SQLite3 in memory as substitute for Postgres in test environments
  - [mock-knex](https://github.com/colonyamerican/mock-knex): allows stubbing out, intercepting, and mocking database responses from Knex

NOTE: This is only intended for services that have no or very little front-end rendering. There is no support for views.

## How to run

- Install `node` & `npm`
- `npm install`
- `npm run`

## Structure

```
+-- `.env.example`: Lists env variables that must be configured in the `.env` file
+-- `src`
  +-- `app.js`: Express initialization
  +-- `config.js`: Loading and defining env variables
  +-- `api`
    +-- `base.model.js`: Every subdirectory's `model.js` file should import this as `BaseModel` and extend it
    +-- `index.js`
    +-- `responses.js`: Call these when returning (`success`, `error`, `redirect`)
    +-- {REST resource dir}
      +-- `controller.js`
      +-- `index.js`
      +-- `model.js`
      +-- `index.test.js`: Integration tests for complex controller methods
  +-- `constants`
    +-- `index.js`: File containing all constants used in the project
  +-- `db`: Directory containing all files for Knex.js
    +-- `migrations`: JS files for creating and migrating Postgres tables. See https://knexjs.org/#Migrations-CLI
    +-- `seeds`: JS files for populating sample Postgres data. See https://knexjs.org/#Seeds-CLI
  +-- `lib`: Directory containing all common util functions not specific to any single resource or route (create this yourself)
    +-- `{file_name}.test.js`: Unit tests for `{file_name}.js`, should mock all calls outside of the module being tested
```
Add new endpoints into `/src/api`, copy/modify existing examples

## Configuration (.env variables)

`API_ROOT`: The prefix path for all web endpoints associated with this service. For example, setting to `/api` would change the entry point of the service to `https://{HOSTNAME}/api/shops/install`.

`DATABASE_CLIENT`: The database to use for this service. Defaults to `pg` for Postgres. (In a test environment this is substituted for SQLite3.)

`DATABASE_NAME`, `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_USER`, `DATABASE_PASSWORD`: The parameters to use when connecting to our (Postgres) database, when the `DATABASE_URL` is not provided.

`DATABASE_URL`: The [full connection string](https://www.postgresql.org/docs/current/static/libpq-connect.html#LIBPQ-CONNSTRING) to use as a substitute for providing the above (`DATABASE_NAME` is still mandatory).

`IP`: The platform manager service is bound to this IP.

`NODE_ENV`: [For express.js.](https://expressjs.com/en/advanced/best-practice-performance.html#set-node_env-to-production) Currently we use the values `development` and `production`. Also, in `production` mode, we use the `DATABASE_URL` instead of `DATABASE_NAME` and `DATABASE_PORT`.

`PORT`: The platform manager service is bound to this port.

`LOG_LEVEL`: can be set to any of the following `debug`, `info`, `warn`, `error`; will filter out any console prints that is less severe than the level specified. The default is `debug` for development purposes. It is recommended to use `warn` on production deployments.

## Code conventions

We are establishing certain code conventions through ESLint and Prettier, and have hooks in place to run these on every commit. It is preferable to keep code style consistent throughout.

- Single quotes instead of double quotes
- Semicolons at end of statement always
- Trailing commas in multiline param lists throughout
- Parentheses around arguments in all lambdas, even those with a single argument
- In JS files, requires follow these conventions:
  - Listed only at the top, no requires in the middle of the file
  - External and built-in imports (e.g. `const express = require('express')`) are specified before imports within the module (e.g. `const Controller = require('./controller')`)
  - List these within two blocks, separated by a newline in between, and followed by another newline after
  - Within each block, sort alphabetically, in the following order:
    - Symbols and numbers
    - Capital letters
    - Lowercase letters
    - Destructuring assignments (sorted alphabetically within the destructuring object, then sorted by first destructured import)
  - Aside from destructuring, requires should be "pure"; any calls that actually use the imports should occur after the import blocks
- It is preferred (but not enforced) that the last block of the JS file should be an assignment to `module.exports` or `exports`, and no assignments to this should occur before that point
  - If using `module.exports = { bar, baz, foo ... }` style, sort export variables by the same alphabetical order as the import blocks

## Logging

There is a convenience module `lib/logger.js` that is built upon the `winston` library and is meant to be a starting point for users to add additional transports as well as filter out noise using the `LOG_LEVEL` configuration in `.env`

It is possible to just import the module using `const logger = require('./lib/logger');` and begin invoking `logger.log`.

Available methods follow the available log levels and in order of least to most severe:

```
- logger.debug(...)
- logger.info(...)
- logger.warn(...)
- logger.error(...)
```

### Removing logging

If you want to replace the logging library, you will have to remove the references to it in the following files:

```
- $ROOT/src/index.js
- $ROOT/src/app.js
```

## Before you start

- Remove all of the sample files in `/src/db/migrations` and `/src/api/{users,posts}`. They are only examples. Replace with your own implementations.
- Remove all `.test.js` files as well.
- Create a `.env` file in the root directory by copying from `.env.example` and modifying the values to suit the current project.
- Set up Postgres on the host machine and create a separate database for your project. The database name should be related to the repo name, and should be `underscore_delimited` (all Postgres naming uses underscores by convention). Put the database name in the `.env` file under `DATABASE_NAME`.

