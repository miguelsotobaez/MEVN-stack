const clientService  = require('../service/client.service');
const logger = require('../logger/api.logger');

class ClientController {

    async getClients() {
        logger.info('Controller: getClients')
        return await clientService.getClients();
    }

    async getClientById(id) {
        logger.info('Controller: getClientById', id)
        return await clientService.getClientById(id);
    }

    async createClient(client) {
        console.log(client);
        logger.info('Controller: createClient', client);
        return await clientService.createClient(client);
    }

    async updateClient(client) {
        logger.info('Controller: updateClient', client);
        return await clientService.updateClient(client);
    }

    async deleteClient(clientId) {
        logger.info('Controller: deleteClient', clientId);
        return await clientService.deleteClient(clientId);
    }
}
module.exports = new ClientController();