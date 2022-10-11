const { User } = require('../models');

const userData = 
[
    {
        id: 1,
        name: "Edward D. Newgate",
        email: "Whitebeard3000@OnePiece.com",
        user_type: "Customer",
        password: "rogersux101"
    },
    {
        id: 2,
        name: "Monkey D. Garp",
        email: "email@OnePiece.com",
        user_type: "Employee",
        password: "12345678901"
    },
    {
        id: 3,
        name: "Borsalino",
        email: "WhichWayIsTheCafeteria@OnePiece.com",
        user_type: "Customer",
        password: "password123456"
    },
    {
        id: 4,
        name: "Admiral Sakazuki",
        email: "KillPirates@OnePiece.com",
        user_type: "Manager",
        password: "420Justice69"
    }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
