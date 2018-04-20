const Router = require('express-promise-router');

const Controller = require('./controller');

const router = Router();

router
  .get('/', Controller.index)
  .post('/', Controller.create)
  .get('/:id', Controller.show)
  .put('/:id', Controller.update)
  .delete('/:id', Controller.destroy);

module.exports = router;
