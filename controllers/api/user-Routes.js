const router = require('express').Router();
const { User, Account } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const userData = await User.findAll({
        attributes: { exclude: ['password'] },
        order: [['name', 'ASC']],
    });

    res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', withAuth, async (req, res) => {
    try {
        const userData = await User.findOne({
            attributes: { exclude: ['password'] },
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Account,
                    attributes: { exclude: ['pin'] },
                }
            ]
        })

        if (!userData) {
            res.status(404).json({ message: 'No user found check ID and search again.' });
            return;
        }

        res.json.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            name: req.body.name,
            email: req.body.email,
            user_type: req.body.user_type,
            password: req.body.password
        });
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.name = userData.name;
            req.session.user_type = userData.user_type;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { id: req.body.id } });

        if (!userData) {
            res.status(400).json({ message: 'Incorrect email/password try again.' });
            return;
        }
        
        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email/password try again.' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.name = userData.name;
            req.session.email = userData.email;
            req.session.logged_in = true;

            res.status(200).json({ user: userData, message: 'You are now logged in'});
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const userData = await User.update(req.body, {
            where: {
                id: req.params.id,
            }
        });
        if (!userData[0]) {
            res.status(404).json({ message: 'No User found check the ID in URL or login status.' });
            return;
        }

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
