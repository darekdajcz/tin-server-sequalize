module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: 'Uzi2115',
    DB: 'bank',
    dialect: 'mysql',
    PORT: 3308,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}
