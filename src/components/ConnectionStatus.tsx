'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useRemoteState } from '@/hooks/useRemoteState';
import { tvConnection } from '@/lib/tv-connection';
import { TVDevice, ConnectionStatus as ConnectionStatusType } from '@/types/tv-remote';

interface ConnectionStatusProps {
  className?: string;
}

export function ConnectionStatus({ className }: ConnectionStatusProps) {
  const { state, connectToDevice, disconnect, isLoading } = useRemoteState();
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatusType>({
    status: 'disconnected',
    message: 'Not connected'
  });
  const [availableDevices] = useState<TVDevice[]>([
    {
      id: 'android-tv-1',
      name: 'Living Room TV',
      brand: 'Samsung',
      model: 'Android TV',
      ipAddress: '192.168.1.100',
      port: 6466,
      isConnected: false,
      lastSeen: new Date()
    },
    {
      id: 'android-tv-2',
      name: 'Bedroom TV',
      brand: 'Sony',
      model: 'Android TV',
      ipAddress: '192.168.1.101',
      port: 6466,
      isConnected: false,
      lastSeen: new Date()
    }
  ]);
  const [showDeviceList, setShowDeviceList] = useState(false);

  useEffect(() => {
    const handleStatusChange = (status: ConnectionStatusType) => {
      setConnectionStatus(status);
    };

    tvConnection.addEventListener('statusChange', handleStatusChange);
    setConnectionStatus(tvConnection.getConnectionStatus());

    return () => {
      tvConnection.removeEventListener('statusChange', handleStatusChange);
    };
  }, []);

  const handleConnect = async (device: TVDevice) => {
    setShowDeviceList(false);
    await connectToDevice(device);
  };

  const handleDisconnect = () => {
    disconnect();
  };

  const handleRefresh = () => {
    // In a real implementation, this would scan for devices
    console.log('Scanning for Android TV devices...');
  };

  const getStatusColor = (status: ConnectionStatusType['status']) => {
    switch (status) {
      case 'connected':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-green-300';
      case 'connecting':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 border-yellow-300';
      case 'error':
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 border-gray-300';
    }
  };

  const getStatusIcon = (status: ConnectionStatusType['status']) => {
    switch (status) {
      case 'connected':
        return '📡';
      case 'connecting':
        return '🔄';
      case 'error':
        return '⚠️';
      default:
        return '📴';
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-sm font-medium text-center text-gray-600 dark:text-gray-400 mb-3">
        CONNECTION
      </h3>

      {/* Connection status card */}
      <Card className={`border-2 ${getStatusColor(connectionStatus.status)}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">
                {getStatusIcon(connectionStatus.status)}
              </div>
              <div>
                <div className="font-semibold text-sm">
                  {connectionStatus.status.toUpperCase()}
                </div>
                <div className="text-xs opacity-80">
                  {connectionStatus.message}
                </div>
                {state.currentDevice && (
                  <div className="text-xs font-medium mt-1">
                    {state.currentDevice.name}
                  </div>
                )}
              </div>
            </div>
            <div className="text-right">
              {connectionStatus.signalStrength && (
                <div className="text-xs opacity-80">
                  Signal: {connectionStatus.signalStrength}%
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Connection controls */}
      <div className="flex justify-center items-center space-x-3">
        {!state.isConnected ? (
          <>
            <Button
              size="sm"
              className="bg-gradient-to-b from-blue-400 to-blue-600 text-white border-2 border-blue-300 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 font-medium"
              onClick={() => setShowDeviceList(!showDeviceList)}
              disabled={isLoading}
            >
              {showDeviceList ? 'HIDE' : 'CONNECT'}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 font-medium"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              🔍 SCAN
            </Button>
          </>
        ) : (
          <Button
            size="sm"
            variant="outline"
            className="bg-gradient-to-b from-red-100 to-red-200 dark:from-red-600 dark:to-red-700 text-red-800 dark:text-red-100 border-red-300 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 font-medium"
            onClick={handleDisconnect}
            disabled={isLoading}
          >
            DISCONNECT
          </Button>
        )}
      </div>

      {/* Device selection list */}
      {showDeviceList && !state.isConnected && (
        <div className="space-y-2">
          <div className="text-xs text-center text-gray-600 dark:text-gray-400 mb-2">
            Available Android TV Devices:
          </div>
          {availableDevices.map((device) => (
            <Card key={device.id} className="border border-gray-200 dark:border-gray-700">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">{device.name}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {device.brand} • {device.ipAddress}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-gradient-to-b from-green-100 to-green-200 dark:from-green-600 dark:to-green-700 text-green-800 dark:text-green-100 border-green-300 shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 text-xs font-medium"
                    onClick={() => handleConnect(device)}
                    disabled={isLoading}
                  >
                    CONNECT
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {availableDevices.length === 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400 text-sm py-4">
              No Android TV devices found
            </div>
          )}
        </div>
      )}

      {/* Connection help */}
      {!state.isConnected && (
        <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border">
          <div className="font-medium mb-1">Connection Tips:</div>
          <div>• Ensure your Android TV and phone are on the same WiFi network</div>
          <div>• Enable "Remote debugging" in Android TV Developer options</div>
          <div>• Check if Android TV Remote Control service is running</div>
        </div>
      )}
    </div>
  );
}