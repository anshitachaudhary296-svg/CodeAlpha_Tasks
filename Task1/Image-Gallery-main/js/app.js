/**
 * Main Application Bootstrap, Theme Switcher, Upload Modal & Toast System
 */

class AppController {
  constructor() {
    this.currentTheme = localStorage.getItem('app_theme') || 'dark';
    this.toastContainer = null;
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.createToastContainer();
    this.bindEvents();
  }

  // Theme Toggler
  applyTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('app_theme', theme);

    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (themeToggleBtn) {
      themeToggleBtn.innerHTML = theme === 'dark' 
        ? `<i class="fa-solid fa-sun"></i>` 
        : `<i class="fa-solid fa-moon"></i>`;
      themeToggleBtn.title = `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`;
    }
  }

  toggleTheme() {
    const nextTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(nextTheme);
    this.showToast(`Switched to ${nextTheme.toUpperCase()} theme`, nextTheme === 'dark' ? 'fa-moon' : 'fa-sun');
  }

  // Toast Notification System
  createToastContainer() {
    if (!document.querySelector('.toast-container')) {
      this.toastContainer = document.createElement('div');
      this.toastContainer.className = 'toast-container';
      document.body.appendChild(this.toastContainer);
    } else {
      this.toastContainer = document.querySelector('.toast-container');
    }
  }

  showToast(message, iconClass = 'fa-circle-info', duration = 3000) {
    if (!this.toastContainer) this.createToastContainer();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <i class="fa-solid ${iconClass} toast-icon"></i>
      <span>${message}</span>
    `;

    this.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-out');
      toast.addEventListener('animationend', () => toast.remove());
    }, duration);
  }

  // Bind Header, Upload & Help Modals
  bindEvents() {
    // Theme toggle
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) themeBtn.addEventListener('click', () => this.toggleTheme());

    // Search input binding
    const searchInput = document.getElementById('search-input');
    const clearBtn = document.getElementById('clear-search-btn');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const val = e.target.value;
        if (clearBtn) clearBtn.classList.toggle('show', val.length > 0);
        if (window.galleryEngine) window.galleryEngine.setSearchQuery(val);
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        clearBtn.classList.remove('show');
        if (window.galleryEngine) window.galleryEngine.setSearchQuery('');
      });
    }

    // Sort select binding
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        if (window.galleryEngine) window.galleryEngine.setSortBy(e.target.value);
      });
    }

    // View mode buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (window.galleryEngine) window.galleryEngine.setViewMode(btn.dataset.mode);
      });
    });

    // Category Pills
    document.querySelectorAll('.category-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        if (window.galleryEngine) window.galleryEngine.setCategory(pill.dataset.category);
      });
    });

    // Upload Modal bindings
    const openUploadBtn = document.getElementById('open-upload-btn');
    const uploadModal = document.getElementById('upload-modal');
    const closeUploadBtn = document.getElementById('close-upload-btn');
    const uploadForm = document.getElementById('upload-form');

    if (openUploadBtn && uploadModal) {
      openUploadBtn.addEventListener('click', () => uploadModal.classList.add('active'));
    }
    if (closeUploadBtn && uploadModal) {
      closeUploadBtn.addEventListener('click', () => uploadModal.classList.remove('active'));
    }

    // Upload Form Submit
    if (uploadForm) {
      uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('upload-title').value.trim();
        const category = document.getElementById('upload-category').value;
        const author = document.getElementById('upload-author').value.trim() || 'You';
        const urlInput = document.getElementById('upload-url').value.trim();
        const fileInput = document.getElementById('upload-file');

        let imgUrl = urlInput;
        
        // Handle file reader if user selected local image file
        if (fileInput && fileInput.files && fileInput.files[0]) {
          const file = fileInput.files[0];
          const reader = new FileReader();
          reader.onload = (evt) => {
            this.createCustomImage(title, category, author, evt.target.result);
          };
          reader.readAsDataURL(file);
        } else if (imgUrl) {
          this.createCustomImage(title, category, author, imgUrl);
        } else {
          this.showToast('Please provide an Image URL or select a File', 'fa-exclamation-triangle');
          return;
        }

        uploadForm.reset();
        if (uploadModal) uploadModal.classList.remove('active');
      });
    }

    // Keyboard Shortcuts Guide Modal
    const openHelpBtn = document.getElementById('open-help-btn');
    const helpModal = document.getElementById('help-modal');
    const closeHelpBtn = document.getElementById('close-help-btn');

    if (openHelpBtn && helpModal) {
      openHelpBtn.addEventListener('click', () => helpModal.classList.add('active'));
    }
    if (closeHelpBtn && helpModal) {
      closeHelpBtn.addEventListener('click', () => helpModal.classList.remove('active'));
    }
  }

  createCustomImage(title, category, author, imageUrl) {
    const newImage = {
      id: 'custom-' + Date.now(),
      title: title || 'Custom Shot',
      category: category || 'nature',
      url: imageUrl,
      thumbUrl: imageUrl,
      author: author,
      likes: 1,
      views: '1',
      downloads: 0,
      date: new Date().toISOString().split('T')[0],
      tags: ['custom', category, 'my-upload'],
      aspectRatio: '4/3',
      description: `User uploaded image added to ${category} category.`,
      cameraInfo: 'Custom Device Upload'
    };

    if (window.galleryEngine) {
      window.galleryEngine.addNewImage(newImage);
      this.showToast(`"${newImage.title}" added to gallery!`, 'fa-circle-check');
    }
  }
}

// Global Startup Listener
document.addEventListener('DOMContentLoaded', () => {
  window.App = new AppController();
  window.galleryEngine = new GalleryEngine();
  window.lightboxEngine = new LightboxEngine();
});
