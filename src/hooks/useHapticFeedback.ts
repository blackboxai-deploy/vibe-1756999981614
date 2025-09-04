'use client';

import { useCallback, useEffect, useState } from 'react';

interface HapticFeedbackOptions {
  enabled: boolean;
  intensity: 'light' | 'medium' | 'heavy';
  soundEnabled: boolean;
}

export function useHapticFeedback(options: HapticFeedbackOptions = {
  enabled: true,
  intensity: 'medium',
  soundEnabled: true
}) {
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if the device supports vibration
    setIsSupported('vibrate' in navigator);
  }, []);

  const vibrate = useCallback((pattern?: number | number[]) => {
    if (!options.enabled || !isSupported) return;

    let vibrationPattern: number | number[];

    if (pattern) {
      vibrationPattern = pattern;
    } else {
      // Default patterns based on intensity
      switch (options.intensity) {
        case 'light':
          vibrationPattern = 25;
          break;
        case 'medium':
          vibrationPattern = 50;
          break;
        case 'heavy':
          vibrationPattern = 100;
          break;
        default:
          vibrationPattern = 50;
      }
    }

    try {
      navigator.vibrate(vibrationPattern);
    } catch (error) {
      console.warn('Haptic feedback failed:', error);
    }
  }, [options.enabled, options.intensity, isSupported]);

  const buttonPress = useCallback(() => {
    if (options.soundEnabled) {
      playClickSound();
    }
    vibrate();
  }, [vibrate, options.soundEnabled]);

  const longPress = useCallback(() => {
    if (options.soundEnabled) {
      playLongPressSound();
    }
    vibrate([100, 50, 100]);
  }, [vibrate, options.soundEnabled]);

  const success = useCallback(() => {
    if (options.soundEnabled) {
      playSuccessSound();
    }
    vibrate([50, 50, 50]);
  }, [vibrate, options.soundEnabled]);

  const error = useCallback(() => {
    if (options.soundEnabled) {
      playErrorSound();
    }
    vibrate([200, 100, 200]);
  }, [vibrate, options.soundEnabled]);

  const navigationMove = useCallback(() => {
    vibrate(25); // Light feedback for navigation
  }, [vibrate]);

  const navigationSelect = useCallback(() => {
    if (options.soundEnabled) {
      playSelectSound();
    }
    vibrate(75); // Medium feedback for selection
  }, [vibrate, options.soundEnabled]);

  return {
    isSupported,
    vibrate,
    buttonPress,
    longPress,
    success,
    error,
    navigationMove,
    navigationSelect
  };
}

// Audio feedback functions
function playClickSound() {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (error) {
    // Fallback: use HTML5 audio if Web Audio API fails
    console.warn('Web Audio API not supported, skipping sound');
  }
}

function playLongPressSound() {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  } catch (error) {
    console.warn('Web Audio API not supported, skipping sound');
  }
}

function playSuccessSound() {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Play a pleasant ascending tone
    [523, 659, 784].forEach((freq, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      const startTime = audioContext.currentTime + (index * 0.1);
      oscillator.frequency.setValueAtTime(freq, startTime);
      gainNode.gain.setValueAtTime(0.05, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.15);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.15);
    });
  } catch (error) {
    console.warn('Web Audio API not supported, skipping sound');
  }
}

function playErrorSound() {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  } catch (error) {
    console.warn('Web Audio API not supported, skipping sound');
  }
}

function playSelectSound() {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.15);
  } catch (error) {
    console.warn('Web Audio API not supported, skipping sound');
  }
}