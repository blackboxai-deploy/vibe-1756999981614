'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useRemoteState } from '@/hooks/useRemoteState';
import { useHapticFeedback } from '@/hooks/useHapticFeedback';
import { RemoteCommand } from '@/types/tv-remote';

interface MediaControlsProps {
  className?: string;
}

export function MediaControls({ className }: MediaControlsProps) {
  const { sendCommand, state } = useRemoteState();
  const { buttonPress } = useHapticFeedback();

  const handleMediaCommand = async (action: string) => {
    buttonPress();
    const command: RemoteCommand = {
      type: 'media',
      action,
      timestamp: new Date()
    };
    await sendCommand(command);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-sm font-medium text-center text-gray-600 dark:text-gray-400 mb-3">
        MEDIA CONTROLS
      </h3>
      
      {/* Main playback controls */}
      <div className="flex justify-center items-center space-x-3">
        <Button
          size="sm"
          variant="outline"
          className="w-12 h-12 rounded-full bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
          onMouseDown={() => handleMediaCommand('rewind')}
          onTouchStart={() => handleMediaCommand('rewind')}
          title="Rewind"
        >
          <div className="text-lg font-bold">⏪</div>
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="w-12 h-12 rounded-full bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
          onMouseDown={() => handleMediaCommand('previous')}
          onTouchStart={() => handleMediaCommand('previous')}
          title="Previous"
        >
          <div className="text-lg font-bold">⏮</div>
        </Button>

        <Button
          size="lg"
          className={`w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 font-semibold text-white border-2 ${
            state.isPlaying
              ? 'bg-gradient-to-b from-red-400 to-red-600 border-red-300'
              : 'bg-gradient-to-b from-green-400 to-green-600 border-green-300'
          }`}
          onMouseDown={() => handleMediaCommand(state.isPlaying ? 'pause' : 'play')}
          onTouchStart={() => handleMediaCommand(state.isPlaying ? 'pause' : 'play')}
          title={state.isPlaying ? 'Pause' : 'Play'}
        >
          <div className="text-2xl">
            {state.isPlaying ? '⏸' : '▶'}
          </div>
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="w-12 h-12 rounded-full bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
          onMouseDown={() => handleMediaCommand('next')}
          onTouchStart={() => handleMediaCommand('next')}
          title="Next"
        >
          <div className="text-lg font-bold">⏭</div>
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="w-12 h-12 rounded-full bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
          onMouseDown={() => handleMediaCommand('fastforward')}
          onTouchStart={() => handleMediaCommand('fastforward')}
          title="Fast Forward"
        >
          <div className="text-lg font-bold">⏩</div>
        </Button>
      </div>

      {/* Secondary controls */}
      <div className="flex justify-center items-center space-x-4">
        <Button
          size="sm"
          variant="outline"
          className="px-3 py-2 rounded-lg bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 text-sm font-medium"
          onMouseDown={() => handleMediaCommand('stop')}
          onTouchStart={() => handleMediaCommand('stop')}
        >
          STOP
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="px-3 py-2 rounded-lg bg-gradient-to-b from-red-100 to-red-200 dark:from-red-600 dark:to-red-700 text-red-800 dark:text-red-100 border-red-300 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 text-sm font-medium"
          onMouseDown={() => handleMediaCommand('record')}
          onTouchStart={() => handleMediaCommand('record')}
        >
          REC
        </Button>
      </div>

      {/* Advanced media controls */}
      <div className="flex justify-center items-center space-x-3 mt-4">
        <Button
          size="sm"
          variant="outline"
          className="px-2 py-1 rounded bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 text-xs font-medium"
          onMouseDown={() => handleMediaCommand('30-second-skip')}
          onTouchStart={() => handleMediaCommand('30-second-skip')}
          title="Skip 30s"
        >
          +30s
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="px-2 py-1 rounded bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 text-xs font-medium"
          onMouseDown={() => handleMediaCommand('10-second-rewind')}
          onTouchStart={() => handleMediaCommand('10-second-rewind')}
          title="Rewind 10s"
        >
          -10s
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="px-2 py-1 rounded bg-gradient-to-b from-blue-100 to-blue-200 dark:from-blue-600 dark:to-blue-700 text-blue-800 dark:text-blue-100 border-blue-300 shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 text-xs font-medium"
          onMouseDown={() => handleMediaCommand('replay')}
          onTouchStart={() => handleMediaCommand('replay')}
        >
          REPLAY
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="px-2 py-1 rounded bg-gradient-to-b from-yellow-100 to-yellow-200 dark:from-yellow-600 dark:to-yellow-700 text-yellow-800 dark:text-yellow-100 border-yellow-300 shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 text-xs font-medium"
          onMouseDown={() => handleMediaCommand('live')}
          onTouchStart={() => handleMediaCommand('live')}
        >
          LIVE
        </Button>
      </div>
    </div>
  );
}