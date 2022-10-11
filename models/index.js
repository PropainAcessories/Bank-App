const User = require('./User');
const Account = require('./Account');
// const Savings = require('./Savings');
// const Checking = require('./Checking');
const Transaction = require('./Transaction');
const Information = require('./Information');


User.hasMany(Account, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Account.hasOne(User, {
    foreignKey: 'user_id',
})

Account.belongsTo(User, {
    foreignKey: 'user_id'
});

Account.hasMany(Transaction, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Transaction.hasOne(Account, {
    foreignKey: 'user_id'
});

module.exports = { User, Account, Information, Transaction };
