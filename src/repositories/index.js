const workflow = require('./workflowRepository');
const process = require('./processRepository');
const activity = require('./activityRepository');

module.exports = {
  workflowRepository: workflow,
  processRepository: process,
  activityRepository: activity,
};
