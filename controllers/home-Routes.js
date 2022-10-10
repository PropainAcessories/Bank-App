const router = require('express').Router();
const { User, Account, Information, Savings, Checking } = require('../models');
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
        const userData = await Account.findByPk(req.session.user_id, {
            attributes: { exclude: ['pin'] },
            include: [
                { model: Savings },
                { model: Checking }],
        });

        const user = userData.get({ plain: true });

        res.render('account', {
            ...user,
            logged_in: true
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
