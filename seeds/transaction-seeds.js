const { Transaction } = require('../models');

const transactionData = 
[
    {
        id: 1,
        date: "01/01/01",
        balance: 200,
        type: "withdrawal",
        amount: 1000,
    },
    {
        id: 2,
        date: "01/01/01",
        balance: 200,
        type: "deposit",
        amount: 1000,
    },
    {
        id: 3,
        date: "01/01/01",
        balance: 200,
        type: "withdrawal",
        amount: 1000,
    },
    {
        id: 4,
        date: "01/01/01",
        balance: 200,
        type: "deposit",
        amount: 1000,
    },
]

const seedTransactions = () => Transaction.bulkCreate(transactionData);

module.exports = seedTransactions;
