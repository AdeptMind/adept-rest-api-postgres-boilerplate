# AdeptMind Boilerplate NodeJS Service

## Overview

This repo is a boilerplate for setting up a new NodeJS based service in the AdeptMind namespace.

The technology stack is:
- NodeJS (& NPM)
- PostgreSQL
- [ExpressJS](https://expressjs.com/en/guide/routing.html)
- [Knex.js](http://knexjs.org/)
- [Objection.js](http://vincit.github.io/objection.js/)
  - [See here for more info](https://dev.to/aspittel/objection--knex--painless-postgresql-in-your-node-app--6n6)

NOTE: This is only intended for services that have no or very little front-end rendering. There is no support for views.

## How to run

- Install `node` & `npm`
- `npm install`
- `npm run`

## Structure

```
+-- `.env.example`: Lists env variables that must be configured in the `.env` file
+-- `migrations`: See Knex docs
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
  +-- `constants`
    +-- `index.js`: File containing all constants used in the project
  +-- `lib`: Directory containing all common util functions not specific to any single resource or route (create this yourself)
```
Add new endpoints into `/src/api`, copy/modify existing examples

## Code conventions

We are establishing certain code conventions through ESLint and Prettier. It is preferable to keep code style consistent throughout.

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

## Before you start

- Remove all of the sample files in `/migrations` and `/src/api/{users,posts}`. They are only examples. Replace with your own implementations.
- Create a `.env` file in the root directory by copying from `.env.example` and modifying the values to suit the current project.
- Set up Postgres on the host machine and create a separate database for your project. The database name should be related to the repo name, and should be underscore-delimited (all Postgres naming uses underscores by convention). Put the database name in the `.env` file under `DATABASE_NAME`; also specify `DATABASE_URL` if running in a production environment.
