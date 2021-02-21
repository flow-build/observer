const options = require('../../config');
const containerResolver = require('../../diConfiguration');

describe('test healthcheckMiddleware', () => {
  const conatiner = containerResolver(options);
  const healthCheckMiddleware = conatiner.resolve('healthCheckMiddleware');
  it('check default value from health-check', async () => {
    const ctx = {
    };
    const next = async () => {
    };
    await healthCheckMiddleware(ctx, next);

    expect(ctx.body).toBe('Lendico Cockpit');
    expect(ctx.status).toBe(200);
  });

  it('checking if next works correctly', async () => {
    const ctx = {
    };
    const next = async () => {
      ctx.status = 400;
      ctx.body = {
        message: 'next result',
      };
    };

    await healthCheckMiddleware(ctx, next);

    expect(ctx.body.message).toBe('next result');
    expect(ctx.status).toBe(400);
  });
});
