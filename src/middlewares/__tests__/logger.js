const options = require('../../config');
const containerResolver = require('../../diConfiguration');

describe('check logger instance', () => {
  const conatiner = containerResolver(options);
  const loggerMiddleware = conatiner.resolve('loggerMiddleware');
  it('logger passed to ctx', async () => {
    const ctx = {
      state: {},
      request: {
        method: 'test',
        path: 'logger_middleware_test',
      },
    };
    const next = async () => { ctx.state = true; };

    await loggerMiddleware(ctx, next);
    expect(ctx.state).toBe(true);
  });
});
