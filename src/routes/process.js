const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const jwt = require('koa-jwt');

function generateRouter(container, nested = false) {
  const router = new Router();

  // const flags = container.resolve('featureFlags');
  // const { jwtSecret } = container.resolve('webOptions');
  // const decryptTokenMiddleware = container.resolve('decryptTokenMiddleware');
  // const validateActorMiddleware = container.resolve('validateActorMiddleware');

  // if (!nested && flags.nestedEndpoints) {
  //   router.use(jwt({ secret: jwtSecret }))
  //     .use(decryptTokenMiddleware)
  //     .use(validateActorMiddleware);
  // }
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
