'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { NavigationPad } from '@/components/NavigationPad';
import { MediaControls } from '@/components/MediaControls';
import { VolumeControls } from '@/components/VolumeControls';
import { ChannelControls } from '@/components/ChannelControls';
import { NumberPad } from '@/components/NumberPad';
import { AppLauncher } from '@/components/AppLauncher';
import { ConnectionStatus } from '@/components/ConnectionStatus';
import { useRemoteState } from '@/hooks/useRemoteState';

export default function TVRemotePage() {
  const { state, error, clearError } = useRemoteState();
  const [activeTab, setActiveTab] = useState<string>('main');

  const tabs = [
    { id: 'main', label: 'REMOTE', icon: '🎮' },
    { id: 'media', label: 'MEDIA', icon: '▶️' },
    { id: 'apps', label: 'APPS', icon: '📱' },
    { id: 'settings', label: 'CONNECT', icon: '📡' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <Card className="mb-4 bg-black/20 backdrop-blur-sm border-gray-600">
          <CardHeader className="pb-3">
            <CardTitle className="text-center text-white">
              <div className="flex items-center justify-center space-x-2">
                <div className="text-2xl">📺</div>
                <div>
                  <div className="text-lg font-bold">Android TV Remote</div>
                  <div className="text-sm font-normal opacity-80">
                    {state.isConnected ? state.currentDevice?.name || 'Connected' : 'Not Connected'}
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Error display */}
        {error && (
          <Card className="mb-4 bg-red-500/20 backdrop-blur-sm border-red-400">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-red-200">
                  <div>⚠️</div>
                  <div className="text-sm">{error}</div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={clearError}
                  className="text-red-200 hover:text-red-100"
                >
                  ×
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tab navigation */}
        <Card className="mb-4 bg-black/20 backdrop-blur-sm border-gray-600">
          <CardContent className="p-2">
            <div className="flex space-x-1">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  size="sm"
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  className={`flex-1 ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <div className="flex flex-col items-center space-y-1">
                    <div className="text-lg">{tab.icon}</div>
                    <div className="text-xs font-medium">{tab.label}</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main content area */}
        <Card className="bg-black/20 backdrop-blur-sm border-gray-600 min-h-[600px]">
          <CardContent className="p-6">
            
            {/* Main Remote Tab */}
            {activeTab === 'main' && (
              <div className="space-y-8">
                {/* Navigation pad */}
                <NavigationPad />
                
                <Separator className="bg-gray-600" />
                
                {/* Volume and Channel controls side by side */}
                <div className="grid grid-cols-2 gap-6">
                  <VolumeControls />
                  <ChannelControls />
                </div>
                
                <Separator className="bg-gray-600" />
                
                {/* Number pad */}
                <NumberPad />
              </div>
            )}

            {/* Media Controls Tab */}
            {activeTab === 'media' && (
              <div className="space-y-8">
                <MediaControls />
                
                <Separator className="bg-gray-600" />
                
                {/* Media info display */}
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
                  <div className="text-center text-white">
                    <div className="text-sm opacity-80 mb-2">NOW PLAYING</div>
                    <div className="text-lg font-semibold">
                      {state.isPlaying ? 'Media Playing' : 'Media Stopped'}
                    </div>
                    <div className="text-sm opacity-60 mt-2">
                      Channel {state.currentChannel} • Volume {state.isMuted ? 'MUTED' : state.volume}
                    </div>
                  </div>
                </div>
                
                <Separator className="bg-gray-600" />
                
                {/* Quick navigation */}
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 font-medium"
                  >
                    ⏮ PREV
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-gradient-to-b from-blue-100 to-blue-200 dark:from-blue-600 dark:to-blue-700 text-blue-800 dark:text-blue-100 border-blue-300 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 font-medium"
                  >
                    📝 INFO
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 font-medium"
                  >
                    ⏭ NEXT
                  </Button>
                </div>
              </div>
            )}

            {/* Apps & System Tab */}
            {activeTab === 'apps' && (
              <div className="space-y-8">
                <AppLauncher />
              </div>
            )}

            {/* Connection Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-8">
                <ConnectionStatus />
                
                <Separator className="bg-gray-600" />
                
                {/* Remote settings */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-center text-gray-400 mb-3">
                    REMOTE SETTINGS
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-gradient-to-b from-purple-100 to-purple-200 dark:from-purple-600 dark:to-purple-700 text-purple-800 dark:text-purple-100 border-purple-300 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 text-sm font-medium"
                    >
                      🔧 CONFIG
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-gradient-to-b from-green-100 to-green-200 dark:from-green-600 dark:to-green-700 text-green-800 dark:text-green-100 border-green-300 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 text-sm font-medium"
                    >
                      📶 PAIR
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-gradient-to-b from-yellow-100 to-yellow-200 dark:from-yellow-600 dark:to-yellow-700 text-yellow-800 dark:text-yellow-100 border-yellow-300 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 text-sm font-medium"
                    >
                      🎚️ CALIBRATE
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-gradient-to-b from-blue-100 to-blue-200 dark:from-blue-600 dark:to-blue-700 text-blue-800 dark:text-blue-100 border-blue-300 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 text-sm font-medium"
                    >
                      ❓ HELP
                    </Button>
                  </div>
                </div>
                
                {/* Device info */}
                {state.currentDevice && (
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
                    <div className="text-center text-white">
                      <div className="text-sm opacity-80 mb-2">CONNECTED DEVICE</div>
                      <div className="text-lg font-semibold">{state.currentDevice.name}</div>
                      <div className="text-sm opacity-60 mt-1">
                        {state.currentDevice.brand} • {state.currentDevice.ipAddress}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-gray-400 mt-4 p-2">
          Android TV Remote Control • Touch and hold buttons for quick actions
        </div>
      </div>
    </div>
  );
}