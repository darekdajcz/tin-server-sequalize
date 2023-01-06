const userController = require('../controllers/userController');
const userRouter = require('express').Router();
const auth = require('./../auth/auth.js');
cors = require('cors');

// register
userRouter.post('/register', auth.authenticateToken, userController.registerUser);
// login
userRouter.post('/login', userController.userLogin);
// refresh token
userRouter.post('/refresh-token', userController.refreshToken);

userRouter.get('/all-users', userController.getAllUsers);
userRouter.put('/:id', auth.authenticateToken, userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);
userRouter.post('/logout', userController.logoutUser);

module.exports = userRouter;

