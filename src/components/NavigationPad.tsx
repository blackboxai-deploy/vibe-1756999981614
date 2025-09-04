'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useRemoteState } from '@/hooks/useRemoteState';
import { useHapticFeedback } from '@/hooks/useHapticFeedback';
import { RemoteCommand } from '@/types/tv-remote';

interface NavigationPadProps {
  className?: string;
}

export function NavigationPad({ className }: NavigationPadProps) {
  const { sendCommand } = useRemoteState();
  const { buttonPress, navigationMove, navigationSelect } = useHapticFeedback();

  const handleDirectionalPress = async (direction: string) => {
    navigationMove();
    const command: RemoteCommand = {
      type: 'navigation',
      action: direction.toLowerCase(),
      timestamp: new Date()
    };
    await sendCommand(command);
  };

  const handleOkPress = async () => {
    navigationSelect();
    const command: RemoteCommand = {
      type: 'navigation',
      action: 'ok',
      timestamp: new Date()
    };
    await sendCommand(command);
  };

  const handleBackPress = async () => {
    buttonPress();
    const command: RemoteCommand = {
      type: 'navigation',
      action: 'back',
      timestamp: new Date()
    };
    await sendCommand(command);
  };

  const handleHomePress = async () => {
    buttonPress();
    const command: RemoteCommand = {
      type: 'navigation',
      action: 'home',
      timestamp: new Date()
    };
    await sendCommand(command);
  };

  const handleMenuPress = async () => {
    buttonPress();
    const command: RemoteCommand = {
      type: 'navigation',
      action: 'menu',
      timestamp: new Date()
    };
    await sendCommand(command);
  };

  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      {/* Top row - Up arrow */}
      <Button
        size="lg"
        variant="outline"
        className="w-16 h-16 rounded-full bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 border-2 shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
        onMouseDown={() => handleDirectionalPress('UP')}
        onTouchStart={() => handleDirectionalPress('UP')}
      >
        <div className="text-2xl font-bold">↑</div>
      </Button>

      {/* Middle row - Left, OK, Right */}
      <div className="flex items-center space-x-4">
        <Button
          size="lg"
          variant="outline"
          className="w-16 h-16 rounded-full bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 border-2 shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
          onMouseDown={() => handleDirectionalPress('LEFT')}
          onTouchStart={() => handleDirectionalPress('LEFT')}
        >
          <div className="text-2xl font-bold">←</div>
        </Button>

        <Button
          size="lg"
          className="w-20 h-20 rounded-full bg-gradient-to-b from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 text-white border-2 border-blue-300 shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 font-semibold"
          onMouseDown={handleOkPress}
          onTouchStart={handleOkPress}
        >
          OK
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="w-16 h-16 rounded-full bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 border-2 shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
          onMouseDown={() => handleDirectionalPress('RIGHT')}
          onTouchStart={() => handleDirectionalPress('RIGHT')}
        >
          <div className="text-2xl font-bold">→</div>
        </Button>
      </div>

      {/* Bottom row - Down arrow */}
      <Button
        size="lg"
        variant="outline"
        className="w-16 h-16 rounded-full bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 border-2 shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
        onMouseDown={() => handleDirectionalPress('DOWN')}
        onTouchStart={() => handleDirectionalPress('DOWN')}
      >
        <div className="text-2xl font-bold">↓</div>
      </Button>

      {/* Navigation buttons row */}
      <div className="flex items-center space-x-6 mt-6">
        <Button
          size="sm"
          variant="outline"
          className="px-4 py-2 rounded-lg bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 font-medium"
          onMouseDown={handleBackPress}
          onTouchStart={handleBackPress}
        >
          BACK
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="px-4 py-2 rounded-lg bg-gradient-to-b from-green-100 to-green-200 dark:from-green-600 dark:to-green-700 text-green-800 dark:text-green-100 border-green-300 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 font-medium"
          onMouseDown={handleHomePress}
          onTouchStart={handleHomePress}
        >
          HOME
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="px-4 py-2 rounded-lg bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 font-medium"
          onMouseDown={handleMenuPress}
          onTouchStart={handleMenuPress}
        >
          MENU
        </Button>
      </div>
    </div>
  );
}