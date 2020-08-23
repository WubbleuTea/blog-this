async function loginFormHandler(event) {
    event.preventDefault();
    
    const username = document.querySelector('#username').value
    const password = document.querySelector('#password').value


    console.log(`username: ${username}, password: ${password}` )

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText)
        }
    }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler)