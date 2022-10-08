const User = require('./User');
const Account = require('./Account');
const Savings = require('./Savings');
const Checking = require('./Checking');
const Customer = require('./Customer');
const Employee = require('./Employee');
const Transaction = require('./Transaction');

User.hasOne(Account, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Account.belongsTo(User, {
    foreignKey: 'user_id'
});

Account.hasMany(Checking, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Account.hasMany(Savings, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Checking.belongsTo(Account, {
    //
});

Savings.belongsTo(Account, {
    //
});

Transaction.belongsTo(Checking, Savings, {
    //
});

Savings.hasMany(Transaction, {
    //
});

Checking.hasMany(Transaction, {
    //
});

module.exports = { User, Account, Savings, Checking, Customer, Employee, Transaction };
