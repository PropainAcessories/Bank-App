const User = require('./User');
const Account = require('./Account');
const Savings = require('./Savings');
const Checking = require('./Checking');
const Customer = require('./Customer');
const Employee = require('./Employee');
const Transaction = require('./Transaction');

User.hasMany(Account, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Account.hasOne(User, {
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
    foreignKey: 'account_id',
});

Savings.belongsTo(Account, {
    foreignKey: 'account_id',
});

Transaction.hasOne(Account, {
    foreignKey: 'account_id'
});

Account.hasMany(Transaction, {
    foreignKey: 'account_id'
});

module.exports = { User, Account, Savings, Checking, Customer, Employee, Transaction };
