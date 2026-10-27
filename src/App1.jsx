import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Sparkles,
  Volume2,
  VolumeX,
  Share2,
  RotateCcw,
  Check,
  Heart,
  Stethoscope,
  Flame,
  Edit3,
  X,
  Copy,
  Zap,
  Award,
  Activity,
  ShieldAlert,
  Syringe,
  HeartPulse,
  ClipboardCheck,
  Calendar,
  Briefcase,
  Lock,
  Unlock,
  Eye,
  Skull,
  Clapperboard,
  Search,
  AlarmClock,
  Smile,
  BedDouble,
  Tv,
  Siren,
  BadgeCheck,
  PartyPopper,
  Crown,
} from 'lucide-react';

// ============================================================================
// WEB AUDIO SYNTHESIZER (Suspense SFX, Nurse Scans & Happy Birthday Finale)
// ============================================================================
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.isPlayingSong = false;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playRadarBeep(freq = 880, duration = 0.08) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + duration);
  }

  playPop(stepIndex = 0) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    const baseFreq = 280 + stepIndex * 65;
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.6, now + 0.14);

    gain.gain.setValueAtTime(0.16, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.16);
  }

  playSuspenseChord() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const freqs = [220, 261.63, 311.13, 370.0];
    freqs.forEach((f) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(f, now);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0008, now + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.46);
    });
  }

  playStampSound() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(170, now);
    osc.frequency.exponentialRampToValueAtTime(65, now + 0.12);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.13);
  }

  playPowerCharge() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(1040, now + 0.65);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.18, now + 0.55);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.7);
  }

  playFireworkBoom() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.35;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.09));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(520 + Math.random() * 650, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start(now);
  }

  playHappyBirthdayMelody() {
    if (this.muted || this.isPlayingSong) return;
    this.init();
    if (!this.ctx) return;

    this.isPlayingSong = true;
    const notes = [
      { f: 261.63, d: 0.28 }, { f: 261.63, d: 0.22 }, { f: 293.66, d: 0.45 },
      { f: 261.63, d: 0.45 }, { f: 349.23, d: 0.45 }, { f: 329.63, d: 0.85 },
      { f: 261.63, d: 0.28 }, { f: 261.63, d: 0.22 }, { f: 293.66, d: 0.45 },
      { f: 261.63, d: 0.45 }, { f: 392.00, d: 0.45 }, { f: 349.23, d: 0.85 },
      { f: 261.63, d: 0.28 }, { f: 261.63, d: 0.22 }, { f: 523.25, d: 0.45 },
      { f: 440.00, d: 0.45 }, { f: 349.23, d: 0.45 }, { f: 329.63, d: 0.45 },
      { f: 293.66, d: 0.75 }, { f: 466.16, d: 0.28 }, { f: 466.16, d: 0.22 },
      { f: 440.00, d: 0.45 }, { f: 349.23, d: 0.45 }, { f: 392.00, d: 0.45 },
      { f: 349.23, d: 0.95 }
    ];

    let cursor = this.ctx.currentTime + 0.1;
    notes.forEach((n) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.f, cursor);

      gain.gain.setValueAtTime(0.001, cursor);
      gain.gain.linearRampToValueAtTime(0.16, cursor + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, cursor + n.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(cursor);
      osc.stop(cursor + n.d);
      cursor += n.d + 0.04;
    });

    const totalDuration = (cursor - this.ctx.currentTime) * 1000;
    setTimeout(() => {
      this.isPlayingSong = false;
    }, totalDuration);
  }
}

const sound = new SoundEngine();

// ============================================================================
// SPOILER-FREE ROAST, NURSE & 48-HR COUNTDOWN SEQUENCE (Steps 0 to 5)
// ============================================================================
const buildClueSequence = (name) => [
  {
    id: 0,
    code: 'SHATRU-TRANSMISSION // LEVEL-01',
    badge: 'Suspicious Link from Your #1 Sworn Enemy 😈',
    bpm: 78,
    emoji: '😈',
    accent: 'from-rose-400 via-pink-500 to-amber-400',
    headline: `Ki re ${name}! Aj ki boltoooo?`,
    subtext: `Bhabchis tor #1 Shatru hothat kore toke link pathalo keno? 🤔 Relax Madam, kono bomb nei! Today is a VERY suspicious day on the calendar, and even your favorite enemy had to pause our daily war to investigate you...`,
    bengaliTag: '"Shatru jokhon hothat bhalo bebohar kore, tokhon bujhbi boro kichu ghote geche!" 👀',
    cta: 'Darao! Agey Shatru-Trap Scan Koro 🛡️',
  },
  {
    id: 1,
    code: 'DRAMA-QUEEN-SCAN // LEVEL-02',
    badge: '"Keu amai bojena" Detector 🛋️',
    bpm: 94,
    emoji: '🙄',
    accent: 'from-amber-400 via-orange-400 to-pink-500',
    headline: 'Wait... First Let Us Check Your Daily "Keu Amake Bojhe na" Count!',
    subtext: `Scientists recently studied a person whose top 3 daily dialogues are: "Dhur, kichu bhallage na!", "Amake keo bhalobashe na!", and "Ektu ghumabo, keu amake bojhe na!" Every single satellite pointed straight to ${name}'s room.`,
    bengaliTag: '"Khete dile shute chay, ar shute dile ghumer ghore natok kore!" 😂',
    cta: 'Haha Sotti! Next Clue Dekhao 👉',
  },
  {
    id: 2,
    code: 'LADY-BYOMKESH-FILES // LEVEL-03',
    badge: '2:00 AM Thriller & Suspense Addict 🕵️‍♀️🍿',
    bpm: 112,
    emoji: '🕵️‍♀️',
    accent: 'from-purple-400 via-indigo-400 to-rose-400',
    headline: 'Hold On! Is This a Birthday or a Netflix Murder Mystery?',
    subtext: `Normal people watch cute romantic movies to relax. Meanwhile, ${name} sits in the dark at 2:00 AM watching psycho-thrillers, murder mysteries, and suspense web-series—acting like she is Lady Byomkesh Bakshi or Feluda's younger sister!`,
    bengaliTag: '"Cinema-r prothom 10 minute dekhei bole dey—Ei loktai ashol khuni, ami likhe dicchi!" 🔍🎬',
    cta: 'Plot Twist Decode Koro 🎬',
  },
  {
    id: 3,
    code: 'DIDIMONI-PROTOCOL // LEVEL-04',
    badge: 'Medical Boss & Scary Injection Specialist 🩺💉',
    bpm: 132,
    emoji: '👩‍⚕️',
    accent: 'from-teal-300 via-emerald-400 to-cyan-400',
    headline: 'Sweet "Sister-Ji" on Duty vs. Full "Gabbar Singh" Off Duty!',
    subtext: `With patients, she speaks in the sweetest voice: "Kichu hobe na Dadu, ekdom pipre kamranor moto lagbe!" 😊 ...Wait until she talks to her friends/enemy: "Beshi kotha bolbi na, boro sui-ta diye ekta kora injection diye debo!" 💉😈 Plus, she possesses the dark magic to read Doctor's handwriting that looks like an ECG wave!`,
    bengaliTag: '"Haate Stethoscope ar boro Syringe thakle nijeke Hospital-er Supreme Commander bhabhe!" 🩺✨',
    cta: 'Calibrate Nurse Superpowers 🩺',
  },
  {
    id: 4,
    code: 'SUKHER-DIN-SHESH // LEVEL-05',
    badge: '🚨 48-HOUR ALERT: 1st Job Starts in 2 Days! ⏰',
    bpm: 150,
    emoji: '😳',
    accent: 'from-pink-400 via-rose-400 to-amber-300',
    headline: 'Matro 2 Din Baki! "Shukher Din Shesh Potterrrr!" 🤭⏰',
    subtext: `Ahem ahem! Why is someone blushing so much? 😊 Because just 2 DAYS after this special day, Madam is officially starting her VERY FIRST JOB! That means you only have 48 HOURS of lazy Lyadh left before 6:00 AM shift alarms, duty rosters, also ranna banna and "Yes Ma'am / Coming Doctor!" take over your life!`,
    bengaliTag: '"Matro 2 din por theke shokal theke lydh khaoa CANCEL! Ebar Didimoni duty-te jabe!" 🏥🏃‍♀️',
    cta: 'Accept Fate & Unlock Final Vault 🔐',
  },
  {
    id: 5,
    code: 'CLASSIFIED-VAULT // FINAL-UNLOCK',
    badge: '100% Smile & Blushing Overload Detected 💖',
    bpm: 175,
    emoji: '🚨',
    accent: 'from-amber-300 via-rose-400 to-fuchsia-400',
    headline: 'Okay Stop Smiling So Much! Ready for the Real Reason?',
    subtext: `Even your #1 Sworn Enemy has to admit: watching you grow into a badass professional, survive every exam & duty shift, and get ready to start your very first job in just 2 days is pretty iconic. Take a deep breath, Madam...`,
    bengaliTag: '"Eto hashi kiser bol toh? Ebar ashol dhamaka-ta dekh!" 🥳🔥',
    cta: 'CLICK TO REVEAL EVERYTHING! 🎆🎉',
  }
];

