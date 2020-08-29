async function checkUniqueUsername() {

    const username = document.querySelector('#username').value

    
    const response = await fetch('/api/users', {
        method: 'GET',
        
        headers: { 'Content-Type': 'application/json' }
    })
    response.forEach(user => {
        console.log(user.username)
        if (user.username = username) {
            return false
        }
    })
       
}

// recieve username/password/email and post it to database
async function signupFormHandler(event) {
    event.preventDefault();
    
    const username = document.querySelector('#username').value
    const password = document.querySelector('#password').value
    const email = document.querySelector('#email').value
    const passwordVerify = document.querySelector('#password-verify').value



    if (username && email && password && passwordVerify === password && checkUniqueUsername) {
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
    } else if (!checkUniqueUsername) {
        alert('Username is already taken')
    }
     else {
        alert(response.statusText)
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler)