const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Information extends Model {}

Information.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        bankInfo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        loanOfferInfo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        checkingInfo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        savingsInfo: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'information'
    }
);

module.exports = Information;
