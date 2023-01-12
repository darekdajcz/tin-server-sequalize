const accountController = require('../controllers/accountController');
const accountRouter = require('express').Router();
const auth = require('./../auth/auth.js');

accountRouter.post('/create', auth.authenticateToken, accountController.addAccount);
accountRouter.get('/all', auth.authenticateToken, accountController.getAllAccounts);
accountRouter.get('/:id', auth.authenticateToken, accountController.getAccount);
accountRouter.put('/update', auth.authenticateToken, accountController.updateAccount);
accountRouter.delete('/:id', auth.authenticateToken, accountController.deleteAccount);

module.exports = accountRouter;
