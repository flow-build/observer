const packageRouter = require('./package');
const processRouter = require('./process');
const workflowRouter = require('./workflow');
const healthCheckRouter = require('./health-check');
const actorRouter = require('./actor');
const activityRouter = require('./activity');

function getRouters(container) {
  const healtCheck = healthCheckRouter(container);
  const packages = packageRouter(container).prefix('/packages');
  const process = processRouter(container).prefix('/processes');
  const workflow = workflowRouter(container).prefix('/workflows');
  const actor = actorRouter(container).prefix('/actors');
  const activity = activityRouter(container).prefix('/activities');
  return [
    healtCheck,
    packages,
    process,
    workflow,
    actor,
    activity,
  ];
}

module.exports = getRouters;
