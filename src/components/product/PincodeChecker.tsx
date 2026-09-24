import React, { useState } from 'react';
import { MapPin, CheckCircle2, AlertCircle, Truck } from 'lucide-react';

export const PincodeChecker: React.FC = () => {
  const [pincode, setPincode] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [deliveryDate, setDeliveryDate] = useState('');

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincode.trim())) {
      setStatus('error');
      return;
    }

    // Calculate delivery date (approx 3-5 days from today)
    const date = new Date();
    date.setDate(date.getDate() + 4);
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    setDeliveryDate(date.toLocaleDateString('en-IN', options));
    setStatus('success');
  };

  return (
    <div className="border border-gray-200 rounded p-3.5 bg-gray-50/50">
      <div className="flex items-center space-x-2 text-xs font-semibold text-gray-800 uppercase tracking-wider mb-2">
        <MapPin className="w-3.5 h-3.5 text-brand-maroon" />
        <span>Check Delivery & COD Availability</span>
      </div>

      <form onSubmit={handleCheck} className="flex gap-2">
        <input
          type="text"
          maxLength={6}
          value={pincode}
          onChange={(e) => {
            setPincode(e.target.value.replace(/\D/g, ''));
            setStatus('idle');
          }}
          placeholder="Enter 6-digit Pincode"
          className="flex-1 text-xs px-3 py-2 bg-white border border-gray-300 rounded focus:border-black focus:outline-none tracking-widest font-mono"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-brand-dark hover:bg-black text-white text-xs uppercase font-bold tracking-wider rounded transition-colors"
        >
          Check
        </button>
      </form>

      {status === 'success' && (
        <div className="mt-2.5 text-xs text-green-700 bg-green-50 p-2 rounded border border-green-200 space-y-1 animate-in fade-in-50">
          <p className="flex items-center font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
            <span>Delivery available to {pincode}</span>
          </p>
          <p className="text-[11px] text-gray-600 pl-4.5">
            • Estimated delivery by <strong>{deliveryDate}</strong>
          </p>
          <p className="text-[11px] text-gray-600 pl-4.5">
            • Cash on Delivery (COD) & Free Shipping available!
          </p>
        </div>
      )}

      {status === 'error' && (
        <p className="mt-2 text-xs text-red-600 flex items-center">
          <AlertCircle className="w-3.5 h-3.5 mr-1" />
          Please enter a valid 6-digit Indian PIN code.
        </p>
      )}
    </div>
  );
};
