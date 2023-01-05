const { Sequelize } = require('sequelize');
const { DataTypes } = require('sequelize');
const dbConfig = require('../config/dbConfig');

// new Sequelize('database', 'username', 'password', { ...
let sequalize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        port: dbConfig.PORT
    }
);
const x = Sequelize;

sequalize.authenticate()
    .then(() => console.log('Connected..'))
    .catch((err) => console.log(`Error ${err}`));

const db = {};

db.Sequelize = x;
db.sequalize = sequalize;

console.log(sequalize)

db.users = require('./userModel.js')(Sequelize, DataTypes);

db.sequalize.sync({ force: false })
    .then(() => console.log('Re-sync done!'));

module.exports = db;
