const router = require('express').Router();
const { Transaction } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const transactionData = await Transaction.findAll({
            attributes: ['id', 'date', 'type', 'amount', 'user_id'],
        });

        res.status(200).json(transactionData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', withAuth, async (req, res) => {
    try {
        const transactionData = await Transaction.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'date', 'type', 'amount', 'user_id'],
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

router.post('/', withAuth, async (req, res) => {
    try {
        const transactionData = await Transaction.create({
            date: req.body.date,
            type: req.body.type,
            amount: req.body.amount,
            user_id: req.session.user_id
        });

        res.status(200).json(transactionData);
    } catch (err) {
        res.status(500).json(err);
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