// ============================================================================
// INTERACTIVE CANVAS FIREWORKS (Hearts, Nurse Crosses +22 Rings)
// ============================================================================
const FireworksCanvas = ({ active, burstTrigger }) => {
  const canvasRef = useRef(null);
  const rocketsRef = useRef([]);
  const particlesRef = useRef([]);

  const spawnRocket = useCallback((targetX, targetY, customShape = null) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const startX = canvas.width * (0.15 + Math.random() * 0.7);
    const startY = canvas.height;
    const tx = targetX ?? canvas.width * (0.12 + Math.random() * 0.76);
    const ty = targetY ?? canvas.height * (0.12 + Math.random() * 0.42);

    const angle = Math.atan2(ty - startY, tx - startX);
    const speed = 11 + Math.random() * 4;
    const shapes = ['sphere', 'heart', 'cross', 'ring22'];
    const chosenShape = customShape || shapes[Math.floor(Math.random() * shapes.length)];

    const palettes = [
      ['#f43f5e', '#fb7185', '#fda4af', '#fff1f2'],
      ['#2dd4bf', '#38bdf8', '#818cf8', '#f0fdfa'],
      ['#facc15', '#fb923c', '#f472b6', '#fef08a'],
      ['#c084fc', '#f472b6', '#38bdf8', '#ffffff']
    ];

    rocketsRef.current.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      targetY: ty,
      palette: palettes[Math.floor(Math.random() * palettes.length)],
      shape: chosenShape,
      trail: []
    });
  }, []);

  const explodeRocket = useCallback((rocket) => {
    sound.playFireworkBoom();
    const count = rocket.shape === 'cross' ? 76 : 85;

    for (let i = 0; i < count; i++) {
      const palette = rocket.palette;
      const color = palette[i % palette.length];
      let vx = 0;
      let vy = 0;

      if (rocket.shape === 'heart') {
        const t = (i / count) * Math.PI * 2;
        const hx = 16 * Math.pow(Math.sin(t), 3);
        const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        vx = hx * 0.25 + (Math.random() - 0.5) * 0.4;
        vy = hy * 0.25 + (Math.random() - 0.5) * 0.4;
      } else if (rocket.shape === 'cross') {
        const arm = i % 4;
        const dist = ((i / count) * 5.2) + Math.random() * 0.6;
        const spread = (Math.random() - 0.5) * 1.1;
        if (arm === 0) { vx = dist; vy = spread; }
        if (arm === 1) { vx = -dist; vy = spread; }
        if (arm === 2) { vx = spread; vy = dist; }
        if (arm === 3) { vx = spread; vy = -dist; }
      } else if (rocket.shape === 'ring22') {
        const angle = (i / count) * Math.PI * 2;
        const speed = i % 2 === 0 ? 4.8 : 2.6;
        vx = Math.cos(angle) * speed;
        vy = Math.sin(angle) * speed;
      } else {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 5.5;
        vx = Math.cos(angle) * speed;
        vy = Math.sin(angle) * speed;
      }

      particlesRef.current.push({
        x: rocket.x,
        y: rocket.y,
        vx,
        vy,
        alpha: 1,
        decay: 0.011 + Math.random() * 0.011,
        color,
        size: 2.2 + Math.random() * 2.2
      });
    }
  }, []);

  useEffect(() => {
    if (!active || burstTrigger === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const shapes = ['heart', 'cross', 'ring22', 'sphere', 'heart'];
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        spawnRocket(
          canvas.width * (0.18 + i * 0.16),
          canvas.height * (0.18 + (i % 2) * 0.14),
          shapes[i % shapes.length]
        );
      }, i * 150);
    }
  }, [burstTrigger, active, spawnRocket]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    let timer = 0;
    const render = () => {
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = active ? 'rgba(9, 10, 26, 0.22)' : 'rgba(9, 10, 26, 0.4)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (active) {
        timer++;
        if (timer % 26 === 0) {
          spawnRocket();
        }
      }

      ctx.globalCompositeOperation = 'lighter';

      for (let i = rocketsRef.current.length - 1; i >= 0; i--) {
        const r = rocketsRef.current[i];
        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 8) r.trail.shift();

        r.x += r.vx;
        r.y += r.vy;
        r.vy += 0.06;

        ctx.beginPath();
        ctx.arc(r.x, r.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        if (r.y <= r.targetY || r.vy >= 0) {
          explodeRocket(r);
          rocketsRef.current.splice(i, 1);
        }
      }

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.vy += 0.045;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [active, spawnRocket, explodeRocket]);

  const handleCanvasClick = (e) => {
    if (!active) return;
    const rect = canvasRef.current.getBoundingClientRect();
    spawnRocket(e.clientX - rect.left, e.clientY - rect.top);
  };

  return (
    <canvas
      ref={canvasRef}
      onClick={handleCanvasClick}
      className={`fixed inset-0 z-0 ${active ? 'cursor-crosshair' : 'pointer-events-none'}`}
    />
  );
};

