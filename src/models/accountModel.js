const { NUMBER } = require('sequelize/lib/data-types');
module.exports = (sequelize, DataTypes) => {

    // return Client
    return sequelize.define('accountX', {
        account_number: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: 15
            }
        },
        creation_date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bonuses: {
            type: DataTypes.STRING
        },
        client_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bank_id: {
            type: DataTypes.STRING,
            allowNull: false
        }

    }, { freezeTableName: true });
};
