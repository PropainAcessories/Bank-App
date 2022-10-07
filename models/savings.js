const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Savings extends Model {}

Savings.init(
    {

    }
);

module.exports = Savings;