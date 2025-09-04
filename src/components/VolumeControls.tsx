'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useRemoteState } from '@/hooks/useRemoteState';
import { useHapticFeedback } from '@/hooks/useHapticFeedback';
import { RemoteCommand } from '@/types/tv-remote';

interface VolumeControlsProps {
  className?: string;
}

export function VolumeControls({ className }: VolumeControlsProps) {
  const { sendCommand, state } = useRemoteState();
  const { buttonPress } = useHapticFeedback();

  const handleVolumeCommand = async (action: string) => {
    buttonPress();
    const command: RemoteCommand = {
      type: 'volume',
      action,
      timestamp: new Date()
    };
    await sendCommand(command);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-sm font-medium text-center text-gray-600 dark:text-gray-400 mb-3">
        VOLUME
      </h3>
      
      {/* Volume display */}
      <div className="flex justify-center mb-4">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 border shadow-sm">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-800 dark:text-gray-200">
              {state.isMuted ? 'MUTED' : state.volume}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {state.isMuted ? '🔇' : '🔊'}
            </div>
          </div>
        </div>
      </div>

      {/* Volume bar visualization */}
      <div className="flex justify-center mb-4">
        <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
          <div 
            className={`h-full transition-all duration-300 rounded-full ${
              state.isMuted 
                ? 'bg-red-400' 
                : state.volume > 70 
                  ? 'bg-red-500' 
                  : state.volume > 40 
                    ? 'bg-yellow-500' 
                    : 'bg-green-500'
            }`}
            style={{ width: state.isMuted ? '0%' : `${state.volume}%` }}
          />
        </div>
      </div>

      {/* Main volume controls */}
      <div className="flex justify-center items-center space-x-4">
        <Button
          size="lg"
          variant="outline"
          className="w-14 h-14 rounded-full bg-gradient-to-b from-green-100 to-green-200 dark:from-green-600 dark:to-green-700 text-green-800 dark:text-green-100 border-green-300 shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
          onMouseDown={() => handleVolumeCommand('up')}
          onTouchStart={() => handleVolumeCommand('up')}
          title="Volume Up"
        >
          <div className="text-xl font-bold">+</div>
        </Button>

        <Button
          size="lg"
          className={`w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 font-semibold text-white border-2 ${
            state.isMuted
              ? 'bg-gradient-to-b from-red-400 to-red-600 border-red-300'
              : 'bg-gradient-to-b from-gray-400 to-gray-600 border-gray-300'
          }`}
          onMouseDown={() => handleVolumeCommand('mute')}
          onTouchStart={() => handleVolumeCommand('mute')}
          title={state.isMuted ? 'Unmute' : 'Mute'}
        >
          <div className="text-lg">
            {state.isMuted ? '🔇' : '🔊'}
          </div>
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="w-14 h-14 rounded-full bg-gradient-to-b from-red-100 to-red-200 dark:from-red-600 dark:to-red-700 text-red-800 dark:text-red-100 border-red-300 shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
          onMouseDown={() => handleVolumeCommand('down')}
          onTouchStart={() => handleVolumeCommand('down')}
          title="Volume Down"
        >
          <div className="text-xl font-bold">-</div>
        </Button>
      </div>

      {/* Quick volume presets */}
      <div className="flex justify-center items-center space-x-2 mt-4">
        <Button
          size="sm"
          variant="outline"
          className="px-2 py-1 rounded bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 text-xs font-medium"
          onMouseDown={() => handleVolumeCommand('set-25')}
          onTouchStart={() => handleVolumeCommand('set-25')}
          title="Set volume to 25%"
        >
          25%
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="px-2 py-1 rounded bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 text-xs font-medium"
          onMouseDown={() => handleVolumeCommand('set-50')}
          onTouchStart={() => handleVolumeCommand('set-50')}
          title="Set volume to 50%"
        >
          50%
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="px-2 py-1 rounded bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 text-xs font-medium"
          onMouseDown={() => handleVolumeCommand('set-75')}
          onTouchStart={() => handleVolumeCommand('set-75')}
          title="Set volume to 75%"
        >
          75%
        </Button>
      </div>
    </div>
  );
}