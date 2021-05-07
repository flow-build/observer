class WorkflowService {
  constructor({
    workflowRepository,
    workflowValidator,
    loggerService,
  }) {
    this.workflowRepository = workflowRepository;
    this.workflowValidator = workflowValidator;
    this.logger = loggerService;
  }

  async createWorkflow(pkg) {
    this.authValidator.createWorkflow(pkg);
    const result = await this.workflowRepository.createWorkflow(pkg);
    return result;
  }

  async getWorkflows(filters) {
    this.authValidator.getWorkflows(filters);
    const result = await this.workflowRepository.getWorkflows(filters);
    return result;
  }

  async getWorkflowById(id) {
    this.authValidator.workflowId(id);
    const result = await this.workflowRepository.getWorkflowById(id);
    return result;
  }

  async updateWorkflow(pkg) {
    this.authValidator.updateWorkflow(pkg);
    const result = await this.workflowRepository.updateWorkflow(pkg);
    return result;
  }

  async disableWorkflow(id) {
    this.authValidator.workflowId(id);
    const result = await this.workflowRepository.disableWorkflow(id);
    return result;
  }
}

module.exports = WorkflowService;
