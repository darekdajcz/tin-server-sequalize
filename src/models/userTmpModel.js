module.exports = (sequelize, DataTypes) => {

    // return User
    return sequelize.define('userTmpX', {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, { freezeTableName: true });
};
