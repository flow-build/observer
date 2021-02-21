const BaseException = require('./baseException');

class RequestException extends BaseException {
  constructor(message, error) {
    // eslint-disable-next-line max-len
    const customMessage = `error on Request: ${message}`;
    super(customMessage, error);
    this.code = error.body.error.code || 400;
    this.type = error.body.error.type || 'Authorization';
  }
}

module.exports = RequestException;
