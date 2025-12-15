import { useRef } from 'react';
import { Upload, X } from 'lucide-react';

interface LogoUploadProps {
  logoDataUrl?: string;
  onLogoChange: (file: File | null, dataUrl?: string) => void;
}

export const LogoUpload = ({ logoDataUrl, onLogoChange }: LogoUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        alert('Image size should be less than 2MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        onLogoChange(file, dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    onLogoChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Logo (Optional)
      </label>
      <div className="flex items-center gap-3">
        {logoDataUrl ? (
          <div className="relative">
            <img
              src={logoDataUrl}
              alt="Logo preview"
              className="w-20 h-20 object-contain rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white p-1"
            />
            <button
              type="button"
              onClick={handleRemoveLogo}
              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              aria-label="Remove logo"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-20 h-20 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
          >
            <Upload size={24} />
            <span className="text-xs mt-1">Upload</span>
          </button>
        )}
        <div className="flex-1 text-sm text-gray-600 dark:text-gray-400">
          <p>Recommended: Square image, max 2MB</p>
          <p className="text-xs mt-1">Will be centered in QR code</p>
        </div>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};
