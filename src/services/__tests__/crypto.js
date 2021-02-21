const options = require('../../config');
const containerResolver = require('../../diConfiguration');

const CryptoService = require('../cryptoService');

describe('test construction', () => {
  const crypto = containerResolver(options).resolve('cryptoService');
  it('encrypt payload', () => {
    const encrypted = crypto.encryptPayload({
      test: 'true',
    });
    expect(encrypted).toBe('8hpzIXJuwigODp9jpvuGvg==');
  });

  it('decrypt payload', () => {
    const decrypted = crypto.decryptPayload('8hpzIXJuwigODp9jpvuGvg==');
    expect(decrypted).toEqual({
      test: 'true',
    });
  });

  it('decrypt not json payload', () => {
    const encrypted = crypto.encryptPayload('<body>teste: invalid json</body>');
    const decrypted = crypto.decryptPayload(encrypted);
    expect(decrypted).toEqual('<body>teste: invalid json</body>');
  });
});

describe('invalid params', () => {
  const loggerService = containerResolver(options).resolve('loggerService');
  it('invalid cryptoKey', () => {
    expect(() => new CryptoService({
      cryptoOptions: {
        cryptoKey: undefined,
        cryptoIV: '18c4685fd4a5fd13',
      },
      loggerService,
    })).toThrow('cryptoKey not Setted');
  });

  it('invalid cryptoIV', () => {
    expect(() => new CryptoService({
      cryptoOptions: {
        cryptoKey: '1234',
        cryptoIV: undefined,
      },
      loggerService,
    })).toThrow('cryptoIV not Setted');
  });

  it('invalid cryptoIV', () => {
    expect(() => new CryptoService({
      cryptoOptions: {
        cryptoKey: '1234',
        cryptoIV: '1234',
      },
      loggerService: undefined,
    })).toThrow('logger Service not Setted');
  });
});
