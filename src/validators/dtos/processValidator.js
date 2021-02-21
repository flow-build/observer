const { ValidationException } = require('../../exceptions');
const validator = require('./base-validator');

function processValidator({
  loggerService: logger,
}) {
  function getProcesses(dto) {
    const validationError = validator({
      type: 'object',
      properties: {
        actorId: {
          type: 'string',
          format: 'uuid',
        },
        processStatus: {
          type: 'string',
        },
        startDate: {
          type: 'string',
          format: 'date',
        },
        finishDate: {
          type: 'string',
          format: 'date',
        },
        workflowName: { type: 'string' },
      },
      required: ['actorId'],
      additionalProperties: false,
    }, dto);

    if (validationError) {
      logger.debug(`error on get processes by actor validation:
        ${JSON.stringify(validationError)}`);
      throw new ValidationException('get Processes',
        validationError.errors);
    }
  }

  function getProcessById(dto) {
    const validationError = validator({
      type: 'object',
      properties: {
        id: {
          type: 'string',
          format: 'uuid',
        },
      },
      required: ['id'],
      additionalProperties: false,
    }, dto);

    if (validationError) {
      logger.debug(`error on get process validation:
      ${JSON.stringify(validationError)}`);
      throw new ValidationException('get Process by ID',
        validationError.errors);
    }
  }
  return {
    getProcesses,
    getProcessById,
  };
}

module.exports = processValidator;
