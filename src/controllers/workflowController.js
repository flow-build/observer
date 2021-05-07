const {
  formatError: {
    formatErrorToController,
  },
} = require('../exceptions');

function workflowController({
  workflowRepository: repo,
  loggerService: logger,
  workflowValidator: validator,
}) {
  async function getWorkflows(ctx, next) {
    try {
      const name = ctx.request.query.name
    || ctx.request.headers.name;
      const version = ctx.request.query.version
    || ctx.request.headers.version;

      const requestDTO = { name, version };
      validator.getWorkflows(requestDTO);
      const result = await repo.getWorkflows(requestDTO);

      ctx.body = result;
      ctx.status = 200;
      await next();
    } catch (err) {
      formatErrorToController(ctx, err, logger);
      logger.error('get workflows failed', err);
    }
  }

  async function getWorkflowById(ctx, next) {
    try {
      const { workflow_id: workflowId } = ctx.params;
      const version = ctx.request.query.version || ctx.request.headers.version;
      const requestDTO = { id: workflowId, version };
      validator.getWorkflowById(requestDTO);
      const result = await repo.getWorkflowsById(requestDTO);

      ctx.body = result;
      ctx.status = 200;
      await next();
    } catch (err) {
      formatErrorToController(ctx, err, logger);
      logger.error('get workflow by id failed', err);
    }
  }

  async function postWorkflow(ctx, next) {
    try {
      const requestDTO = ctx.request.body;
      validator.postWorkflow(requestDTO);
      const workflow = await repo.saveWorkflow(requestDTO);

      if (workflow) {
        ctx.body = workflow;
        ctx.status = 201;
        logger.info(`workflow ${workflow.id} -`
        + `${workflow.name} - ${workflow.version} published`);
      } else {
        const message = 'workflow not published correctly';
        ctx.body = message;
        ctx.staus = 400;

        logger.info(message);
      }

      await next();
    } catch (err) {
      logger.error('get workflow by id failed', err);
      formatErrorToController(ctx, err, logger);
      console.log({ body: ctx.body, err });
    }
  }
  return {
    getWorkflows,
    getWorkflowById,
    postWorkflow,
  };
}

module.exports = workflowController;
