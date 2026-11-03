import { useState, useRef, useEffect, useCallback } from 'react';

export type ZenSynthPresetId = 'lofi-atelier' | 'deep-cosmos' | 'minimal-pulse';

export interface ZenSynthPreset {
  readonly id: ZenSynthPresetId;
  readonly label: string;
  readonly bpm: number;
  readonly cutoffHz: number;
  readonly chords: readonly (readonly number[])[];
}

export const ZEN_SYNTH_PRESETS: readonly ZenSynthPreset[] = [
  {
    id: 'lofi-atelier',
    label: 'Lo-Fi Atelier (Dm9 -> Cmaj9)',
    bpm: 73,
    cutoffHz: 520,
    chords: [
      [146.83, 220.0, 261.63, 329.63, 392.0],
      [130.81, 196.0, 246.94, 293.66, 349.23],
      [116.54, 174.61, 220.0, 261.63, 329.63],
      [110.0, 164.81, 207.65, 246.94, 311.13],
    ],
  },
  {
    id: 'deep-cosmos',
    label: 'Deep Cosmos (Alpha Cen Drone)',
    bpm: 56,
    cutoffHz: 390,
    chords: [
      [110.0, 164.81, 220.0, 277.18, 329.63],
      [98.0, 146.83, 196.0, 246.94, 293.66],
      [87.31, 130.81, 174.61, 220.0, 261.63],
      [92.5, 138.59, 185.0, 233.08, 277.18],
    ],
  },
  {
    id: 'minimal-pulse',
    label: 'Swiss Precision (Quartal Telemetry)',
    bpm: 84,
    cutoffHz: 680,
    chords: [
      [164.81, 220.0, 293.66, 392.0],
      [146.83, 196.0, 261.63, 349.23],
      [130.81, 174.61, 233.08, 311.13],
      [146.83, 220.0, 293.66, 440.0],
    ],
  },
];

export interface UseZenAudioSynthOptions {
  readonly defaultPreset?: ZenSynthPresetId;
  readonly defaultVolume?: number;
}

export interface ZenAudioSynthController {
  readonly active: boolean;
  readonly presetId: ZenSynthPresetId;
  readonly volume: number;
  readonly currentStep: number;
  readonly presets: readonly ZenSynthPreset[];
  readonly toggle: () => void;
  readonly setPresetId: (id: ZenSynthPresetId) => void;
  readonly setVolume: (nextVol: number) => void;
  readonly playMicroClick: (pitchHz?: number) => void;
}

