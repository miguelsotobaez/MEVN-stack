const crudRepository  = require('../repository/crud.repository');

class ClientService {

    constructor() {}

    async getClients() {
        return await crudRepository.getClients();
    }

    async getClientById(id) {
        return await crudRepository.getClientById(id);
    }

    async createClient(client) {
        return await crudRepository.createClient(client);
    }

    async updateClient(client) {
        return await crudRepository.updateClient(client);
    }

    async deleteClient(clientId) {
        return await crudRepository.deleteClient(clientId);
    }

}

module.exports = new ClientService();