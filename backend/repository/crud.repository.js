const { connect, disconnect } = require('../config/db.config');
const { Client } = require('../model/client.model');
const { Provider } = require('../model/provider.model');
const logger = require('../logger/api.logger');

class CRUDRepository {

    constructor() {
        connect();
    }

    async getClients() {
        const clients = await Client.find({});
        console.log('clients:::', clients);
        return clients;
    }

    async getClientById(id) {
        const client = await Client.find({_id: id});
        console.log('client:::', client);
        return client;
    }

    async createClient(client) {
        let data = {};
        console.log(client);
        try {
            data = await Client.create(client);
            await Provider.updateMany({ '_id': data.providers }, { $push: { clients: data._id } });
        } catch(err) {
            console.log(err);
            logger.error('Error::' + err);
        }
        return data;
    }

    async updateClient(client) {
        let data = {};
        try {
            data = await Client.updateOne({ _id: client.id }, client);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async deleteClient(clientId) {
        let data = {};
        try {
            data = await Client.deleteOne({_id : clientId});
        } catch(err) {
            logger.error('Error::' + err);
        }
        return {status: `${data.deletedCount > 0 ? true : false}`};
    }



    async getProviders() {
        const providers = await Provider.find({});
        console.log('providers:::', providers);
        return providers;
    }

    async getProviderById(id) {
        const provider = await Provider.find({_id: id});
        console.log('provider:::', provider);
        return provider;
    }

    async createProvider(provider) {
        let data = {};
        try {
            data = await Provider.create(provider);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async updateProvider(provider) {
        let data = {};
        try {
            data = await Provider.updateOne({ _id: provider.id },provider);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async deleteProvider(providerId) {
        let data = {};
        try {
            data = await Provider.deleteOne({_id : providerId});
        } catch(err) {
            logger.error('Error::' + err);
        }
        return {status: `${data.deletedCount > 0 ? true : false}`};
    }

}

module.exports = new CRUDRepository();