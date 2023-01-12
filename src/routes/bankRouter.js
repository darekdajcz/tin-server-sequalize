const bankController = require('../controllers/bankController');
const bankRouter = require('express').Router();
const auth = require('./../auth/auth.js');

bankRouter.post('/create', auth.authenticateToken, bankController.addBank);
bankRouter.get('/all', auth.authenticateToken, bankController.getAllBanks);
bankRouter.get('/:id', auth.authenticateToken, bankController.getBank);
bankRouter.put('/update', auth.authenticateToken, bankController.updateBank);
bankRouter.delete('/:id', auth.authenticateToken, bankController.deleteBank);

module.exports = bankRouter;
