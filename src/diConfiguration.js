const awilix = require('awilix');
const path = require('path');

function loadModules(container, basePath) {
  container.loadModules([
    'controllers/*.js',
    'services/*.js',
    'repositories/*.js',
    'validators/dtos/*.js',
    'middlewares/*.js',
  ],
  {
    formatName: 'camelCase',
    cwd: basePath,
    resolverOptions: {
      lifetime: awilix.Lifetime.SINGLETON,
      register: awilix.asClass,
    },
  });
}
function setupContainerValues(container, options) {
  const {
    featureFlags,
    cryptoOptions,
    instanceOptions,
    loggerOptions,
    webOptions,
  } = options;
  container.register(
    'featureFlags', awilix.asValue(featureFlags),
  );
  container.register(
    'cryptoOptions', awilix.asValue(cryptoOptions),
  );
  container.register(
    'instanceOptions', awilix.asValue(instanceOptions),
  );
  container.register(
    'loggerOptions', awilix.asValue(loggerOptions),
  );
  container.register(
    'webOptions', awilix.asValue(webOptions),
  );
}

function setup(options) {
  const container = awilix.createContainer();

  setupContainerValues(container, options);

  const domainPath = path.resolve(__dirname, '..', 'domain');
  // load domain modules
  loadModules(container, domainPath);
  // lload observer modules
  loadModules(container, __dirname);
  return container;
}

module.exports = setup;
