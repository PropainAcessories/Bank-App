module.exports = {
    // Helper functions
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear}`;
    },
    isEmployee: employee => {
        const isemployee = false;
        if (!isemployee) {
            return employee = true;
        }
    }
}
