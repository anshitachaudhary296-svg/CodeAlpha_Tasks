
class AudioVisualizer {
  constructor(canvasElement, audioElement) {
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext("2d");
    this.audio = audioElement;
    this.audioContext = null;
    this.analyser = null;
    this.source = null;
    this.dataArray = null;
    this.bufferLength = 0;
    this.mode = "bars"; // "bars" | "wave"
    this.animationId = null;
    this.accentColor = "#a855f7";
    this.isInitialized = false;

    this.initCanvasSize();
    window.addEventListener("resize", () => this.initCanvasSize());
  }

  initCanvasSize() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = (rect.width || 600) * dpr;
    this.canvas.height = (rect.height || 140) * dpr;
    this.ctx.scale(dpr, dpr);
    this.displayWidth = rect.width || 600;
    this.displayHeight = rect.height || 140;
  }

  initAudioContext() {
    if (this.isInitialized) return;

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioCtx();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.smoothingTimeConstant = 0.82;

      this.source = this.audioContext.createMediaElementSource(this.audio);
      this.source.connect(this.analyser);
      this.analyser.connect(this.audioContext.destination);

      this.bufferLength = this.analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(this.bufferLength);
      this.isInitialized = true;
    } catch (err) {
      console.warn("Web Audio API visualizer initialization error (likely CORS or autoplay):", err);
    }
  }

  setAccentColor(color) {
    this.accentColor = color || "#a855f7";
  }

  setMode(mode) {
    this.mode = mode;
  }

  start() {
    if (!this.isInitialized) {
      this.initAudioContext();
    }
    if (this.audioContext && this.audioContext.state === "suspended") {
      this.audioContext.resume();
    }
    if (!this.animationId) {
      this.render();
    }
  }

  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.drawIdle();
  }

  render = () => {
    this.animationId = requestAnimationFrame(this.render);

    const width = this.displayWidth;
    const height = this.displayHeight;
    this.ctx.clearRect(0, 0, width, height);

    if (!this.isInitialized || !this.analyser) {
      this.drawIdle();
      return;
    }

    if (this.mode === "bars") {
      this.drawBars(width, height);
    } else {
      this.drawWave(width, height);
    }
  };

  drawBars(width, height) {
    this.analyser.getByteFrequencyData(this.dataArray);

    const barCount = 48;
    const barWidth = (width / barCount) - 3;
    const step = Math.floor(this.bufferLength / barCount);

    const gradient = this.ctx.createLinearGradient(0, height, 0, 0);
    gradient.addColorStop(0, this.accentColor + "22");
    gradient.addColorStop(0.5, this.accentColor + "bb");
    gradient.addColorStop(1, "#38bdf8");

    for (let i = 0; i < barCount; i++) {
      const val = this.dataArray[i * step] || 0;
      const barHeight = Math.max(4, (val / 255) * (height - 12));
      const x = i * (barWidth + 3);
      const y = height - barHeight;


      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0]);
      this.ctx.fill();


      if (val > 20) {
        this.ctx.fillStyle = "#ffffff";
        this.ctx.beginPath();
        this.ctx.arc(x + barWidth / 2, y - 2, 1.5, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }
  }

  drawWave(width, height) {
    this.analyser.getByteTimeDomainData(this.dataArray);

    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = this.accentColor;
    this.ctx.shadowBlur = 12;
    this.ctx.shadowColor = this.accentColor;

    this.ctx.beginPath();
    const sliceWidth = width / this.bufferLength;
    let x = 0;

    for (let i = 0; i < this.bufferLength; i++) {
      const v = this.dataArray[i] / 128.0;
      const y = (v * height) / 2;

      if (i === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
      x += sliceWidth;
    }

    this.ctx.stroke();
    this.ctx.shadowBlur = 0;
  }

  drawIdle() {
    const width = this.displayWidth;
    const height = this.displayHeight;
    this.ctx.clearRect(0, 0, width, height);

    const barCount = 48;
    const barWidth = (width / barCount) - 3;

    this.ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
    for (let i = 0; i < barCount; i++) {
      const x = i * (barWidth + 3);
      const barHeight = 4 + Math.sin(i * 0.4) * 3;
      const y = height - barHeight;
      this.ctx.beginPath();
      this.ctx.roundRect(x, y, barWidth, barHeight, [2, 2, 0, 0]);
      this.ctx.fill();
    }
  }
}
