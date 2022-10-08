const seedUsers = require('./user-seeds');
const seedAccounts = require('./user-seeds');
const seedTransactions = require('./transaction-seeds');
const seedChecking = require('./checking-seeds');
const seedSavings = require('./savings-seeds');

const sequelize = require('../config/connection');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    await seedUsers();
    await seedAccounts();
    await seedTransactions();
    await seedChecking();
    await seedSavings();
    process.exit(0);
};

seedDatabase();
