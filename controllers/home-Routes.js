const router = require('express').Router();
const { User, Account, Information, Savings, Checking, Transaction } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const infoData = await Information.findAll({
         attributes: ['bankInfo', 'offerDescription'],
        });

        const information = infoData.map((information) => information.get({ plain: true }));
        
        res.render('homepage', {
            information,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/account', withAuth, async (req, res) =>{
    try {
        const accountData = await Account.findByPk(req.session.user_id, {
            attributes: { exclude: ['pin'] },
            include: [
                { model: Savings },
                { model: Checking }],
        });

        const account = accountData.get({ plain: true });

        res.render('account', {
            ...account,
            logged_in: true
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/checking', withAuth, async (req, res) => {
    try {
        const checkingData = await Checking.findByPk(req.session.user_id, {
            attributes: ['id', 'balance', 'user_id'],
            include: {
                 model: Transaction,
                 attributes: ['id', 'date', 'type', 'user_id']
                },
        });

        if(!checkingData) {
            res.status(404).json({ message: 'No account found; log in or check id.' });
            return;
        }

        const checking = checkingData.get({ plain: true, });

        res.render('checking', {
            checking,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/account');
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