// ============================================================================
// LIVE PULSE WAVEFORM MONITOR (No Spoilers in Steps 0-5!)
// ============================================================================
const LivePulseMonitor = ({ bpm, step, isRevealed }) => {
  const animDuration = Math.max(0.45, 85 / bpm);

  return (
    <div className="relative w-full bg-slate-950/90 border-b border-white/10 px-4 py-2.5 flex items-center justify-between overflow-hidden">
      <div className="flex items-center gap-2.5 z-10">
        <div className="relative flex items-center justify-center">
          <Heart
            className={`w-5 h-5 ${
              isRevealed ? 'text-pink-500 fill-pink-500' : 'text-rose-400 fill-rose-400'
            } animate-ping absolute opacity-60`}
            style={{ animationDuration: `${animDuration}s` }}
          />
          <Heart
            className={`w-5 h-5 relative ${
              isRevealed ? 'text-pink-400 fill-pink-400' : 'text-rose-400 fill-rose-400'
            }`}
          />
        </div>
        <div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
            {isRevealed ? 'BIRTHDAY NURSE DIDIMONI TELEMETRY' : 'SHATRU SMILE & SUSPENSE RADAR'}
          </div>
          <div className="text-xs font-mono font-bold text-rose-300 flex items-center gap-2">
            <span>{isRevealed ? 'LEVEL-22 NURSE ICON UNLOCKED' : `SECRET FILE 0${step + 1} / 06`}</span>
            <span className="text-slate-600">•</span>
            <span className="text-amber-300">
              {isRevealed ? 'STATUS: 1ST JOB IN 2 DAYS!' : 'SPOILER SHIELD: ACTIVE'}
            </span>
          </div>
        </div>
      </div>

      {/* Animated SVG Waveform */}
      <div className="hidden sm:block flex-1 max-w-xs mx-4 h-8 overflow-hidden relative opacity-85">
        <svg viewBox="0 0 300 40" className="w-full h-full stroke-rose-400 fill-none" strokeWidth="2.2">
          <path
            d="M 0 20 L 40 20 L 50 12 L 60 28 L 72 20 L 95 20 L 105 4 L 115 36 L 125 14 L 135 20 L 185 20 L 195 12 L 205 28 L 215 20 L 250 20 L 260 5 L 270 35 L 280 20 L 300 20"
            className="ecg-line"
            style={{
              strokeDasharray: 300,
              animation: `ecgPulse ${animDuration * 1.4}s linear infinite`
            }}
          />
        </svg>
      </div>

      <div className="text-right font-mono z-10">
        <div className="text-[10px] text-slate-400 uppercase">HEARTBEAT</div>
        <div className="text-lg font-black text-rose-400 leading-none">
          {bpm} <span className="text-[10px] font-normal text-slate-400">BPM</span>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================
export default function App() {
  const [friendName, setFriendName] = useState('Potterrrrr');
  const [enemyNickname, setEnemyNickname] = useState('Your #1 Sworn Enemy 😈');
  const [customNote, setCustomNote] = useState(
    'Happy 22nd Birthday Madam! Even though you treat me like your #1 Sworn Enemy and threaten me with scary injections, I am secretly super proud of the compassionate, hardworking Nurse you are. All the best for your VERY FIRST JOB starting in just 2 days—shukher din shesh, ebar prothom salary-r treat-ta ready rakhis!'
  );
  const [workplaceName, setWorkplaceName] = useState('Kothari Medical Center (Starting in 2 Days!)');

  const [step, setStep] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [muted, setMuted] = useState(false);
  const [burstTrigger, setBurstTrigger] = useState(0);

  // Interactive Micro-States for the 6 Suspense Steps
  const [enemyTrapScanned, setEnemyTrapScanned] = useState(false); // Step 0
  const [dramaMeter, setDramaMeter] = useState(40); // Step 1
  const [thrillerSuspect, setThrillerSuspect] = useState(null); // Step 2
  const [nursePowersChecked, setNursePowersChecked] = useState([]); // Step 3
  const [freedomStamped, setFreedomStamped] = useState([]); // Step 4
  const [vaultCharge, setVaultCharge] = useState(0); // Step 5

  // Finale States
  const [activeFinaleTab, setActiveFinaleTab] = useState('cake'); // 'cake' | 'newjob' | 'rx'
  const [candlesLit, setCandlesLit] = useState([true, true]);
  const [packedItems, setPackedItems] = useState([true, false, false, false]);

  // Customize Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draftName, setDraftName] = useState('');
  const [draftEnemy, setDraftEnemy] = useState('');
  const [draftWorkplace, setDraftWorkplace] = useState('');
  const [draftNote, setDraftNote] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Read URL Query Parameters for GitHub Pages Sharing
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlName = params.get('name');
      const urlEnemy = params.get('enemy');
      const urlMsg = params.get('msg');
      const urlWork = params.get('work');
      if (urlName && urlName.trim()) setFriendName(urlName.trim());
      if (urlEnemy && urlEnemy.trim()) setEnemyNickname(urlEnemy.trim());
      if (urlMsg && urlMsg.trim()) setCustomNote(urlMsg.trim());
      if (urlWork && urlWork.trim()) setWorkplaceName(urlWork.trim());
    }
  }, []);

  const clues = buildClueSequence(friendName);
  const currentClue = clues[step] || clues[0];

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    sound.muted = next;
  };

  // Step Progression Handler
  const handleNextStep = () => {
    if (isTransitioning) return;

    if (step < clues.length - 1) {
      sound.playPop(step);
      setIsTransitioning(true);
      setTimeout(() => {
        setStep((prev) => prev + 1);
        setIsTransitioning(false);
      }, 240);
    } else {
      // FINAL CLICK -> REVEAL EVERYTHING AT ONCE!
      sound.playPop(6);
      setIsTransitioning(true);
      setTimeout(() => {
        setIsRevealed(true);
        setIsTransitioning(false);
        setBurstTrigger((prev) => prev + 1);
        sound.playHappyBirthdayMelody();
      }, 360);
    }
  };

  // Micro-Interactions
  const handleEnemyScan = () => {
    sound.playRadarBeep(980, 0.14);
    setEnemyTrapScanned(true);
  };

  const handleDramaBoost = () => {
    sound.playPop(2);
    setDramaMeter((prev) => Math.min(1000, prev + 320));
  };

  const handleSelectSuspect = (suspectId) => {
    sound.playSuspenseChord();
    setThrillerSuspect(suspectId);
  };

  const toggleNursePower = (id) => {
    sound.playRadarBeep(1020, 0.1);
    setNursePowersChecked((prev) =>
      prev.includes(id) ? prev : [...prev, id]
    );
  };

  const toggleStampPerk = (id) => {
    sound.playStampSound();
    setFreedomStamped((prev) =>
      prev.includes(id) ? prev : [...prev, id]
    );
  };

  const handleChargeVault = () => {
    sound.playPowerCharge();
    setVaultCharge(100);
  };

  // Finale Interactions
  const blowCandle = (idx) => {
    if (!candlesLit[idx]) return;
    sound.playPop(idx + 3);
    const updated = [...candlesLit];
    updated[idx] = false;
    setCandlesLit(updated);

    if (updated.every((c) => !c)) {
      setBurstTrigger((prev) => prev + 1);
      sound.playHappyBirthdayMelody();
    }
  };

  const togglePackItem = (idx) => {
    sound.playPop(idx + 1);
    const next = [...packedItems];
    next[idx] = !next[idx];
    setPackedItems(next);
    if (next.every(Boolean)) {
      setBurstTrigger((prev) => prev + 1);
    }
  };

  const handleReplay = () => {
    sound.playPop(0);
    setIsRevealed(false);
    setStep(0);
    setEnemyTrapScanned(false);
    setDramaMeter(40);
    setThrillerSuspect(null);
    setNursePowersChecked([]);
    setFreedomStamped([]);
    setVaultCharge(0);
    setCandlesLit([true, true]);
    setActiveFinaleTab('cake');
  };

  const openModal = () => {
    setDraftName(friendName);
    setDraftEnemy(enemyNickname);
    setDraftWorkplace(workplaceName);
    setDraftNote(customNote);
    setCopiedLink(false);
    setIsModalOpen(true);
  };

  const saveCustomization = (e) => {
    e.preventDefault();
    const cleanName = draftName.trim() || 'Bestie';
    const cleanEnemy = draftEnemy.trim() || 'Your #1 Sworn Enemy 😈';
    const cleanWork = draftWorkplace.trim() || 'Kothari Medical Center (Starting in 2 Days!)';
    const cleanNote = draftNote.trim() || customNote;

    setFriendName(cleanName);
    setEnemyNickname(cleanEnemy);
    setWorkplaceName(cleanWork);
    setCustomNote(cleanNote);

    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('name', cleanName);
      url.searchParams.set('enemy', cleanEnemy);
      url.searchParams.set('work', cleanWork);
      url.searchParams.set('msg', cleanNote);
      window.history.replaceState({}, '', url);
    }
    setIsModalOpen(false);
  };

  const copyShareUrl = () => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    url.searchParams.set('name', draftName.trim() || friendName);
    url.searchParams.set('enemy', draftEnemy.trim() || enemyNickname);
    url.searchParams.set('work', draftWorkplace.trim() || workplaceName);
    url.searchParams.set('msg', draftNote.trim() || customNote);
    navigator.clipboard.writeText(url.toString());
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const allCandlesOut = candlesLit.every((c) => !c);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#070916] text-white flex flex-col justify-between select-none font-sans">
      {/* Custom Keyframe Animations */}
      <style>{`
        @keyframes ecgPulse {
          0% { stroke-dashoffset: 300; }
          100% { stroke-dashoffset: -300; }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(3deg); }
        }
        @keyframes flameFlicker {
          0%, 100% { transform: scale(1) rotate(-2deg); opacity: 0.95; }
          50% { transform: scale(1.16, 0.92) rotate(3deg); opacity: 1; }
        }
        .animate-float { animation: floatSlow 4s ease-in-out infinite; }
        .animate-flame { animation: flameFlicker 0.45s ease-in-out infinite; }
      `}</style>

      {/* Ambient Glow Orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div
          className={`absolute -top-28 -left-28 w-96 h-96 rounded-full blur-3xl transition-all duration-1000 ${
            isRevealed ? 'bg-pink-600/30' : 'bg-rose-600/15'
          }`}
        />
        <div
          className={`absolute top-1/3 -right-28 w-96 h-96 rounded-full blur-3xl transition-all duration-1000 ${
            isRevealed ? 'bg-teal-500/25' : 'bg-purple-600/15'
          }`}
        />
        <div
          className={`absolute -bottom-28 left-1/3 w-96 h-96 rounded-full blur-3xl transition-all duration-1000 ${
            isRevealed ? 'bg-amber-500/25' : 'bg-pink-500/10'
          }`}
        />
      </div>

      {/* Fireworks Canvas */}
      <FireworksCanvas active={isRevealed} burstTrigger={burstTrigger} />

      {/* Top Navigation Bar (NO SPOILERS until Finale!) */}
      <header className="relative z-20 w-full max-w-5xl mx-auto px-4 pt-4 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2.5 bg-slate-900/80 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-full shadow-lg">
          {isRevealed ? (
            <>
              <Stethoscope className="w-4 h-4 text-teal-400 animate-bounce" />
              <span className="text-xs font-bold tracking-wider uppercase bg-gradient-to-r from-teal-300 via-pink-300 to-amber-200 bg-clip-text text-transparent">
                LEVEL 22 NURSE DIDIMONI • 1ST JOB IN 2 DAYS!
              </span>
            </>
          ) : (
            <>
              <Skull className="w-4 h-4 text-rose-400 animate-pulse" />
              <span className="text-xs font-bold tracking-wider uppercase text-slate-300">
                TOP-SECRET SHATRU DOSSIER // NO SPOILERS
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* <button
            onClick={openModal}
            className="flex items-center gap-1.5 text-xs font-semibold bg-slate-900/80 hover:bg-slate-800 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full transition-all hover:scale-105 active:scale-95 text-slate-200"
            title="Customize Friend Name & Job Info"
          >
            <Edit3 className="w-3.5 h-3.5 text-pink-400" />
            <span className="hidden sm:inline">Customize</span>
          </button> */}

          <button
            onClick={toggleMute}
            className="p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 backdrop-blur-md border border-white/15 transition-all hover:scale-105 active:scale-95 text-slate-200"
            title={muted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {muted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-teal-300" />}
          </button>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-4">
        <div
          className={`w-full max-w-2xl transition-all duration-300 transform ${
            isTransitioning ? 'opacity-0 scale-95 translate-y-3' : 'opacity-100 scale-100 translate-y-0'
          }`}
        >
          {/* ================================================================
              PHASE 1: SPOILER-FREE 6-STEP FUNNY ROAST & NURSE SEQUENCE
             ================================================================ */}
          {!isRevealed ? (
            <div className="relative rounded-3xl bg-slate-900/85 backdrop-blur-2xl border border-white/15 shadow-[0_0_65px_rgba(244,63,94,0.16)] overflow-hidden">
              {/* Top Live Heartbeat Bar */}
              <LivePulseMonitor bpm={currentClue.bpm} step={step} isRevealed={false} />

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-slate-950">
                <div
                  className={`h-full bg-gradient-to-r ${currentClue.accent} transition-all duration-500`}
                  style={{ width: `${((step + 1) / clues.length) * 100}%` }}
                />
              </div>

              <div className="p-5 sm:p-8">
                {/* Clue Code & Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/25">
                    <Activity className="w-3.5 h-3.5" />
                    {currentClue.code}
                  </span>

                  <span className="text-xs font-semibold text-amber-300 bg-amber-500/10 border border-amber-400/20 px-3 py-1 rounded-full">
                    {currentClue.badge}
                  </span>
                </div>

                {/* Animated Emoji Avatar */}
                <div className="my-3 flex justify-center">
                  <div className="relative group">
                    <div
                      className={`absolute -inset-2.5 rounded-2xl bg-gradient-to-r ${currentClue.accent} opacity-35 blur-lg group-hover:opacity-65 transition`}
                    />
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-950/90 border border-white/15 flex items-center justify-center text-4xl sm:text-5xl shadow-xl animate-float">
                      {currentClue.emoji}
                    </div>
                  </div>
                </div>

                {/* Main Funny Headline & Subtext */}
                <div className="text-center space-y-2.5 my-4">
                  <h1
                    className={`text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r ${currentClue.accent} bg-clip-text text-transparent leading-tight`}
                  >
                    {currentClue.headline}
                  </h1>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
                    {currentClue.subtext}
                  </p>

                  {/* Bengali Banter Highlight Pill */}
                  <div className="pt-1">
                    <span className="inline-block text-xs sm:text-sm font-bold italic text-amber-200 bg-amber-500/10 border border-amber-400/25 px-3.5 py-1.5 rounded-xl">
                      {currentClue.bengaliTag}
                    </span>
                  </div>
                </div>

                {/* ============================================================
                    STEP-SPECIFIC INTERACTIVE MINI-GAMES (Steps 0 to 5)
                   ============================================================ */}
                <div className="my-5 bg-slate-950/80 border border-white/10 rounded-2xl p-4 sm:p-5">
                  {/* STEP 0: SWORN ENEMY PEACE-TREATY & TRAP SCANNER */}
                  {step === 0 && (
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="w-full flex items-center justify-between text-xs font-mono text-slate-400 bg-slate-900/90 px-3 py-2 rounded-xl border border-white/5">
                        <span>FROM: {enemyNickname}</span>
                        <span className="text-rose-400 font-bold">TARGET: {friendName} (Madam)</span>
                      </div>

                      <div className="text-xs font-mono uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
                        <ShieldAlert className="w-4 h-4" />
                        Shatru Link Safety Verification
                      </div>

                      {!enemyTrapScanned ? (
                        <>
                          <p className="text-xs text-slate-400 max-w-md">
                            Since you always think I am your #1 Enemy plotting against you, run a quick safety scan before opening the next page!
                          </p>
                          <button
                            onClick={handleEnemyScan}
                            className="px-5 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/40 text-rose-200 text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 hover:scale-105 active:scale-95"
                          >
                            <Search className="w-4 h-4 animate-spin" />
                            Scan Link for "Shatru Traps" 🔍
                          </button>
                        </>
                      ) : (
                        <div className="w-full bg-emerald-500/10 border border-emerald-400/30 rounded-xl p-3 text-emerald-200 text-xs sm:text-sm font-medium space-y-1">
                          <div className="font-bold flex items-center justify-center gap-1.5 text-emerald-300">
                            <Check className="w-4 h-4" /> SCAN COMPLETE: 0% Virus, 100% Pure Roasting!
                          </div>
                          <p className="text-xs text-slate-300">
                            "Ki Madam, bhoi peye geli naki? 😂 Calm down, today your Sworn Enemy signed a 24-hour ceasefire treaty just to make you smile!
                            1st e bhebechilam tai but kono iccha nei toke hasanor😏 ! Ektu bhoi e bhoi e thakbi amr theke...
                            "
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* STEP 1: BANGALI "BHALLAGE NA" & LYADH METER */}
                  {step === 1 && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="text-amber-300 flex items-center gap-1.5">
                          <Smile className="w-4 h-4" /> DAILY "DHUR KEU AMAKE BOJHE NA" METER
                        </span>
                        <span className="text-pink-400 font-bold">{dramaMeter}% OVERLOAD</span>
                      </div>

                      <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-white/10">
                        <div
                          className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(100, dramaMeter / 10)}%` }}
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-mono pt-1">
                        <div className="bg-slate-900/90 p-2 rounded-lg border border-white/5">
                          <div className="text-amber-300 font-bold">"Ektu Ghumabo"</div>
                          <div className="text-slate-400">14x / Day</div>
                        </div>
                        <div className="bg-slate-900/90 p-2 rounded-lg border border-white/5">
                          <div className="text-rose-300 font-bold">"Bhallage Na!"</div>
                          <div className="text-slate-400">89x / Day</div>
                        </div>
                        <div className="bg-slate-900/90 p-2 rounded-lg border border-white/5">
                          <div className="text-purple-300 font-bold">Nakhra Level</div>
                          <div className="text-slate-400">Maharani 👑</div>
                        </div>
                      </div>

                      <button
                        onClick={handleDramaBoost}
                        className="w-full py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 text-xs font-bold uppercase tracking-wider transition"
                      >
                        {dramaMeter >= 1000
                          ? '🔥 METER BROKE! 1000% CERTIFIED DRAMA QUEEN & LYADH CHAMPION!'
                          : '⚡ Click to Test Her "Lyadh & Nakhra" Level'}
                      </button>
                    </div>
                  )}

                  {/* STEP 2: THRILLER MOVIES & SERIES C.I.D. DETECTIVE */}
                  {step === 2 && (
                    <div className="space-y-3 text-center">
                      <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase text-purple-300">
                        <Clapperboard className="w-4 h-4 text-rose-400" />
                        2:00 AM Thriller Plot-Twist Test for "Lady Byomkesh"
                      </div>

                      <p className="text-xs text-slate-300">
                        Since you have a PhD in watching dark crime thrillers & suspense web-series at 2 AM, solve this mystery: <strong>Who is behind today's secret plot?</strong>
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                        {[
                          { id: 'butler', label: '🕵️‍♀️ The Innocent Side-Character in Ep 1' },
                          { id: 'ghost', label: '👻 Late-Night Thriller Ghost' },
                          { id: 'enemy', label: '😈 Your #1 Sworn Enemy (Plot Twist!)' },
                        ].map((item) => (
                          <button
                            key={item.id}
                            onClick={() => handleSelectSuspect(item.id)}
                            className={`p-2.5 rounded-xl border text-xs font-semibold transition text-left sm:text-center ${
                              thrillerSuspect === item.id
                                ? 'bg-purple-500/25 border-purple-400 text-white shadow-lg'
                                : 'bg-slate-900/90 border-white/10 text-slate-300 hover:bg-slate-800'
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>

                      {thrillerSuspect && (
                        <div className="bg-purple-500/15 border border-purple-400/30 rounded-xl p-3 text-xs text-purple-200">
                          <strong>MithunDa / Lady Feluda Verdict:</strong> "Ami toh prothom scene dekhei bolechilam!" 😂 Yes! Even Hollywood thriller directors are scared of {friendName}'s overthinking brain!
                        </div>
                      )}
                    </div>
                  )}

                  {/* STEP 3: DEDICATED NURSE "DIDIMONI / SISTER-JI" ATTITUDE CALIBRATOR */}
                  {step === 3 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono text-teal-300">
                        <span className="flex items-center gap-1.5">
                          <Stethoscope className="w-4 h-4 text-teal-400" />
                          DIDIMONI NURSE SUPERPOWER SCANNER
                        </span>
                        <span className="font-bold text-emerald-300">
                          {nursePowersChecked.length}/3 VERIFIED
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 text-center">
                        Tap each box to verify {friendName}'s top 3 legendary Nurse superpowers before she threatens us with a 10ml syringe:
                      </p>

                      <div className="space-y-2">
                        {[
                          {
                            id: 'handwriting',
                            icon: <ClipboardCheck className="w-4 h-4 text-teal-300" />,
                            title: 'Decoding Doctor\'s "arsholar theng" Handwriting',
                            desc: 'Can read 1 line of squiggly ink and instantly know it says "Paracetamol 500mg STAT!"'
                          },
                          {
                            id: 'injection',
                            icon: <Syringe className="w-4 h-4 text-rose-400" />,
                            title: 'Fake "Pipre Kamranor Moto Lagbe" Smile 💉',
                            desc: 'Sweetest angel voice with patients, full "Chup chap oshudh kha!" boss mode at home.'
                          },
                          {
                            id: 'vitals',
                            icon: <HeartPulse className="w-4 h-4 text-pink-400" />,
                            title: 'Checking BP & Vitals at Lightning Speed',
                            desc: 'Looks heroic in hospital scrubs even after an exhausting shift!'
                          }
                        ].map((power) => {
                          const checked = nursePowersChecked.includes(power.id);
                          return (
                            <button
                              key={power.id}
                              onClick={() => toggleNursePower(power.id)}
                              className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition ${
                                checked
                                  ? 'bg-teal-500/15 border-teal-400/40 text-teal-100'
                                  : 'bg-slate-900/90 border-white/10 text-slate-200 hover:bg-slate-800'
                              }`}
                            >
                              <div className="flex items-start gap-2.5 pr-2">
                                <div className="mt-0.5">{power.icon}</div>
                                <div>
                                  <div className="text-xs font-bold">{power.title}</div>
                                  <div className="text-[11px] text-slate-400">{power.desc}</div>
                                </div>
                              </div>
                              <span
                                className={`shrink-0 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full ${
                                  checked
                                    ? 'bg-teal-500/30 text-teal-200 border border-teal-400/40'
                                    : 'bg-white/10 text-slate-300'
                                }`}
                              >
                                {checked ? '✔ CERTIFIED DIDIMONI' : 'TAP TO VERIFY'}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* STEP 4: 48-HOUR COUNTDOWN -> 1ST JOB IN 2 DAYS ("SHUKHER DIN SHESH!") */}
                  {step === 4 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono text-rose-300 bg-rose-500/15 border border-rose-400/30 px-3 py-2 rounded-xl">
                        <span className="flex items-center gap-1.5 font-bold">
                          <Siren className="w-4 h-4 animate-bounce text-amber-300" />
                          COUNTDOWN TO 1ST JOB: MATRO 2 DIN (48 HRS)!
                        </span>
                        <span className="font-bold text-amber-300">
                          {freedomStamped.length}/3 CANCELLED
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 text-center">
                        In just <strong>2 DAYS</strong> after today, Madam starts her very first nursing job! Tap each luxury below to officially stamp it <strong>"SHUKHER DIN SHESH!"</strong>:
                      </p>

                      <div className="space-y-2">
                        {[
                          {
                            id: 'sleep',
                            icon: <BedDouble className="w-4 h-4 text-pink-400" />,
                            title: 'Saradin pore pore lydh khaoa Like a Rajkonna 👑',
                            status: 'CANCELLED IN 2 DAYS! 6:00 AM Shift Alarm Incoming ⏰'
                          },
                          {
                            id: 'binge',
                            icon: <Tv className="w-4 h-4 text-purple-400" />,
                            title: 'Watching Thriller Series Till 3:00 AM 🍿',
                            status: 'BIDAY! Morning Ward Round-e Ghumiye Porbi!'
                          },
                          {
                            id: 'lyadh',
                            icon: <AlarmClock className="w-4 h-4 text-amber-400" />,
                            title: 'Unlimited Dupurer Bhaat-Ghum & Lyadh 🛋️',
                            status: 'SHUKHER DIN SHESH POTTERRRR! Ebar Duty Roster Cholbe!'
                          },
                        ].map((perk) => {
                          const isStamped = freedomStamped.includes(perk.id);
                          return (
                            <button
                              key={perk.id}
                              onClick={() => toggleStampPerk(perk.id)}
                              className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition ${
                                isStamped
                                  ? 'bg-rose-500/15 border-rose-500/40 text-rose-200'
                                  : 'bg-slate-900/90 border-white/10 text-slate-200 hover:bg-slate-800'
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                {perk.icon}
                                <div>
                                  <div className={`text-xs font-bold ${isStamped ? 'line-through text-slate-400' : ''}`}>
                                    {perk.title}
                                  </div>
                                  {isStamped && (
                                    <div className="text-[11px] text-amber-300 font-semibold">
                                      {perk.status}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <span
                                className={`shrink-0 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full ${
                                  isStamped
                                    ? 'bg-rose-500/30 text-rose-300 border border-rose-400/40'
                                    : 'bg-amber-500/20 text-amber-300'
                                }`}
                              >
                                {isStamped ? '❌ SHUKHER DIN SHESH!' : 'STAMP BIDAY 👋'}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      <div className="text-center text-xs text-pink-200 bg-pink-500/10 border border-pink-400/20 rounded-xl p-2.5">
                        🤭 <strong>Blushing Alert:</strong> Look at her smiling! Jokes apart, becoming an independent <em>"Chakri-wali Boro Lok Nurse Didimoni"</em> in 2 days suits you! (First salary-r Biryani treat is mandatory!)
                      </div>
                    </div>
                  )}

                  {/* STEP 5: FINAL VAULT OVERDRIVE CHARGE */}
                  {step === 5 && (
                    <div className="space-y-3 text-center">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-amber-300 flex items-center gap-1">
                          {vaultCharge === 100 ? <Unlock className="w-4 h-4 text-emerald-400" /> : <Lock className="w-4 h-4" />}
                          FINAL CELEBRATION VAULT
                        </span>
                        <span className="text-emerald-300 font-bold">
                          {vaultCharge === 100 ? 'UNLOCKED & READY!' : 'LOCKED'}
                        </span>
                      </div>

                      {vaultCharge < 100 ? (
                        <button
                          onClick={handleChargeVault}
                          className="w-full py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 animate-pulse"
                        >
                          <Zap className="w-4 h-4" />
                          Tap to Unlock the Grand Surprise Vault ⚡
                        </button>
                      ) : (
                        <div className="text-xs text-emerald-300 font-mono bg-emerald-500/10 border border-emerald-500/30 rounded-xl py-2.5 px-3">
                          ⚡ VAULT UNLOCKED! Hit the big button below for the full reveal & fireworks!
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Primary Step Progression Button */}
                <button
                  onClick={handleNextStep}
                  className={`group relative w-full py-4 px-6 rounded-2xl font-extrabold text-base sm:text-lg text-slate-950 shadow-xl transition-all duration-200 bg-gradient-to-r ${currentClue.accent} hover:brightness-110 hover:scale-[1.01] active:scale-[0.98] flex items-center justify-center gap-2`}
                >
                  <span>{currentClue.cta}</span>
                  <Sparkles className="w-5 h-5 transition-transform group-hover:rotate-45" />
                </button>

                {/* Step Indicators */}
                <div className="mt-5 flex items-center justify-center gap-2">
                  {clues.map((c, idx) => (
                    <div
                      key={c.id}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === step
                          ? 'w-8 bg-rose-400'
                          : idx < step
                          ? 'w-2 bg-pink-400/60'
                          : 'w-2 bg-slate-800'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* ================================================================
               PHASE 2: THE GRAND REVEAL FINALE (22nd Birthday + Nurse + 1st Job in 2 Days!)
               ================================================================ */
            <div className="relative rounded-3xl bg-slate-900/85 backdrop-blur-2xl border border-pink-500/35 shadow-[0_0_90px_rgba(236,72,153,0.3)] overflow-hidden">
              <LivePulseMonitor bpm={135} step={6} isRevealed={true} />

              <div className="p-5 sm:p-8 text-center">
                {/* Double Milestone Badges */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-pink-500/20 via-amber-500/20 to-teal-500/20 border border-pink-400/40 text-pink-200 text-xs font-bold uppercase tracking-wider">
                    <Crown className="w-3.5 h-3.5 text-amber-300" />
                    Chapter 22 Unlocked • Certified Nurse Icon 🩺
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs font-bold uppercase tracking-wider">
                    <Briefcase className="w-3.5 h-3.5 text-emerald-300" />
                    1st Nursing Job in 2 Days! 🎉
                  </div>
                </div>

                {/* Grand Birthday Headline */}
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                  <span className="block bg-gradient-to-r from-amber-200 via-pink-400 to-teal-300 bg-clip-text text-transparent drop-shadow-sm">
                    HAPPY 22nd BIRTHDAY,
                  </span>
                  <span className="block mt-1 bg-gradient-to-r from-teal-300 via-white to-pink-300 bg-clip-text text-transparent">
                    NURSE {friendName.toUpperCase()}! 🎂🩺
                  </span>
                </h1>

                <p className="mt-2 text-xs sm:text-sm font-medium text-amber-200/90">
                  From {enemyNickname}: "Shubho Jonmodin Madam! (Even enemies celebrate legends!)" 😈💖
                </p>

                {/* New Job in 2 Days Spotlight Banner */}
                <div className="mt-3 inline-flex items-center gap-2 bg-gradient-to-r from-teal-500/15 via-emerald-500/15 to-cyan-500/15 border border-teal-400/30 rounded-2xl px-4 py-2 text-xs sm:text-sm text-teal-200">
                  <Calendar className="w-4 h-4 text-teal-300 shrink-0" />
                  <span>
                    Double Dhamaka: Turning <strong>22 Today</strong> & Starting Your <strong>1st Job in 2 Days</strong> at <strong>{workplaceName}</strong>! 🏥✨
                  </span>
                </div>

                {/* Finale Interactive Mode Switcher */}
                <div className="flex flex-wrap justify-center gap-2 my-5">
                  <button
                    onClick={() => setActiveFinaleTab('cake')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5 ${
                      activeFinaleTab === 'cake'
                        ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/30'
                        : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-white/10'
                    }`}
                  >
                    <Flame className="w-3.5 h-3.5" />
                    1. Blow "22" Candles
                  </button>

                  <button
                    onClick={() => setActiveFinaleTab('newjob')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5 ${
                      activeFinaleTab === 'newjob'
                        ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30'
                        : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-white/10'
                    }`}
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    2. 1st Job in 2 Days! 🏥
                  </button>

                  <button
                    onClick={() => setActiveFinaleTab('rx')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5 ${
                      activeFinaleTab === 'rx'
                        ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/30'
                        : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-white/10'
                    }`}
                  >
                    <ClipboardCheck className="w-3.5 h-3.5" />
                    3. Shatru's Note & Rx ℞
                  </button>
                </div>

                {/* ============================================================
                    TAB 1: INTERACTIVE "22" NURSE BIRTHDAY CAKE
                   ============================================================ */}
                {activeFinaleTab === 'cake' && (
                  <div className="my-4 py-5 px-4 rounded-2xl bg-slate-950/75 border border-white/10 flex flex-col items-center">
                    <p className="text-xs font-medium text-slate-300 mb-4 flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-amber-400" />
                      {allCandlesOut
                        ? '✨ 22nd Birthday & 1st Job Wishes Locked In! Extra Fireworks Launched! ✨'
                        : 'Tap both glowing "2" and "2" candles to make your 22nd Birthday wish!'}
                    </p>

                    <div className="relative flex flex-col items-center pt-5">
                      {/* Dual "2" "2" Number Candles */}
                      <div className="flex items-end gap-6 mb-[-4px] z-10">
                        {[0, 1].map((idx) => {
                          const lit = candlesLit[idx];
                          return (
                            <button
                              key={idx}
                              onClick={() => blowCandle(idx)}
                              className="group flex flex-col items-center focus:outline-none"
                            >
                              <div className="h-8 flex items-center justify-center">
                                {lit ? (
                                  <div className="w-5 h-7 rounded-full bg-gradient-to-t from-orange-500 via-amber-300 to-white shadow-[0_0_24px_#f59e0b] animate-flame cursor-pointer" />
                                ) : (
                                  <div className="text-xs text-slate-400 font-mono animate-bounce">💨</div>
                                )}
                              </div>
                              <div className="w-11 h-12 rounded-xl bg-gradient-to-br from-pink-400 via-rose-500 to-amber-400 p-0.5 shadow-lg group-hover:scale-105 transition">
                                <div className="w-full h-full bg-slate-950/80 rounded-[10px] flex items-center justify-center text-2xl font-black text-white">
                                  2
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Cake Top Tier with Nurse Cross */}
                      <div className="w-52 h-12 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-400 rounded-t-2xl border-t-4 border-pink-200 shadow-inner flex items-center justify-center relative">
                        <div className="px-3 py-0.5 rounded-full bg-white text-rose-600 font-black text-xs tracking-wider shadow flex items-center gap-1">
                          <span>✚</span> DIDIMONI • 22 <span>✚</span>
                        </div>
                      </div>

                      {/* Cake Base Tier */}
                      <div className="w-64 h-14 bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-500 rounded-b-2xl border-t-4 border-teal-200 shadow-2xl flex items-center justify-around px-4">
                        <HeartPulse className="w-4 h-4 text-white/90" />
                        <span className="text-[11px] font-mono font-bold text-slate-950 bg-white/90 px-2.5 py-0.5 rounded-full">
                          1ST JOB IN 2 DAYS!
                        </span>
                        <Stethoscope className="w-4 h-4 text-white/90" />
                      </div>

                      <div className="w-72 h-3 bg-slate-700 rounded-full mt-1 shadow-xl" />
                    </div>

                    {allCandlesOut && (
                      <button
                        onClick={() => setCandlesLit([true, true])}
                        className="mt-4 text-xs text-teal-300 hover:text-teal-200 underline underline-offset-4"
                      >
                        Relight the "22" Candles 🔥
                      </button>
                    )}
                  </div>
                )}

                {/* ============================================================
                    TAB 2: 1ST JOB IN 2 DAYS SURVIVAL KIT & VIP ID BADGE
                   ============================================================ */}
                {activeFinaleTab === 'newjob' && (
                  <div className="my-4 p-5 rounded-2xl bg-slate-950/90 border-2 border-emerald-400/40 text-left space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 font-black">
                          <BadgeCheck className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-300">
                            FIRST JOB JOINING PASS • T-MINUS 48 HOURS
                          </div>
                          <div className="text-base font-extrabold text-white">
                            Nurse {friendName}, Debarati (22 Yrs)
                          </div>
                        </div>
                      </div>
                      <div className="text-right font-mono text-xs">
                        <div className="text-amber-300 font-bold">JOINING: IN 2 DAYS!</div>
                        <div className="text-slate-400">{workplaceName}</div>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <strong>"Shukher din shesh, kintu gaurab-er din shuru!"</strong> 🌟 Starting your very first nursing job just 2 days after turning 22 is a massive flex. Pack your <strong>Day-1 Ward Survival Bag</strong> below:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        { label: '🩺 Lucky Stethoscope & Pocket Pen', note: 'Ready for Day-1 Ward Rounds!' },
                        { label: '💉 Sweet Smile + Boss Didimoni Attitude', note: 'Patients love her, friends fear her!' },
                        { label: '⏰ 5:30 AM Alarm (No More 11 AM Ghum!)', note: 'Shukher din officially shesh!' },
                        { label: '🍛 First Salary Treat Promise for Enemy', note: 'Mandatory Biryani treaty signed!' },
                      ].map((item, i) => (
                        <button
                          key={i}
                          onClick={() => togglePackItem(i)}
                          className={`p-3 rounded-xl border text-left transition flex items-start justify-between gap-2 ${
                            packedItems[i]
                              ? 'bg-emerald-500/15 border-emerald-400/40 text-emerald-100'
                              : 'bg-slate-900/90 border-white/10 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <div>
                            <div className="text-xs font-bold">{item.label}</div>
                            <div className="text-[11px] text-slate-400 mt-0.5">{item.note}</div>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold shrink-0 ${
                              packedItems[i] ? 'bg-emerald-400 text-slate-950' : 'bg-slate-800 text-slate-500'
                            }`}
                          >
                            {packedItems[i] ? '✓' : '+'}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ============================================================
                    TAB 3: OFFICIAL BIRTHDAY & NEW JOB PRESCRIPTION PAD (℞)
                   ============================================================ */}
                {activeFinaleTab === 'rx' && (
                  <div className="my-4 p-5 rounded-2xl bg-slate-950/90 border-2 border-teal-400/40 text-left font-mono space-y-3 shadow-inner">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                      <div>
                        <div className="text-xs text-teal-300 font-bold uppercase">
                          OFFICIAL 22nd BIRTHDAY & 1ST JOB PRESCRIPTION
                        </div>
                        <div className="text-[11px] text-slate-400">
                          PATIENT: Nurse {friendName} (Age: 22) • ISSUED BY: {enemyNickname}
                        </div>
                      </div>
                      <div className="text-3xl font-serif font-black text-teal-400">℞</div>
                    </div>

                    <div className="space-y-2 text-xs sm:text-sm text-slate-200 font-sans">
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                        <span>
                          <strong>48 Hours of Pure Royal Pampering:</strong> Enjoy your last 2 days of full freedom, cake, and late-night thrillers before Day-1 duty begins!
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                        <span>
                          <strong>Zero "Bhallage Na" Allowed Today:</strong> Only big smiles, birthday glow, and main-character energy!
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>
                          <strong>1st Salary Biryani Clause:</strong> Once your first nursing paycheck hits your bank account, your #1 Enemy gets a royal treat!
                        </span>
                      </div>
                    </div>

                    {/* Personal Note Box */}
                    <div className="mt-3 pt-3 border-t border-white/10 font-sans">
                      <div className="text-[11px] font-mono uppercase text-pink-300 mb-1">
                        SECRET NOTE FROM YOUR #1 SWORN ENEMY:
                      </div>
                      <p className="text-xs sm:text-sm text-slate-100 italic leading-relaxed bg-white/5 p-3.5 rounded-xl border border-white/10">
                        "{customNote}"
                      </p>
                    </div>

                    <div className="pt-1 flex items-center justify-between text-[11px] text-emerald-300">
                      <span>STATUS: APPROVED FOR GREATNESS ✔</span>
                      <span>REFILLS: INFINITE SMILES ♾️</span>
                    </div>
                  </div>
                )}

                {/* Finale Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
                  <button
                    onClick={() => {
                      setBurstTrigger((prev) => prev + 1);
                      sound.playHappyBirthdayMelody();
                    }}
                    className="px-5 py-3 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white shadow-lg shadow-pink-500/25 hover:brightness-110 active:scale-95 transition flex items-center gap-2"
                  >
                    <PartyPopper className="w-4 h-4" />
                    Launch "22 & New Job" Fireworks + Song 🎆
                  </button>

                  <button
                    onClick={handleReplay}
                    className="px-4 py-3 rounded-xl font-semibold text-xs sm:text-sm bg-white/10 hover:bg-white/15 border border-white/15 text-slate-200 transition flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Replay Roasting Sequence
                  </button>
                </div>

                <p className="mt-3 text-[11px] text-slate-400">
                  💡 Pro Tip: Click anywhere on the night sky to launch custom Heart, Medical Cross (✚), and 22 Ring fireworks!
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer (Spoiler-Free until revealed) */}
      <footer className="relative z-10 text-center py-3 px-4 text-xs text-slate-500 flex items-center justify-center gap-1.5">
        <span>Crafted for maximum smiles</span>
        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline animate-pulse" />
        <span>
          • {isRevealed ? 'Happy 22nd Birthday & Best Wishes for Your 1st Job in 2 Days!' : 'Interactive Shatru Transmission'}
        </span>
      </footer>

      {/* ====================================================================
          CUSTOMIZE & SHARE LINK MODAL (For GitHub Pages Hosting)
         ==================================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-white/15 shadow-2xl p-6 relative animate-fadeIn">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-pink-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Share2 className="w-4 h-4" />
              Customize Surprise Link
            </div>
            <h2 className="text-xl font-bold text-white mb-1">
              Personalize for Your Nurse Friend
            </h2>
            <p className="text-xs text-slate-400 mb-4">
              Steps 0–5 stay 100% spoiler-free, then reveal her 22nd Birthday & her 1st Nursing Job starting in 2 days!
            </p>

            <form onSubmit={saveCustomization} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Her Name / Nickname
                </label>
                <input
                  type="text"
                  value={draftName}
                  onChange={(e) => setDraftName(e.target.value)}
                  placeholder="e.g., Riya / Ankita / Madam"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/15 text-white text-sm focus:outline-none focus:border-pink-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Your "Enemy" Title (Sender Tag)
                </label>
                <input
                  type="text"
                  value={draftEnemy}
                  onChange={(e) => setDraftEnemy(e.target.value)}
                  placeholder="e.g., Your #1 Sworn Enemy 😈"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/15 text-white text-sm focus:outline-none focus:border-pink-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Kothari Medical Center (Starting in 2 Days)
                </label>
                <input
                  type="text"
                  value={draftWorkplace}
                  onChange={(e) => setDraftWorkplace(e.target.value)}
                  placeholder="e.g., Apollo Hospital (Starting in 2 Days!)"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/15 text-white text-sm focus:outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Custom Finale Message (Shown in Step 3 Rx Pad)
                </label>
                <textarea
                  rows={3}
                  value={draftNote}
                  onChange={(e) => setDraftNote(e.target.value)}
                  placeholder="Write a funny & sweet birthday + 1st job wish..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/15 text-white text-sm focus:outline-none focus:border-pink-400 resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  type="button"
                  onClick={copyShareUrl}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      Link Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-teal-300" />
                      Copy Shareable URL
                    </>
                  )}
                </button>

                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-pink-500 to-teal-500 hover:brightness-110 text-xs font-bold text-slate-950 transition"
                >
                  Apply & Preview
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}