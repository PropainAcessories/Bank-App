const router = require('express').Router();
const { Account } = require('../../models');
const withAuth = require('../../utils/auth');

// Re-AWAKEN when we are able to verify between employee and customer

router.get('/', async (req, res) => {
    try {
        const accountData = await Account.findAll({
            attributes: ['id','account_type', 'balance', 'user_id',{ exclude: ['pin'] }],
            order: [['id', 'ASC'],]
        });

        res.status(200).json(accountData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const accountData = await Account.findOne({
            attributes: { exclude: ['pin'] },
            where: {
                id: req.params.id
            },
        });

        if (!accountData) {
            res.status(404).json({ message: 'Account not found, check ID in URL or log in.' });
            return;
        }

        res.status(200).json(accountData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        const accountData = await Account.create({
            id: req.body.id,
            account_type: req.body.account_type,
            balance: req.body.balance,
            pin: req.body.pin,
            user_id: req.session.user_id,
        });

        res.status(200).json(accountData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const accountData = await Account.update(req.body, {
            where: {
                id: req.params.id,
            }
        });

        if (!accountData[0]) {
            res.status(404).json({ message: 'No account found check the ID in URL or log in.' });
            return;
        }

        res.status(200).json(accountData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const accountData = await Account.destroy({
            where: req.params.id
        });
        if (!accountData) {
            res.status(404).json({ message: 'Account not found.' });
            return;
        }

        res.status(200).json(accountData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
