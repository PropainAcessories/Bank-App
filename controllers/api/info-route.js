const router = require('express').Router();
const { Information } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const infoData = await Information.findAll({
            attributes: ['bankInfo', 'loanOfferInfo', 'checkingInfo', 'savingsInfo']
        });
        if (!infoData) {
            res.status(404).json({ message: 'Currently down call 555-555-5555 for bank information.' });
            return;
        }

        res.status(200).json(infoData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const infoData = await Information.findOne({
            where: req.params.id
        });
        if (!infoData[0]) {
            res.status(404).json({ message: 'Nothing found' });
            return;
        }

        res.status(200).json(infoData);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;
