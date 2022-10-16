const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt')

class Account extends Model {}

Account.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        account_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        balance: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [-350, 150000]
            }
        },
        pin: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4, 4]
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'account'
    }
);

module.exports = Account;
