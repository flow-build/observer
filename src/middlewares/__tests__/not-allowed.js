const options = require('../../config');
const containerResolver = require('../../diConfiguration');

describe('check not allowed result', () => {
  const conatiner = containerResolver(options);
  const notAllowedMiddleware = conatiner.resolve('notAllowedMiddleware');
  it('check if not allowed result is instance error', () => {
    expect(notAllowedMiddleware()).toBeInstanceOf(Error);
  });

  it('check if not allowed result values', () => {
    const error = notAllowedMiddleware();
    expect(error.code).toBe(405);
    expect(error.status).toBe(405);
  });

  it('check if not allowed result mesage', () => {
    const error = notAllowedMiddleware();
    expect(error.message).toBe('method not allowed');
  });
});
