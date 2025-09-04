'use client';

import { useState, useEffect, useCallback } from 'react';
import { RemoteState, RemoteCommand, TVDevice } from '@/types/tv-remote';
import { tvConnection } from '@/lib/tv-connection';

const initialState: RemoteState = {
  isConnected: false,
  currentDevice: null,
  volume: 50,
  isMuted: false,
  currentChannel: 1,
  currentInput: 'HDMI1',
  isPlaying: false,
  lastCommand: null
};

export function useRemoteState() {
  const [state, setState] = useState<RemoteState>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Update device state from TV connection
  const handleDeviceState = useCallback((deviceState: any) => {
    setState(prev => ({
      ...prev,
      volume: deviceState.volume || prev.volume,
      isMuted: deviceState.isMuted || prev.isMuted,
      currentChannel: deviceState.currentChannel || prev.currentChannel,
      currentInput: deviceState.currentInput || prev.currentInput,
      isPlaying: deviceState.isPlaying || prev.isPlaying
    }));
  }, []);

  // Handle connection status changes
  const handleConnectionStatus = useCallback((status: any) => {
    setState(prev => ({
      ...prev,
      isConnected: status.status === 'connected',
      currentDevice: tvConnection.getConnectedDevice()
    }));
  }, []);

  // Handle errors
  const handleError = useCallback((error: Error) => {
    setError(error.message);
    setTimeout(() => setError(null), 5000); // Clear error after 5 seconds
  }, []);

  useEffect(() => {
    // Subscribe to TV connection events
    tvConnection.addEventListener('deviceState', handleDeviceState);
    tvConnection.addEventListener('statusChange', handleConnectionStatus);
    tvConnection.addEventListener('error', handleError);

    // Initialize connection status
    const connectionStatus = tvConnection.getConnectionStatus();
    handleConnectionStatus(connectionStatus);

    return () => {
      tvConnection.removeEventListener('deviceState', handleDeviceState);
      tvConnection.removeEventListener('statusChange', handleConnectionStatus);
      tvConnection.removeEventListener('error', handleError);
    };
  }, [handleDeviceState, handleConnectionStatus, handleError]);

  const sendCommand = useCallback(async (command: RemoteCommand) => {
    if (!state.isConnected) {
      setError('Not connected to TV');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const success = await tvConnection.sendCommand(command);
      
      if (success) {
        setState(prev => ({
          ...prev,
          lastCommand: command
        }));

        // Update local state based on command
        switch (command.type) {
          case 'volume':
            if (command.action === 'up') {
              setState(prev => ({ ...prev, volume: Math.min(100, prev.volume + 1), isMuted: false }));
            } else if (command.action === 'down') {
              setState(prev => ({ ...prev, volume: Math.max(0, prev.volume - 1), isMuted: false }));
            } else if (command.action === 'mute') {
              setState(prev => ({ ...prev, isMuted: !prev.isMuted }));
            }
            break;
          case 'channel':
            if (command.action === 'up') {
              setState(prev => ({ ...prev, currentChannel: prev.currentChannel + 1 }));
            } else if (command.action === 'down') {
              setState(prev => ({ ...prev, currentChannel: Math.max(1, prev.currentChannel - 1) }));
            } else if (command.action === 'set' && typeof command.value === 'number') {
              setState(prev => ({ ...prev, currentChannel: command.value as number }));
            }
            break;
          case 'media':
            if (command.action === 'play' || command.action === 'pause') {
              setState(prev => ({ ...prev, isPlaying: command.action === 'play' }));
            }
            break;
        }
      }

      return success;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Command failed';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [state.isConnected]);

  const connectToDevice = useCallback(async (device: TVDevice) => {
    setIsLoading(true);
    setError(null);

    try {
      await tvConnection.connect(device);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Connection failed';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    tvConnection.disconnect();
    setState(initialState);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    state,
    isLoading,
    error,
    sendCommand,
    connectToDevice,
    disconnect,
    clearError
  };
}