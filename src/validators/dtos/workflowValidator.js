const { ValidationException } = require('../../exceptions');
const validator = require('./base-validator');

function workflowValidator({
  loggerService: logger,
}) {
  function getWorkflows(dto) {
    const validationError = validator({
      type: 'object',
      properties: {
        name: { type: 'string' },
        version: { type: 'number' },
      },
      required: [],
      additionalProperties: false,
    }, dto);

    if (validationError) {
      logger.debug(`error on get workflows validation
      ${JSON.stringify(validationError.errors)}`);
      throw new ValidationException('get Workflows', validationError.errors);
    }
  }

  function getWorkflowById(dto) {
    logger.debug(`workflow get id:${dto.id}`);
    const validationError = validator({
      type: 'object',
      properties: {
        id: {
          type: 'string',
          format: 'uuid',
        },
        version: { type: 'number' },
      },
      required: ['id'],
      additionalProperties: false,
    }, dto);

    if (validationError) {
      logger.debug(`error on get workflow by id validation:
        ${JSON.stringify(validationError.errors)}`);
      throw new ValidationException('get Workflow By id',
        validationError.errors);
    }
  }

  function postWorkflow(dto) {
    const validationError = validator({
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        blueprint_spec: {
          type: 'object',
          properties: {
            nodes: { type: 'array' },
            lanes: { type: 'array' },
            prepare: { type: 'array' },
            environment: { type: 'object' },
            requirements: { type: 'array' },
          },
          aditionalProperties: false,
          required: ['nodes',
            'lanes',
            'prepare',
            'environment',
            'requirements'],
        },
      },
      required: ['name', 'description', 'blueprint_spec'],
      additionalProperties: false,
    }, dto);

    if (validationError) {
      logger.debug(`error on get post workflow validation:
        ${JSON.stringify(validationError.errors)}`);
      throw new ValidationException('post Workflow', validationError.errors);
    }
  }

  return {
    getWorkflows,
    getWorkflowById,
    postWorkflow,
  };
}

module.exports = workflowValidator;
