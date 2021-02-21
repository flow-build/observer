const {
  formatError: {
    formatErrorToController,
  },
} = require('../../domain/exceptions');

function ActivityController({
  activityValidator: validator,
  activityRepository: repo,
  loggerService: logger,
}) {
  async function getActivities(ctx, next) {
    const { actor_id: actorId } = ctx.state.user;
    const status = ctx.request.query.status || ctx.request.headers.status;
    const requestDTO = { actorId, status };
    try {
      validator.getActivities(requestDTO);
      const acms = await repo.getActivityManagersByActorId(requestDTO);

      ctx.body = acms;
      ctx.status = 200;

      await next();
    } catch (err) {
      formatErrorToController(ctx, err, logger);
      logger.error('error on get activity managers', err);
    }
  }

  async function getActivityManagerById(ctx, next) {
    const { activity_manager_id: id } = ctx.params;
    const requestDTO = { id };
    try {
      validator.getActivityManagerById(requestDTO);
      const activityManager = await repo.getActivityManagerById(requestDTO);

      ctx.body = activityManager;
      ctx.status = 200;

      await next();
    } catch (err) {
      formatErrorToController(ctx, err, logger);
      logger.error(
        `error on get activity managers by id: ${requestDTO.id}`,
        err,
      );
    }
  }

  return {
    getActivityManagerById,
    getActivities,
  };
}
module.exports = ActivityController;
