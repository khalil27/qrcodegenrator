import { useState } from 'react';
import { QrCode, Sparkles } from 'lucide-react';
import { ContentInput } from './components/ContentInput';
import { ColorPicker } from './components/ColorPicker';
import { LogoUpload } from './components/LogoUpload';
import { QRPreview } from './components/QRPreview';
import { History } from './components/History';
import { Templates } from './components/Templates';
import { ShareModal } from './components/ShareModal';
import { ThemeToggle } from './components/ThemeToggle';
import { useDarkMode } from './hooks/useDarkMode';
import { ContentType, ErrorCorrectionLevel, CornerStyle, WiFiConfig, QRCodeHistory, QRTemplate } from './types';
import { generateQRCode, formatContentByType, validateContent } from './utils/qrGenerator';
import { SIZE_PRESETS, ERROR_CORRECTION_INFO } from './constants/templates';
import { supabase } from './lib/supabase';

function App() {
  const { isDark, setIsDark } = useDarkMode();
  const [contentType, setContentType] = useState<ContentType>('url');
  const [content, setContent] = useState('');
  const [qrColor, setQrColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [size, setSize] = useState(300);
  const [errorCorrection, setErrorCorrection] = useState<ErrorCorrectionLevel>('M');
  const [cornerStyle, setCornerStyle] = useState<CornerStyle>('square');
  const [logoDataUrl, setLogoDataUrl] = useState<string>();
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string>();
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [historyRefresh, setHistoryRefresh] = useState(0);
  const [wifiConfig, setWifiConfig] = useState<WiFiConfig>({
    ssid: '',
    password: '',
    encryption: 'WPA',
    hidden: false,
  });

  const handleGenerate = async () => {
    const validation = validateContent(contentType, content);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    setError(undefined);
    setIsGenerating(true);

    try {
      const formattedContent = formatContentByType(
        contentType,
        content,
        contentType === 'wifi' ? wifiConfig : undefined,
        contentType === 'location' ? {
          latitude: parseFloat(content.split(',')[0]),
          longitude: parseFloat(content.split(',')[1]),
        } : undefined
      );

      const dataUrl = await generateQRCode(
        formattedContent,
        qrColor,
        bgColor,
        size,
        errorCorrection,
        logoDataUrl
      );

      setQrDataUrl(dataUrl);

      const { error: dbError } = await supabase.from('qr_codes').insert({
        content_type: contentType,
        content: formattedContent,
        qr_color: qrColor,
        bg_color: bgColor,
        size,
        error_correction: errorCorrection,
        corner_style: cornerStyle,
        qr_data_url: dataUrl,
      });

      if (dbError) {
        console.error('Error saving to database:', dbError);
      } else {
        setHistoryRefresh((prev) => prev + 1);
      }
    } catch (err) {
      console.error('Error generating QR code:', err);
      setError('Failed to generate QR code');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleLogoChange = (_file: File | null, dataUrl?: string) => {
    setLogoDataUrl(dataUrl);
  };

  const handleRestore = (history: QRCodeHistory) => {
    setContentType(history.content_type);
    setContent(history.content);
    setQrColor(history.qr_color);
    setBgColor(history.bg_color);
    setSize(history.size);
    setErrorCorrection(history.error_correction);
    setCornerStyle(history.corner_style);
    setQrDataUrl(history.qr_data_url);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTemplateSelect = (template: QRTemplate) => {
    setQrColor(template.qrColor);
    setBgColor(template.bgColor);
    setCornerStyle(template.cornerStyle);
    setErrorCorrection(template.errorCorrection);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-600 rounded-xl">
                <QrCode size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  QR Custom Generator
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Create beautiful, customized QR codes in seconds
                </p>
              </div>
            </div>
            <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Sparkles size={20} className="text-blue-600" />
                Configure Your QR Code
              </h2>

              <div className="space-y-6">
                <ContentInput
                  contentType={contentType}
                  content={content}
                  onContentChange={setContent}
                  onContentTypeChange={setContentType}
                  wifiConfig={wifiConfig}
                  onWifiConfigChange={setWifiConfig}
                  error={error}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ColorPicker
                    label="QR Code Color"
                    color={qrColor}
                    onChange={setQrColor}
                  />
                  <ColorPicker
                    label="Background Color"
                    color={bgColor}
                    onChange={setBgColor}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Size
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="200"
                      max="800"
                      step="50"
                      value={size}
                      onChange={(e) => setSize(Number(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-16">
                      {size}px
                    </span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {SIZE_PRESETS.map((preset) => (
                      <button
                        key={preset.value}
                        onClick={() => setSize(preset.value)}
                        className={`px-3 py-1 text-xs rounded-lg border transition-colors ${
                          size === preset.value
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:text-gray-300'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Error Correction Level
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {(['L', 'M', 'Q', 'H'] as ErrorCorrectionLevel[]).map((level) => (
                      <button
                        key={level}
                        onClick={() => setErrorCorrection(level)}
                        className={`px-4 py-2 rounded-lg border-2 transition-all ${
                          errorCorrection === level
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:text-gray-300'
                        }`}
                      >
                        <div className="font-bold">{level}</div>
                        <div className="text-xs">{ERROR_CORRECTION_INFO[level]}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Corner Style
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['square', 'rounded', 'dots'] as CornerStyle[]).map((style) => (
                      <button
                        key={style}
                        onClick={() => setCornerStyle(style)}
                        className={`px-4 py-2 rounded-lg border-2 transition-all capitalize ${
                          cornerStyle === style
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:text-gray-300'
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                <LogoUpload logoDataUrl={logoDataUrl} onLogoChange={handleLogoChange} />

                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !content}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {isGenerating ? 'Generating...' : 'Generate QR Code'}
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
              <Templates onSelectTemplate={handleTemplateSelect} />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
              <History onRestore={handleRestore} refreshTrigger={historyRefresh} />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
              <QRPreview
                qrDataUrl={qrDataUrl}
                onShare={() => setShareModalOpen(true)}
              />
            </div>
          </div>
        </div>
      </div>

      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        qrDataUrl={qrDataUrl}
        content={content}
      />
    </div>
  );
}

export default App;
