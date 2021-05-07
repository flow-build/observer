const uuid = require('uuid');
const path = require('path');
const options = require('../../../config');
const containerResolver = require('../../../diConfiguration');
const { ValidationException } = require('../../../exceptions');

describe('test activity validators', () => {
  const validatorInstance = containerResolver(options,
    path.resolve(__dirname, '..', '..', '..'))
    .resolve('activityValidator');
  describe('get activities', () => {
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
      expect(() => validatorInstance.getActivities(dto))
        .toThrowError(ValidationException);
    });

    it('correct params', () => {
      const dto = {
        actorId: uuid.v4(),
        status: 'started',
      };
      validatorInstance.getActivities(dto);
    });
  });

  describe('get activity by id', () => {
    it('invalid parameters', () => {
      const dto = {
        state: { user: {} },
        params: {
          activity_manager_id: '1234',
        },
        request: {
          query: { },
          body: { },
          headers: { },
        },
      };
      expect(() => validatorInstance.getActivityManagerById(dto))
        .toThrowError(ValidationException);
    });
    it('correct params', () => {
      const dto = {
        id: uuid.v4(),
      };
      validatorInstance.getActivityManagerById(dto);
    });
  });
});
