module.exports = (sequelize, DataTypes) => {
    // return TOKEN
    return sequelize.define('store-token', {
        userId: {
            type: DataTypes.STRING
        }, accessToken: {
            type: DataTypes.STRING
        },
        refreshToken: {
            type: DataTypes.STRING
        }
    }, { freezeTableName: true });
};
