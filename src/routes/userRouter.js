const userController = require('../controllers/userController');
const userRouter = require('express').Router();
const auth = require('./../auth/auth.js');

// register
userRouter.post('/register-tmp', userController.registerUserTmp);
userRouter.post('/register', userController.registerUser);
// userRouter.post('/register', auth.authenticateToken, userController.registerUser);
// login
userRouter.post('/login', userController.userLogin);
userRouter.get('/all-users', auth.authenticateToken, userController.getAllUsers);
userRouter.get('/all-users-tmp', auth.authenticateToken, userController.getAllTmpUsers);

// main account
userRouter.post('/account', auth.authenticateToken, userController.getUser);
// refresh token
userRouter.post('/refresh-token', userController.refreshToken);

userRouter.put('/update', auth.authenticateToken, userController.updateUser);
userRouter.delete('/:id', userController.deleteTmpUser);
userRouter.post('/logout', userController.logoutUser);

module.exports = userRouter;
