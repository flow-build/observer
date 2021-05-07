const Router = require('koa-router');
const jwt = require('koa-jwt');
const bodyParser = require('koa-bodyparser');

function generateRouter(container, nested = false) {
  const router = new Router();

  // const flags = container.resolve('featureFlags');
  // const { jwtSecret } = container.resolve('webOptions');

  // const authorizationMiddleware = container.resolve('authorizationMiddleware');
  // const validateActorMiddleware = container.resolve('validateActorMiddleware');
  // router.use(authorizationMiddleware);
  // if (!nested && flags.nestedEndpoints) {
  //   router.use(jwt({ secret: jwtSecret }))
  //     .use(validateActorMiddleware);
  // }
  const controller = container.resolve('workflowController');
  router.get('/',
    controller.getWorkflows)
    .get('/:workflow_id',
      controller.getWorkflowById)
    .post('/',
      bodyParser(),
      controller.postWorkflow);

  return router;
}

module.exports = generateRouter;
