const BaseError = require('./baseException');

function formatErrorToController(ctx, exception, logger) {
  if (exception instanceof BaseError) {
    ctx.body = {
      error: {
        message: exception.message,
        ...exception,
      },
    };
    ctx.status = exception.code;
    ctx.status = exception.code;
  } else {
    logger.warning('unmappeed error');
    ctx.body = {
      error: {
        type: 'not_expected',
        code: 500,
        message: exception.message || 'error not expected',
      },
    };
    ctx.status = 500;
  }
}

module.exports = {
  formatErrorToController,
};
