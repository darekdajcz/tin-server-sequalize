const userRouter = require('../controllers/userController');

const router = require('express').Router();

router.post('/add-user', userRouter.addUser);
router.get('/all-users', userRouter.getAllUsers);
router.get('/:id', userRouter.getUser);
router.put('/:id', userRouter.updateUser);
router.delete('/:id', userRouter.deleteUser);
