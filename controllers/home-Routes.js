const router = require('express').Router();
const { User, Account, Transaction } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        res.render('homepage', {
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

router.get('/account', withAuth, async (req, res) =>{
    try {
        const accountData = await Account.findByPk(req.session.user_id, {
            where: {
                user_id: req.session.user_id
            },
            attributes: { exclude: ['pin'] },
            include: [{
                model: Transaction,
                attributes: ['id', 'type', 'amount']
            }]
        });

        if(!accountData) {
            res.status(404).json({ message: 'no account found check your id or make sure you are logged in.; or create a bank account' });
            return;
        };


        const account = accountData.get({ plain: true });

        res.render('account', {
            ...account,
           logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

router.get('/account/:id', withAuth, async (req, res) => {
    try {
        const accountData = await Account.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['account_type', 'balance'],
            include: {
                model: Transaction,
                attributes: ['type', 'amount']
            },
        });

        const account = accountData.get({ plain: true });
        res.render('single-account', {
            account,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/user', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
        });

        if(!userData) {
            res.status(404).json({ message: 'no user found check your id or make sure you are logged in.' });
            return;
        };

        const user = userData.get({ plain: true });

        res.render('user', {
            user,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/createaccount', withAuth, async (req, res) =>{
    try {
        if (req.session.logged_in) {
            res.render('create-account', {logged_in: true});
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/transaction', withAuth, async (req, res) => {
    try {
        const transactionData = await Transaction.findByPk(req.session.user_id, {
            attributes: ['id', 'date', 'type'],
            include: [
            {
                model: User,
                attributes: { exclude: ['password'] }
            },
            {
                model: Account,
                attributes: { exclude: ['pin'] }
            },
        ],
        })

        if (!transactionData) {
            res.status(404).json({ message: 'No transactions found check ID or log in.' });
            return;
        };

        const transaction = transactionData.get({ plain: true });

        res.render('transaction', {
            ...transaction,
            logged_in: req.session.logged_in
        });
        
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/homepage');
        return;
    }

    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/homepage');
        return;
    }

    res.render('signup')
});

module.exports = router;
