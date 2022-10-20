const currentBalance = document.querySelector('#balance').innerHTML;
const withdrawBtn = document.querySelector('#balanceBtn');
const depositBtn = document.querySelector('#depositBtn');
const accountId = document.querySelector('#accountId').innerHTML;
console.log(accountId);

const transaction = async (event) => {
    event.preventDefault();

    const transaction = document.querySelector('#withdrawal').value.trim();

    const response = await fetch('/api/transaction/', {
        method: 'POST',
        body: JSON.stringify({
            type: "withdrawal",
            amount: transaction,
            account_id: accountId,
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if(response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}

const withdrawal = (event) => {
    event.preventDefault();

    const transaction = document.querySelector('#withdrawal').value.trim();
    console.log(currentBalance - transaction);
    let newBalance = currentBalance - transaction;

    fetch('/api/account/' + `${accountId}`, {
        method: 'PUT',
        body: JSON.stringify({
            balance: newBalance
        }),
        headers: { 'Content-Type': 'application/json' },
    }).then((data) => {
        console.log(data);
        document.location.reload();
    });
};


withdrawBtn.addEventListener('click', transaction, withdrawal);
