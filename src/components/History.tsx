import { useEffect, useState } from 'react';
import { Trash2, Download, Clock } from 'lucide-react';
import { QRCodeHistory } from '../types';
import { supabase } from '../lib/supabase';
import { downloadQRCode } from '../utils/qrGenerator';

interface HistoryProps {
  onRestore: (history: QRCodeHistory) => void;
  refreshTrigger?: number;
}

export const History = ({ onRestore, refreshTrigger }: HistoryProps) => {
  const [history, setHistory] = useState<QRCodeHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, [refreshTrigger]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('qr_codes')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setHistory(data || []);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteQRCode = async (id: string) => {
    try {
      const { error } = await supabase.from('qr_codes').delete().eq('id', id);

      if (error) throw error;
      setHistory(history.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting QR code:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Loading history...</p>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        <Clock size={48} className="mx-auto mb-2 opacity-50" />
        <p>No QR codes generated yet</p>
        <p className="text-sm mt-1">Your history will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
        <Clock size={20} />
        Recent QR Codes
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {history.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex gap-3">
              <img
                src={item.qr_data_url}
                alt="QR Code"
                className="w-20 h-20 rounded object-contain bg-gray-50 dark:bg-gray-900"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {item.content}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {item.content_type.toUpperCase()}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {formatDate(item.created_at)}
                </p>
                <div className="flex gap-1 mt-2">
                  <button
                    onClick={() => onRestore(item)}
                    className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                  >
                    Restore
                  </button>
                  <button
                    onClick={() => downloadQRCode(item.qr_data_url, 'png', `qr-${item.id}`)}
                    className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Download size={12} className="inline" />
                  </button>
                  <button
                    onClick={() => deleteQRCode(item.id)}
                    className="text-xs px-2 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                  >
                    <Trash2 size={12} className="inline" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
