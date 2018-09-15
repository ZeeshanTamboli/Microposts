class UI {
  constructor() {
    this.post = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.formState = 'add';
  }

  showPosts(posts) {
    let htmlContent = '';

    posts.forEach(post => {
      htmlContent += `
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">
              ${post.title}
            </h4>
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

    if(currentAlert) {
      currentAlert.remove();
    }
  }

  clearFields() {
    this.titleInput.value = '';
    this.bodyInput.value = '';
  }
}

export const ui = new UI();