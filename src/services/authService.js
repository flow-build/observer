class AuthService {
  constructor({
    userRepository,
    authValidator,
    loggerService,
  }) {
    this.userRepository = userRepository;
    this.authValidator = authValidator;
    this.logger = loggerService;
  }

  async createUser(user) {
    this.authValidator.createUser(user);
    const result = await this.userRepository.createUser(user);
    return result;
  }

  async getUsers(filters) {
    this.authValidator.getUsers(filters);
    const result = await this.userRepository.getUsers(filters);
    return result;
  }

  async getUserById(id) {
    this.authValidator.userId(id);
    const result = await this.userRepository.getUserById(id);
    return result;
  }

  async updateUser(user) {
    this.authValidator.updateUser(user);
    const result = await this.userRepository.updateUser(user);
    return result;
  }

  async disableUser(id) {
    this.authValidator.userId(id);
    const result = await this.userRepository.disableUser(id);
    return result;
  }
}

module.exports = AuthService;
