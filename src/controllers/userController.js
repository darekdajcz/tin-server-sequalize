require('dotenv').config
const db = require('./../models');
const { jwt } = require('jsonwebtoken');
const env = require('../config/env.js');

// create main Model
const User = db.users;

//main work

// 1. create User
const addUser = async (req, res) => {
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
    let users = await User.findAll({
        attributes: ['id', 'username', 'password', 'email', 'role']
    });
    res.status(200).send(users);
};

// 3. get single user
const userLogin = async (req, res) => {

    // Authenticate User

    const username = req.body.username;
    const password = req.body.password;
    const user = { name: username };

    const accessToken = jwt.sign(user, env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken });

    // let user = await User.findOne({ where: { username, password } });
    res.status(200).send(user);
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
    addUser, getAllUsers, userLogin, updateUser, deleteUser
};
