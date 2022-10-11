const signUpHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-signup').value().trim();
    const name = document.querySelector('#name-signup').value().trim();
    const password = document.querySelector('#password-signup').value().trim();
    const passwordConfirm = document.querySelector('#confirm-password').value().trim();

    if (email && name && password && passwordConfirm) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                email,
                name,
                password,
                passwordConfirm
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok && password === passwordConfirm) {
            document.location.replace('/home');
        } else {
            alert(response.statusText);
        }
    }

};

document.querySelector('.signup-form').addEventListener('submit', signUpHandler);
