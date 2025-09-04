import { IRCommand } from '@/types/tv-remote';

export const IR_COMMAND_DATABASE: Record<string, IRCommand[]> = {
  samsung: [
    { brand: 'Samsung', model: 'Generic', command: 'POWER', code: '0x02', frequency: 38000 },
    { brand: 'Samsung', model: 'Generic', command: 'VOLUME_UP', code: '0x07', frequency: 38000 },
    { brand: 'Samsung', model: 'Generic', command: 'VOLUME_DOWN', code: '0x0B', frequency: 38000 },
    { brand: 'Samsung', model: 'Generic', command: 'MUTE', code: '0x0F', frequency: 38000 },
    { brand: 'Samsung', model: 'Generic', command: 'CHANNEL_UP', code: '0x12', frequency: 38000 },
    { brand: 'Samsung', model: 'Generic', command: 'CHANNEL_DOWN', code: '0x10', frequency: 38000 },
    { brand: 'Samsung', model: 'Generic', command: 'HOME', code: '0x79', frequency: 38000 },
    { brand: 'Samsung', model: 'Generic', command: 'BACK', code: '0x58', frequency: 38000 },
    { brand: 'Samsung', model: 'Generic', command: 'OK', code: '0x16', frequency: 38000 },
    { brand: 'Samsung', model: 'Generic', command: 'UP', code: '0x60', frequency: 38000 },
    { brand: 'Samsung', model: 'Generic', command: 'DOWN', code: '0x61', frequency: 38000 },
    { brand: 'Samsung', model: 'Generic', command: 'LEFT', code: '0x65', frequency: 38000 },
    { brand: 'Samsung', model: 'Generic', command: 'RIGHT', code: '0x62', frequency: 38000 },
    { brand: 'Samsung', model: 'Generic', command: 'MENU', code: '0x1A', frequency: 38000 },
    { brand: 'Samsung', model: 'Generic', command: 'SOURCE', code: '0x01', frequency: 38000 }
  ],
  lg: [
    { brand: 'LG', model: 'Generic', command: 'POWER', code: '0x08', frequency: 38000 },
    { brand: 'LG', model: 'Generic', command: 'VOLUME_UP', code: '0x02', frequency: 38000 },
    { brand: 'LG', model: 'Generic', command: 'VOLUME_DOWN', code: '0x03', frequency: 38000 },
    { brand: 'LG', model: 'Generic', command: 'MUTE', code: '0x09', frequency: 38000 },
    { brand: 'LG', model: 'Generic', command: 'CHANNEL_UP', code: '0x00', frequency: 38000 },
    { brand: 'LG', model: 'Generic', command: 'CHANNEL_DOWN', code: '0x01', frequency: 38000 },
    { brand: 'LG', model: 'Generic', command: 'HOME', code: '0x7C', frequency: 38000 },
    { brand: 'LG', model: 'Generic', command: 'BACK', code: '0x28', frequency: 38000 },
    { brand: 'LG', model: 'Generic', command: 'OK', code: '0x44', frequency: 38000 },
    { brand: 'LG', model: 'Generic', command: 'UP', code: '0x40', frequency: 38000 },
    { brand: 'LG', model: 'Generic', command: 'DOWN', code: '0x41', frequency: 38000 },
    { brand: 'LG', model: 'Generic', command: 'LEFT', code: '0x07', frequency: 38000 },
    { brand: 'LG', model: 'Generic', command: 'RIGHT', code: '0x06', frequency: 38000 },
    { brand: 'LG', model: 'Generic', command: 'MENU', code: '0x43', frequency: 38000 },
    { brand: 'LG', model: 'Generic', command: 'SOURCE', code: '0x0B', frequency: 38000 }
  ],
  sony: [
    { brand: 'Sony', model: 'Generic', command: 'POWER', code: '0x15', frequency: 40000 },
    { brand: 'Sony', model: 'Generic', command: 'VOLUME_UP', code: '0x12', frequency: 40000 },
    { brand: 'Sony', model: 'Generic', command: 'VOLUME_DOWN', code: '0x13', frequency: 40000 },
    { brand: 'Sony', model: 'Generic', command: 'MUTE', code: '0x14', frequency: 40000 },
    { brand: 'Sony', model: 'Generic', command: 'CHANNEL_UP', code: '0x10', frequency: 40000 },
    { brand: 'Sony', model: 'Generic', command: 'CHANNEL_DOWN', code: '0x11', frequency: 40000 },
    { brand: 'Sony', model: 'Generic', command: 'HOME', code: '0x60', frequency: 40000 },
    { brand: 'Sony', model: 'Generic', command: 'BACK', code: '0x62', frequency: 40000 },
    { brand: 'Sony', model: 'Generic', command: 'OK', code: '0x65', frequency: 40000 },
    { brand: 'Sony', model: 'Generic', command: 'UP', code: '0x78', frequency: 40000 },
    { brand: 'Sony', model: 'Generic', command: 'DOWN', code: '0x79', frequency: 40000 },
    { brand: 'Sony', model: 'Generic', command: 'LEFT', code: '0x7B', frequency: 40000 },
    { brand: 'Sony', model: 'Generic', command: 'RIGHT', code: '0x7A', frequency: 40000 },
    { brand: 'Sony', model: 'Generic', command: 'MENU', code: '0x36', frequency: 40000 },
    { brand: 'Sony', model: 'Generic', command: 'SOURCE', code: '0x25', frequency: 40000 }
  ]
};

export const STREAMING_APP_SHORTCUTS = [
  {
    id: 'netflix',
    name: 'Netflix',
    packageName: 'com.netflix.mediaclient',
    icon: 'https://placehold.co/64x64?text=N',
    color: '#E50914'
  },
  {
    id: 'youtube',
    name: 'YouTube',
    packageName: 'com.google.android.youtube.tv',
    icon: 'https://placehold.co/64x64?text=YT',
    color: '#FF0000'
  },
  {
    id: 'prime-video',
    name: 'Prime Video',
    packageName: 'com.amazon.avod.thirdpartyclient',
    icon: 'https://placehold.co/64x64?text=PV',
    color: '#00A8E1'
  },
  {
    id: 'disney-plus',
    name: 'Disney+',
    packageName: 'com.disney.disneyplus',
    icon: 'https://placehold.co/64x64?text=D+',
    color: '#113CCF'
  },
  {
    id: 'hulu',
    name: 'Hulu',
    packageName: 'com.hulu.plus',
    icon: 'https://placehold.co/64x64?text=H',
    color: '#1CE783'
  },
  {
    id: 'hbo-max',
    name: 'HBO Max',
    packageName: 'com.hbo.hbonow',
    icon: 'https://placehold.co/64x64?text=HBO',
    color: '#652DC1'
  }
];

export function getCommandsForBrand(brand: string): IRCommand[] {
  const brandKey = brand.toLowerCase();
  return IR_COMMAND_DATABASE[brandKey] || [];
}

export function findCommand(brand: string, command: string): IRCommand | null {
  const commands = getCommandsForBrand(brand);
  return commands.find(cmd => cmd.command === command) || null;
}

export function getAllBrands(): string[] {
  return Object.keys(IR_COMMAND_DATABASE).map(brand => 
    brand.charAt(0).toUpperCase() + brand.slice(1)
  );
}

export async function sendIRCommand(command: IRCommand): Promise<boolean> {
  try {
    // In a real implementation, this would interface with the device's IR blaster
    // For now, we'll simulate the command sending
    console.log(`Sending IR command: ${command.command} (${command.code}) at ${command.frequency}Hz for ${command.brand}`);
    
    // Simulate command execution delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return true;
  } catch (error) {
    console.error('Failed to send IR command:', error);
    return false;
  }
}