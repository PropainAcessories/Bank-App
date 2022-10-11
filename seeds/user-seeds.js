const { User } = require('../models');

const userData = 
[
    {
        name: "Edward D. Newgate",
        email: "Whitebeard3000@OnePiece.com",
        user_type: "Customer",
        password: "rogersux101"
    },
    {
        name: "Monkey D. Garp",
        email: "email@OnePiece.com",
        user_type: "Employee",
        password: "1234567890"
    },
    {
        name: "Borsalino",
        email: "WhichWayIsTheCafeteria@OnePiece.com",
        user_type: "Customer",
        password: "password"
    },
    {
        name: "Admiral Sakazuki",
        email: "KillPirates@OnePiece.com",
        user_type: "Manager",
        password: "420Justice69"
    },
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
