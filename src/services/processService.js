class ProcessService {
  constructor({
    processRepository,
    processValidator,
    loggerService,
  }) {
    this.processRepository = processRepository;
    this.processValidator = processValidator;
    this.logger = loggerService;
  }

  async createProcess(pkg) {
    this.authValidator.createProcess(pkg);
    const result = await this.processRepository.createProcess(pkg);
    return result;
  }

  async getProcesss(filters) {
    this.authValidator.getProcesss(filters);
    const result = await this.processRepository.getProcesss(filters);
    return result;
  }

  async getProcessById(id) {
    this.authValidator.processId(id);
    const result = await this.processRepository.getProcessById(id);
    return result;
  }

  async updateProcess(pkg) {
    this.authValidator.updateProcess(pkg);
    const result = await this.processRepository.updateProcess(pkg);
    return result;
  }

  async disableProcess(id) {
    this.authValidator.processId(id);
    const result = await this.processRepository.disableProcess(id);
    return result;
  }
}

module.exports = ProcessService;
