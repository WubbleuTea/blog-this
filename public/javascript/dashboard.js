function newPostFormHandler() {
    event.preventDefault();

    document.location.replace('/newpost')
};

function editPostFormHandler() {
    event.preventDefault();

    document.location.replace(`/edit/${id}`)
};

document.querySelector('#edit-post').addEventListener('click', editPostFormHandler);
document.querySelector('#new-post').addEventListener('click', newPostFormHandler);