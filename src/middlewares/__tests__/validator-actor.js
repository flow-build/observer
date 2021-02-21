const path = require('path');
const options = require('../../config');
const containerResolver = require('../../diConfiguration');

describe('check actor validation', () => {
  const _throw = (status, message) => {
    // eslint-disable-next-line no-throw-literal
    throw { status, message };
  };
  const next = async () => {};
  const logger = {
    error: (text) => text,
    info: (text) => text,
    debug: (text) => text,
  };
  const conatiner = containerResolver(options,
    path.resolve(__dirname, '..', '..'));
  const validateActor = conatiner.resolve('validateActorMiddleware');
  it('nulll actor', async () => {
    const ctx = {
      state: {
        logger,
      },
      throw: _throw,
    };
    try {
      await validateActor(ctx, next);
    } catch (e) {
      expect(e.code).toBe(401);
      expect(e.message).toBe('error on Authorization: User data not found');
    }
  });

  it('nulll actor', async () => {
    const ctx = {
      state: {
        logger,
        user: {},
      },
      throw: _throw,
    };
    try {
      await validateActor(ctx, next);
    } catch (e) {
      expect(e.code).toBe(401);
      expect(e.message).toBe('error on Authorization: Actor id not found');
    }
  });

  it('actor without claims', async () => {
    const ctx = {
      state: {
        logger,
        user: {
          actor_id: '123456',
        },
      },
      throw: _throw,
    };
    try {
      await validateActor(ctx, next);
    } catch (e) {
      expect(e.code).toBe(401);
      expect(e.message).toBe('error on Authorization: Invalid claims');
    }
  });

  it('actor without lendico-token', async () => {
    const ctx = {
      state: {
        logger,
        user: {
          actor_id: '123456',
          claims: ['test'],
        },
      },
      throw: _throw,
    };
    await validateActor(ctx, next);

    expect(ctx.state.actor_data).toEqual({
      actor_id: '123456',
      claims: ['test'],
      lendico_token: null,
    });
  });

  it('actor without lendico-token', async () => {
    const ctx = {
      state: {
        logger,
        user: {
          actor_id: '123456',
          claims: ['test'],
          lendico_token: 'token',
        },
      },
      throw: _throw,
    };
    await validateActor(ctx, next);

    expect(ctx.state.actor_data).toEqual({
      actor_id: '123456',
      claims: ['test'],
      lendico_token: 'token',
    });
  });
});
