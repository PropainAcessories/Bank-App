const { Account } = require('../models');

const accountData =
[
    {
        id: 1,
        account_type: "Checking",
        balance: 2000,
        pin: 1234,
    },
    {
        id: 2,
        account_type: "Savings",
        balance: 2000,
        pin: 7890,
    },
    {
        id: 3,
        account_type: "Checking",
        balance: 2000,
        pin: 4567,
    },
    {
        id: 4,
        account_type: "Savings",
        balance: 2000,
        pin: 3456,
    },
]

const seedAccounts = () => Account.bulkCreate(accountData);

module.exports = seedAccounts;
