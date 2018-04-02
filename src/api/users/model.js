const BaseModel = require('../base.model');
const Post = require('../posts/model');

class User extends BaseModel {
  static get virtualAttributes() {
    return ['underage'];
  }

  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    return {
      posts: {
        relation: BaseModel.HasManyRelation,
        // The related model. This can be either a Model subclass constructor or an
        // absolute file path to a module that exports one.
        modelClass: Post,
        join: {
          from: 'users.id',
          to: 'posts.user_id',
        },
      },
    };
  }

  get underage() {
    if (this.age <= 18) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = User;
