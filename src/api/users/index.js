const Router = require('express-promise-router');

const Controller = require('./controller');

const router = Router();

router
  .get('/', Controller.index)
  .post('/', Controller.create)
  .get('/:id', Controller.show)
  .get('/:id/edit', Controller.edit)
  .put('/:id', Controller.update)
  .delete('/:id', Controller.destroy);

module.exports = router;
