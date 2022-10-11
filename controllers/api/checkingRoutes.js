const router = require('express').Router();
const { Checking, Transaction } = require('../../models');
const withAuth = require('../../utils/auth');

// Re-Awaken when we are able to verify between customer and employee.

// router.get('/', withAuth, async (req, res) => {
//     try {
//         const checkingData = await Checking.findAll({
//             attributes: ['id', 'balance', 'user_id'],
//         });

//         res.status(200).json(checkingData);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

router.get('/:id', withAuth, async (req, res) => {
    try {
        const checkingData = await Checking.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'balance', 'user_id'],
            include: { 
                model: Transaction,
                attributes: ['id', 'date', 'type', 'amount', 'user_id']
            }
        });

        if (!checkingData) {
            res.status(404).json({ message: 'No Account found, check URL or login status.' });
            return;
        }

        res.status(200).json(checkingData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        const checkingData = await Checking.create({
            balance: req.body.balance,
            user_id: req.session.user_id
        });

        res.status(200).json(checkingData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const checkingData = await Checking.update(req.body.balance, {
            where: {
                id: req.params.id
            }
        });
        if (!checkingData[0]) {
            res.status(404).json({ message: 'No account found with this ID to edit' });
            return;
        }

        res.status(200).json(checkingData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const checkingData = await Checking.destroy({
            where: req.params.id
        });
        if (!checkingData) {
            res.status(404).json({ message: 'No account to delete GREAT SUCCESS!' });
            return;
        }

        res.status(200).json(checkingData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
