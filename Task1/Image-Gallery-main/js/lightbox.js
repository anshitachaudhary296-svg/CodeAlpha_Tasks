/**
 * Lightbox Modal Controller & Navigation Engine
 * Provides Next/Prev controls, Thumbnails, Keyboard Listeners, Zoom & Slideshow
 */

class LightboxEngine {
  constructor() {
    this.images = [];
    this.currentIndex = 0;
    this.isOpen = false;
    this.zoomLevel = 1;
    this.isSlideshowActive = false;
    this.slideshowInterval = null;
    this.slideshowSpeed = 3500; // 3.5 seconds
    this.isInfoDrawerOpen = false;
    
    // Pan state when zoomed
    this.isDragging = false;
    this.panX = 0;
    this.panY = 0;
    this.startX = 0;
    this.startY = 0;

    this.cacheDOM();
    this.bindEvents();
  }

  cacheDOM() {
    this.modalEl = document.getElementById('lightbox-modal');
    this.imgEl = document.getElementById('lightbox-img');
    this.imgStage = document.getElementById('lightbox-stage');
    this.counterEl = document.getElementById('lightbox-counter');
    this.carouselEl = document.getElementById('thumbnail-carousel');
    this.infoDrawerEl = document.getElementById('info-drawer');
    this.slideshowProgressEl = document.getElementById('slideshow-progress');
    this.zoomLabelEl = document.getElementById('zoom-percentage');
    
    // Buttons
    this.prevBtn = document.getElementById('nav-prev');
    this.nextBtn = document.getElementById('nav-next');
    this.closeBtn = document.getElementById('close-lightbox-btn');
    this.zoomInBtn = document.getElementById('zoom-in-btn');
    this.zoomOutBtn = document.getElementById('zoom-out-btn');
    this.zoomResetBtn = document.getElementById('zoom-reset-btn');
    this.slideshowBtn = document.getElementById('toggle-slideshow-btn');
    this.infoBtn = document.getElementById('toggle-info-btn');
    this.downloadBtn = document.getElementById('download-img-btn');
    this.shareBtn = document.getElementById('share-img-btn');
  }

