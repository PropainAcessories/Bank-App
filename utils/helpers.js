module.exports = {
    // Helper functions
    current_date: () => {
        const dayjs = require('dayjs');
        let now = dayjs().format('MMMM-DD-YYYY').toString();

        console.log(now);

        return now;
    },
    isEmployee: employee => {
        const isemployee = false;
        if (!isemployee) {
            return employee = true;
        }
    }
}
