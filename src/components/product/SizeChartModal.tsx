import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';
import { SizeChartEntry } from '../../types';

interface SizeChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  sizeChart: {
    inches: SizeChartEntry[];
    cm: SizeChartEntry[];
  };
}

export const SizeChartModal: React.FC<SizeChartModalProps> = ({
  isOpen,
  onClose,
  sizeChart,
}) => {
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  if (!isOpen) return null;

  const currentData = unit === 'inches' ? sizeChart.inches : sizeChart.cm;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white w-full max-w-2xl rounded-sm shadow-2xl p-6 sm:p-8 z-10 border border-gray-100">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <Ruler className="w-5 h-5 text-brand-maroon" />
              <h3 className="font-heading text-lg sm:text-xl text-gray-900 uppercase tracking-luxury font-normal">
                Garment Size Guide
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-black rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Unit Toggle Buttons */}
          <div className="flex items-center justify-between my-5">
            <p className="text-xs text-gray-500">
              Measured in <strong className="uppercase">{unit}</strong>. These are garment measurements.
            </p>

            <div className="flex rounded border border-gray-200 p-0.5 bg-gray-50 text-xs">
              <button
                type="button"
                onClick={() => setUnit('inches')}
                className={`px-3 py-1 font-bold rounded transition-colors ${
                  unit === 'inches'
                    ? 'bg-brand-dark text-white'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                IN
              </button>
              <button
                type="button"
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 font-bold rounded transition-colors ${
                  unit === 'cm'
                    ? 'bg-brand-dark text-white'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                CM
              </button>
            </div>
          </div>

          {/* Measurement Table */}
          <div className="overflow-x-auto border border-gray-100 rounded">
            <table className="w-full text-xs text-left">
              <thead className="bg-brand-ivory text-gray-800 font-bold uppercase tracking-wider border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4">Size</th>
                  <th className="py-3 px-4">Bust ({unit === 'inches' ? 'in' : 'cm'})</th>
                  <th className="py-3 px-4">Waist ({unit === 'inches' ? 'in' : 'cm'})</th>
                  <th className="py-3 px-4">Hip ({unit === 'inches' ? 'in' : 'cm'})</th>
                  <th className="py-3 px-4">Kurta Length ({unit === 'inches' ? 'in' : 'cm'})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {currentData.map((row) => (
                  <tr key={row.size} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold text-gray-900 bg-gray-50/50">
                      {row.size}
                    </td>
                    <td className="py-3 px-4">{row.bust}</td>
                    <td className="py-3 px-4">{row.waist}</td>
                    <td className="py-3 px-4">{row.hip}</td>
                    <td className="py-3 px-4">{row.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Helpful Tips Callout */}
          <div className="mt-6 p-3.5 bg-brand-cream rounded text-xs text-gray-600 space-y-1">
            <p className="font-semibold text-gray-800">How to measure:</p>
            <p>• <strong>Bust</strong>: Measure around the fullest part of your bust while keeping the tape parallel to the floor.</p>
            <p>• <strong>Waist</strong>: Measure around your natural waistline, where your trousers/salwar usually rest.</p>
            <p>• <strong>Tip</strong>: If your measurements fall between two sizes, we recommend ordering the larger size for an easy comfort fit.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
