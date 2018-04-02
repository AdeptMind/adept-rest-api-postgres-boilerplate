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
- [SASS](https://sass-lang.com/guide)
- [Querymen](https://github.com/diegohaz/querymen)

## How to run

- Install node & npm
- `npm install`
- `npm run`

## Structure

```
+-- migrations: See Knex docs
+-- src
  +-- app.js: Express initialization
  +-- config.js: Loading and defining env variables
  +-- api
    +-- base.model.js: Every subdirectory's model.js file should import this as BaseModel and extend it
    +-- index.js
    +-- responses.js: Call these when returning (success, error, redirect)
    +-- {REST resource dir}
      +-- controller.js
      +-- index.js
      +-- model.js
```
Add new endpoints into /src/api, copy/modify existing examples
