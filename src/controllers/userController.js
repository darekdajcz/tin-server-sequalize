const db = require('./../models');

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
const getUser = async (req, res) => {

    let id = req.params.id;
    let user = await User.findOne({ where: id });
    res.status(200).send(user);
};

// 3. update user
const updateUser = async (req, res) => {

    let id = req.body.id;
    const user = await User.update(req.body, { where: id });
    res.status(200).send(user);
};
