/**
 * Gallery Renderer, Filtering, Search & Sorting Module
 */

class GalleryEngine {
  constructor() {
    this.images = [];
    this.filteredImages = [];
    this.activeCategory = 'all';
    this.searchQuery = '';
    this.sortBy = 'popular';
    this.viewMode = 'grid'; // 'grid' | 'masonry' | 'cards'
    this.favorites = this.loadFavorites();
    
    this.gridContainer = document.getElementById('gallery-grid');
    this.resultCountEl = document.getElementById('result-count');
    this.categoryBarEl = document.getElementById('categories-bar');
    
    this.init();
  }

  init() {
    // Load default images merged with custom user uploads from localStorage
    const savedCustomImages = JSON.parse(localStorage.getItem('custom_gallery_images') || '[]');
    this.images = [...savedCustomImages, ...GALLERY_IMAGES];
    
    this.updateCategoryCounts();
    this.applyFilters();
  }

  loadFavorites() {
    return new Set(JSON.parse(localStorage.getItem('favorite_images') || '[]'));
  }

  saveFavorites() {
    localStorage.setItem('favorite_images', JSON.stringify(Array.from(this.favorites)));
  }

  toggleFavorite(imageId, event) {
    if (event) event.stopPropagation();
    
    if (this.favorites.has(imageId)) {
      this.favorites.delete(imageId);
      if (window.App) window.App.showToast('Removed from Favorites', 'fa-heart-broken');
    } else {
      this.favorites.add(imageId);
      if (window.App) window.App.showToast('Saved to Favorites!', 'fa-heart');
    }
    
    this.saveFavorites();
    this.updateCategoryCounts();
    this.applyFilters();
  }

  setCategory(category) {
    this.activeCategory = category;
    
    // Update active pill state
    const pills = this.categoryBarEl.querySelectorAll('.category-pill');
    pills.forEach(pill => {
      if (pill.dataset.category === category) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });
    
    this.applyFilters();
  }

  setSearchQuery(query) {
    this.searchQuery = query.trim().toLowerCase();
    this.applyFilters();
  }

  setSortBy(sortKey) {
    this.sortBy = sortKey;
    this.applyFilters();
  }

  setViewMode(mode) {
    this.viewMode = mode;
    this.gridContainer.className = `gallery-grid mode-${mode}`;
    
    // Update button visual state
    document.querySelectorAll('.view-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });
  }

  applyFilters() {
    // 1. Filter by category & favorites
    let result = this.images.filter(img => {
      if (this.activeCategory === 'favorites') {
        return this.favorites.has(img.id);
      }
      if (this.activeCategory !== 'all') {
        return img.category === this.activeCategory;
      }
      return true;
    });

    // 2. Filter by search query
    if (this.searchQuery) {
      result = result.filter(img => {
        const titleMatch = img.title.toLowerCase().includes(this.searchQuery);
        const descMatch = img.description.toLowerCase().includes(this.searchQuery);
        const authorMatch = img.author.toLowerCase().includes(this.searchQuery);
        const tagMatch = img.tags.some(tag => tag.toLowerCase().includes(this.searchQuery));
        return titleMatch || descMatch || authorMatch || tagMatch;
      });
    }

    // 3. Apply sorting
    result.sort((a, b) => {
      if (this.sortBy === 'popular') {
        return b.likes - a.likes;
      } else if (this.sortBy === 'newest') {
        return new Date(b.date) - new Date(a.date);
      } else if (this.sortBy === 'oldest') {
        return new Date(a.date) - new Date(b.date);
      } else if (this.sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    this.filteredImages = result;
    this.render();
  }

  updateCategoryCounts() {
    const counts = { all: this.images.length, favorites: this.favorites.size };
    
    this.images.forEach(img => {
      counts[img.category] = (counts[img.category] || 0) + 1;
    });

    document.querySelectorAll('.category-pill').forEach(pill => {
      const cat = pill.dataset.category;
      const countSpan = pill.querySelector('.pill-count');
      if (countSpan) {
        countSpan.textContent = counts[cat] || 0;
      }
    });
  }

  addNewImage(imageObj) {
    this.images.unshift(imageObj);
    
    // Save custom images to localStorage
    const customImages = JSON.parse(localStorage.getItem('custom_gallery_images') || '[]');
    customImages.unshift(imageObj);
    localStorage.setItem('custom_gallery_images', JSON.stringify(customImages));
    
    this.updateCategoryCounts();
    this.applyFilters();
  }

  render() {
    if (!this.gridContainer) return;

    // Update results counter text
    if (this.resultCountEl) {
      this.resultCountEl.innerHTML = `Showing <strong>${this.filteredImages.length}</strong> photos`;
    }

    // Render Empty State if no match
    if (this.filteredImages.length === 0) {
      this.gridContainer.innerHTML = `
        <div class="no-results fade-in">
          <div class="no-results-icon">
            <i class="fa-solid fa-compact-disc"></i>
          </div>
          <h3>No Images Found</h3>
          <p>We couldn't find any photos matching "${this.searchQuery || this.activeCategory}". Try clearing your filters!</p>
          <button class="btn-primary" onclick="galleryEngine.resetFilters()" style="margin:0 auto;">
            <i class="fa-solid fa-rotate-left"></i> Reset All Filters
          </button>
        </div>
      `;
      return;
    }

    // Build Cards HTML
    this.gridContainer.innerHTML = '';
    
    this.filteredImages.forEach((img, index) => {
      const isLiked = this.favorites.has(img.id);
      const card = document.createElement('div');
      card.className = 'gallery-card fade-in';
      card.dataset.id = img.id;
      card.style.animationDelay = `${Math.min(index * 0.04, 0.4)}s`;
      
      card.innerHTML = `
        <div class="card-image-wrapper">
          <img src="${img.thumbUrl || img.url}" alt="${img.title}" loading="lazy" decoding="async">
          
          <div class="card-overlay">
            <div class="card-top-actions">
              <span class="category-badge">${img.category}</span>
              <button class="action-btn ${isLiked ? 'active-like' : ''}" 
                      title="${isLiked ? 'Remove Favorite' : 'Add to Favorite'}"
                      onclick="galleryEngine.toggleFavorite('${img.id}', event)">
                <i class="fa-${isLiked ? 'solid' : 'regular'} fa-heart"></i>
              </button>
            </div>
            
            <div class="card-bottom-info">
              <h4 class="card-title">${img.title}</h4>
              <div class="card-author">
                <div class="author-avatar">${img.author.charAt(0)}</div>
                <span>by ${img.author}</span>
              </div>
              <div class="card-stats">
                <span class="stat-item"><i class="fa-solid fa-heart"></i> ${img.likes}</span>
                <span class="stat-item"><i class="fa-solid fa-eye"></i> ${img.views || '12K'}</span>
                <span class="stat-item"><i class="fa-solid fa-arrow-down"></i> ${img.downloads || '2.5K'}</span>
              </div>
            </div>
          </div>
        </div>
      `;

      // Click card to open lightbox
      card.addEventListener('click', () => {
        if (window.lightboxEngine) {
          window.lightboxEngine.open(this.filteredImages, index);
        }
      });

      this.gridContainer.appendChild(card);
    });
  }

  resetFilters() {
    this.activeCategory = 'all';
    this.searchQuery = '';
    
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.value = '';
    
    const clearBtn = document.getElementById('clear-search-btn');
    if (clearBtn) clearBtn.classList.remove('show');
    
    this.setCategory('all');
  }
}
