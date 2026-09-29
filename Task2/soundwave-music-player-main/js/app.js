
document.addEventListener("DOMContentLoaded", () => {

  const audio = document.getElementById("audio-element");
  const playBtn = document.getElementById("play-btn");
  const playIcon = document.getElementById("play-icon");
  const pauseIcon = document.getElementById("pause-icon");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const shuffleBtn = document.getElementById("shuffle-btn");
  const repeatBtn = document.getElementById("repeat-btn");
  const repeatIcon = document.getElementById("repeat-icon");
  const repeatBadge = document.getElementById("repeat-badge");

  const progressBar = document.getElementById("progress-bar");
  const progressFilled = document.getElementById("progress-filled");
  const currentTimeEl = document.getElementById("current-time");
  const totalDurationEl = document.getElementById("total-duration");
  const progressHoverTooltip = document.getElementById("progress-tooltip");

  const volumeSlider = document.getElementById("volume-slider");
  const volumeFilled = document.getElementById("volume-filled");
  const volumeBtn = document.getElementById("volume-btn");
  const volumeHighIcon = document.getElementById("volume-high-icon");
  const volumeLowIcon = document.getElementById("volume-low-icon");
  const volumeMutedIcon = document.getElementById("volume-muted-icon");

  const trackTitle = document.getElementById("track-title");
  const trackArtist = document.getElementById("track-artist");
  const trackAlbum = document.getElementById("track-album");
  const trackGenre = document.getElementById("track-genre");
  const albumCover = document.getElementById("album-cover");
  const vinylRecord = document.getElementById("vinyl-record");
  const ambientGlow = document.getElementById("ambient-glow");
  const likeBtn = document.getElementById("like-btn");
  const likeIcon = document.getElementById("like-icon");

  const playlistContainer = document.getElementById("playlist-items");
  const playlistSearch = document.getElementById("playlist-search");
  const totalTracksBadge = document.getElementById("total-tracks-badge");
  const totalPlaytimeBadge = document.getElementById("total-playtime-badge");
  const fileUploadInput = document.getElementById("file-upload");
  const uploadDropZone = document.getElementById("upload-dropzone");

  const speedSelect = document.getElementById("speed-select");
  const visualizerModeBtn = document.getElementById("visualizer-mode-btn");
  const visualizerCanvas = document.getElementById("visualizer-canvas");

  const shortcutsModal = document.getElementById("shortcuts-modal");
  const shortcutsBtn = document.getElementById("shortcuts-btn");
  const closeShortcutsBtn = document.getElementById("close-shortcuts-btn");


  let playlist = [...initialPlaylist];
  let currentIndex = 0;
  let isPlaying = false;
  let isShuffle = false;
  let repeatMode = "all";
  let previousVolume = 0.8;
  let favorites = JSON.parse(localStorage.getItem("soundwave_favorites") || "[]");
  let visualizerMode = "bars";


  const visualizer = new AudioVisualizer(visualizerCanvas, audio);


  audio.volume = previousVolume;
  volumeSlider.value = previousVolume * 100;
  updateVolumeUI(previousVolume);


  renderPlaylist();
  loadTrack(currentIndex, false);


  function loadTrack(index, autoPlay = true) {
    if (index < 0 || index >= playlist.length) return;

    currentIndex = index;
    const track = playlist[currentIndex];


    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;
    trackAlbum.textContent = track.album || "Single";
    trackGenre.textContent = track.genre || "Music";
    albumCover.src = track.cover;
    albumCover.alt = `${track.title} - ${track.artist}`;


    const accent = track.accentColor || "#a855f7";
    ambientGlow.style.background = `radial-gradient(circle at 50% 40%, ${accent}44 0%, ${accent}11 50%, transparent 80%)`;
    document.documentElement.style.setProperty("--theme-accent", accent);
    visualizer.setAccentColor(accent);


    updateLikeState(track.id);


    progressBar.value = 0;
    progressFilled.style.width = "0%";
    currentTimeEl.textContent = "0:00";
    totalDurationEl.textContent = track.duration || "0:00";


    audio.src = track.src;
    audio.load();


    updateActivePlaylistItem();

    if (autoPlay) {
      playAudio();
    }
  }

  function playAudio() {
    visualizer.start();
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          isPlaying = true;
          updatePlayPauseUI();
          vinylRecord.classList.add("playing");
          albumCover.classList.add("playing");
        })
        .catch((err) => {
          console.warn("Playback error or autoplay prevented:", err);
          isPlaying = false;
          updatePlayPauseUI();
          vinylRecord.classList.remove("playing");
          albumCover.classList.remove("playing");
        });
    }
  }

  function pauseAudio() {
    audio.pause();
    isPlaying = false;
    updatePlayPauseUI();
    vinylRecord.classList.remove("playing");
    albumCover.classList.remove("playing");
    visualizer.stop();
  }

  function togglePlay() {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  }

  function nextTrack() {
    if (playlist.length === 0) return;

    if (isShuffle) {
      let randomIndex;
      if (playlist.length === 1) {
        randomIndex = 0;
      } else {
        do {
          randomIndex = Math.floor(Math.random() * playlist.length);
        } while (randomIndex === currentIndex);
      }
      loadTrack(randomIndex, true);
    } else {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= playlist.length) {
        if (repeatMode === "off") {
          pauseAudio();
          loadTrack(0, false);
          return;
        }
        nextIndex = 0;
      }
      loadTrack(nextIndex, true);
    }
  }

  function prevTrack() {

    if (audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }

    if (playlist.length === 0) return;

    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
      prevIndex = playlist.length - 1;
    }
    loadTrack(prevIndex, true);
  }

  function updatePlayPauseUI() {
    if (isPlaying) {
      playIcon.classList.add("hidden");
      pauseIcon.classList.remove("hidden");
      playBtn.setAttribute("aria-label", "Pause");
      playBtn.classList.add("is-active");
    } else {
      playIcon.classList.remove("hidden");
      pauseIcon.classList.add("hidden");
      playBtn.setAttribute("aria-label", "Play");
      playBtn.classList.remove("is-active");
    }
  }


  audio.addEventListener("loadedmetadata", () => {
    if (audio.duration && !isNaN(audio.duration)) {
      totalDurationEl.textContent = formatTime(audio.duration);
    }
  });

  audio.addEventListener("timeupdate", () => {
    if (audio.duration && !isNaN(audio.duration)) {
      const progressPercent = (audio.currentTime / audio.duration) * 100;
      progressBar.value = progressPercent;
      progressFilled.style.width = `${progressPercent}%`;
      currentTimeEl.textContent = formatTime(audio.currentTime);
    }
  });


  audio.addEventListener("ended", () => {
    if (repeatMode === "one") {
      audio.currentTime = 0;
      playAudio();
    } else {
      nextTrack();
    }
  });


  audio.addEventListener("error", (e) => {
    console.error("Audio error encountered:", e);
    showToast("Error loading audio track. Trying next track...", "error");
    setTimeout(() => {
      nextTrack();
    }, 1500);
  });


  progressBar.addEventListener("input", (e) => {
    if (audio.duration && !isNaN(audio.duration)) {
      const seekTime = (e.target.value / 100) * audio.duration;
      currentTimeEl.textContent = formatTime(seekTime);
      progressFilled.style.width = `${e.target.value}%`;
    }
  });

  progressBar.addEventListener("change", (e) => {
    if (audio.duration && !isNaN(audio.duration)) {
      audio.currentTime = (e.target.value / 100) * audio.duration;
    }
  });


  const progressContainer = document.querySelector(".progress-bar-wrapper");
  if (progressContainer) {
    progressContainer.addEventListener("mousemove", (e) => {
      if (!audio.duration || isNaN(audio.duration)) return;
      const rect = progressContainer.getBoundingClientRect();
      const offsetX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const percentage = offsetX / rect.width;
      const hoverTime = percentage * audio.duration;

      progressHoverTooltip.textContent = formatTime(hoverTime);
      progressHoverTooltip.style.left = `${offsetX}px`;
      progressHoverTooltip.classList.add("visible");
    });

    progressContainer.addEventListener("mouseleave", () => {
      progressHoverTooltip.classList.remove("visible");
    });
  }


  volumeSlider.addEventListener("input", (e) => {
    const val = parseFloat(e.target.value) / 100;
    audio.volume = val;
    if (val > 0) previousVolume = val;
    updateVolumeUI(val);
  });

  volumeBtn.addEventListener("click", () => {
    if (audio.volume > 0) {
      previousVolume = audio.volume;
      audio.volume = 0;
      volumeSlider.value = 0;
      updateVolumeUI(0);
    } else {
      const restoreVol = previousVolume > 0 ? previousVolume : 0.8;
      audio.volume = restoreVol;
      volumeSlider.value = restoreVol * 100;
      updateVolumeUI(restoreVol);
    }
  });

  function updateVolumeUI(val) {
    volumeFilled.style.width = `${val * 100}%`;
    if (val === 0) {
      volumeHighIcon.classList.add("hidden");
      volumeLowIcon.classList.add("hidden");
      volumeMutedIcon.classList.remove("hidden");
    } else if (val < 0.5) {
      volumeHighIcon.classList.add("hidden");
      volumeLowIcon.classList.remove("hidden");
      volumeMutedIcon.classList.add("hidden");
    } else {
      volumeHighIcon.classList.remove("hidden");
      volumeLowIcon.classList.add("hidden");
      volumeMutedIcon.classList.add("hidden");
    }
  }


  shuffleBtn.addEventListener("click", () => {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle("active", isShuffle);
    showToast(isShuffle ? "Shuffle Mode Enabled" : "Shuffle Mode Disabled");
  });

  repeatBtn.addEventListener("click", () => {
    if (repeatMode === "all") {
      repeatMode = "one";
      repeatBtn.classList.add("active");
      repeatBadge.textContent = "1";
      repeatBadge.classList.remove("hidden");
      showToast("Repeating Current Song");
    } else if (repeatMode === "one") {
      repeatMode = "off";
      repeatBtn.classList.remove("active");
      repeatBadge.classList.add("hidden");
      showToast("Repeat Disabled");
    } else {
      repeatMode = "all";
      repeatBtn.classList.add("active");
      repeatBadge.classList.add("hidden");
      showToast("Repeating Entire Playlist");
    }
  });


  speedSelect.addEventListener("change", (e) => {
    const rate = parseFloat(e.target.value);
    audio.playbackRate = rate;
    showToast(`Speed set to ${rate}x`);
  });


  visualizerModeBtn.addEventListener("click", () => {
    if (visualizerMode === "bars") {
      visualizerMode = "wave";
      visualizerModeBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M2 12h5l3-8 4 16 3-8h5" />
        </svg>
        <span>Wave Mode</span>
      `;
    } else {
      visualizerMode = "bars";
      visualizerModeBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="2" y="10" width="3" height="10" rx="1" />
          <rect x="8" y="4" width="3" height="16" rx="1" />
          <rect x="14" y="8" width="3" height="12" rx="1" />
          <rect x="20" y="2" width="3" height="18" rx="1" />
        </svg>
        <span>Bars Mode</span>
      `;
    }
    visualizer.setMode(visualizerMode);
  });


  likeBtn.addEventListener("click", () => {
    const currentTrack = playlist[currentIndex];
    if (!currentTrack) return;

    const favIndex = favorites.indexOf(currentTrack.id);
    if (favIndex > -1) {
      favorites.splice(favIndex, 1);
      showToast(`Removed from Favorites`);
    } else {
      favorites.push(currentTrack.id);
      showToast(`Added to Favorites! ❤️`);
    }

    localStorage.setItem("soundwave_favorites", JSON.stringify(favorites));
    updateLikeState(currentTrack.id);
    renderPlaylist();
  });

  function updateLikeState(trackId) {
    const isFav = favorites.includes(trackId);
    likeBtn.classList.toggle("liked", isFav);
    if (isFav) {
      likeIcon.setAttribute("fill", "#ec4899");
      likeIcon.setAttribute("stroke", "#ec4899");
    } else {
      likeIcon.setAttribute("fill", "none");
      likeIcon.setAttribute("stroke", "currentColor");
    }
  }


  function renderPlaylist(filterText = "") {
    playlistContainer.innerHTML = "";

    const query = filterText.trim().toLowerCase();
    const filteredTracks = playlist.filter((track) => {
      return (
        track.title.toLowerCase().includes(query) ||
        track.artist.toLowerCase().includes(query) ||
        (track.genre && track.genre.toLowerCase().includes(query))
      );
    });

    if (filteredTracks.length === 0) {
      playlistContainer.innerHTML = `
        <div class="playlist-empty">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <p>No songs found matching "${filterText}"</p>
        </div>
      `;
      return;
    }

    filteredTracks.forEach((track) => {
      const realIndex = playlist.findIndex((t) => t.id === track.id);
      const isActive = realIndex === currentIndex;
      const isFav = favorites.includes(track.id);

      const item = document.createElement("div");
      item.className = `playlist-item ${isActive ? "active" : ""}`;
      item.dataset.index = realIndex;

      item.innerHTML = `
        <div class="item-left">
          <div class="item-cover-wrapper">
            <img src="${track.cover}" alt="${track.title}" class="item-cover" loading="lazy" />
            <div class="item-playing-overlay">
              ${isActive && isPlaying
          ? `<div class="mini-equalizer"><span></span><span></span><span></span></div>`
          : `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>`
        }
            </div>
          </div>
          <div class="item-details">
            <h4 class="item-title">${escapeHTML(track.title)}</h4>
            <p class="item-artist">${escapeHTML(track.artist)}</p>
          </div>
        </div>
        <div class="item-right">
          ${isFav ? `<span class="item-fav-icon">♥</span>` : ""}
          <span class="item-duration">${track.duration || "0:00"}</span>
        </div>
      `;

      item.addEventListener("click", () => {
        if (currentIndex === realIndex) {
          togglePlay();
        } else {
          loadTrack(realIndex, true);
        }
      });

      playlistContainer.appendChild(item);
    });

    updatePlaylistSummary();
  }

  function updateActivePlaylistItem() {
    const items = playlistContainer.querySelectorAll(".playlist-item");
    items.forEach((item) => {
      const idx = parseInt(item.dataset.index, 10);
      const isActive = idx === currentIndex;
      item.classList.toggle("active", isActive);

      const overlay = item.querySelector(".item-playing-overlay");
      if (overlay) {
        if (isActive && isPlaying) {
          overlay.innerHTML = `<div class="mini-equalizer"><span></span><span></span><span></span></div>`;
        } else {
          overlay.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
        }
      }
    });
  }

  function updatePlaylistSummary() {
    totalTracksBadge.textContent = `${playlist.length} track${playlist.length === 1 ? "" : "s"}`;

    let totalSeconds = playlist.reduce((acc, t) => acc + (t.durationSec || 240), 0);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    totalPlaytimeBadge.textContent = `${mins}m ${secs}s`;
  }


  playlistSearch.addEventListener("input", (e) => {
    renderPlaylist(e.target.value);
  });


  const customCoverColors = ["#8b5cf6", "#06b6d4", "#f43f5e", "#10b981", "#f59e0b", "#ec4899"];

  function handleUploadedFiles(files) {
    if (!files || files.length === 0) return;

    let addedCount = 0;
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("audio/") && !file.name.match(/\.(mp3|wav|ogg|flac|m4a|aac)$/i)) {
        return;
      }

      const fileUrl = URL.createObjectURL(file);
      const cleanName = file.name.replace(/\.[^/.]+$/, "");
      const parts = cleanName.split("-");
      let title = cleanName;
      let artist = "Local Artist";

      if (parts.length >= 2) {
        artist = parts[0].trim();
        title = parts.slice(1).join("-").trim();
      }

      const randomColor = customCoverColors[Math.floor(Math.random() * customCoverColors.length)];


      const svgCover = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${encodeURIComponent(randomColor)}"/><stop offset="100%" stop-color="%23111827"/></linearGradient></defs><rect width="300" height="300" fill="url(%23g)"/><circle cx="150" cy="150" r="70" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" stroke-width="4"/><path d="M140 120 L180 150 L140 180 Z" fill="white"/><text x="150" y="250" fill="white" font-family="sans-serif" font-weight="bold" font-size="16" text-anchor="middle">LOCAL TRACK</text></svg>`;

      const newTrack = {
        id: `upload-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        title: title,
        artist: artist,
        album: "Local Audio Upload",
        duration: "0:00",
        durationSec: 180,
        cover: svgCover,
        src: fileUrl,
        genre: "Custom Audio",
        accentColor: randomColor
      };

      playlist.push(newTrack);
      addedCount++;
    });

    if (addedCount > 0) {
      renderPlaylist();
      showToast(`Added ${addedCount} song${addedCount === 1 ? "" : "s"} to playlist! 🎉`);

      loadTrack(playlist.length - addedCount, true);
    } else {
      showToast("Please select valid audio files (MP3, WAV, OGG, FLAC)", "warning");
    }
  }

  fileUploadInput.addEventListener("change", (e) => {
    handleUploadedFiles(e.target.files);
    fileUploadInput.value = "";
  });


  if (uploadDropZone) {
    ["dragenter", "dragover"].forEach((eventName) => {
      uploadDropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        uploadDropZone.classList.add("drag-hover");
      });
    });

    ["dragleave", "drop"].forEach((eventName) => {
      uploadDropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        uploadDropZone.classList.remove("drag-hover");
      });
    });

    uploadDropZone.addEventListener("drop", (e) => {
      const dt = e.dataTransfer;
      if (dt && dt.files) {
        handleUploadedFiles(dt.files);
      }
    });
  }


  playBtn.addEventListener("click", togglePlay);
  nextBtn.addEventListener("click", nextTrack);
  prevBtn.addEventListener("click", prevTrack);

  document.addEventListener("keydown", (e) => {

    if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT") return;

    switch (e.code) {
      case "Space":
        e.preventDefault();
        togglePlay();
        break;
      case "ArrowRight":
        e.preventDefault();
        if (e.shiftKey) {
          nextTrack();
        } else {
          audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 5);
        }
        break;
      case "ArrowLeft":
        e.preventDefault();
        if (e.shiftKey) {
          prevTrack();
        } else {
          audio.currentTime = Math.max(0, audio.currentTime - 5);
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        const newVolUp = Math.min(1, audio.volume + 0.05);
        audio.volume = newVolUp;
        volumeSlider.value = newVolUp * 100;
        updateVolumeUI(newVolUp);
        break;
      case "ArrowDown":
        e.preventDefault();
        const newVolDown = Math.max(0, audio.volume - 0.05);
        audio.volume = newVolDown;
        volumeSlider.value = newVolDown * 100;
        updateVolumeUI(newVolDown);
        break;
      case "KeyM":
        volumeBtn.click();
        break;
      case "KeyS":
        shuffleBtn.click();
        break;
      case "KeyR":
        repeatBtn.click();
        break;
      case "KeyL":
        likeBtn.click();
        break;
      case "Slash":
      case "KeyH":
        toggleShortcutsModal();
        break;
      case "Escape":
        shortcutsModal.classList.remove("open");
        break;
    }
  });


  function toggleShortcutsModal() {
    shortcutsModal.classList.toggle("open");
  }

  shortcutsBtn.addEventListener("click", toggleShortcutsModal);
  closeShortcutsBtn.addEventListener("click", () => {
    shortcutsModal.classList.remove("open");
  });

  shortcutsModal.addEventListener("click", (e) => {
    if (e.target === shortcutsModal) {
      shortcutsModal.classList.remove("open");
    }
  });


  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }

  function escapeHTML(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function showToast(message, type = "info") {
    let toast = document.getElementById("toast-notification");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "toast-notification";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.className = `toast-visible ${type}`;

    clearTimeout(toast.timeoutId);
    toast.timeoutId = setTimeout(() => {
      toast.className = "";
    }, 2400);
  }
});
