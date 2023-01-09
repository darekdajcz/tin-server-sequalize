module.exports = (sequelize, DataTypes) => {

    // return Client
    return sequelize.define('bankX', {
        name: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        }

    }, { freezeTableName: true });
};
