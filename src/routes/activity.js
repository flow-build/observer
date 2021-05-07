const Router = require('koa-router');
const jwt = require('koa-jwt');

function generateRouter(container, nested = false) {
  const router = new Router();

  // const flags = container.resolve('featureFlags');
  // const { jwtSecret } = container.resolve('webOptions');

  // const validateActorMiddleware = container.resolve('validateActorMiddleware');
  // if (!nested && flags.nestedEndpoints) {
  //   router.use(jwt({ secret: jwtSecret }))
  //     .use(validateActorMiddleware);
  // }
  const controller = container.resolve('activityController');

  router.get('/',
    controller.getActivities);
  router.get('/:id',
    controller.getActivityManagerById);

  return router;
}

module.exports = generateRouter;
