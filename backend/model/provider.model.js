const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema(
    { 
        name: 'string', 
        createDate: 'date', 
        updatedDate: 'date', 
        createdBy: 'string', 
        updatedBy: 'string',
        clients:   [{ type: mongoose.Types.ObjectId, ref: 'clients' }],
    },
    { timestamps: { createDate: 'created_at', updatedDate: 'updated_at'}});

const Provider = mongoose.model('providers', providerSchema);

module.exports = {
    Provider
}