const userRouter = require('../controllers/userController');

const userRouter = require('express').Router();

userRouter.post('/add-user', userRouter.addUser);
userRouter.get('/all-users', userRouter.getAllUsers);
userRouter.get('/:id', userRouter.getUser);
userRouter.put('/:id', userRouter.updateUser);
userRouter.delete('/:id', userRouter.deleteUser);

module.exports = userRouter;
