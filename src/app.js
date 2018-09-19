import { http } from './http';
import { ui } from './ui';

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

//Event listener for add posts
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Listen for delete
document.querySelector('#posts').addEventListener('click', deletePost);

// Listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit);

// Listen for cancel
document.querySelector('.card-form').addEventListener('click', cancelEdit);

async function getPosts() {
  try {
    const posts = await http.get('http://localhost:3000/posts');
    ui.showPosts(posts);
  } catch (error) {
    console.log(error);
  }
}

// Submit post
async function submitPost() {
  try {
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;
    const id = document.querySelector('#id').value;

    const data = {
      title,
      body
    };

    // Validate input
    if(title === '' || body === '') {
      ui.showAlert('Please fill in all fields', 'alert alert-danger');
    } else {
      if(id === '') {
        // Create post
        await http.post('http://localhost:3000/posts', data);
        ui.showAlert('Post added', 'alert alert-success');
        ui.clearFields();
        getPosts();
      } else {
        // Update post
        await http.put(`http://localhost:3000/posts/${id}`, data);
        ui.showAlert('Post updated', 'alert alert-success');
        ui.changeFormState('add');
        getPosts();
      }
    }  
  } catch (error) {
    console.log(error);
  }
}

// Delete post
async function deletePost(e) {
  try {
    if (e.target.parentElement.classList.contains('delete')) {
      const id = e.target.parentElement.dataset.id;
      if (confirm('Are you sure?')) {
        const data = await http.delete(`http://localhost:3000/posts/${id}`);
        ui.showAlert('Post Removed!', 'alert alert-success');
        getPosts();
      }
    }
  } catch (error) {
    console.log(error);
  }
}

// Enable edit state
async function enableEdit(e) {
  try {
    if (e.target.parentElement.classList.contains('edit')) {
      const id = e.target.parentElement.dataset.id;
      const title =
        e.target.parentElement.previousElementSibling.previousElementSibling
          .textContent;
      const body = e.target.parentElement.previousElementSibling.textContent;
      const data = {
        id,
        title,
        body
      };

      // Fill the form with current post
      ui.fillForm(data);
    }
    e.preventDefault();
  } catch (error) {}
}

function cancelEdit(e) {
  if(e.target.classList.contains('post-cancel')) {
    ui.changeFormState('add');
  }

  e.preventDefault();
}
