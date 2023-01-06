const userController = require('../controllers/userController');
const userRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const env = require('../config/env.js');

cors = require('cors');

userRouter.post('/register', authenticateToken, userController.registerUser);
userRouter.get('/all-users', authenticateToken, userController.getAllUsers);
// login
userRouter.post('/login', userController.userLogin);

userRouter.put('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);

// Authenticate User

function authenticateToken(req, res, next) {


    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // const tokenJson = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    // console.log(tokenJson.username);  GETTING USERNAME

    if (token === null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, env.ACCESS_TOKEN_SECRET, {}, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}

module.exports = userRouter;

