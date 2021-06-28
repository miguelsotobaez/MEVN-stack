const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
require('dotenv').config()
const fs = require('fs')

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const customCss = fs.readFileSync((process.cwd()+"/swagger.css"), 'utf8')

const clientController = require('./controller/client.controller')
const providerController = require('./controller/provider.controller')



const app = express();
const port = process.env.PORT || 3000;


var corsOptions = {
    origin: "http://localhost:8081"
};

  app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss}));


//CLIENT CRUD
app.get('/api/clients', (req, res) => {
    clientController.getClients().then(data => res.json(data));
});

app.get('/api/client/:id', (req, res) => {
    console.log(req.body);
    clientController.getClientById(req.params.id).then(data => res.json(data));
});

app.post('/api/client', (req, res) => {
    console.log(req.body);
    clientController.createClient(req.body.client).then(data => res.json(data));
});

app.put('/api/client', (req, res) => {
    clientController.updateClient(req.body.client).then(data => res.json(data));
});

app.delete('/api/client/:id', (req, res) => {
    clientController.deleteClient(req.params.id).then(data => res.json(data));
});


//PROVIDER CRUD
app.get('/api/providers', (req, res) => {
    providerController.getProviders().then(data => res.json(data));
});

app.get('/api/provider/:id', (req, res) => {
    console.log(req.body);
    providerController.getProviderById(req.params.id).then(data => res.json(data));
});

app.post('/api/provider', (req, res) => {
    console.log(req.body);
    providerController.createProvider(req.body.provider).then(data => res.json(data));
});

app.put('/api/provider', (req, res) => {
    providerController.updateProvider(req.body.provider).then(data => res.json(data));
});

app.delete('/api/provider/:id', (req, res) => {
    providerController.deleteProvider(req.params.id).then(data => res.json(data));
});

app.get('/', (req, res) => {
    res.send(`<h1>API Works !!!</h1>`)
});


app.listen(port, () => {
    console.log(`Server listening on the port  ${port}`);
})