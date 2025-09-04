import { NextRequest, NextResponse } from 'next/server';
import { RemoteCommand } from '@/types/tv-remote';

// Command execution history (in production, use proper logging/analytics)
const commandHistory: Array<{
  command: RemoteCommand;
  deviceId: string;
  executed: boolean;
  executedAt: Date;
  responseTime: number;
  error?: string;
}> = [];

export async function POST(request: NextRequest) {
  try {
    const { command, deviceId } = await request.json();
    
    if (!command || !deviceId) {
      return NextResponse.json({
        success: false,
        error: 'Command and device ID are required'
      }, { status: 400 });
    }
    
    // Validate command structure
    if (!command.type || !command.action) {
      return NextResponse.json({
        success: false,
        error: 'Invalid command structure. Type and action are required.'
      }, { status: 400 });
    }
    
    const startTime = Date.now();
    
    console.log(`Executing command: ${command.type}:${command.action} on device ${deviceId}`);
    
    // Simulate command execution based on type
    let executionResult;
    
    switch (command.type) {
      case 'navigation':
        executionResult = await executeNavigationCommand(command);
        break;
      case 'media':
        executionResult = await executeMediaCommand(command);
        break;
      case 'volume':
        executionResult = await executeVolumeCommand(command);
        break;
      case 'channel':
        executionResult = await executeChannelCommand(command);
        break;
      case 'number':
        executionResult = await executeNumberCommand(command);
        break;
      case 'app':
        executionResult = await executeAppCommand(command);
        break;
      case 'system':
        executionResult = await executeSystemCommand(command);
        break;
      default:
        return NextResponse.json({
          success: false,
          error: `Unsupported command type: ${command.type}`
        }, { status: 400 });
    }
    
    const responseTime = Date.now() - startTime;
    
    // Log command execution
    commandHistory.push({
      command,
      deviceId,
      executed: executionResult.success,
      executedAt: new Date(),
      responseTime,
      error: executionResult.error
    });
    
    // Keep only last 100 commands
    if (commandHistory.length > 100) {
      commandHistory.splice(0, commandHistory.length - 100);
    }
    
    return NextResponse.json({
      success: executionResult.success,
      command,
      deviceId,
      executedAt: new Date().toISOString(),
      responseTime,
      result: executionResult.result,
      error: executionResult.error
    });
    
  } catch (error) {
    console.error('Command execution failed:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Command execution failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Navigation commands (up, down, left, right, ok, back, home, menu)
async function executeNavigationCommand(command: RemoteCommand) {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const validActions = ['up', 'down', 'left', 'right', 'ok', 'back', 'home', 'menu'];
  
  if (!validActions.includes(command.action)) {
    return {
      success: false,
      error: `Invalid navigation action: ${command.action}`
    };
  }
  
  // Simulate successful execution
  return {
    success: Math.random() > 0.02, // 98% success rate
    result: {
      action: command.action,
      executed: true
    }
  };
}

// Media commands (play, pause, stop, rewind, fastforward, etc.)
async function executeMediaCommand(command: RemoteCommand) {
  await new Promise(resolve => setTimeout(resolve, 150));
  
  const validActions = [
    'play', 'pause', 'stop', 'rewind', 'fastforward', 
    'previous', 'next', 'record', '30-second-skip', 
    '10-second-rewind', 'replay', 'live'
  ];
  
  if (!validActions.includes(command.action)) {
    return {
      success: false,
      error: `Invalid media action: ${command.action}`
    };
  }
  
  return {
    success: Math.random() > 0.03, // 97% success rate
    result: {
      action: command.action,
      executed: true,
      mediaState: command.action === 'play' ? 'playing' : 
                  command.action === 'pause' ? 'paused' :
                  command.action === 'stop' ? 'stopped' : 'unknown'
    }
  };
}

// Volume commands (up, down, mute, set levels)
async function executeVolumeCommand(command: RemoteCommand) {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const validActions = ['up', 'down', 'mute', 'set-25', 'set-50', 'set-75'];
  
  if (!validActions.includes(command.action)) {
    return {
      success: false,
      error: `Invalid volume action: ${command.action}`
    };
  }
  
  let volumeLevel = 50; // Default volume
  
  switch (command.action) {
    case 'up':
      volumeLevel = Math.min(100, 55);
      break;
    case 'down':
      volumeLevel = Math.max(0, 45);
      break;
    case 'set-25':
      volumeLevel = 25;
      break;
    case 'set-50':
      volumeLevel = 50;
      break;
    case 'set-75':
      volumeLevel = 75;
      break;
    case 'mute':
      volumeLevel = 0;
      break;
  }
  
  return {
    success: Math.random() > 0.01, // 99% success rate
    result: {
      action: command.action,
      volume: volumeLevel,
      muted: command.action === 'mute',
      executed: true
    }
  };
}

// Channel commands (up, down, set, last, favorite)
async function executeChannelCommand(command: RemoteCommand) {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const validActions = ['up', 'down', 'set', 'last', 'favorite', 'list'];
  
  if (!validActions.includes(command.action)) {
    return {
      success: false,
      error: `Invalid channel action: ${command.action}`
    };
  }
  
  let channelNumber = 1;
  
  switch (command.action) {
    case 'up':
      channelNumber = Math.floor(Math.random() * 500) + 2;
      break;
    case 'down':
      channelNumber = Math.floor(Math.random() * 500) + 1;
      break;
    case 'set':
      channelNumber = typeof command.value === 'number' ? command.value : 1;
      break;
    case 'last':
      channelNumber = Math.floor(Math.random() * 100) + 1;
      break;
    case 'favorite':
      channelNumber = Math.floor(Math.random() * 50) + 1;
      break;
  }
  
  return {
    success: Math.random() > 0.05, // 95% success rate
    result: {
      action: command.action,
      channel: channelNumber,
      executed: true
    }
  };
}

// Number pad commands (digit input, enter)
async function executeNumberCommand(command: RemoteCommand) {
  await new Promise(resolve => setTimeout(resolve, 50));
  
  const validActions = ['digit', 'enter'];
  
  if (!validActions.includes(command.action)) {
    return {
      success: false,
      error: `Invalid number action: ${command.action}`
    };
  }
  
  return {
    success: Math.random() > 0.01, // 99% success rate
    result: {
      action: command.action,
      value: command.value,
      executed: true
    }
  };
}

// App launch commands
async function executeAppCommand(command: RemoteCommand) {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Apps take longer to launch
  
  if (command.action !== 'launch') {
    return {
      success: false,
      error: `Invalid app action: ${command.action}`
    };
  }
  
  return {
    success: Math.random() > 0.1, // 90% success rate (apps can fail to launch)
    result: {
      action: command.action,
      packageName: command.value,
      launched: true,
      executed: true
    }
  };
}

// System commands (power, settings, assistant, etc.)
async function executeSystemCommand(command: RemoteCommand) {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const validActions = [
    'power', 'settings', 'assistant', 'input', 'search', 
    'voice_search', 'sleep', 'guide', 'info'
  ];
  
  if (!validActions.includes(command.action)) {
    return {
      success: false,
      error: `Invalid system action: ${command.action}`
    };
  }
  
  return {
    success: Math.random() > 0.02, // 98% success rate
    result: {
      action: command.action,
      executed: true
    }
  };
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '10');
    const deviceId = searchParams.get('deviceId');
    
    let history = commandHistory;
    
    if (deviceId) {
      history = history.filter(entry => entry.deviceId === deviceId);
    }
    
    // Return most recent commands
    const recentCommands = history
      .slice(-limit)
      .reverse()
      .map(entry => ({
        command: entry.command,
        executed: entry.executed,
        executedAt: entry.executedAt.toISOString(),
        responseTime: entry.responseTime,
        error: entry.error
      }));
    
    return NextResponse.json({
      success: true,
      commands: recentCommands,
      totalCount: history.length
    });
    
  } catch (error) {
    console.error('Failed to get command history:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to get command history'
    }, { status: 500 });
  }
}