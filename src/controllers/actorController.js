const jwt = require('jsonwebtoken');

const {
  formatError: {
    formatErrorToController,
  },
} = require('../exceptions');

function ActorController({
  cryptoService,
  webOptions,
  loggerService: logger,
}) {
  const { jwtSecret } = webOptions;

  async function incorporateUser(ctx, next) {
    try {
      const actor = ctx.request.body;

      const encryptedPayload = cryptoService.encryptPayload(actor);

      const token = jwt.sign({ payload: encryptedPayload }, jwtSecret);
      ctx.body = {
        token,
      };
      ctx.status = 200;
      await next();
    } catch (err) {
      formatErrorToController(ctx, err, logger);

      ctx.status = 400;
      ctx.body = {
        error: {
          message: err.message,
          code: 400,
        },
      };
      logger.error('post actor failed', err);
    }
  }

  async function getActorData(ctx, next) {
    try {
      const actor = ctx.state.user;

      ctx.body = actor;
      ctx.status = 200;
      await next();
    } catch (err) {
      formatErrorToController(ctx, err, logger);

      logger.error('decrypt actor failed', err);
    }
  }

  async function getActorId(ctx, next) {
    try {
      const { id } = ctx.params;

      ctx.state.user = {
        actor_id: id,
        claims: [],
      };
      ctx.status = 200;

      await next();
    } catch (err) {
      logger.error('list activities by actor id failed', err);
      formatErrorToController(ctx, err, logger);
    }
  }

  return {
    getActorId,
    getActorData,
    incorporateUser,
  };
}
module.exports = ActorController;
