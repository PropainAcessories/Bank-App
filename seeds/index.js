const seedUsers = require('./user-seeds');
const seedTransactions = require('./transaction-seeds');
const seedAccounts = require('./account-seeds');


const sequelize = require('../config/connection');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    await seedUsers();
    await seedAccounts();
    await seedTransactions();
    process.exit(0);
};

seedDatabase();
