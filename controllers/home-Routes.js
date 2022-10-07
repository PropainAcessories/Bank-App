const router = require('express').Router();
const sequelize = require('../config/connection');
const {User, Account} = require('../models');

router.get('/', async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            include: [
                {
                    model: Account,
                    attributes: [],
                },
            ],
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
})
module.exports = router;
