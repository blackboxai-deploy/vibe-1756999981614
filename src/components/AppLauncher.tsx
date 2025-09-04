'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useRemoteState } from '@/hooks/useRemoteState';
import { useHapticFeedback } from '@/hooks/useHapticFeedback';
import { RemoteCommand } from '@/types/tv-remote';
import { STREAMING_APP_SHORTCUTS } from '@/lib/ir-commands';

interface AppLauncherProps {
  className?: string;
}

export function AppLauncher({ className }: AppLauncherProps) {
  const { sendCommand } = useRemoteState();
  const { buttonPress } = useHapticFeedback();

  const handleAppLaunch = async (app: any) => {
    buttonPress();
    const command: RemoteCommand = {
      type: 'app',
      action: 'launch',
      value: app.packageName,
      timestamp: new Date()
    };
    await sendCommand(command);
  };

  const handleGoogleAssistant = async () => {
    buttonPress();
    const command: RemoteCommand = {
      type: 'system',
      action: 'assistant',
      timestamp: new Date()
    };
    await sendCommand(command);
  };

  const handleInputSelect = async () => {
    buttonPress();
    const command: RemoteCommand = {
      type: 'system',
      action: 'input',
      timestamp: new Date()
    };
    await sendCommand(command);
  };

  const handleSettingsPress = async () => {
    buttonPress();
    const command: RemoteCommand = {
      type: 'system',
      action: 'settings',
      timestamp: new Date()
    };
    await sendCommand(command);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-sm font-medium text-center text-gray-600 dark:text-gray-400 mb-3">
        APPS & SYSTEM
      </h3>

      {/* Google Assistant and Android TV Home */}
      <div className="flex justify-center items-center space-x-4 mb-6">
        <Button
          size="lg"
          className="w-16 h-16 rounded-full bg-gradient-to-b from-blue-400 to-blue-600 text-white border-2 border-blue-300 shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 font-semibold"
          onMouseDown={handleGoogleAssistant}
          onTouchStart={handleGoogleAssistant}
          title="Google Assistant"
        >
          <div className="text-center">
            <div className="text-xs">🎤</div>
            <div className="text-xs mt-1">ASS</div>
          </div>
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="w-16 h-16 rounded-full bg-gradient-to-b from-orange-100 to-orange-200 dark:from-orange-600 dark:to-orange-700 text-orange-800 dark:text-orange-100 border-orange-300 shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
          onMouseDown={handleInputSelect}
          onTouchStart={handleInputSelect}
          title="Input/Source"
        >
          <div className="text-center">
            <div className="text-sm font-bold">SRC</div>
          </div>
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="w-16 h-16 rounded-full bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
          onMouseDown={handleSettingsPress}
          onTouchStart={handleSettingsPress}
          title="Settings"
        >
          <div className="text-center">
            <div className="text-lg">⚙️</div>
            <div className="text-xs mt-1">SET</div>
          </div>
        </Button>
      </div>

      {/* Streaming apps grid */}
      <div className="grid grid-cols-3 gap-4 max-w-60 mx-auto">
        {STREAMING_APP_SHORTCUTS.map((app) => (
          <Button
            key={app.id}
            size="sm"
            variant="outline"
            className="w-18 h-18 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 p-2 border-2"
            style={{
              backgroundColor: `${app.color}20`,
              borderColor: `${app.color}40`
            }}
            onMouseDown={() => handleAppLaunch(app)}
            onTouchStart={() => handleAppLaunch(app)}
            title={`Launch ${app.name}`}
          >
            <div className="flex flex-col items-center space-y-1">
              <img 
                src={app.icon} 
                alt={app.name}
                className="w-8 h-8 rounded-md"
                style={{ backgroundColor: app.color }}
              />
              <div className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">
                {app.name.split(' ')[0]}
              </div>
            </div>
          </Button>
        ))}
      </div>

      {/* Additional Android TV buttons */}
      <div className="flex justify-center items-center space-x-3 mt-6">
        <Button
          size="sm"
          variant="outline"
          className="px-3 py-2 rounded-lg bg-gradient-to-b from-purple-100 to-purple-200 dark:from-purple-600 dark:to-purple-700 text-purple-800 dark:text-purple-100 border-purple-300 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 text-sm font-medium"
          onMouseDown={async () => {
            buttonPress();
            const command: RemoteCommand = {
              type: 'system',
              action: 'search',
              timestamp: new Date()
            };
            await sendCommand(command);
          }}
          onTouchStart={async () => {
            buttonPress();
            const command: RemoteCommand = {
              type: 'system',
              action: 'search',
              timestamp: new Date()
            };
            await sendCommand(command);
          }}
        >
          SEARCH
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="px-3 py-2 rounded-lg bg-gradient-to-b from-teal-100 to-teal-200 dark:from-teal-600 dark:to-teal-700 text-teal-800 dark:text-teal-100 border-teal-300 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 text-sm font-medium"
          onMouseDown={async () => {
            buttonPress();
            const command: RemoteCommand = {
              type: 'system',
              action: 'voice_search',
              timestamp: new Date()
            };
            await sendCommand(command);
          }}
          onTouchStart={async () => {
            buttonPress();
            const command: RemoteCommand = {
              type: 'system',
              action: 'voice_search',
              timestamp: new Date()
            };
            await sendCommand(command);
          }}
        >
          🎙️ VOICE
        </Button>
      </div>

      {/* Power and advanced controls */}
      <div className="flex justify-center items-center space-x-4 mt-6">
        <Button
          size="lg"
          className="w-20 h-12 rounded-lg bg-gradient-to-b from-red-500 to-red-700 text-white border-2 border-red-400 shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 font-bold"
          onMouseDown={async () => {
            buttonPress();
            const command: RemoteCommand = {
              type: 'system',
              action: 'power',
              timestamp: new Date()
            };
            await sendCommand(command);
          }}
          onTouchStart={async () => {
            buttonPress();
            const command: RemoteCommand = {
              type: 'system',
              action: 'power',
              timestamp: new Date()
            };
            await sendCommand(command);
          }}
        >
          POWER
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="px-3 py-2 rounded-lg bg-gradient-to-b from-indigo-100 to-indigo-200 dark:from-indigo-600 dark:to-indigo-700 text-indigo-800 dark:text-indigo-100 border-indigo-300 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 text-sm font-medium"
          onMouseDown={async () => {
            buttonPress();
            const command: RemoteCommand = {
              type: 'system',
              action: 'sleep',
              timestamp: new Date()
            };
            await sendCommand(command);
          }}
          onTouchStart={async () => {
            buttonPress();
            const command: RemoteCommand = {
              type: 'system',
              action: 'sleep',
              timestamp: new Date()
            };
            await sendCommand(command);
          }}
        >
          SLEEP
        </Button>
      </div>
    </div>
  );
}