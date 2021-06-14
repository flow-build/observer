const cryptoOptions = {
  cryptoIV: process.env.JWT_ENCRYPT_IV,
  cryptoKey: process.env.JWT_ENCRYPT_KEY,
};

const instanceOptions = {
  engineCryptoKey: process.env.ENGINE_CRYPTO_KEY,
  databaseConnectionString: process.env.WORKFLOW_DATABASE_CONNECTION_STRING,
  persistMode: process.env.PERSIST_MODE || 'knex',
  missionControlSecretKey: process.env.FLOWBUILD_SECRET_KEY,
};

const loggerOptions = {
  logLevel: process.env.LOG_LEVEL || 'DEBUG',
};

const featureFlags = {
  activityManagerCacheable: process.env.ACTIVITY_MANAGER_FLAG || true,
  processCacheable: process.env.PROCESS_CACHE_FLAG || false,
  nestedEndpoints: process.env.NESTED_ENDPOINTS_FLAG || true,
};

const webOptions = {
  jwtSecret: process.env.JWT_KEY || '1234',
  port: process.env.PORT || 3100,
};

const options = {
  cryptoOptions,
  instanceOptions,
  featureFlags,
  loggerOptions,
  webOptions,
};

module.exports = options;
