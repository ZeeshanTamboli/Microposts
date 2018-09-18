import { http } from './http';
import { ui } from './ui';

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

//Event listener for add posts
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Listen for delete
document.querySelector('#posts').addEventListener('click', deletePost);

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

    const data = {
      title,
      body
    };

    await http.post('http://localhost:3000/posts', data);
    ui.showAlert('Post added', 'alert alert-success');
    ui.clearFields();
    getPosts();
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
