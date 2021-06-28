const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema(
    { 
        name: 'string', 
        email: 'string', 
        phone: 'string', 
        createDate: 'date', 
        updatedDate: 'date', 
        createdBy: 'string', 
        updatedBy: 'string',
        providers: [{ type: mongoose.Types.ObjectId, ref: 'providers' }],
    },
    { timestamps: { createDate: 'created_at', updatedDate: 'updated_at'}});

const Client = mongoose.model('clients', clientSchema);

module.exports = {
    Client
}