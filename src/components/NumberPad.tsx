'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRemoteState } from '@/hooks/useRemoteState';
import { useHapticFeedback } from '@/hooks/useHapticFeedback';
import { RemoteCommand } from '@/types/tv-remote';

interface NumberPadProps {
  className?: string;
}

export function NumberPad({ className }: NumberPadProps) {
  const { sendCommand } = useRemoteState();
  const { buttonPress } = useHapticFeedback();
  const [inputValue, setInputValue] = useState<string>('');
  const [showInput, setShowInput] = useState(false);

  // Auto-hide input after 3 seconds of inactivity
  useEffect(() => {
    if (showInput && inputValue) {
      const timer = setTimeout(() => {
        handleEnter();
      }, 3000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [inputValue, showInput]);

  const handleNumberPress = async (number: number) => {
    buttonPress();
    
    // Update input display
    const newValue = inputValue + number.toString();
    setInputValue(newValue);
    setShowInput(true);

    // Send immediate command for single digit
    const command: RemoteCommand = {
      type: 'number',
      action: 'digit',
      value: number,
      timestamp: new Date()
    };
    await sendCommand(command);
  };

  const handleEnter = async () => {
    if (inputValue) {
      buttonPress();
      const command: RemoteCommand = {
        type: 'number',
        action: 'enter',
        value: parseInt(inputValue),
        timestamp: new Date()
      };
      await sendCommand(command);
    }
    setInputValue('');
    setShowInput(false);
  };

  const handleClear = () => {
    buttonPress();
    setInputValue('');
    setShowInput(false);
  };

  const handleBackspace = () => {
    buttonPress();
    const newValue = inputValue.slice(0, -1);
    setInputValue(newValue);
    if (newValue === '') {
      setShowInput(false);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-sm font-medium text-center text-gray-600 dark:text-gray-400 mb-3">
        NUMBER PAD
      </h3>
      
      {/* Input display */}
      {showInput && (
        <div className="flex justify-center mb-4">
          <div className="bg-black text-green-400 rounded-lg px-4 py-2 border shadow-sm font-mono">
            <div className="text-center">
              <div className="text-xl font-bold min-w-[60px]">
                {inputValue || '0'}
              </div>
              <div className="text-xs opacity-75">
                CHANNEL INPUT
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Number grid */}
      <div className="grid grid-cols-3 gap-3 max-w-48 mx-auto">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
          <Button
            key={number}
            size="lg"
            variant="outline"
            className="w-14 h-14 rounded-xl bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 text-xl font-bold"
            onMouseDown={() => handleNumberPress(number)}
            onTouchStart={() => handleNumberPress(number)}
          >
            {number}
          </Button>
        ))}
      </div>

      {/* Bottom row with 0 and special buttons */}
      <div className="flex justify-center items-center space-x-3">
        <Button
          size="sm"
          variant="outline"
          className="w-12 h-12 rounded-xl bg-gradient-to-b from-red-100 to-red-200 dark:from-red-600 dark:to-red-700 text-red-800 dark:text-red-100 border-red-300 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 text-lg font-bold"
          onMouseDown={handleClear}
          onTouchStart={handleClear}
          title="Clear"
        >
          C
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="w-14 h-14 rounded-xl bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 text-xl font-bold"
          onMouseDown={() => handleNumberPress(0)}
          onTouchStart={() => handleNumberPress(0)}
        >
          0
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="w-12 h-12 rounded-xl bg-gradient-to-b from-yellow-100 to-yellow-200 dark:from-yellow-600 dark:to-yellow-700 text-yellow-800 dark:text-yellow-100 border-yellow-300 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 text-lg font-bold"
          onMouseDown={handleBackspace}
          onTouchStart={handleBackspace}
          title="Backspace"
        >
          ⌫
        </Button>
      </div>

      {/* Enter and special functions */}
      <div className="flex justify-center items-center space-x-4 mt-4">
        <Button
          size="sm"
          className="px-4 py-2 rounded-lg bg-gradient-to-b from-green-400 to-green-600 text-white border-2 border-green-300 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 font-semibold"
          onMouseDown={handleEnter}
          onTouchStart={handleEnter}
          disabled={!inputValue}
        >
          ENTER
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="px-3 py-2 rounded-lg bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 text-sm font-medium"
          onMouseDown={() => handleNumberPress(-1)} // Special case for dash/separator
          onTouchStart={() => handleNumberPress(-1)}
        >
          -
        </Button>
      </div>

      {/* Quick access buttons */}
      <div className="flex justify-center items-center space-x-2 mt-4">
        <Button
          size="sm"
          variant="outline"
          className="px-2 py-1 rounded bg-gradient-to-b from-blue-100 to-blue-200 dark:from-blue-600 dark:to-blue-700 text-blue-800 dark:text-blue-100 border-blue-300 shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 text-xs font-medium"
          onMouseDown={() => handleNumberPress(100)} // Previous channel shortcut
          onTouchStart={() => handleNumberPress(100)}
          title="Previous Channel"
        >
          PREV
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="px-2 py-1 rounded bg-gradient-to-b from-purple-100 to-purple-200 dark:from-purple-600 dark:to-purple-700 text-purple-800 dark:text-purple-100 border-purple-300 shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 text-xs font-medium"
          onMouseDown={() => handleNumberPress(200)} // Channel scan
          onTouchStart={() => handleNumberPress(200)}
          title="Channel Scan"
        >
          SCAN
        </Button>
      </div>
    </div>
  );
}