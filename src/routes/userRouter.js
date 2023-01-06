const userController = require('../controllers/userController');

const userRouter = require('express').Router();

userRouter.post('/add-user', userController.addUser);
userRouter.get('/all-users', userController.getAllUsers);
// login
userRouter.post('/login', userController.userLogin);

userRouter.put('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);

module.exports = userRouter;
