import { Download, Copy, Share2, Check } from 'lucide-react';
import { useState } from 'react';
import { ExportFormat } from '../types';
import { downloadQRCode } from '../utils/qrGenerator';

interface QRPreviewProps {
  qrDataUrl: string;
  onShare: () => void;
}

export const QRPreview = ({ qrDataUrl, onShare }: QRPreviewProps) => {
  const [format, setFormat] = useState<ExportFormat>('png');
  const [copied, setCopied] = useState(false);

  const handleDownload = () => {
    downloadQRCode(qrDataUrl, format);
  };

  const handleCopy = async () => {
    try {
      const response = await fetch(qrDataUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
      const link = document.createElement('a');
      link.href = qrDataUrl;
      link.download = 'qrcode.png';
      link.click();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Preview</h3>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center">
        {qrDataUrl ? (
          <img
            src={qrDataUrl}
            alt="QR Code Preview"
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
        ) : (
          <div className="w-64 h-64 flex items-center justify-center text-gray-400 dark:text-gray-600 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
            <p className="text-center">
              QR Code will appear here
              <br />
              <span className="text-sm">Configure options and click Generate</span>
            </p>
          </div>
        )}
      </div>

      {qrDataUrl && (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Export Format
            </label>
            <div className="flex gap-2">
              {(['png', 'jpg', 'svg'] as ExportFormat[]).map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => setFormat(fmt)}
                  className={`flex-1 px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                    format === fmt
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 dark:text-gray-300'
                  }`}
                >
                  {fmt.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Download size={20} />
              Download
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              {copied ? <Check size={20} /> : <Copy size={20} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>

            <button
              onClick={onShare}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <Share2 size={20} />
              Share
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
