const userId = document.querySelector('#userId').innerHTML;
console.log(userId)
const editProfile = async (event) => {
    event.preventDefault();


    const email = document.querySelector('#email-edit').value.trim();
    const name = document.querySelector('#name-edit').value.trim();
    const password = document.querySelector('#password-edit').value.trim();
    console.log(userId)
    if (password.length < 10) {
        alert("Password must be 10 characters");
        return;
    }

    if(email && name && password) {
        const response = await fetch('/api/user/' + `${userId}`, {
            method: 'PUT',
            body: JSON.stringify({
                email: email,
                name: name,
                password: password
            }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
        console.log(userId);
    }
};

document.querySelector('.edit-form').addEventListener('submit', editProfile);
