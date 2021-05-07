const path = require('path');
const options = require('../../../config');
const containerResolver = require('../../../diConfiguration');

describe('test workflow validators', () => {
  const validatorInstance = containerResolver(options,
    path.resolve(__dirname, '..', '..', '..'))
    .resolve('workflowValidator');
  describe('get workflows', () => {
    it('invalid parameters', () => {
      const dto = {
        request: {
          query: { },
          body: {},
          headers: {
          },
        },
      };
      expect(() => validatorInstance.getWorkflows(dto))
        .toThrow();
    });

    it('correct params', () => {
      const dto = {
        name: 'workflow_name_test',
        version: 1,
      };
      validatorInstance.getWorkflows(dto);
    });
  });

  describe('get workflow by id', () => {
    it('invalid parameters', () => {
      const dto = {
        params: {
          workflow_id: '1234',
        },
        request: {
          query: { },
          body: { },
          headers: { },
        },
      };
      expect(() => validatorInstance.getWorkflowById(dto))
        .toThrow();
    });
    it('correct params', () => {
      const dto = { id: '6c187cc9-b420-4561-89e1-a45017926e5d' };
      validatorInstance.getWorkflowById(dto);
    });
  });

  describe('post workflow', () => {
    it('only name parameter', () => {
      const dto = {
        params: {},
        request: {
          query: { },
          body: { name: 'correct' },
          headers: { },
        },
      };
      expect(() => validatorInstance.postWorkflow(dto))
        .toThrow();
    });
    it('incomplete blueprint_spec', () => {
      const dto = {
        params: {},
        request: {
          query: { },
          body: {
            name: 'correct',
            description: 'correct description',
            blueprint_spec: {},
          },
          headers: { },
        },
      };
      expect(() => validatorInstance.postWorkflow(dto))
        .toThrow();
    });
    it('correct params', () => {
      const dto = {
        name: 'correct',
        description: 'correct description',
        blueprint_spec: {
          nodes: [],
          lanes: [],
          prepare: [],
          environment: {},
          requirements: [],
        },
      };
      validatorInstance.postWorkflow(dto);
    });
  });
});
