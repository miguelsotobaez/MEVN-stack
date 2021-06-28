const providerService  = require('../service/provider.service');
const logger = require('../logger/api.logger');

class ProviderController {

    async getProviders() {
        logger.info('Controller: getProviders')
        return await providerService.getProviders();
    }

    async getProviderById(id) {
        logger.info('Controller: getProviderById', id)
        return await providerService.getProviderById(id);
    }

    async createProvider(provider) {
        logger.info('Controller: createProvider', provider);
        return await providerService.createProvider(provider);
    }

    async updateProvider(provider) {
        logger.info('Controller: updateProvider', provider);
        return await providerService.updateProvider(provider);
    }

    async deleteProvider(providerId) {
        logger.info('Controller: deleteProvider', providerId);
        return await providerService.deleteProvider(providerId);
    }
}
module.exports = new ProviderController();