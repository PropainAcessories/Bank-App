const currentBalance = document.querySelector('#balance').innerHTML;
const withdrawBtn = document.querySelector('#balanceBtn');
const depositBtn = document.querySelector('#depositBtn');


const withdrawal = (event) => {
    event.preventDefault();

    const transaction = document.querySelector('#withdrawal').value.trim();
    console.log(currentBalance - transaction);
    let newBalance = currentBalance - transaction;

    fetch('/api/account/1', {
        method: 'PUT',
        body: JSON.stringify({
            balance: newBalance
        }),
        headers: { 'Content-Type': 'application/json' },
    }).then((data) => {
        console.log(data);
        document.location.reload();
    })
}

withdrawBtn.addEventListener('click', withdrawal);
