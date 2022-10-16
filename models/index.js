const User = require('./User');
const Account = require('./Account');
const Transaction = require('./Transaction');

User.hasMany(Account, {
    foreignKey: 'user_id'
});

Account.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCASDE'
});

Account.hasMany(Transaction, {
    foreignKey: 'account_id',
    onDelete: 'CASCADE',
});

Transaction.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Transaction, {
    foreignKey: 'account_id',
    onDelete: 'Cascade',
})

Transaction.belongsTo(Account, {
    foreignKey: 'account_id'
})

module.exports = { User, Account, Transaction };
