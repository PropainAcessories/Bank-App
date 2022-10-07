const router = require('express').Router();
const userRoutes = require('./user-Routes');
const accountRoutes = require('./accountRoutes');
const checkingRoutes = require('./checkingRoutes');
const savingsRoutes = require('./savingsRoutes');
const customerRoutes = require('./customerRoutes');
const employeeRoutes = require('./employeeRoutes');

router.use('/users', userRoutes);
router.use('/account', accountRoutes);
router.use('/checking', checkingRoutes);
router.use('/savings', savingsRoutes);
router.use('/customers', customerRoutes);
router.use('/employees', employeeRoutes);

module.exports = router;
