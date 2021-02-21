const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const jwt = require('koa-jwt');

const processRouter = require('./process');
const activityRouter = require('./activity');
const workflowRouter = require('./workflow');

function generateRouter(container) {
  const router = new Router();

  const { jwtSecret } = container.resolve('webOptions');

  const controller = container.resolve('actorController');
  // const decryptTokenMiddleware = container.resolve('decryptTokenMiddleware');
  // const validateActorMiddleware = container.resolve('validateActorMiddleware');
  // router
  //   .get('/',
  //     jwt({ secret: jwtSecret }),
  //     decryptTokenMiddleware,
  //     validateActorMiddleware,
  //     controller.getActorData)
  //   .get('/:id', controller.getActorId)
  //   .post('/', bodyParser(), controller.incorporateUser);

  const flags = container.resolve('featureFlags');
  if (flags.nestedEndpoints) {
    const pRouter = processRouter(container, true);
    const aRouter = activityRouter(container, true);
    const wRouter = workflowRouter(container, true);
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
