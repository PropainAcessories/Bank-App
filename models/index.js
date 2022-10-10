const User = require('./User');
const Account = require('./Account');
const Savings = require('./Savings');
const Checking = require('./Checking');
const Transaction = require('./Transaction');
const Information = require('./Information');


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
    foreignKey: 'user_id'
});

Savings.belongsTo(Account, {
    foreignKey: 'user_id'
});

Transaction.belongsToMany(Checking, Savings, {
    foreignKey: 'account_id'
});

Savings.hasMany(Transaction, {
    foreignKey: 'account_id'
});

Checking.hasMany(Transaction, {
    foreignKey: 'account_id'
});

module.exports = { User, Account, Savings, Checking, Transaction, Information };
