const logout = document.querySelector('#logout');

const logOut = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/user/logout', {
        method: 'POST',
        headers: {"Content-Type": "application/json"}
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}

logout.addEventListener('click', logOut);
