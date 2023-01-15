const db = require('./../models');
const auth = require('../auth/auth');
const bcrypt = require('bcrypt');

// create main Model
const User = db.users;
const UserTmp = db.usersTmp;
const Token = db.tokens;

//main work

// 0. refresh Token
const refreshToken = async (req, res) => {

    const { userId, refreshToken } = req.body;
    const user = await User.findOne({ where: { id: userId } });
    const token = await Token.findOne({ where: { userId } });

    if (token.refreshToken === refreshToken) {
        const accessToken = auth.generateAccessToken(user);
        const refreshToken = auth.generateRefreshToken(user);

        await Token.update({ accessToken, refreshToken }, { where: { userId: user.id } });

        return res.status(201).json({ token: { accessToken, refreshToken } });
    }
    res.status(401).send({ error: { status: 401, message: 'logged out' } });
};

// 1. register User
const registerUserTmp = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Validate user input
        if (!(email && password && username && role)) {
            return res.status(400).send('All input is required');
        }

        // check if user already exist
        // Validate if user exist in our database
        const emailOldUser = await UserTmp.findOne({ where: { email } });
        const usernameOldUser = await UserTmp.findOne({ where: { username } });

        if (emailOldUser || usernameOldUser) {
            return res.status(409).send('User Already Exist. Please Login');
        }

        //Encrypt user password
        let encryptedPassword = await bcrypt.hash(password, 10);
        const data = { username, email, password: encryptedPassword, role };

        // Create user in our database
        const user = await UserTmp.create(data);
        // Create token && save user token
        const accessToken = auth.generateAccessToken(user);
        const refreshTokenNew = auth.generateRefreshToken(user);

        // return new user
        res.status(201).send({
            user,
            token: {
                accessToken, refreshToken: refreshTokenNew
            }, registeredTmp: true,
            messages: [
                {
                    messageCode: 'registeredTmp',
                    messagesType: 'INFO'
                }
            ]
        });

    } catch (err) {
        console.log(err);
    }
};


// 1.5 register User by Admin
const registerUser = async (req, res) => {
    try {
        const { username, email, password, role, approved } = req.body;

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
        const data = { username, email, password: encryptedPassword, role, approved };

        // Create user in our database
        const user = await User.create(data);
        // Create token && save user token
        const accessToken = auth.generateAccessToken(user);
        const refreshTokenNew = auth.generateRefreshToken(user);

        // return new user
        res.status(201).send({
            user,
            token: {
                accessToken, refreshToken: refreshTokenNew
            },
            registeredByAdmin: true,
            messages: [
                {
                    messageCode: 'registeredByAdmin',
                    messagesType: 'INFO'
                }
            ]
        });

    } catch (err) {
        console.log(err);
    }
};

// 2. get all users
const getAllUsers = async (req, res) => {

    let users = await User.findAll({
        attributes: ['id', 'username', 'email', 'role', 'approved'],
        where: { approved: '0' }
    });


    res.status(200).send(users);
};

// 2.3 get all Tmp users
const getAllTmpUsers = async (req, res) => {

    const users = await UserTmp.findAll({
        attributes: ['id', 'username', 'password', 'email', 'role']
    });

    res.status(200).send(users);
};

// 2.5 get  user
const getUser = async (req, res) => {
    try {
        // Authenticate User
        const { username, password } = req.body;

        if (!(username && password)) {
            return res.status(400).send({ message: 'redirect to login section' });
        }

        const user = await User.findOne({ where: { username } });

        if (user && await bcrypt.compare(password, user.password)) {
            const accessToken = auth.generateAccessToken(user);
            const refreshTokenNew = auth.generateRefreshToken(user);
            const data = { userId: user.id, accessToken, refreshToken: refreshTokenNew };
            const token = await Token.findOne({ where: { userId: user.id } });

            // update token // create token
            token ? await Token.update(data, { where: { userId: user.id } }) : await Token.create(data);


            if (user.approved === '1') {
                return res.status(200).json({ user, token: { accessToken, refreshToken: refreshTokenNew } });
            }
            return res.status(200).json({
                messages: [
                    {
                        messageCode: 'not-approved',
                        messagesType: 'ERROR'
                    }
                ]
            });
        }

        res.status(400).send('Invalid Credentials');

    } catch (err) {
        console.log(err);
    }
};

// 3. get single user
const userLogin = async (req, res) => {
    try {
        // Authenticate User
        const { username, password } = req.body;

        if (!(username && password)) {
            return res.status(400).send('All input is required');
        }

        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(200).send({
                messages: [
                    {
                        messageCode: 'unauthorized',
                        messagesType: 'ERROR'
                    }
                ]
            });
        }


        if (user && await bcrypt.compare(password, user.password)) {
            const accessToken = auth.generateAccessToken(user);
            const refreshTokenNew = auth.generateRefreshToken(user);
            const data = { userId: user.id, accessToken, refreshToken: refreshTokenNew };
            const token = await Token.findOne({ where: { userId: user.id } });

            // update token // create token
            token ? await Token.update(data, { where: { userId: user.id } }) : await Token.create(data);

            if (user.approved === '1') {
                return res.status(200).json({ user, token: { accessToken, refreshToken: refreshTokenNew } });
            }
            return res.status(200).json({
                messages: [
                    {
                        messageCode: 'not-approved',
                        messagesType: 'ERROR'
                    }
                ]
            });
        }


        return res.status(200).send({
            messages: [
                {
                    messageCode: 'wrongPassword',
                    messagesType: 'ERROR'
                }
            ]
        });

    } catch (err) {
        console.log(err);
    }
};

// 4. update user
const updateUser = async (req, res) => {
    const id = req.body.id;

    const user = await User.update(req.body, { where: { id } });

    res.status(200).send(user);
};

// 6. delete user
const deleteTmpUser = async (req, res) => {
    const id = req.params.id;

    await UserTmp.destroy({ where: { id } });

    res.status(200).send('User deleted!');
};

// 7. logout user
const logoutUser = async (req, res) => {
    const userId = req.body.userId;

    await Token.destroy({ where: { userId } });

    res.status(200).send('Logged out!');
};

module.exports = {
    refreshToken,
    registerUser,
    registerUserTmp,
    getAllUsers,
    getAllTmpUsers,
    userLogin,
    updateUser,
    deleteTmpUser,
    logoutUser,
    getUser
};
