// recieve username/password/email and post it to database
async function signupFormHandler(event) {
    event.preventDefault();
    
    const username = document.querySelector('#username').value
    const password = document.querySelector('#password').value
    const email = document.querySelector('#email').value
    const passwordVerify = document.querySelector('#password-verify').value

    console.log(password === passwordVerify)

    if (username && email && password && passwordVerify === password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            const loginResponse = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({
                    username,
                    password
                }),
                headers: { 'Content-Type': 'application/json' }
            });
                if (loginResponse.ok){
                document.location.replace('/dashboard');
                } else {
                    alert(response.statusText)
                }
        }
    }  else if (password !== passwordVerify) {
        alert('Your passwords do not match! Could not sign you up');
    } else {
        alert(response.statusText)
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler)