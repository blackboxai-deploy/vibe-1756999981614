import { TVDevice, RemoteCommand, ConnectionStatus } from '@/types/tv-remote';

export class TVConnection {
  private ws: WebSocket | null = null;
  private device: TVDevice | null = null;
  private connectionStatus: ConnectionStatus = { status: 'disconnected', message: 'Not connected' };
  private listeners: Map<string, Function[]> = new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  constructor() {
    this.setupEventListeners();
  }

  private setupEventListeners() {
    this.listeners.set('statusChange', []);
    this.listeners.set('commandResponse', []);
    this.listeners.set('deviceState', []);
    this.listeners.set('error', []);
  }

  public addEventListener(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)?.push(callback);
  }

  public removeEventListener(event: string, callback: Function) {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  private emit(event: string, data: any) {
    const callbacks = this.listeners.get(event) || [];
    callbacks.forEach(callback => callback(data));
  }

  public async connect(device: TVDevice): Promise<boolean> {
    try {
      this.device = device;
      this.setConnectionStatus('connecting', 'Connecting to TV...');

      const wsUrl = `ws://${device.ipAddress}:${device.port}/remote`;
      this.ws = new WebSocket(wsUrl);

      return new Promise((resolve, reject) => {
        if (!this.ws) {
          reject(new Error('Failed to create WebSocket connection'));
          return;
        }

        this.ws.onopen = () => {
          this.setConnectionStatus('connected', `Connected to ${device.name}`);
          this.reconnectAttempts = 0;
          resolve(true);
        };

        this.ws.onmessage = (event) => {
          this.handleMessage(event.data);
        };

        this.ws.onclose = () => {
          this.handleDisconnection();
        };

        this.ws.onerror = (error) => {
          this.setConnectionStatus('error', 'Connection failed');
          this.emit('error', error);
          reject(error);
        };

        // Connection timeout
        setTimeout(() => {
          if (this.connectionStatus.status === 'connecting') {
            this.ws?.close();
            reject(new Error('Connection timeout'));
          }
        }, 10000);
      });
    } catch (error) {
      this.setConnectionStatus('error', 'Failed to connect');
      throw error;
    }
  }

  public disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.device = null;
    this.setConnectionStatus('disconnected', 'Disconnected');
  }

  public async sendCommand(command: RemoteCommand): Promise<boolean> {
    if (!this.ws || this.connectionStatus.status !== 'connected') {
      throw new Error('Not connected to TV');
    }

    return new Promise((resolve, reject) => {
      const message = JSON.stringify({
        type: 'command',
        command: command,
        timestamp: Date.now()
      });

      try {
        this.ws!.send(message);
        
        // Wait for command acknowledgment
        const timeout = setTimeout(() => {
          reject(new Error('Command timeout'));
        }, 5000);

        const handleResponse = (response: any) => {
          if (response.type === 'commandAck' && response.commandId === command.timestamp) {
            clearTimeout(timeout);
            resolve(response.success);
            this.removeEventListener('commandResponse', handleResponse);
          }
        };

        this.addEventListener('commandResponse', handleResponse);
      } catch (error) {
        reject(error);
      }
    });
  }

  private handleMessage(data: string) {
    try {
      const message = JSON.parse(data);
      
      switch (message.type) {
        case 'commandAck':
          this.emit('commandResponse', message);
          break;
        case 'deviceState':
          this.emit('deviceState', message.state);
          break;
        case 'error':
          this.emit('error', new Error(message.message));
          break;
        default:
          console.log('Unknown message type:', message.type);
      }
    } catch (error) {
      console.error('Failed to parse message:', error);
    }
  }

  private handleDisconnection() {
    if (this.connectionStatus.status === 'connected' && this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      this.setConnectionStatus('connecting', `Reconnecting... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      
      setTimeout(() => {
        if (this.device) {
          this.connect(this.device).catch(() => {
            if (this.reconnectAttempts >= this.maxReconnectAttempts) {
              this.setConnectionStatus('error', 'Failed to reconnect');
            }
          });
        }
      }, this.reconnectDelay * this.reconnectAttempts);
    } else {
      this.setConnectionStatus('disconnected', 'Connection lost');
    }
  }

  private setConnectionStatus(status: ConnectionStatus['status'], message: string) {
    this.connectionStatus = { status, message };
    this.emit('statusChange', this.connectionStatus);
  }

  public getConnectionStatus(): ConnectionStatus {
    return this.connectionStatus;
  }

  public getConnectedDevice(): TVDevice | null {
    return this.device;
  }
}

export const tvConnection = new TVConnection();