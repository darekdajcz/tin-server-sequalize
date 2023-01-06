const db = require('./../models');
const auth = require('../auth/auth');
const bcrypt = require('bcrypt');

// create main Model
const User = db.users;

//main work

// 0. refresh Token
const refreshToken = async (req, res) => {
    console.log(req.headers);
    let users = await User.findAll({
        attributes: ['id', 'username', 'email', 'role']
    });
    res.status(200).send(users);
};

// 1. register User
const registerUser = async (req, res) => {

    try {
        const { username, email, password, role } = req.body;
        // Validate user input
        if (!(email && password && username && role)) {
            return res.status(400).send('All input is required');
        }

        // check if user already exist
        // Validate if user exist in our database
        const emailOldUser = await User.findOne({ where: { email } });
        const usernameOldUser = await User.findOne({ where: { username } });

        if (emailOldUser || usernameOldUser) {
            return res.status(409).send('User Already Exist. Please Login');
        }

        //Encrypt user password
        let encryptedPassword = await bcrypt.hash(password, 10);
        const data = { username, email, password: encryptedPassword, role };

        // Create user in our database
        const user = await User.create(data);
        // Create token && save user token
        const token = auth.generateAccessToken(user);

        // return new user
        res.status(201).json({ user, token });

    } catch (err) {
        console.log(err);
    }

};

// 2. get all users
const getAllUsers = async (req, res) => {
    console.log(req.headers);
    let users = await User.findAll({
        attributes: ['id', 'username', 'email', 'role']
    });
    res.status(200).send(users);
};

// 3. get single user
const userLogin = async (req, res) => {

    try {
        // Authenticate User
        const { username, password } = req.body;

        if (!(username && password)) {
            res.status(400).send('All input is required');
        }

        const user = await User.findOne({ where: { username } });
        if (user && await bcrypt.compare(password, user.password)) {
            const accessToken = auth.generateAccessToken(user);
            res.status(200).json({ accessToken });
        }

        res.status(400).send('Invalid Credentials');

    } catch (err) {
        console.log(err);
    }
};

// 4. update user
const updateUser = async (req, res) => {

    let id = req.body.id;
    const user = await User.update(req.body, { where: { id } });
    res.status(200).send(user);
};

// 6. delete user
const deleteUser = async (req, res) => {

    let id = req.body.id;
    await User.destroy({ where: { id } });
    res.status(200).send('User deleted!');
};

module.exports = {
    refreshToken, registerUser, getAllUsers, userLogin, updateUser, deleteUser
};
