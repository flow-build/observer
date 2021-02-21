const axios = require('axios');

class ProcessService {
  constructor({
    loggerService,
  }) {
    this.axios = axios.default;
    this.logger = loggerService;
  }

  /**
   *
   * @param {String} path
   * @param {axios.AxiosRequestConfig} config
   */
  async get(path, config) {
    try {
      const response = await this.axios.get(path, config);
      return response;
    } catch (err) {
      throw new Error();
    }
  }

  async post(filters) {
    this.authValidator.getProcesss(filters);
    const result = await this.processRepository.getProcesss(filters);
    return result;
  }

  async put(id) {
    this.authValidator.processId(id);
    const result = await this.processRepository.getProcessById(id);
    return result;
  }

  async patch(pkg) {
    this.authValidator.updateProcess(pkg);
    const result = await this.processRepository.updateProcess(pkg);
    return result;
  }

  async delete(id) {
    this.authValidator.processId(id);
    const result = await this.processRepository.disableProcess(id);
    return result;
  }
}

module.exports = ProcessService;
