// Procedural Web Audio API sound generator for romantic lofi chill tones and interaction sounds

class SoundManager {
  private ctx: AudioContext | null = null;
  private isPlayingMusic: boolean = false;
  private musicInterval: number | null = null;
  private volume: number = 0.25;

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  // Play a soft romantic tone
  public playTone(freq: number, type: OscillatorType = "sine", duration = 0.8, decay = 0.6) {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(this.volume * 0.4, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + decay);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio might be blocked until user gesture
    }
  }

  // Terminal keystroke click
  public playKeyClick() {
    this.playTone(600 + Math.random() * 200, "triangle", 0.05, 0.04);
  }

  // Romantic celestial chime (e.g. for confetti / love reaction)
  public playLoveChime() {
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, "sine", 0.9, 0.7);
      }, idx * 90);
    });
  }

  // Success fanfare for unit tests
  public playTestSuccess() {
    const chords = [440, 554.37, 659.25, 880]; // A major
    chords.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, "sine", 0.7, 0.5);
      }, idx * 80);
    });
  }

  // Toggle ambient lofi chill arpeggio
  public toggleAmbientMusic(onStateChange?: (playing: boolean) => void) {
    this.initCtx();
    if (this.isPlayingMusic) {
      this.stopAmbientMusic();
      if (onStateChange) onStateChange(false);
      return false;
    } else {
      this.startAmbientMusic();
      if (onStateChange) onStateChange(true);
      return true;
    }
  }

  public isMusicPlaying(): boolean {
    return this.isPlayingMusic;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
  }

  public startAmbientMusic() {
    this.initCtx();
    if (this.isPlayingMusic) return;
    this.isPlayingMusic = true;

    // Romantic dreamy pentatonic scale: F# minor / A major pentatonic (peaceful, cinematic)
    const melodyScale = [
      220.0, // A3
      261.63, // C4
      293.66, // D4
      329.63, // E4
      392.0, // G4
      440.0, // A4
      523.25, // C5
      587.33, // D5
      659.25, // E5
    ];

    let step = 0;
    const playNextNote = () => {
      if (!this.isPlayingMusic) return;

      const baseNote = melodyScale[step % melodyScale.length];
      const harmonyNote = melodyScale[(step + 2) % melodyScale.length];

      this.playTone(baseNote, "sine", 1.8, 1.4);
      if (step % 2 === 0) {
        setTimeout(() => {
          this.playTone(harmonyNote * 0.5, "triangle", 2.2, 1.8);
        }, 300);
      }

      step = (step + Math.floor(Math.random() * 3) + 1) % melodyScale.length;
    };

    playNextNote();
    this.musicInterval = window.setInterval(playNextNote, 1400);
  }

  public stopAmbientMusic() {
    this.isPlayingMusic = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }
}

export const soundManager = new SoundManager();
