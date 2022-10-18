const editProfile = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-edit').value.trim();
    const name = document.querySelector('#name-edit').value.trim();
    const password = document.querySelector('#password-edit').value.trim();

    if (password.length < 10) {
        alert("Password must be 10 characters");
        return;
    }

    if(email && name && password) {
        const response = await fetch('/api/user/', {
            method: 'PUT',
            body: JSON.stringify({
                email: email.value,
                name: name.value,
                password: password.value
            }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('.edit-form').addEventListener('submit', editProfile);
