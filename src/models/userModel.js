module.exports = (sequalize, DataTypes) => {

    console.log('sequalize')
    console.log(sequalize)
    console.log('sequalize')
    const User = sequelize.define('user', {
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

    return User;
};
