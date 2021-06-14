const configServices = require('./diConfiguration');
const configRoutes = require('./webConfiguration');
const settings = require('./settings');
const startup = require('./startup');

module.exports = {
  settings,
  configRoutes,
  configServices,
  startup,
};
