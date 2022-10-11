const { Checking } = require('../models');

const checkingData = 
[
    {
        id: 1,
        balance: 3000,
        user_id: 1
    },
    {
        id: 2,
        balance: 3000,
        user_id: 2
    },
    {
        id: 3,
        balance: 3000,
        user_id: 3
    },
    {
        id: 4,
        balance: 3000,
        user_id: 4
    }
]

const seedChecking = () => Checking.bulkCreate(checkingData);

module.exports = seedChecking;
