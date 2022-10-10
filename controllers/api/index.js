const router = require('express').Router();
const userRoutes = require('./user-Routes');
const accountRoutes = require('./accountRoutes');
const checkingRoutes = require('./checkingRoutes');
const savingsRoutes = require('./savingsRoutes');

router.use('/users', userRoutes);
router.use('/account', accountRoutes);
router.use('/checking', checkingRoutes);
router.use('/savings', savingsRoutes);

module.exports = router;
