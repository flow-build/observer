const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const {
  notImplementedMiddleware,
} = require('../../domain/middlewares');

function generateRouter() {
  const router = new Router();

  router.get('/', notImplementedMiddleware)
    .post('/', bodyParser, notImplementedMiddleware)
    .post('/:id', notImplementedMiddleware);

  return router;
}

module.exports = generateRouter;