  bindEvents() {
    // Navigation arrow clicks
    if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());
    if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.close());
    
    // Zoom controls
    if (this.zoomInBtn) this.zoomInBtn.addEventListener('click', () => this.zoom(0.25));
    if (this.zoomOutBtn) this.zoomOutBtn.addEventListener('click', () => this.zoom(-0.25));
    if (this.zoomResetBtn) this.zoomResetBtn.addEventListener('click', () => this.resetZoom());
    
    // Slideshow & Info drawer toggles
    if (this.slideshowBtn) this.slideshowBtn.addEventListener('click', () => this.toggleSlideshow());
    if (this.infoBtn) this.infoBtn.addEventListener('click', () => this.toggleInfoDrawer());
    
    // Actions
    if (this.downloadBtn) this.downloadBtn.addEventListener('click', () => this.downloadCurrentImage());
    if (this.shareBtn) this.shareBtn.addEventListener('click', () => this.shareCurrentImage());

    // Keyboard Navigation Listeners
    document.addEventListener('keydown', (e) => {
      if (!this.isOpen) return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          this.prev();
          break;
        case 'ArrowRight':
          e.preventDefault();
          this.next();
          break;
        case 'Escape':
          e.preventDefault();
          if (this.isInfoDrawerOpen) {
            this.toggleInfoDrawer(false);
          } else {
            this.close();
          }
          break;
        case ' ': // Spacebar for Slideshow
          e.preventDefault();
          this.toggleSlideshow();
          break;
        case '+':
        case '=':
          e.preventDefault();
          this.zoom(0.25);
          break;
        case '-':
        case '_':
          e.preventDefault();
          this.zoom(-0.25);
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          this.toggleFullscreen();
          break;
      }
    });

    // Touch Swipe Gestures for Mobile Lightbox Navigation
    let touchStartX = 0;
    let touchEndX = 0;

    if (this.modalEl) {
      this.modalEl.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      this.modalEl.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const swipeDistance = touchEndX - touchStartX;
        
        if (swipeDistance > 60) {
          this.prev(); // Swipe Right -> Prev Image
        } else if (swipeDistance < -60) {
          this.next(); // Swipe Left -> Next Image
        }
      }, { passive: true });
    }
  }

  open(imagesList, index = 0) {
    this.images = imagesList;
    this.currentIndex = index;
    this.isOpen = true;
    
    this.modalEl.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent page scroll
    
    this.renderCurrent();
    this.renderThumbnails();
  }

  close() {
    this.isOpen = false;
    this.stopSlideshow();
    this.resetZoom();
    
    this.modalEl.classList.remove('active');
    document.body.style.overflow = ''; // Restore page scroll
    
    if (this.isInfoDrawerOpen) {
      this.toggleInfoDrawer(false);
    }
  }

  prev() {
    if (this.images.length === 0) return;
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.resetZoom();
    this.renderCurrent();
    this.updateThumbnails();
    if (this.isSlideshowActive) this.restartSlideshowTimer();
  }

  next() {
    if (this.images.length === 0) return;
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.resetZoom();
    this.renderCurrent();
    this.updateThumbnails();
    if (this.isSlideshowActive) this.restartSlideshowTimer();
  }

  jumpTo(index) {
    if (index >= 0 && index < this.images.length) {
      this.currentIndex = index;
      this.resetZoom();
      this.renderCurrent();
      this.updateThumbnails();
      if (this.isSlideshowActive) this.restartSlideshowTimer();
    }
  }

  renderCurrent() {
    const current = this.images[this.currentIndex];
    if (!current) return;

    // Apply fade transition
    this.imgEl.style.opacity = '0.3';
    this.imgEl.src = current.url;

    this.imgEl.onload = () => {
      this.imgEl.style.opacity = '1';
    };

    // Update Counter
    if (this.counterEl) {
      this.counterEl.innerHTML = `<span class="current-idx">${this.currentIndex + 1}</span> / ${this.images.length}`;
    }

    // Update Info Drawer content if available
    this.updateInfoDrawer(current);
  }

  renderThumbnails() {
    if (!this.carouselEl) return;
    this.carouselEl.innerHTML = '';

    this.images.forEach((img, idx) => {
      const thumb = document.createElement('div');
      thumb.className = `thumb-item ${idx === this.currentIndex ? 'active' : ''}`;
      thumb.innerHTML = `<img src="${img.thumbUrl || img.url}" alt="${img.title}">`;
      
      thumb.addEventListener('click', () => this.jumpTo(idx));
      this.carouselEl.appendChild(thumb);
    });

    this.scrollActiveThumbIntoView();
  }

  updateThumbnails() {
    if (!this.carouselEl) return;
    const thumbs = this.carouselEl.querySelectorAll('.thumb-item');
    thumbs.forEach((t, i) => {
      t.classList.toggle('active', i === this.currentIndex);
    });
    this.scrollActiveThumbIntoView();
  }

  scrollActiveThumbIntoView() {
    if (!this.carouselEl) return;
    const activeThumb = this.carouselEl.querySelector('.thumb-item.active');
    if (activeThumb) {
      activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  // Zoom Engine
  zoom(delta) {
    this.zoomLevel = Math.min(Math.max(0.5, this.zoomLevel + delta), 3.5);
    this.applyZoomTransform();
  }

  resetZoom() {
    this.zoomLevel = 1;
    this.panX = 0;
    this.panY = 0;
    this.applyZoomTransform();
  }

  applyZoomTransform() {
    if (this.imgEl) {
      this.imgEl.style.transform = `scale(${this.zoomLevel}) translate(${this.panX}px, ${this.panY}px)`;
    }
    if (this.zoomLabelEl) {
      this.zoomLabelEl.textContent = `${Math.round(this.zoomLevel * 100)}%`;
    }
  }

  // Slideshow Logic
  toggleSlideshow() {
    if (this.isSlideshowActive) {
      this.stopSlideshow();
    } else {
      this.startSlideshow();
    }
  }

  startSlideshow() {
    this.isSlideshowActive = true;
    if (this.slideshowBtn) {
      this.slideshowBtn.classList.add('active');
      this.slideshowBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
      this.slideshowBtn.title = "Pause Slideshow (Space)";
    }
    if (window.App) window.App.showToast('Slideshow Started', 'fa-play');
    this.restartSlideshowTimer();
  }

  stopSlideshow() {
    this.isSlideshowActive = false;
    if (this.slideshowInterval) clearInterval(this.slideshowInterval);
    if (this.slideshowBtn) {
      this.slideshowBtn.classList.remove('active');
      this.slideshowBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
      this.slideshowBtn.title = "Start Slideshow (Space)";
    }
    if (this.slideshowProgressEl) {
      this.slideshowProgressEl.style.width = '0%';
    }
  }

  restartSlideshowTimer() {
    if (this.slideshowInterval) clearInterval(this.slideshowInterval);
    if (!this.isSlideshowActive) return;

    let startTime = Date.now();
    this.slideshowInterval = setInterval(() => {
      let elapsed = Date.now() - startTime;
      let progress = (elapsed / this.slideshowSpeed) * 100;
      
      if (this.slideshowProgressEl) {
        this.slideshowProgressEl.style.width = `${Math.min(progress, 100)}%`;
      }

      if (elapsed >= this.slideshowSpeed) {
        this.next();
      }
    }, 50);
  }

  // Info Drawer Sidebar
  toggleInfoDrawer(forceState) {
    this.isInfoDrawerOpen = forceState !== undefined ? forceState : !this.isInfoDrawerOpen;
    if (this.infoDrawerEl) {
      this.infoDrawerEl.classList.toggle('open', this.isInfoDrawerOpen);
    }
    if (this.infoBtn) {
      this.infoBtn.classList.toggle('active', this.isInfoDrawerOpen);
    }
  }

  updateInfoDrawer(img) {
    if (!this.infoDrawerEl) return;
    
    const titleEl = document.getElementById('drawer-photo-title');
    const descEl = document.getElementById('drawer-photo-desc');
    const authorEl = document.getElementById('drawer-photo-author');
    const cameraEl = document.getElementById('drawer-photo-camera');
    const tagsEl = document.getElementById('drawer-photo-tags');

    if (titleEl) titleEl.textContent = img.title;
    if (descEl) descEl.textContent = img.description || 'No description provided.';
    if (authorEl) authorEl.textContent = img.author;
    if (cameraEl) cameraEl.textContent = img.cameraInfo || 'Standard Digital Sensor';

    if (tagsEl) {
      tagsEl.innerHTML = img.tags.map(tag => `<span class="tag-pill">#${tag}</span>`).join('');
    }
  }

  downloadCurrentImage() {
    const current = this.images[this.currentIndex];
    if (!current) return;
    
    // Create temporary download link
    const a = document.createElement('a');
    a.href = current.url;
    a.download = `${current.title.toLowerCase().replace(/\s+/g, '-')}.jpg`;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    if (window.App) window.App.showToast('Starting High-Res Download...', 'fa-download');
  }

  shareCurrentImage() {
    const current = this.images[this.currentIndex];
    if (!current) return;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(current.url);
      if (window.App) window.App.showToast('Image URL Copied to Clipboard!', 'fa-link');
    }
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      this.modalEl.requestFullscreen().catch(err => console.log(err));
    } else {
      document.exitFullscreen().catch(err => console.log(err));
    }
  }
}
