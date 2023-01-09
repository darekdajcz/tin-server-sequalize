module.exports = (sequelize, DataTypes) => {

    // return Client
    return sequelize.define('clientX', {
        pesel: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: 11
            }
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        can_get_loan: {
            type: DataTypes.STRING,
            allowNull: false
        }

    }, { freezeTableName: true });
};
