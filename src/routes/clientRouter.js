const userController = require('../controllers/clientController');
const clientRouter = require('express').Router();
const auth = require('./../auth/auth.js');

clientRouter.post('/create', auth.authenticateToken, userController.addClient);
clientRouter.get('/all', userController.getAllClients);
clientRouter.get('/:id', auth.authenticateToken, userController.getClient);
clientRouter.put('/update', auth.authenticateToken, userController.updateClient);
clientRouter.delete('/:id', auth.authenticateToken, userController.deleteClient);

module.exports = clientRouter;
