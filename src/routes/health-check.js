const Router = require('koa-router');

function generateRouter(container) {
  const router = new Router();

  const healthCheck = container.resolve('healthCheckMiddleware');
  router.get('/', healthCheck)
    .get('/health-check', healthCheck);

  return router;
}

module.exports = generateRouter;
