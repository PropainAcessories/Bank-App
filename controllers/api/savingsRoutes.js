const router = require('express').Router();
const { Savings, Transaction } = require('../../models');
const withAuth = require('../../utils/auth');

// Re-Awaken when we are able to verify between customer and employee.

// router.get('/', withAuth, async (req, res) => {
//     try {
//         const savingsData = await Savings.findAll({
//             attributes: ['id', 'balance', 'user_id'],
//         });

//         res.status(200).json(savingsData);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

router.get('/:id', withAuth, async (req, res) => {
    try {
        const savingsData = await Savings.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'balance', 'user_id'],
            include: { 
                model: Transaction,
                attributes: ['id', 'date', 'type', 'amount', 'user_id']
            }
        });
        if (!savingsData) {
            res.status(404).json({ message: 'No account found check the ID in the URL or your login status.' });
            return;
        }

        res.status(200).json(savingsData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        const savingsData = await Savings.create({
            balance: req.body.balance,
            user_id: req.session.user_id
        });

        res.status(200).json(savingsData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const savingsData = await Savings.update(req.body.balance, {
            where: {
                id: req.params.id
            }
        });
        if (!savingsData[0]) {
            res.status(404)({ message: 'Account not found check ID or login status' });
            return;
        }

        res.status(200).json(savingsData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const savingsData = await Savings.destroy({
            where: req.params.id
        });
        if (!savingsData) {
            res.status(404).json({ message: 'No account to delete GREAT SUCCESS!' });
            return;
        }

        res.status(200).json(savingsData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
