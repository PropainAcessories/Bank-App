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
        pin: {
            type: DataTypes.INTEGER,
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
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.pin = await bcrypt.hash(newUserData.pin, 12);
                return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
                updatedUserData.pin = await bcrypt.hash(updatedUserData, 12);
                return updatedUserData
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'account'
    }
);

module.exports = Account;
