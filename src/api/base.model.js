const Knex = require('knex');
const connection = require('../../knexfile');
const { Model } = require('objection');

const knexConnection = Knex(connection);
Model.knex(knexConnection);

class BaseModel extends Model {
  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }
  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }
}

module.exports = BaseModel;
