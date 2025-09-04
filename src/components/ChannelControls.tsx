'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRemoteState } from '@/hooks/useRemoteState';
import { useHapticFeedback } from '@/hooks/useHapticFeedback';
import { RemoteCommand } from '@/types/tv-remote';

interface ChannelControlsProps {
  className?: string;
}

export function ChannelControls({ className }: ChannelControlsProps) {
  const { sendCommand, state } = useRemoteState();
  const { buttonPress } = useHapticFeedback();
  const [previousChannel, setPreviousChannel] = useState<number>(1);

  const handleChannelCommand = async (action: string, value?: number) => {
    buttonPress();
    
    if (action === 'last') {
      // Store current channel as previous before switching
      const temp = state.currentChannel;
      setPreviousChannel(temp);
      
      const command: RemoteCommand = {
        type: 'channel',
        action: 'set',
        value: previousChannel,
        timestamp: new Date()
      };
      await sendCommand(command);
    } else {
      const command: RemoteCommand = {
        type: 'channel',
        action,
        value,
        timestamp: new Date()
      };
      await sendCommand(command);
    }
  };

  const handleGuidePress = async () => {
    buttonPress();
    const command: RemoteCommand = {
      type: 'system',
      action: 'guide',
      timestamp: new Date()
    };
    await sendCommand(command);
  };

  const handleInfoPress = async () => {
    buttonPress();
    const command: RemoteCommand = {
      type: 'system',
      action: 'info',
      timestamp: new Date()
    };
    await sendCommand(command);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-sm font-medium text-center text-gray-600 dark:text-gray-400 mb-3">
        CHANNELS
      </h3>
      
      {/* Channel display */}
      <div className="flex justify-center mb-4">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-6 py-3 border shadow-sm">
          <div className="text-center">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">CHANNEL</div>
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              {state.currentChannel}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {state.currentInput}
            </div>
          </div>
        </div>
      </div>

      {/* Main channel controls */}
      <div className="flex justify-center items-center space-x-6">
        <Button
          size="lg"
          variant="outline"
          className="w-16 h-16 rounded-full bg-gradient-to-b from-blue-100 to-blue-200 dark:from-blue-600 dark:to-blue-700 text-blue-800 dark:text-blue-100 border-blue-300 shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
          onMouseDown={() => handleChannelCommand('up')}
          onTouchStart={() => handleChannelCommand('up')}
          title="Channel Up"
        >
          <div className="flex flex-col items-center">
            <div className="text-lg font-bold">CH</div>
            <div className="text-xl">+</div>
          </div>
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="w-16 h-16 rounded-full bg-gradient-to-b from-purple-100 to-purple-200 dark:from-purple-600 dark:to-purple-700 text-purple-800 dark:text-purple-100 border-purple-300 shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
          onMouseDown={() => handleChannelCommand('last')}
          onTouchStart={() => handleChannelCommand('last')}
          title="Last Channel"
        >
          <div className="text-center">
            <div className="text-sm font-bold">LAST</div>
          </div>
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="w-16 h-16 rounded-full bg-gradient-to-b from-blue-100 to-blue-200 dark:from-blue-600 dark:to-blue-700 text-blue-800 dark:text-blue-100 border-blue-300 shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
          onMouseDown={() => handleChannelCommand('down')}
          onTouchStart={() => handleChannelCommand('down')}
          title="Channel Down"
        >
          <div className="flex flex-col items-center">
            <div className="text-lg font-bold">CH</div>
            <div className="text-xl">-</div>
          </div>
        </Button>
      </div>

      {/* Program guide and info */}
      <div className="flex justify-center items-center space-x-4 mt-6">
        <Button
          size="sm"
          variant="outline"
          className="px-4 py-2 rounded-lg bg-gradient-to-b from-yellow-100 to-yellow-200 dark:from-yellow-600 dark:to-yellow-700 text-yellow-800 dark:text-yellow-100 border-yellow-300 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 font-medium"
          onMouseDown={handleGuidePress}
          onTouchStart={handleGuidePress}
        >
          GUIDE
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="px-4 py-2 rounded-lg bg-gradient-to-b from-cyan-100 to-cyan-200 dark:from-cyan-600 dark:to-cyan-700 text-cyan-800 dark:text-cyan-100 border-cyan-300 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 font-medium"
          onMouseDown={handleInfoPress}
          onTouchStart={handleInfoPress}
        >
          INFO
        </Button>
      </div>

      {/* Quick channel presets */}
      <div className="grid grid-cols-4 gap-2 mt-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((channelNumber) => (
          <Button
            key={channelNumber}
            size="sm"
            variant="outline"
            className="h-8 rounded bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 text-xs font-medium"
            onMouseDown={() => handleChannelCommand('set', channelNumber)}
            onTouchStart={() => handleChannelCommand('set', channelNumber)}
            title={`Go to channel ${channelNumber}`}
          >
            {channelNumber}
          </Button>
        ))}
      </div>

      {/* Favorite channels */}
      <div className="flex justify-center items-center space-x-2 mt-4">
        <Button
          size="sm"
          variant="outline"
          className="px-3 py-1 rounded bg-gradient-to-b from-pink-100 to-pink-200 dark:from-pink-600 dark:to-pink-700 text-pink-800 dark:text-pink-100 border-pink-300 shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 text-xs font-medium"
          onMouseDown={() => handleChannelCommand('favorite')}
          onTouchStart={() => handleChannelCommand('favorite')}
        >
          ★ FAV
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="px-3 py-1 rounded bg-gradient-to-b from-orange-100 to-orange-200 dark:from-orange-600 dark:to-orange-700 text-orange-800 dark:text-orange-100 border-orange-300 shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 text-xs font-medium"
          onMouseDown={() => handleChannelCommand('list')}
          onTouchStart={() => handleChannelCommand('list')}
        >
          LIST
        </Button>
      </div>
    </div>
  );
}