// Web Audio Engine for Crayon & Sound Effects
class AudioEngine {
  constructor() {
    this.ctx = null;
  }
  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }
  playCrayonScrape() {
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140 + Math.random() * 60, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }
  playSuccessChime() {
    this.init();
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const startTime = this.ctx.currentTime + idx * 0.1;
      gain.gain.setValueAtTime(0.12, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.35);
    });
  }
  playStrokeComplete() {
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  }
}

// Data set for Korean Consonants & Numbers with normalized stroke paths (0.0 to 1.0)
const CHAR_DATA = {
  consonants: [
    {
      char: "ㄱ",
      name: "기역",
      sound: "그",
      strokes: [
        [{ x: 0.25, y: 0.25 }, { x: 0.75, y: 0.25 }, { x: 0.75, y: 0.75 }]
      ]
    },
    {
      char: "ㄴ",
      name: "니은",
      sound: "느",
      strokes: [
        [{ x: 0.25, y: 0.25 }, { x: 0.25, y: 0.75 }, { x: 0.75, y: 0.75 }]
      ]
    },
    {
      char: "ㄷ",
      name: "디귿",
      sound: "드",
      strokes: [
        [{ x: 0.25, y: 0.25 }, { x: 0.75, y: 0.25 }],
        [{ x: 0.25, y: 0.25 }, { x: 0.25, y: 0.75 }, { x: 0.75, y: 0.75 }]
      ]
    },
    {
      char: "ㄹ",
      name: "리을",
      sound: "르",
      strokes: [
        [{ x: 0.25, y: 0.25 }, { x: 0.75, y: 0.25 }, { x: 0.75, y: 0.5 }],
        [{ x: 0.25, y: 0.5 }, { x: 0.75, y: 0.5 }],
        [{ x: 0.25, y: 0.5 }, { x: 0.25, y: 0.75 }, { x: 0.75, y: 0.75 }]
      ]
    },
    {
      char: "ㅁ",
      name: "미음",
      sound: "므",
      strokes: [
        [{ x: 0.25, y: 0.25 }, { x: 0.25, y: 0.75 }],
        [{ x: 0.25, y: 0.25 }, { x: 0.75, y: 0.25 }, { x: 0.75, y: 0.75 }],
        [{ x: 0.25, y: 0.75 }, { x: 0.75, y: 0.75 }]
      ]
    },
    {
      char: "ㅂ",
      name: "비읍",
      sound: "브",
      strokes: [
        [{ x: 0.3, y: 0.25 }, { x: 0.3, y: 0.75 }],
        [{ x: 0.7, y: 0.25 }, { x: 0.7, y: 0.75 }],
        [{ x: 0.3, y: 0.5 }, { x: 0.7, y: 0.5 }],
        [{ x: 0.3, y: 0.75 }, { x: 0.7, y: 0.75 }]
      ]
    },
    {
      char: "ㅅ",
      name: "시옷",
      sound: "스",
      strokes: [
        [{ x: 0.5, y: 0.25 }, { x: 0.25, y: 0.75 }],
        [{ x: 0.45, y: 0.45 }, { x: 0.75, y: 0.75 }]
      ]
    },
    {
      char: "ㅇ",
      name: "이응",
      sound: "응",
      strokes: [
        [
          { x: 0.5, y: 0.25 },
          { x: 0.25, y: 0.5 },
          { x: 0.5, y: 0.75 },
          { x: 0.75, y: 0.5 },
          { x: 0.5, y: 0.25 }
        ]
      ]
    },
    {
      char: "ㅈ",
      name: "지읒",
      sound: "즈",
      strokes: [
        [{ x: 0.25, y: 0.25 }, { x: 0.75, y: 0.25 }],
        [{ x: 0.5, y: 0.25 }, { x: 0.25, y: 0.75 }],
        [{ x: 0.45, y: 0.45 }, { x: 0.75, y: 0.75 }]
      ]
    },
    {
      char: "ㅊ",
      name: "치읓",
      sound: "츠",
      strokes: [
        [{ x: 0.4, y: 0.18 }, { x: 0.6, y: 0.18 }],
        [{ x: 0.25, y: 0.32 }, { x: 0.75, y: 0.32 }],
        [{ x: 0.5, y: 0.32 }, { x: 0.25, y: 0.78 }],
        [{ x: 0.45, y: 0.52 }, { x: 0.75, y: 0.78 }]
      ]
    },
    {
      char: "ㅋ",
      name: "키읔",
      sound: "크",
      strokes: [
        [{ x: 0.25, y: 0.25 }, { x: 0.75, y: 0.25 }, { x: 0.75, y: 0.75 }],
        [{ x: 0.25, y: 0.5 }, { x: 0.75, y: 0.5 }]
      ]
    },
    {
      char: "ㅌ",
      name: "티읕",
      sound: "트",
      strokes: [
        [{ x: 0.25, y: 0.25 }, { x: 0.75, y: 0.25 }],
        [{ x: 0.25, y: 0.5 }, { x: 0.75, y: 0.5 }],
        [{ x: 0.25, y: 0.25 }, { x: 0.25, y: 0.75 }, { x: 0.75, y: 0.75 }]
      ]
    },
    {
      char: "ㅍ",
      name: "피읖",
      sound: "프",
      strokes: [
        [{ x: 0.25, y: 0.25 }, { x: 0.75, y: 0.25 }],
        [{ x: 0.4, y: 0.25 }, { x: 0.4, y: 0.75 }],
        [{ x: 0.6, y: 0.25 }, { x: 0.6, y: 0.75 }],
        [{ x: 0.25, y: 0.75 }, { x: 0.75, y: 0.75 }]
      ]
    },
    {
      char: "ㅎ",
      name: "히읗",
      sound: "흐",
      strokes: [
        [{ x: 0.42, y: 0.18 }, { x: 0.58, y: 0.18 }],
        [{ x: 0.25, y: 0.32 }, { x: 0.75, y: 0.32 }],
        [
          { x: 0.5, y: 0.45 },
          { x: 0.3, y: 0.62 },
          { x: 0.5, y: 0.78 },
          { x: 0.7, y: 0.62 },
          { x: 0.5, y: 0.45 }
        ]
      ]
    }
  ],
  numbers: [
    {
      char: "1",
      name: "일 (하나)",
      sound: "일",
      strokes: [
        [{ x: 0.45, y: 0.25 }, { x: 0.5, y: 0.2 }, { x: 0.5, y: 0.8 }]
      ]
    },
    {
      char: "2",
      name: "이 (둘)",
      sound: "이",
      strokes: [
        [
          { x: 0.3, y: 0.3 },
          { x: 0.5, y: 0.2 },
          { x: 0.7, y: 0.3 },
          { x: 0.3, y: 0.8 },
          { x: 0.75, y: 0.8 }
        ]
      ]
    },
    {
      char: "3",
      name: "삼 (셋)",
      sound: "삼",
      strokes: [
        [
          { x: 0.3, y: 0.25 },
          { x: 0.7, y: 0.25 },
          { x: 0.45, y: 0.5 },
          { x: 0.7, y: 0.65 },
          { x: 0.3, y: 0.8 }
        ]
      ]
    },
    {
      char: "4",
      name: "사 (넷)",
      sound: "사",
      strokes: [
        [{ x: 0.65, y: 0.2 }, { x: 0.25, y: 0.6 }, { x: 0.8, y: 0.6 }],
        [{ x: 0.65, y: 0.2 }, { x: 0.65, y: 0.85 }]
      ]
    },
    {
      char: "5",
      name: "오 (다섯)",
      sound: "오",
      strokes: [
        [{ x: 0.7, y: 0.2 }, { x: 0.3, y: 0.2 }, { x: 0.3, y: 0.48 }, { x: 0.7, y: 0.58 }, { x: 0.3, y: 0.82 }]
      ]
    }
  ]
};

