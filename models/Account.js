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
            autoIncrement: true,
        },
        accountType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pin: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [4, 4]
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
                updatedUserData.pin = await bcrypt.hash(updatedUserData);
                return updatedUserData
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'account',
    }
);

module.exports = Account;
