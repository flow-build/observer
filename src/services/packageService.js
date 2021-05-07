class PackageService {
  constructor({
    packageRepository,
    packageValidator,
    loggerService,
  }) {
    this.packageRepository = packageRepository;
    this.packageValidator = packageValidator;
    this.logger = loggerService;
  }

  async createPackage(pkg) {
    this.authValidator.createPackage(pkg);
    const result = await this.packageRepository.createPackage(pkg);
    return result;
  }

  async getPackages(filters) {
    this.authValidator.getPackages(filters);
    const result = await this.packageRepository.getPackages(filters);
    return result;
  }

  async getPackageById(id) {
    this.authValidator.packageId(id);
    const result = await this.packageRepository.getPackageById(id);
    return result;
  }

  async updatePackage(pkg) {
    this.authValidator.updatePackage(pkg);
    const result = await this.packageRepository.updatePackage(pkg);
    return result;
  }

  async disablePackage(id) {
    this.authValidator.packageId(id);
    const result = await this.packageRepository.disablePackage(id);
    return result;
  }
}

module.exports = PackageService;
