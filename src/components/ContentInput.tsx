import { useState } from 'react';
import { ContentType, WiFiConfig } from '../types';
import { CONTENT_TYPE_LABELS } from '../constants/templates';
import { Globe, Type, Mail, Phone, Wifi, MapPin } from 'lucide-react';

interface ContentInputProps {
  contentType: ContentType;
  content: string;
  onContentChange: (content: string) => void;
  onContentTypeChange: (type: ContentType) => void;
  wifiConfig?: WiFiConfig;
  onWifiConfigChange?: (config: WiFiConfig) => void;
  error?: string;
}

const contentTypeIcons = {
  url: Globe,
  text: Type,
  email: Mail,
  phone: Phone,
  wifi: Wifi,
  location: MapPin,
};

export const ContentInput = ({
  contentType,
  content,
  onContentChange,
  onContentTypeChange,
  wifiConfig,
  onWifiConfigChange,
  error,
}: ContentInputProps) => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleLocationChange = () => {
    if (latitude && longitude) {
      onContentChange(`${latitude},${longitude}`);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Content Type
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {(Object.keys(CONTENT_TYPE_LABELS) as ContentType[]).map((type) => {
            const Icon = contentTypeIcons[type];
            return (
              <button
                key={type}
                type="button"
                onClick={() => onContentTypeChange(type)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                  contentType === type
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 dark:text-gray-300'
                }`}
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{CONTENT_TYPE_LABELS[type]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {contentType === 'wifi' && onWifiConfigChange ? (
        <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Network Name (SSID)
            </label>
            <input
              type="text"
              value={wifiConfig?.ssid || ''}
              onChange={(e) =>
                onWifiConfigChange({ ...wifiConfig!, ssid: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="My WiFi Network"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              value={wifiConfig?.password || ''}
              onChange={(e) =>
                onWifiConfigChange({ ...wifiConfig!, password: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Enter password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Security Type
            </label>
            <select
              value={wifiConfig?.encryption || 'WPA'}
              onChange={(e) =>
                onWifiConfigChange({
                  ...wifiConfig!,
                  encryption: e.target.value as 'WPA' | 'WEP' | 'nopass',
                })
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">No Password</option>
            </select>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="hidden"
              checked={wifiConfig?.hidden || false}
              onChange={(e) =>
                onWifiConfigChange({ ...wifiConfig!, hidden: e.target.checked })
              }
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="hidden" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Hidden Network
            </label>
          </div>
        </div>
      ) : contentType === 'location' ? (
        <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Latitude
              </label>
              <input
                type="number"
                step="any"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                onBlur={handleLocationChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="48.8566"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Longitude
              </label>
              <input
                type="number"
                step="any"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                onBlur={handleLocationChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="2.3522"
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {contentType === 'url' && 'Website URL'}
            {contentType === 'text' && 'Text Content'}
            {contentType === 'email' && 'Email Address'}
            {contentType === 'phone' && 'Phone Number'}
          </label>
          {contentType === 'text' ? (
            <textarea
              value={content}
              onChange={(e) => onContentChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              rows={4}
              placeholder="Enter your text here..."
            />
          ) : (
            <input
              type="text"
              value={content}
              onChange={(e) => onContentChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder={
                contentType === 'url'
                  ? 'https://example.com'
                  : contentType === 'email'
                  ? 'email@example.com'
                  : contentType === 'phone'
                  ? '+1234567890'
                  : ''
              }
            />
          )}
          {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
        </div>
      )}
    </div>
  );
};
