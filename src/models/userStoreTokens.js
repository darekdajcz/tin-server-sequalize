module.exports = (sequelize, DataTypes) => {
    // return TOKEN
    return sequelize.define('store-token', {
        userId: {
            type: DataTypes.STRING
        }, accessToken: {
            type: DataTypes.STRING(1000)
        },
        refreshToken: {
            type: DataTypes.STRING(3000)
        }
    }, { freezeTableName: true });
};
