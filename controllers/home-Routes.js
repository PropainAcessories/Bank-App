const router = require('express').Router();
const { User, Account, Information, } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const infoData = await Information.findAll({
         attributes: ['bankInfo', 'loanOfferInfo', 'checkingInfo', 'savingsInfo'],
        });

        if (!infoData) {
            res.status(404).json({ message: 'Site down somehow LOL' });
            return;
        };

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
                { model: Savings, attributes: { exclude: ['balance'] } },
                { model: Checking, attributes: { exclude: ['balance'] } }],
        });

        if(!accountData) {
            res.status(404).json({ message: 'no account found check your id or make sure you are logged in.' });
            return;
        };


        const account = accountData.get({ plain: true });

        res.render('account', {
            ...account,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// router.get('/checking', withAuth, async (req, res) => {
//     try {
//         const checkingData = await Checking.findByPk(req.session.user_id, {
//             attributes: ['id', 'balance', 'user_id'],
//             // include: {
//             //      model: Transaction,
//             //      attributes: ['id', 'date', 'type', 'user_id']
//             //     },
//         });

//         if(!checkingData) {
//             res.status(404).json({ message: 'No account found; log in or check id.' });
//             return;
//         }

//         const checking = checkingData.get({ plain: true, });

//         res.render('checking', {
//             ...checking,
//             logged_in: true,
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// router.get('/savings', withAuth, async (req, res) => {
//     try {
//         const savingsData = await Savings.findbyPK(req.session.user_id, {
//             attributes: ['id', 'balance', 'user_id'],
//             //include: [{ model: Transaction }],
//         });

//         if(!savingsData) {
//             res.status(404).json({ message: 'no account found check your id or make sure you are logged in.' });
//             return;
//         };


//         const savings = savingsData.get({ plain: true });

//         res.render('savings', {
//             ...savings,
//             logged_in: true,
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

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
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/transaction', withAuth, async (req, res) => {
    try {
        const transactionData = await Transaction.findByPk(req.session.user_id, {
            attributes: ['id', 'date', 'type', 'user_id'],
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
