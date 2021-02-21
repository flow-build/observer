const options = require('../../config');
const containerResolver = require('../../diConfiguration');

describe('check default results from middleware', () => {
  const ctx = {
    state: {
      logger: {
        info: (text) => text,
        debug: (text) => text,
        warning: (text) => text,
        error: (message, err) => ({ message, err }),
      },
    },
  };

  const conatiner = containerResolver(options);
  const notImplementedMiddleware = conatiner
    .resolve('notImplementedMiddleware');
  it('check default result', async () => {
    await notImplementedMiddleware(ctx);

    expect(ctx.body.error.message).toBe('request method not implemented');
    expect(ctx.body.error.code).toBe(501);
    expect(ctx.status).toBe(501);
  });
});
