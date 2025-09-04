export interface TVDevice {
  id: string;
  name: string;
  brand: string;
  model: string;
  ipAddress: string;
  port: number;
  isConnected: boolean;
  lastSeen: Date;
}

export interface RemoteCommand {
  type: 'navigation' | 'media' | 'volume' | 'channel' | 'number' | 'app' | 'system';
  action: string;
  value?: string | number;
  timestamp: Date;
}

export interface RemoteState {
  isConnected: boolean;
  currentDevice: TVDevice | null;
  volume: number;
  isMuted: boolean;
  currentChannel: number;
  currentInput: string;
  isPlaying: boolean;
  lastCommand: RemoteCommand | null;
}

export interface ConnectionStatus {
  status: 'disconnected' | 'connecting' | 'connected' | 'error';
  message: string;
  signalStrength?: number;
}

export interface MacroCommand {
  id: string;
  name: string;
  commands: RemoteCommand[];
  icon?: string;
}

export interface AppShortcut {
  id: string;
  name: string;
  packageName: string;
  icon: string;
  color: string;
}

export interface IRCommand {
  brand: string;
  model: string;
  command: string;
  code: string;
  frequency: number;
}

export interface RemoteSettings {
  tvBrand: string;
  connectionType: 'wifi' | 'bluetooth' | 'ir';
  hapticFeedback: boolean;
  soundFeedback: boolean;
  buttonSize: 'small' | 'medium' | 'large';
  theme: 'dark' | 'light' | 'auto';
  autoConnect: boolean;
  macros: MacroCommand[];
  appShortcuts: AppShortcut[];
}

export interface TouchpadEvent {
  type: 'move' | 'click' | 'scroll' | 'gesture';
  x: number;
  y: number;
  deltaX?: number;
  deltaY?: number;
  pressure?: number;
}

export interface VoiceCommand {
  command: string;
  confidence: number;
  timestamp: Date;
}