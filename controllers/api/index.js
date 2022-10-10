const router = require('express').Router();
const userRoutes = require('./user-Routes');
const accountRoutes = require('./accountRoutes');
const checkingRoutes = require('./checkingRoutes');
const savingsRoutes = require('./savingsRoutes');
const transactionRoutes = require('./transactionroutes');

router.use('/transaction', transactionRoutes);
router.use('/user', userRoutes);
router.use('/account', accountRoutes);
router.use('/checking', checkingRoutes);
router.use('/savings', savingsRoutes);

module.exports = router;
