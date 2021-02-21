const options = require('../../config');
const containerResolver = require('../../diConfiguration');

describe('check decryption on middleware', () => {
  const conatiner = containerResolver(options);
  const decryptTokenMiddleware = conatiner.resolve('decryptTokenMiddleware');
  const cryptoService = conatiner.resolve('cryptoService');

  it('check default decryption', async () => {
    const uncryptedUser = { actor_id: '1234', claims: [] };
    const encryptedPayload = cryptoService.encryptPayload(uncryptedUser);
    const ctx = {
      state: {
        user: {
          payload: encryptedPayload,
        },
      },
    };
    await decryptTokenMiddleware(ctx, async () => {});

    expect(ctx.state.user).toStrictEqual(uncryptedUser);
  });
});
