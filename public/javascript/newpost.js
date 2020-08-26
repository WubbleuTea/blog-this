async function newPostFormHandler(event) {
    event.preventDefault();
    
    const title = document.querySelector('input[name="title"]').value
    const post_text = document.querySelector('input[name="text"]').value;

    const response = await fetch('/api/posts', {
        method: 'POST',
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

document.querySelector('.new-post').addEventListener('submit', newPostFormHandler)