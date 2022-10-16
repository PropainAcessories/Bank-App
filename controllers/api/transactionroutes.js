const router = require('express').Router();
const { Transaction } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const transactionData = await Transaction.findAll({
            attributes: ['id', 'type', 'amount', 'user_id', 'account_id'],
        });

        res.status(200).json(transactionData);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const transactionData = await Transaction.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'type', 'amount', 'user_id', 'account_id'],
        });
        if(!transactionData) {
            res.status(404).json({ message: 'No transaction found try again' });
            return;
        }

        res.status(200).json(transactionData);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.post('/', async (req, res) => {
    try {
        const transactionData = await Transaction.create({
            type: req.body.type,
            amount: req.body.amount,
            user_id: req.session.user_id,
            account_id: req.body.account_id,
        });

        res.status(200).json(transactionData);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const transactionData = await Transaction.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        if (!transactionData[0]) {
            res.status(404).json({ message: 'No transaction with this ID found' });
            return;
        }

        res.status(200).json(transactionData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const transactionData = await Transaction.destroy({
            where: req.params.id
        });
        if (!transactionData) {
            res.status(404).json({ message: 'No transaction to delete GREAT SUCCESS!' });
            return;
        }

        res.status(200).json(transactionData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
