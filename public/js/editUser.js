const editHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#name-edit').value.trim();
    const email = document.querySelector('#email-edit').value.trim();
    const password = document.querySelector('#password-edit').value.trim();
   

   
    // Go back and handle having multiple
    if (name && email && password) {
        const userId = localStorage.getItem('userId')
        const response = await fetch('/api/user/' + userId, {
           method: 'PUT',
           body: JSON.stringify({
            name,
            email,
            password,
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

document.querySelector('.edit-form').addEventListener('submit', editHandler);
