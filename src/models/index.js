const dbConfig = require('../config/dbConfig.js');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
        port: dbConfig.PORT,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
);

sequelize.authenticate()
    .then(() => console.log('Connected..'))
    .catch(err => console.log('Error' + err));

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.banks = require('./bankModel.js')(sequelize, DataTypes);
db.accounts = require('./accountModel.js')(sequelize, DataTypes);
db.clients = require('./clientModel.js')(sequelize, DataTypes);
db.users = require('./userModel.js')(sequelize, DataTypes);
db.usersTmp = require('./userTmpModel.js')(sequelize, DataTypes);
db.tokens = require('./userStoreTokens.js')(sequelize, DataTypes);


const Movie = sequelize.define('Movie', { name: DataTypes.STRING });
const Actor = sequelize.define('Actor', { name: DataTypes.STRING });

const ActorMovies = sequelize.define('ActorMovies', {
    MovieId: {
        type: DataTypes.INTEGER,
        references: {
            model: Movie, // 'Movies' would also work
            key: 'id'
        }
    },
    ActorId: {
        type: DataTypes.INTEGER,
        references: {
            model: Actor, // 'Actors' would also work
            key: 'id'
        }
    }
});
Movie.belongsToMany(Actor, { through: ActorMovies });
Actor.belongsToMany(Movie, { through: ActorMovies });

db.sequelize.sync({ force: false })
    .then(() => console.log('Re-sync done!'));

module.exports = db;
