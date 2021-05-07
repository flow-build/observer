const options = require('../../config');
const containerResolver = require('../../diConfiguration');

const InstanceService = require('../instanceService');

describe('test construction', () => {
  it('without params', () => {
    expect(() => new InstanceService())
      .toThrow("Cannot destructure property 'instanceOptions' of 'undefined");
  });

  it('null instance Options', () => {
    expect(() => new InstanceService({
      instanceOptions: undefined,
    }))
      .toThrow('instanceOptions not Setted');
  });

  it('null instance Options', () => {
    expect(() => new InstanceService({
      instanceOptions: {
        persistMode: 'knex',
        databaseConnectionString: undefined,
        engineCryptoKey: '1234',
      },
    }))
      .toThrow('database Settings not Setted');
  });

  it('null instance Options', () => {
    expect(() => new InstanceService({
      instanceOptions: {
        persistMode: 'memory',
      },
    }))
      .toThrow('cockpit cryptoKey not Setted');
  });
});

describe('check methods', () => {
  const instanceService = containerResolver(options).resolve('instanceService');

  it('check cockpit', () => {
    // eslint-disable-next-line no-proto
    expect(instanceService.cockpit.__proto__.constructor.name).toBe('Cockpit');
  });

  it('check db', () => {
    // eslint-disable-next-line no-proto
    expect(instanceService.db.name).toBe('knex');
  });
});
