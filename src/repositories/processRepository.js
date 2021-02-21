const {
  DependencyNotFoundException,
  DatabaseException,
} = require('../../domain/exceptions');

function processRepository({
  instanceService,
  loggerService: logger,
}) {
  const trx = instanceService.db;
  const { cockpit } = instanceService;

  async function getCurrentStateByProcess(processId) {
    try {
      const currentState = await trx.select('process_state.*')
        .from('process')
        .innerJoin('process_state', 'process_state.id', 'current_state_id')
        .where('process.id', processId)
        .first();

      return currentState;
    } catch (err) {
      logger.error(err);
      throw new DatabaseException('get Current State By Process');
    }
  }

  async function getprocessesIdsByActor({
    actorId,
    workflowName,
    startDate,
    finishDate,
    processStatus,
  }) {
    try {
    // this query need to be raw because knex cant accept queries inside jsonb
      let rawSelectString = 'SELECT distinct(ps.process_id)'
  + 'FROM process_state AS ps'
  + 'LEFT JOIN process AS p on p.id = ps.process_id'
  + 'LEFT JOIN workflow as w on w.id = w.workflow_id'
  + `WHERE w.name like '${workflowName}%'`
  + `AND p.created_at BETWEEN '${startDate}' AND '${finishDate}'
  + 'AND bag->>'creatorId'='${actorId}`;

      if (processStatus) {
        rawSelectString += `AND p.status = '${processStatus}'`;
      }

      const content = await trx.raw(rawSelectString);

      const processIds = content.rows.map((rows) => rows.process_id);

      return processIds;
    } catch (err) {
      logger.error(err);
      throw new DatabaseException('get processes Ids By Actor');
    }
  }

  async function getProcessesByActorId({
    actorId,
    workflowName,
    startDate,
    finishDate,
    processStatus,
  }) {
    const processIds = await getprocessesIdsByActor({
      actorId,
      workflowName,
      startDate,
      finishDate,
      processStatus,
    });

    try {
      const processes = await trx.select({
        workflow_name: 'workflow.name',
        workflow_id: 'workflow.id',
        created_at: 'process.created_at',
        id: 'process.id',
        current_status: 'process.current_status',
      })
        .from('process')
        .leftJoin('workflow',
          'process.workflow_id',
          'workflow.id')
        .where('process.id', processIds)
        .orderBy('process.created_at');

      const states = processes.map(async (process) => {
        const state = await getCurrentStateByProcess(process.id);
        return { ...process, state };
      });
      const result = Promise.all(states);
      return result;
    } catch (err) {
      logger.error(err);
      throw new DatabaseException('get Processes By Actor Id');
    }
  }

  async function getProcessById({ id }) {
    try {
      const process = await trx.select({
        workflow_name: 'workflow.name',
        workflow_id: 'workflow.id',
        process_created_at: 'process.created_at',
        process_id: 'process.id',
        process_status: 'process.current_status',
      })
        .from('process')
        .leftJoin('process_state as current_state', (builder) => {
          builder.on('current_state.id', '=', 'process.current_state_id');
        })
        .leftJoin('workflow', 'workflow.id', 'process.workflow_id')
        .where('process.id', '=', id)
        .first()
        .transacting(trx);
      if (process) {
        process.state = await getCurrentStateByProcess(id);
      }

      return process;
    } catch (err) {
      logger.error(err);
      throw new DatabaseException('get Process By Id');
    }
  }

  async function getprocessHistoryById({ id }) {
    try {
      const processes = await cockpit.getProcessStateHistory(id);
      return processes;
    } catch (err) {
      logger.error(err);
      throw new DatabaseException('get process History By Id');
    }
  }
  return {
    getProcessesByActorId,
    getProcessById,
    getprocessHistoryById,
  };
}

module.exports = processRepository;
