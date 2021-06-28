const crudRepository  = require('../repository/crud.repository');

class ProviderService {

    constructor() {}

    async getProviders() {
        return await crudRepository.getProviders();
    }

    async getProviderById(id) {
        return await crudRepository.getProviderById(id);
    }

    async createProvider(provider) {
        return await crudRepository.createProvider(provider);
    }

    async updateProvider(provider) {
        return await crudRepository.updateProvider(provider);
    }

    async deleteProvider(providerId) {
        return await crudRepository.deleteProvider(providerId);
    }

}

module.exports = new ProviderService();