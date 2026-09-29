# 🎵 SoundWave - Studio Web Music Player

A sleek, modern, high-fidelity web music player built with vanilla HTML5, CSS3 (Glassmorphism & Micro-animations), and JavaScript (HTML5 Web Audio API & Canvas Visualizer).

Designed by **Anshita Chaudhary**.

---

## ✨ Features

- 🎧 **High-Fidelity Audio Playback**: Smooth controls with volume adjustment, playback speed options (0.75x to 2.0x), seek bar, shuffle, and repeat modes.
- 🎨 **Dynamic Glassmorphism UI**: Immersive dark theme with ambient reactive glow that harmonizes with album artwork.
- 📊 **Real-Time Audio Visualizer**: HTML5 Canvas visualizer powered by the Web Audio API with multiple visualizer modes (Frequency Bars & Sine Wave).
- 💿 **Interactive Vinyl Showcase**: Rotating vinyl disc effect when tracks are playing.
- 📜 **Interactive Playlist & Search**: Real-time song filtering, track duration previews, active track equalizer animation, and favorite track hearting.
- 📁 **Custom Song Upload**: Drag & drop or upload local audio files (MP3, WAV, OGG, FLAC) straight into the playlist.
- ⌨️ **Keyboard Shortcuts**: Complete hotkey support for play/pause (`Space`), seeking (`←`/`→`), volume (`↑`/`↓`), mute (`M`), shuffle (`S`), repeat (`R`), and favorites (`L`).
- 📱 **Fully Responsive**: Seamless layout on desktop, tablet, and mobile devices.

---

## 🚀 Live Demo

- **Netlify**: Deployable directly via Netlify Drop or connected Git repo.

---

## 🛠️ Tech Stack

- **Markup**: HTML5 Semantic Elements
- **Styling**: Vanilla CSS3, CSS Custom Properties, Glassmorphism, CSS Grid & Flexbox
- **Logic**: Vanilla ES6+ JavaScript, Web Audio API (`AudioContext`, `AnalyserNode`), HTML5 Canvas API
- **Fonts**: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) via Google Fonts

---

## 📂 Project Structure

```
music-player/
├── assets/
│   ├── audio/         # Curated demo audio tracks
│   └── covers/        # High-resolution album art
├── css/
│   └── style.css      # Core styles, design tokens & animations
├── js/
│   ├── app.js         # Main player controller & UI interactions
│   ├── playlist.js    # Playlist data model & track library
│   └── visualizer.js  # Canvas Web Audio API visualizer engine
├── .gitignore         # Standard git ignore list
├── index.html         # Application shell
├── netlify.toml       # Netlify deployment configuration & headers
└── README.md          # Project documentation
```

---

## 💻 Local Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/music-player.git
   ```
2. Navigate into the directory:
   ```bash
   cd music-player
   ```
3. Open `index.html` in your browser or run a simple local web server:
   ```bash
   # Using Python
   python -m http.server 8080

   # Or using Node.js
   npx serve .
   ```
4. Visit `http://localhost:8080` in your web browser.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
