const { Cockpit, Engine } = require('@flowbuild/engine');
const Knex = require('knex');

class InstanceService {
  constructor({ instanceOptions }) {
    if (!instanceOptions) {
      throw new Error('instanceOptions not Setted');
    }

    const {
      persistMode,
      databaseConnectionString,
      engineCryptoKey,
    } = instanceOptions;
    if (persistMode === 'knex') {
      if (!databaseConnectionString) {
        throw new Error('database Settings not Setted');
      }
      this.db = Knex(databaseConnectionString);
    } else {
      this.db = null;
    }

    if (!engineCryptoKey) {
      throw new Error('cockpit cryptoKey not Setted');
    }
    this.cockpit = new Cockpit(persistMode, this.db);
    Engine.kill();
  }
}

module.exports = InstanceService;
