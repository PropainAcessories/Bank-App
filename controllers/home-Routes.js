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
        const accountData = await Account.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: { exclude: ['pin'] },
        });

        if(!accountData) {
            res.status(404).json({ message: 'no account found check your id or make sure you are logged in.; or create a bank account' });
            return;
        };

        console.log(accountData);
        const accounts = accountData.map((accounts) => accounts.get({ plain: true }));

        res.render('account', {
            accounts,
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
            attributes: ['id', 'account_type', 'balance'],
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
            res.render('create-account', {logged_in: req.session.logged_in});
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/transaction/:id', withAuth, async (req, res) => {
    try {
        const transactionData = await Transaction.findAll({
            where: {
                id: req.params.id
            },
        });

        if (!transactionData) {
            res.status(404).json({ message: 'No transactions found check ID or log in.' });
            return;
        };

        const transactions = transactionData.map((transactions) => transactions.get({ plain: true }));

        res.render('transaction', {
            transactions,
            logged_in: req.session.logged_in
        });
        
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

router.get('/login', (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('signup')
});

module.exports = router;
