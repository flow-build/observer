const options = require('../../config');
const containerResolver = require('../../diConfiguration');

const Logger = require('../LoggerService');

describe('check logger instance parrameters', () => {
  it('without params start as debug', () => {
    expect(() => new Logger())
      // eslint-disable-next-line max-len
      .toThrow("Cannot destructure property 'loggerOptions' of 'undefined' as it is undefined.");
  });

  it('without params start as debug', () => {
    expect(() => new Logger({
      loggerOptions: {
        logLevel: undefined,
      },
    })).toThrow('loggerOptions not Setted');
  });

  it('without params start as debug', () => {
    const logger = new Logger({ loggerOptions: { logLevel: 'INFO' } });
    expect(logger.logLevel).toBe('INFO');
  });
});

describe('check logger methods', () => {
  const logger = containerResolver(options).resolve('loggerService');
  it('execute debug', () => {
    try {
      logger.debug('hello');
    } catch (e) {
      expect(e).toBeNull();
    }
  });

  it('execute info', () => {
    try {
      logger.info('hello');
    } catch (e) {
      expect(e).toBeNull();
    }
  });

  it('execute warning', () => {
    try {
      logger.warning('hello');
    } catch (e) {
      expect(e).toBeNull();
    }
  });

  it('execute error', () => {
    try {
      logger.error(new Error('foo'));
    } catch (e) {
      expect(e).toBeNull();
    }
  });
});
