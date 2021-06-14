const Router = require('koa-router');
const jwt = require('koa-jwt');
const bodyParser = require('koa-bodyparser');

function generateRouter(container) {
  const router = new Router();

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
