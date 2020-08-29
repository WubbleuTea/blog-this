async function checkUniqueUsername() {

    const username = document.querySelector('#username').value

    
    const response = await fetch('/api/users', {
        method: 'GET',
        
        headers: { 'Content-Type': 'application/json' }
    }).then(data=> {
        data.forEach(user => {
            console.log(user.username)
            if (user.username = username) {
                return false
            }
        })
    })
       
}

module.exports = checkUniqueUsername