const db = require('./../models');
const auth = require('../auth/auth');

// create main Model
const User = db.users;

//main work

// 1. register User
const registerUser = async (req, res) => {
    let data = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        role: req.body.role
    };
    const user = await User.create(data);
    res.status(200).send(user);
    console.log(user);
};

// 2. get all users
const getAllUsers = async (req, res) => {
    console.log(req.headers);
    let users = await User.findAll({
        attributes: ['id', 'username', 'password', 'email', 'role']
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
        if (user && await password === user.password) {
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
    registerUser, getAllUsers, userLogin, updateUser, deleteUser
};
