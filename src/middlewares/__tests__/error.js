const options = require('../../config');
const containerResolver = require('../../diConfiguration');

describe('check default results from error middleware', () => {
  const ctx = {
    request: {
      method: 'POST',
      path: '/foo',
    },
  };
  const conatiner = containerResolver(options);
  const errorMiddleware = conatiner.resolve('errorMiddleware');
  const next = async () => { throw new Error('new message'); };
  it('default values', async done => {
    await errorMiddleware(ctx, next);

    expect(ctx.status).toBe(500);
    expect(ctx.body.error.code).toBe(500);
    expect(ctx.body.error.message).toBe('new message');
    await done();
  });

  it('error without body', async done => {
    await errorMiddleware(ctx, async () => { throw new Error(); });

    expect(ctx.status).toBe(500);
    expect(ctx.body.error.code).toBe(500);
    await done();
  });
});
