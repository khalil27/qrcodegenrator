export type ContentType = 'url' | 'text' | 'email' | 'phone' | 'wifi' | 'location';

export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export type CornerStyle = 'square' | 'rounded' | 'dots';

export type ExportFormat = 'png' | 'jpg' | 'svg';

export interface QRCodeConfig {
  content: string;
  contentType: ContentType;
  qrColor: string;
  bgColor: string;
  size: number;
  errorCorrection: ErrorCorrectionLevel;
  cornerStyle: CornerStyle;
  logoFile?: File | null;
  logoDataUrl?: string;
}

export interface QRCodeHistory {
  id: string;
  user_id?: string;
  content_type: ContentType;
  content: string;
  qr_color: string;
  bg_color: string;
  size: number;
  logo_url?: string;
  error_correction: ErrorCorrectionLevel;
  corner_style: CornerStyle;
  template_name?: string;
  qr_data_url: string;
  created_at: string;
}

export interface QRTemplate {
  name: string;
  description: string;
  qrColor: string;
  bgColor: string;
  cornerStyle: CornerStyle;
  errorCorrection: ErrorCorrectionLevel;
}

export interface WiFiConfig {
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

export interface LocationConfig {
  latitude: number;
  longitude: number;
}
