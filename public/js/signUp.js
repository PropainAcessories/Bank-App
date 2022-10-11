const signUpHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-signup').value.trim();
    const name = document.querySelector('#name-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const user_type = document.querySelector('#user-type').value.trim();
    //const passwordConfirm = document.querySelector('#confirm-password').value().trim();

    if (email && name && user_type && password) {
        const response = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({
                email,
                name,
                user_type,
                password
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

document.querySelector('.signup-form').addEventListener('submit', signUpHandler);
