class UI {
  constructor() {
    this.post = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.cancelButton = document.querySelector('.post-cancel');
    this.formState = 'add';
  }

  showPosts(posts) {
    this.cancelButton.style.display = 'none';

    let htmlContent = '';

    posts.forEach(post => {
      htmlContent += `
        <div class="card mb-3">
          <div class="card-body">
          <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link" data-id="${post.id}">
              <i class="fa fa-pencil"></i>
            </a>

            <a href="#" class="delete card-link" data-id="${post.id}">
              <i class="fa fa-remove"></i>
            </a>
          </div>
        </div>
      `;
    });

    this.post.innerHTML = htmlContent;
  }

  showAlert(message, classes) {
    this.clearAlert();

    // Create div
    const div = document.createElement('div');
    // Add classes
    div.className = classes;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.postsContainer');
    // Insert alert div
    container.insertBefore(div, this.post);

    // Timeout
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  clearAlert() {
    const currentAlert = document.querySelector('.alert');

    if (currentAlert) {
      currentAlert.remove();
    }
  }

  clearFields() {
    this.titleInput.value = '';
    this.bodyInput.value = '';
  }

  // Fill form for edit state
  fillForm(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id;

    this.changeFormState('edit');
  }

  // Change the form state
  changeFormState(type) {
    if(type === 'edit') {
      this.postSubmit.textContent = 'Update Post';
      this.postSubmit.className = 'post-submit btn btn-warning btn-block';

      this.cancelButton.style.display = 'block';
    } else {
      this.postSubmit.textContent = 'Post It';
      this.postSubmit.className = 'post-submit btn btn-primary btn-block';

      // If cancel button is present, remove it
      if (document.querySelector('.post-cancel')) {
        document.querySelector('.post-cancel').remove();
      }

      // Clear ID from hidden field
      this.clearIdInput();
      // Clear text
      this.clearFields();
    }
  }

  clearIdInput() {
    this.idInput.value = '';
  }
}

export const ui = new UI();
