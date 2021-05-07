const {
  DependencyNotFoundException,
  DatabaseException,
} = require('../exceptions');

function workflowRepository({
  instanceService,
  loggerService: logger,
}) {
  if (!instanceService) {
    throw new DependencyNotFoundException('instance Service');
  }
  if (!logger) {
    throw new DependencyNotFoundException('logger Service');
  }
  const trx = instanceService.db;
  const { cockpit } = instanceService;

  async function getWorkflows({ name, version }) {
    try {
      const workflows = await trx.select({
        id: 'id',
        name: 'name',
        version: 'version',
        description: 'description',
        created_at: 'created_at',
      }).from('workflow')
        .where((builder) => {
          if (name) {
            builder.where('workflow.name', 'like', `%${name}%`);
          }
          if (version) {
            builder.andWhere('workflow.version', '=', version);
          }
        })
        .groupBy(['workflow.name'])
        .clearGroup();

      return workflows;
    } catch (err) {
      logger.error(err);
      throw new DatabaseException('get Workflows');
    }
  }

  async function getWorkflowsById({ id }) {
    try {
      const workflows = await trx.select('*')
        .from('workflow')
        .where('id', '=', id);

      return workflows;
    } catch (err) {
      logger.error(err);
      throw new DatabaseException('get Workflows By Id');
    }
  }

  async function saveWorkflow({
    name,
    description,
    blueprint_spec: blueprintSpec,
  }) {
    try {
      const result = await cockpit._engine.saveWorkflow(
        name,
        description,
        blueprintSpec,
      );

      return result.serialize();
    } catch (err) {
      logger.error(err);
      throw new DatabaseException('save Workflow');
    }
  }

  return {
    getWorkflows,
    getWorkflowsById,
    saveWorkflow,
  };
}
module.exports = workflowRepository;
