import { QRTemplate } from '../types';

export const QR_TEMPLATES: QRTemplate[] = [
  {
    name: 'Classic',
    description: 'Black on white, timeless design',
    qrColor: '#000000',
    bgColor: '#FFFFFF',
    cornerStyle: 'square',
    errorCorrection: 'M',
  },
  {
    name: 'Ocean',
    description: 'Deep blue ocean theme',
    qrColor: '#0077BE',
    bgColor: '#E6F3FF',
    cornerStyle: 'rounded',
    errorCorrection: 'M',
  },
  {
    name: 'Forest',
    description: 'Natural green forest',
    qrColor: '#2D5016',
    bgColor: '#E8F5E9',
    cornerStyle: 'rounded',
    errorCorrection: 'M',
  },
  {
    name: 'Sunset',
    description: 'Warm sunset colors',
    qrColor: '#D84315',
    bgColor: '#FFF3E0',
    cornerStyle: 'rounded',
    errorCorrection: 'M',
  },
  {
    name: 'Elegant',
    description: 'Sophisticated dark theme',
    qrColor: '#212121',
    bgColor: '#F5F5F5',
    cornerStyle: 'dots',
    errorCorrection: 'H',
  },
  {
    name: 'Neon',
    description: 'Vibrant neon style',
    qrColor: '#E91E63',
    bgColor: '#1A1A1A',
    cornerStyle: 'dots',
    errorCorrection: 'M',
  },
  {
    name: 'Corporate',
    description: 'Professional business look',
    qrColor: '#1565C0',
    bgColor: '#FAFAFA',
    cornerStyle: 'square',
    errorCorrection: 'H',
  },
  {
    name: 'Minimal',
    description: 'Clean minimal design',
    qrColor: '#424242',
    bgColor: '#FFFFFF',
    cornerStyle: 'square',
    errorCorrection: 'L',
  },
];

export const CONTENT_TYPE_LABELS: Record<string, string> = {
  url: 'Website URL',
  text: 'Plain Text',
  email: 'Email Address',
  phone: 'Phone Number',
  wifi: 'WiFi Network',
  location: 'GPS Location',
};

export const ERROR_CORRECTION_INFO = {
  L: '~7% recovery',
  M: '~15% recovery',
  Q: '~25% recovery',
  H: '~30% recovery',
};

export const SIZE_PRESETS = [
  { label: 'Small', value: 200 },
  { label: 'Medium', value: 300 },
  { label: 'Large', value: 400 },
  { label: 'Extra Large', value: 600 },
];
