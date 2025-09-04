import { NextRequest, NextResponse } from 'next/server';
import { TVDevice } from '@/types/tv-remote';

// In-memory connection storage (in production, use Redis or database)
const activeConnections = new Map<string, {
  device: TVDevice;
  connectedAt: Date;
  lastActivity: Date;
}>();

export async function POST(request: NextRequest) {
  try {
    const { device, pairingCode } = await request.json();
    
    if (!device || !device.id) {
      return NextResponse.json({
        success: false,
        error: 'Device information is required'
      }, { status: 400 });
    }
    
    // Simulate connection process
    console.log(`Attempting to connect to Android TV: ${device.name} (${device.ipAddress})`);
    
    // Step 1: Verify device is reachable
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Step 2: Establish ADB connection (simulate)
    const adbConnected = Math.random() > 0.1; // 90% success rate
    
    if (!adbConnected) {
      return NextResponse.json({
        success: false,
        error: 'Failed to establish ADB connection. Please enable USB debugging and allow remote connections.',
        code: 'ADB_CONNECTION_FAILED'
      }, { status: 500 });
    }
    
    // Step 3: Authenticate with pairing code if required
    if (pairingCode) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Validate pairing code (simulate)
      if (pairingCode.length !== 6 || !/^\d{6}$/.test(pairingCode)) {
        return NextResponse.json({
          success: false,
          error: 'Invalid pairing code. Please enter the 6-digit code displayed on your TV.',
          code: 'INVALID_PAIRING_CODE'
        }, { status: 400 });
      }
    }
    
    // Step 4: Test remote control service availability
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const remoteServiceAvailable = Math.random() > 0.05; // 95% success rate
    
    if (!remoteServiceAvailable) {
      return NextResponse.json({
        success: false,
        error: 'Android TV Remote Control service is not available. Please ensure it\'s enabled in TV settings.',
        code: 'REMOTE_SERVICE_UNAVAILABLE'
      }, { status: 500 });
    }
    
    // Step 5: Store connection
    const connectionInfo = {
      device: {
        ...device,
        isConnected: true,
        lastSeen: new Date()
      },
      connectedAt: new Date(),
      lastActivity: new Date()
    };
    
    activeConnections.set(device.id, connectionInfo);
    
    // Generate session token
    const sessionToken = `tv_session_${device.id}_${Date.now()}`;
    
    return NextResponse.json({
      success: true,
      device: connectionInfo.device,
      sessionToken,
      connectionId: device.id,
      connectedAt: connectionInfo.connectedAt.toISOString(),
      capabilities: [
        'navigation',
        'media_control',
        'volume_control',
        'channel_control',
        'app_launch',
        'voice_command',
        'power_control'
      ]
    });
    
  } catch (error) {
    console.error('Connection failed:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to connect to Android TV',
      code: 'CONNECTION_FAILED'
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { deviceId } = await request.json();
    
    if (!deviceId) {
      return NextResponse.json({
        success: false,
        error: 'Device ID is required'
      }, { status: 400 });
    }
    
    const connection = activeConnections.get(deviceId);
    
    if (!connection) {
      return NextResponse.json({
        success: false,
        error: 'No active connection found for this device'
      }, { status: 404 });
    }
    
    // Simulate disconnection process
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Remove from active connections
    activeConnections.delete(deviceId);
    
    console.log(`Disconnected from Android TV: ${connection.device.name}`);
    
    return NextResponse.json({
      success: true,
      message: 'Disconnected from Android TV',
      disconnectedAt: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Disconnection failed:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to disconnect from Android TV'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const deviceId = searchParams.get('deviceId');
    
    if (deviceId) {
      // Get specific connection status
      const connection = activeConnections.get(deviceId);
      
      if (!connection) {
        return NextResponse.json({
          success: true,
          connected: false,
          device: null
        });
      }
      
      return NextResponse.json({
        success: true,
        connected: true,
        device: connection.device,
        connectedAt: connection.connectedAt.toISOString(),
        lastActivity: connection.lastActivity.toISOString()
      });
    }
    
    // Get all active connections
    const connections = Array.from(activeConnections.values()).map(conn => ({
      device: conn.device,
      connectedAt: conn.connectedAt.toISOString(),
      lastActivity: conn.lastActivity.toISOString()
    }));
    
    return NextResponse.json({
      success: true,
      activeConnections: connections.length,
      connections
    });
    
  } catch (error) {
    console.error('Failed to get connection status:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to get connection status'
    }, { status: 500 });
  }
}