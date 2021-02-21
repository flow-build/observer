function healthCheckMiddleware() {
  async function middleware(ctx, next) {
    ctx.body = 'Lendico Cockpit';
    ctx.status = 200;
    await next();
  }
  return middleware;
}

module.exports = healthCheckMiddleware;
