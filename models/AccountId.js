const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class AccountId extends Model {}

AccountId.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        account_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'account',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'account_ids'
    }
);

module.exports = AccountId;
