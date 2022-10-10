const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Savings extends Model {}

Savings.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        balance: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                len: [0, 50000000]
            }
        },
    }
);

module.exports = Savings;