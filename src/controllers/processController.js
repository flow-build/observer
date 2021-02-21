const {
  formatError: {
    formatErrorToController,
  },
} = require('../exceptions');

function processController({
  processRepository: repo,
  loggerService: logger,
  processValidator: validator,
}) {
  async function getProcesses(ctx, next) {
    const { actor_id: actorId } = ctx.state.user;
    const processStatus = ctx.request.query.status
    || ctx.request.headers.status;

    const startDate = ctx.request.query.date_start
    || ctx.request.headers.date_start;

    const finishDate = ctx.request.query.date_end
    || ctx.request.headers.date_end;

    const workflowName = ctx.request.query.workflow_name
    || ctx.request.headers.workflow_name;

    const requestDTO = {
      actorId,
      processStatus,
      startDate,
      finishDate,
      workflowName,
    };
    try {
      validator.getProcesses(requestDTO);

      const processes = await repo.getProcessesByActorId(requestDTO);

      if (processes) {
        ctx.body = processes;
        ctx.status = 200;
      } else {
        const message = `processes not found by actor id: 
        ${ctx.request.body.actorId}`;
        ctx.body = message;
        ctx.staus = 204;

        logger.info(message);
      }

      await next();
    } catch (err) {
      formatErrorToController(ctx, err, logger);

      logger.error('error on get processes', err);
    }
  }

  async function getProcessById(ctx, next) {
    const { process_id: id } = ctx.params;
    const requestDTO = { id };

    try {
      validator.getProcessById(requestDTO);
      const process = await repo.getProcessById(requestDTO);

      if (process) {
        ctx.body = process;
        ctx.status = 200;
      } else {
        const message = `process: ${ctx.request.body.id} not found`;
        ctx.body = message;
        ctx.staus = 204;

        logger.info(message);
      }

      await next();
    } catch (err) {
      formatErrorToController(ctx, err, logger);

      logger.error('error on get process by id', err);
    }
  }

  async function getProcessHistoryById(ctx, next) {
    try {
      const processStates = await repo.getprocessHistoryById(ctx.request.body);

      if (processStates) {
        ctx.body = processStates;
        ctx.status = 200;
      } else {
        const message = `states not found from process: ${ctx.request.body.id}`;
        ctx.body = message;
        ctx.staus = 204;

        logger.info(message);
      }

      await next();
    } catch (err) {
      formatErrorToController(ctx, err, logger);

      logger.error('error on get processes', err);
    }
  }
  return {
    getProcesses,
    getProcessById,
    getProcessHistoryById,
  };
}

module.exports = processController;
