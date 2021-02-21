/* eslint-disable no-param-reassign */
const {
  DependencyNotFoundException,
  DatabaseException,
} = require('../exceptions');

function activityRepository({
  instanceService,
  loggerService: logger,
}) {
  if (!instanceService) {
    throw new DependencyNotFoundException('instance Service');
  }
  if (!logger) {
    throw new DependencyNotFoundException('logger Service');
  }
  const { db: trx } = instanceService;

  async function getActivityManagersByActorId({ actorId, status }) {
    try {
      const activityManager = await trx.select('*')
        .from('user_activity_manager')
        .leftJoin('activity_manager',
          'activity_manager.id',
          'user_activity_manager.activity_manager_id')
        .leftJoin('process_state',
          'process_state.id',
          'activity_manager.process_state_id')
        .where((builder) => {
          builder.where('user_activity_manager.user_id', '=', actorId);
          if (status) {
            builder.andWhere('activity_manager.status', '=', status);
          }
        })
        .first();

      if (activityManager) {
        const activities = await trx.select('*')
          .from('activity')
          .where((builder) => builder.where(
            'activity.activity_manager_id',
            '=',
            activityManager.id,
          ));
        activities.map((activity) => delete activity.activity_manager_id);
        activityManager.activities = activities;
      }
      return activityManager;
    } catch (err) {
      logger.error(err);
      throw new DatabaseException('get Activity Manager by Actor');
    }
  }

  async function getActivityManagerById({ id }) {
    try {
      const activityManager = await trx.select('*')
        .from('activity_manager')
        .where((builder) => {
          builder.where('activity_manager_id', '=', id);
        }).first();

      if (activityManager) {
        const activities = await trx.select('*')
          .from('activity')
          .where(
            'activity.activity_manager_id',
            '=',
            activityManager.id,
          );
        activities.map((activity) => delete activity.activity_manager_id);
        activityManager.activities = activities;
      }

      return activityManager;
    } catch (err) {
      logger.error(err);
      throw new DatabaseException('get Activity Manager by Id');
    }
  }

  return {
    getActivityManagersByActorId,
    getActivityManagerById,
  };
}

module.exports = activityRepository;
