const router = require('express').Router();
const userRoutes = require('./user-Routes');
const accountRoutes = require('./accountRoutes');
const transactionRoutes = require('./transactionroutes');
const infoRoutes = require('./info-route');

router.use('/information', infoRoutes);
router.use('/transaction', transactionRoutes);
router.use('/user', userRoutes);
router.use('/account', accountRoutes);


module.exports = router;
