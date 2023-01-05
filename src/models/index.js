const dbConfig = require('../config/dbConfig');

const { Sequalize, DataTypes } = require('sequelize');

// new Sequelize('database', 'username', 'password', { ...
const sequalize = new Sequalize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        port: dbConfig.PORT,
        operatorsAliases: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
);

sequalize.authenticate()
    .then(() => console.log('Connected..'))
    .catch((err) => console.log(`Error ${err}`));

const db = {};

db.Sequelize = Sequalize;
db.sequalize = sequalize;

db.products = require('./userModel.js')(sequalize, DataTypes);

db.sequalize.sync({ force: false })
    .then(()=> console.log('Re-sync done!'));
