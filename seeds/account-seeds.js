const { Account } = require('../models');

const accountData =
[
    {
        id: 1,
        account_type: "Checking",
        pin: 1234,
        user_id: 1
    },
    {
        id: 2,
        account_type: "Savings",
        pin: 7890,
        user_id: 2
    },
    {
        id: 3,
        account_type: "Checking",
        pin: 4567,
        user_id: 3
    },
    {
        id: 4,
        account_type: "Savings",
        pin: 3456,
        user_id: 4
    },
]

const seedAccounts = () => Account.bulkCreate(accountData);

module.exports = seedAccounts;
