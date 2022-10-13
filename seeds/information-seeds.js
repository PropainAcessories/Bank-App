const { Information } = require('../models');

const infoData = [
    {
        bankInfo: "Welcome to Lucky Lucre bank; we offer competitive rates and incentives.",
        loanOfferInfo: "We offer to undercut ANY bank by 0.1% on ANY type of loan",
        checkingInfo: "We offer checking accounts.",
        savingsInfo: "We offer 0.1% more than ANY other competitor; bring us a better offer you just raised our rate."
    }
]

const seedInfo = () => Information.build(infoData);

module.exports = seedInfo;
