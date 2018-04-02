# AdeptMind Boilerplate NodeJS Service

## Overview

This repo is a boilerplate for setting up a new NodeJS based service in 
The technology stack is:
- NodeJS (& NPM)
- PostgreSQL
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
+-- src
  +-- app.js: Express initialization
  +-- config.js: Loading and defining env variables
  +-- dbconfig.js: Knex initialization, included in app.js
  +-- api
    +-- index.js
    +-- {REST resource dir}
      +-- controller.js
      +-- index.js
      +-- model.js
```
Add new endpoints into /src/api, copy/modify existing examples
