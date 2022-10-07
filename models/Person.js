const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Person extends Model {}

Person.init(
    {

    }
);

module.exports = Person;
