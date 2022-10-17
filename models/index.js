const User = require('./User');
const Account = require('./Account');
const Transaction = require('./Transaction');

User.hasMany(Account, {
    foreignKey: 'user_id'
});

Account.belongsTo(User, {
    foreignKey: 'user_id',
});

Transaction.belongsTo(User, {
    foreignKey: 'user_id'
});

Transaction.belongsTo(Account, {
    foreignKey: 'account_id',
});

User.hasMany(Transaction, {
    foreignKey: 'account_id',
});

Account.hasMany(Transaction, {
    foreignKey: 'account_id'
});


module.exports = { User, Account, Transaction };
