const jwt = require('jsonwebtoken');
const env = require('../config/env');

function generateAccessToken(user) {
    return jwt.sign(user.toJSON(), env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15s'
    });
}

module.exports = { generateAccessToken };