// Canvas & Tracing Controller
class StrokeTracer {
  constructor() {
    this.audio = new AudioEngine();
    this.canvas = document.getElementById('traceCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.currentCategory = 'consonants';
    this.currentCharIndex = 0;
    this.currentStrokeIndex = 0;
    this.completedStrokes = [];
    this.currentPoints = [];
    this.isDrawing = false;
    this.tolerance = 40; // pixel tolerance

    this.charPicker = document.getElementById('charPicker');
    this.strokeStepEl = document.getElementById('strokeStep');
    this.strokeTotalEl = document.getElementById('strokeTotal');
    this.hintMsg = document.getElementById('hintMsg');
    this.starRatingEl = document.getElementById('starRating');

    this.initEvents();
    this.renderCharPicker();
    this.loadChar();
  }

  initEvents() {
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this.currentCategory = e.target.dataset.category;
        this.currentCharIndex = 0;
        this.renderCharPicker();
        this.loadChar();
      });
    });

    document.getElementById('resetBtn').addEventListener('click', () => {
      this.loadChar();
    });

    document.getElementById('listenBtn').addEventListener('click', () => {
      this.speakChar();
    });

    // Pointer Events for touch & mouse
    this.canvas.addEventListener('pointerdown', (e) => this.onPointerDown(e));
    this.canvas.addEventListener('pointermove', (e) => this.onPointerMove(e));
    this.canvas.addEventListener('pointerup', (e) => this.onPointerUp(e));
    this.canvas.addEventListener('pointercancel', (e) => this.onPointerUp(e));

    // Handle high DPI
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  resizeCanvas() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.scale(dpr, dpr);
    this.displayWidth = rect.width;
    this.displayHeight = rect.height;
    this.draw();
  }

  renderCharPicker() {
    this.charPicker.innerHTML = '';
    const list = CHAR_DATA[this.currentCategory];
    list.forEach((item, idx) => {
      const btn = document.createElement('button');
      btn.className = `char-btn ${idx === this.currentCharIndex ? 'active' : ''}`;
      btn.textContent = item.char;
      btn.addEventListener('click', () => {
        document.querySelectorAll('.char-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentCharIndex = idx;
        this.loadChar();
      });
      this.charPicker.appendChild(btn);
    });
  }

  loadChar() {
    this.currentChar = CHAR_DATA[this.currentCategory][this.currentCharIndex];
    this.currentStrokeIndex = 0;
    this.completedStrokes = [];
    this.currentPoints = [];
    this.isDrawing = false;
    this.strokeStepEl.textContent = '1';
    this.strokeTotalEl.textContent = this.currentChar.strokes.length;
    this.hintMsg.textContent = `별표(★) 시작점에서 화살표를 따라 그려보세요!`;
    this.starRatingEl.textContent = '★★★';
    this.draw();
  }

  speakChar() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(this.currentChar.char);
      u.lang = 'ko-KR';
      u.rate = 0.85;
      window.speechSynthesis.speak(u);
    }
  }

  getPointerPos(e) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.x,
      y: e.clientY - rect.y
    };
  }

  onPointerDown(e) {
    this.canvas.setPointerCapture(e.pointerId);
    this.audio.init();
    const pos = this.getPointerPos(e);
    const stroke = this.currentChar.strokes[this.currentStrokeIndex];
    if (!stroke || stroke.length === 0) return;

    const startPt = {
      x: stroke[0].x * this.displayWidth,
      y: stroke[0].y * this.displayHeight
    };

    const dist = Math.hypot(pos.x - startPt.x, pos.y - startPt.y);
    if (dist <= this.tolerance + 15) {
      this.isDrawing = true;
      this.currentPoints = [pos];
      this.audio.playCrayonScrape();
      this.hintMsg.textContent = "좋아요! 끝까지 따라 그려보세요!";
      this.draw();
    } else {
      this.hintMsg.textContent = "반짝이는 노란 별(★)에서 시작해주세요!";
    }
  }

  onPointerMove(e) {
    if (!this.isDrawing) return;
    const pos = this.getPointerPos(e);
    this.currentPoints.push(pos);
    if (this.currentPoints.length % 4 === 0) {
      this.audio.playCrayonScrape();
    }
    this.draw();
  }

  onPointerUp(e) {
    if (!this.isDrawing) return;
    this.isDrawing = false;

    // Validate completed stroke
    const stroke = this.currentChar.strokes[this.currentStrokeIndex];
    const endPt = {
      x: stroke[stroke.length - 1].x * this.displayWidth,
      y: stroke[stroke.length - 1].y * this.displayHeight
    };
    const lastUserPt = this.currentPoints[this.currentPoints.length - 1];
    const distToEnd = Math.hypot(lastUserPt.x - endPt.x, lastUserPt.y - endPt.y);

    if (distToEnd <= this.tolerance + 20 && this.currentPoints.length > 5) {
      // Stroke Succeeded
      this.completedStrokes.push([...this.currentPoints]);
      this.currentPoints = [];
      this.currentStrokeIndex++;

      if (this.currentStrokeIndex >= this.currentChar.strokes.length) {
        // Complete Character
        this.audio.playSuccessChime();
        this.speakChar();
        this.hintMsg.textContent = `참 잘했어요! '${this.currentChar.char}' 완성!`;
        this.starRatingEl.textContent = '★★★ 완료!';
      } else {
        this.audio.playStrokeComplete();
        this.strokeStepEl.textContent = this.currentStrokeIndex + 1;
        this.hintMsg.textContent = `잘했어요! 다음 ${this.currentStrokeIndex + 1}번째 획을 그려보세요.`;
      }
    } else {
      // Failed stroke, retry
      this.currentPoints = [];
      this.hintMsg.textContent = "끝점까지 선을 천천히 끝까지 이어주세요!";
    }
    this.draw();
  }

  draw() {
    if (!this.ctx || !this.currentChar) return;
    const w = this.displayWidth;
    const h = this.displayHeight;

    this.ctx.clearRect(0, 0, w, h);

    // 1. Draw cross guides (십자 보조선)
    this.ctx.strokeStyle = '#e2e8f0';
    this.ctx.lineWidth = 1.5;
    this.ctx.setLineDash([6, 6]);
    this.ctx.beginPath();
    this.ctx.moveTo(w / 2, 0);
    this.ctx.lineTo(w / 2, h);
    this.ctx.moveTo(0, h / 2);
    this.ctx.lineTo(w, h / 2);
    this.ctx.stroke();
    this.ctx.setLineDash([]);

    // 2. Draw Background Guide Character (연한 회색)
    this.ctx.lineWidth = 28;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.strokeStyle = '#f1f5f9';

    this.currentChar.strokes.forEach(stroke => {
      this.ctx.beginPath();
      stroke.forEach((pt, i) => {
        const px = pt.x * w;
        const py = pt.y * h;
        if (i === 0) this.ctx.moveTo(px, py);
        else this.ctx.lineTo(px, py);
      });
      this.ctx.stroke();
    });

    // 3. Draw Completed Strokes (단단한 청록색)
    this.ctx.lineWidth = 20;
    this.ctx.strokeStyle = '#0284c7';
    this.completedStrokes.forEach(pts => {
      if (pts.length < 2) return;
      this.ctx.beginPath();
      pts.forEach((p, i) => {
        if (i === 0) this.ctx.moveTo(p.x, p.y);
        else this.ctx.lineTo(p.x, p.y);
      });
      this.ctx.stroke();
    });

    // 4. Draw Active Guide Stroke & Indicator
    if (this.currentStrokeIndex < this.currentChar.strokes.length) {
      const activeStroke = this.currentChar.strokes[this.currentStrokeIndex];

      // Active stroke guideline (연한 파란색 가이드 점선)
      this.ctx.lineWidth = 14;
      this.ctx.strokeStyle = '#bae6fd';
      this.ctx.setLineDash([8, 8]);
      this.ctx.beginPath();
      activeStroke.forEach((pt, i) => {
        const px = pt.x * w;
        const py = pt.y * h;
        if (i === 0) this.ctx.moveTo(px, py);
        else this.ctx.lineTo(px, py);
      });
      this.ctx.stroke();
      this.ctx.setLineDash([]);

      // Start Anchor: Gold Star
      const startPt = activeStroke[0];
      const sx = startPt.x * w;
      const sy = startPt.y * h;
      this.drawStar(sx, sy, 14, 5, '#f59e0b');

      // End Anchor: Red Circle
      const endPt = activeStroke[activeStroke.length - 1];
      const ex = endPt.x * w;
      const ey = endPt.y * h;
      this.ctx.fillStyle = '#ef4444';
      this.ctx.beginPath();
      this.ctx.arc(ex, ey, 6, 0, Math.PI * 2);
      this.ctx.fill();
    }

    // 5. Draw Currently User Drawing Stroke (무지개 크레용 효과)
    if (this.isDrawing && this.currentPoints.length > 1) {
      this.ctx.lineWidth = 18;
      this.ctx.strokeStyle = '#ec4899';
      this.ctx.beginPath();
      this.currentPoints.forEach((p, i) => {
        if (i === 0) this.ctx.moveTo(p.x, p.y);
        else this.ctx.lineTo(p.x, p.y);
      });
      this.ctx.stroke();
    }
  }

  drawStar(cx, cy, r, spikes, color) {
    let rot = (Math.PI / 2) * 3;
    let step = Math.PI / spikes;
    this.ctx.beginPath();
    this.ctx.moveTo(cx, cy - r);
    for (let i = 0; i < spikes; i++) {
      let x = cx + Math.cos(rot) * r;
      let y = cy + Math.sin(rot) * r;
      this.ctx.lineTo(x, y);
      rot += step;
      x = cx + Math.cos(rot) * (r * 0.45);
      y = cy + Math.sin(rot) * (r * 0.45);
      this.ctx.lineTo(x, y);
      rot += step;
    }
    this.ctx.lineTo(cx, cy - r);
    this.ctx.closePath();
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.strokeStyle = '#ffffff';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new StrokeTracer();
});
