async function editFormHandler(event) {
    event.preventDefault();
     // gets the id from the url
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ]

      
    const title = document.querySelector('input[name="title"]').value
    const post_text = document.querySelector('input[name="text"]').value;

    console.log(`title: ${title}, text: ${post_text}` )

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            post_text
        }),
        headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText)
    }
    
}

async function deleteFormHandler(event) {
    event.preventDefault();
     // gets the id from the url
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ]

    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText)
    }
}
document.querySelector('#edit').addEventListener('click', editFormHandler)
document.querySelector('#delete').addEventListener('click', deleteFormHandler)