export function useZenAudioSynth(
  options?: UseZenAudioSynthOptions
): ZenAudioSynthController {
  const [active, setActive] = useState(false);
  const [presetId, setPresetId] = useState<ZenSynthPresetId>(
    options?.defaultPreset ?? 'lofi-atelier'
  );
  const [volume, setVolumeState] = useState<number>(
    options?.defaultVolume ?? 0.8
  );
  const [currentStep, setCurrentStep] = useState<number>(0);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const snareBufferRef = useRef<AudioBuffer | null>(null);
  const timerRef = useRef<number | null>(null);
  const volumeRef = useRef<number>(volume);

  const ensureAudioGraph = useCallback((): {
    readonly ctx: AudioContext;
    readonly master: GainNode;
    readonly snareBuffer: AudioBuffer;
  } | null => {
    if (typeof window === 'undefined') return null;
    const AudioContextClass = window.AudioContext;
    if (!AudioContextClass) return null;

    if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
      const ctx = new AudioContextClass();
      const master = ctx.createGain();
      master.gain.setValueAtTime(volumeRef.current, ctx.currentTime);
      master.connect(ctx.destination);

      const bufferSize = Math.floor(ctx.sampleRate * 0.09);
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] =
          (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
      }

      audioCtxRef.current = ctx;
      masterGainRef.current = master;
      snareBufferRef.current = noiseBuffer;
    }

    const ctx = audioCtxRef.current;
    const master = masterGainRef.current;
    const snareBuffer = snareBufferRef.current;
    if (!ctx || !master || !snareBuffer) return null;

    if (ctx.state === 'suspended') {
      void ctx.resume();
    }

    return { ctx, master, snareBuffer };
  }, []);

  const setVolume = useCallback((nextVol: number) => {
    const clamped = Math.max(0, Math.min(1, nextVol));
    volumeRef.current = clamped;
    setVolumeState(clamped);
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setTargetAtTime(
        clamped,
        audioCtxRef.current.currentTime,
        0.04
      );
    }
  }, []);

  const playMicroClick = useCallback(
    (pitchHz = 880) => {
      const graph = ensureAudioGraph();
      if (!graph) return;
      const { ctx, master } = graph;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitchHz, now);
      osc.frequency.exponentialRampToValueAtTime(pitchHz * 0.5, now + 0.035);
      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
      osc.connect(gain);
      gain.connect(master);
      osc.start(now);
      osc.stop(now + 0.045);
    },
    [ensureAudioGraph]
  );

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        void audioCtxRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (!active) {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    const graph = ensureAudioGraph();
    if (!graph) return;
    const { ctx, master, snareBuffer } = graph;

    const preset =
      ZEN_SYNTH_PRESETS.find((p) => p.id === presetId) ?? ZEN_SYNTH_PRESETS[0];
    const stepMs = Math.round((60 / preset.bpm / 2) * 1000);

    const scheduleStep = (stepIdx: number) => {
      const now = ctx.currentTime;
      const barStep = stepIdx % 8;
      const chordIdx = Math.floor(stepIdx / 8) % preset.chords.length;
      const chord = preset.chords[chordIdx];

      if (barStep === 0 || barStep === 3) {
        chord.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const filter = ctx.createBiquadFilter();
          const vibrato = ctx.createOscillator();
          const vibGain = ctx.createGain();

          osc.type = idx === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, now);

          vibrato.frequency.setValueAtTime(4.2, now);
          vibGain.gain.setValueAtTime(idx === 0 ? 0.2 : 1.1, now);
          vibrato.connect(vibGain);
          vibGain.connect(osc.frequency);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(preset.cutoffHz, now);

          const peakGain = idx === 0 ? 0.042 : 0.018;
          const dur = barStep === 0 ? 1.45 : 1.95;
          gain.gain.setValueAtTime(0.0001, now);
          gain.gain.linearRampToValueAtTime(peakGain, now + 0.08);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(master);

          osc.start(now);
          vibrato.start(now);
          osc.stop(now + dur + 0.05);
          vibrato.stop(now + dur + 0.05);
        });
      }

      if (barStep === 0 || barStep === 5) {
        const kickOsc = ctx.createOscillator();
        const kickGain = ctx.createGain();
        kickOsc.type = 'sine';
        kickOsc.frequency.setValueAtTime(108, now);
        kickOsc.frequency.exponentialRampToValueAtTime(38, now + 0.14);
        kickGain.gain.setValueAtTime(0.065, now);
        kickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);
        kickOsc.connect(kickGain);
        kickGain.connect(master);
        kickOsc.start(now);
        kickOsc.stop(now + 0.26);
      }

      if (barStep === 2 || barStep === 6) {
        const noise = ctx.createBufferSource();
        noise.buffer = snareBuffer;
        const snareFilter = ctx.createBiquadFilter();
        snareFilter.type = 'bandpass';
        snareFilter.frequency.setValueAtTime(1150, now);
        const snareGain = ctx.createGain();
        snareGain.gain.setValueAtTime(0.022, now);
        snareGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
        noise.connect(snareFilter);
        snareFilter.connect(snareGain);
        snareGain.connect(master);
        noise.start(now);
      }
    };

    let step = 0;
    setCurrentStep(0);
    scheduleStep(0);
    timerRef.current = window.setInterval(() => {
      step += 1;
      setCurrentStep(step % 8);
      scheduleStep(step);
    }, stepMs);

    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [active, presetId, ensureAudioGraph]);

  return {
    active,
    presetId,
    volume,
    currentStep,
    presets: ZEN_SYNTH_PRESETS,
    toggle: () => setActive((prev) => !prev),
    setPresetId,
    setVolume,
    playMicroClick,
  };
}
