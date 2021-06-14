const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const jwt = require('koa-jwt');

const processRouter = require('./process');
const activityRouter = require('./activity');
const workflowRouter = require('./workflow');

function generateRouter(container) {
  const router = new Router();

  const controller = container.resolve('actorController');
  const flags = container.resolve('featureFlags');
  if (flags.nestedEndpoints) {
    const pRouter = processRouter(container);
    const aRouter = activityRouter(container);
    const wRouter = workflowRouter(container);
    router.use(
      '/:id/processes',
      controller.getActorId,
      pRouter.routes(),
      pRouter.allowedMethods(),
    )
      .use(
        '/:id/activities',
        controller.getActorId,
        aRouter.routes(),
        aRouter.allowedMethods(),
      )
      .use(
        '/:id/workflows',
        controller.getActorId,
        wRouter.routes(),
        wRouter.allowedMethods(),
      );
  }

  return router;
}

module.exports = generateRouter;
