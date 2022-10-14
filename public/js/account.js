const createAccount = async (event) => {
    event.preventDefault();

    const account_type = document.querySelector('#account-type').value.trim();
    const balance = document.querySelector('#initial-deposit').value.trim();
    const pin = document.querySelector('#pin').value.trim();

    if (!account_type || !pin || !balance) {
        alert('Fields Empty');
    }

    if (pin.length !== 4) {
        alert('Pin must be 4 numbers');
        return;
    }

    const response = await fetch('/api/account/create', {
        method: 'POST',
        body: JSON.stringify({
            account_type,
            balance,
            pin
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if(response.ok) {
        document.location.replace('/accounts');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('.signup-form').addEventListener('submit', createAccount);
