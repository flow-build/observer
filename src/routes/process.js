const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const jwt = require('koa-jwt');

function generateRouter(container) {
  const router = new Router();

  const notImplementedMiddleware = container
    .resolve('notImplementedMiddleware');
  const controller = container.resolve('processController');
  router.get('/',
    controller.getProcesses)
    .get('/:id',
      controller.getProcessById)
    .get('/:id/history',
      controller.getProcessHistoryById)
    .post('/state', bodyParser, notImplementedMiddleware);
  return router;
}

module.exports = generateRouter;
