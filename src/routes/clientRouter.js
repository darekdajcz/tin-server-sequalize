const clientController = require('../controllers/clientController');
const clientRouter = require('express').Router();
const auth = require('./../auth/auth.js');

clientRouter.post('/create', auth.authenticateToken, clientController.addClient);
clientRouter.get('/all', auth.authenticateToken, clientController.getAllClients);
clientRouter.get('/:id', auth.authenticateToken, clientController.getClient);
clientRouter.put('/update', auth.authenticateToken, clientController.updateClient);
clientRouter.delete('/:id', auth.authenticateToken, clientController.deleteClient);

module.exports = clientRouter;
