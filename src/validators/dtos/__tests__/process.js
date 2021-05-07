const uuid = require('uuid');
const path = require('path');

const options = require('../../../config');
const containerResolver = require('../../../diConfiguration');

describe('test process validators', () => {
  const validatorInstance = containerResolver(options,
    path.resolve(__dirname, '..', '..', '..'))
    .resolve('processValidator');

  describe('get process', () => {
    it('invalid parameters', () => {
      const dto = {
        state: { user: {} },
        request: {
          query: { name: 'workflow_name_test', version: '1' },
          body: {},
          headers: {
          },
        },
      };
      expect(() => validatorInstance.getProcesses(dto))
        .toThrow();
    });

    it('correct params', () => {
      const dto = {
        actorId: uuid.v4(),
        workflowName: 'workflow_name_test',
      };
      validatorInstance.getProcesses(dto);
    });
  });

  describe('get process by id', () => {
    it('invalid parameters', () => {
      const dto = {
        state: { user: {} },
        params: {
          process_id: '1234',
        },
        request: {
          query: { },
          body: { },
          headers: { },
        },
      };
      expect(() => validatorInstance.getProcessById(dto))
        .toThrow();
    });
    it('correct params', () => {
      const dto = { id: '6c187cc9-b420-4561-89e1-a45017926e5d' };
      validatorInstance.getProcessById(dto);
    });
  });
});
