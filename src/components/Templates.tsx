import { QRTemplate } from '../types';
import { QR_TEMPLATES } from '../constants/templates';
import { Palette } from 'lucide-react';

interface TemplatesProps {
  onSelectTemplate: (template: QRTemplate) => void;
}

export const Templates = ({ onSelectTemplate }: TemplatesProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
        <Palette size={20} />
        Quick Templates
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {QR_TEMPLATES.map((template) => (
          <button
            key={template.name}
            onClick={() => onSelectTemplate(template)}
            className="group relative overflow-hidden rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all hover:shadow-lg"
          >
            <div
              className="h-24 flex items-center justify-center p-4"
              style={{ backgroundColor: template.bgColor }}
            >
              <div
                className="w-16 h-16 rounded"
                style={{
                  backgroundColor: template.qrColor,
                  borderRadius:
                    template.cornerStyle === 'rounded'
                      ? '8px'
                      : template.cornerStyle === 'dots'
                      ? '50%'
                      : '0',
                }}
              />
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 text-left">
              <p className="font-medium text-sm text-gray-900 dark:text-white">
                {template.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {template.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
