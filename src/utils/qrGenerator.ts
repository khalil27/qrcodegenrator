import QRCode from 'qrcode';
import { ContentType, ErrorCorrectionLevel, WiFiConfig, LocationConfig } from '../types';

export const formatContentByType = (
  type: ContentType,
  content: string,
  wifiConfig?: WiFiConfig,
  locationConfig?: LocationConfig
): string => {
  switch (type) {
    case 'url':
      if (!content.startsWith('http://') && !content.startsWith('https://')) {
        return `https://${content}`;
      }
      return content;

    case 'email':
      return `mailto:${content}`;

    case 'phone':
      return `tel:${content}`;

    case 'wifi':
      if (wifiConfig) {
        const { ssid, password, encryption, hidden } = wifiConfig;
        return `WIFI:T:${encryption};S:${ssid};P:${password};H:${hidden ? 'true' : 'false'};;`;
      }
      return content;

    case 'location':
      if (locationConfig) {
        const { latitude, longitude } = locationConfig;
        return `geo:${latitude},${longitude}`;
      }
      return content;

    case 'text':
    default:
      return content;
  }
};

export const generateQRCode = async (
  content: string,
  qrColor: string,
  bgColor: string,
  size: number,
  errorCorrection: ErrorCorrectionLevel,
  logoDataUrl?: string
): Promise<string> => {
  const canvas = document.createElement('canvas');

  await QRCode.toCanvas(canvas, content, {
    width: size,
    margin: 2,
    color: {
      dark: qrColor,
      light: bgColor,
    },
    errorCorrectionLevel: errorCorrection,
  });

  if (logoDataUrl) {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const logo = new Image();
      await new Promise((resolve, reject) => {
        logo.onload = resolve;
        logo.onerror = reject;
        logo.src = logoDataUrl;
      });

      const logoSize = size * 0.2;
      const logoX = (size - logoSize) / 2;
      const logoY = (size - logoSize) / 2;

      ctx.fillStyle = bgColor;
      ctx.fillRect(logoX - 5, logoY - 5, logoSize + 10, logoSize + 10);

      ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
    }
  }

  return canvas.toDataURL('image/png');
};

export const validateURL = (url: string): boolean => {
  try {
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    new URL(fullUrl);
    return true;
  } catch {
    return false;
  }
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
  return phoneRegex.test(phone);
};

export const validateContent = (type: ContentType, content: string): { valid: boolean; error?: string } => {
  if (!content.trim()) {
    return { valid: false, error: 'Content cannot be empty' };
  }

  switch (type) {
    case 'url':
      return validateURL(content)
        ? { valid: true }
        : { valid: false, error: 'Please enter a valid URL' };

    case 'email':
      return validateEmail(content)
        ? { valid: true }
        : { valid: false, error: 'Please enter a valid email address' };

    case 'phone':
      return validatePhone(content)
        ? { valid: true }
        : { valid: false, error: 'Please enter a valid phone number' };

    default:
      return { valid: true };
  }
};

export const downloadQRCode = (dataUrl: string, format: 'png' | 'jpg' | 'svg', filename: string = 'qrcode') => {
  const link = document.createElement('a');
  link.download = `${filename}.${format}`;

  if (format === 'jpg') {
    const canvas = document.createElement('canvas');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        link.href = canvas.toDataURL('image/jpeg', 0.95);
        link.click();
      }
    };
    img.src = dataUrl;
  } else {
    link.href = dataUrl;
    link.click();
  }
};
