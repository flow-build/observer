const Router = require('koa-router');
const jwt = require('koa-jwt');

function generateRouter(container) {
  const router = new Router();

  const controller = container.resolve('activityController');

  router.get('/',
    controller.getActivities);
  router.get('/:id',
    controller.getActivityManagerById);

  return router;
}

module.exports = generateRouter;
