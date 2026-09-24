import React, { useState } from 'react';
import { ChevronDown, Sparkles, Scissors, Info, Truck, ShieldAlert } from 'lucide-react';
import { Product } from '../../types';

interface ProductAccordionsProps {
  product: Product;
}

export const ProductAccordions: React.FC<ProductAccordionsProps> = ({ product }) => {
  const [openSections, setOpenSections] = useState<string[]>(['specs', 'shipping']);

  const toggleSection = (id: string) => {
    setOpenSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const isOpen = (id: string) => openSections.includes(id);

  return (
    <div className="border-t border-gray-200 divide-y divide-gray-100 mt-8">
      {/* 1. Specifications */}
      <div>
        <button
          type="button"
          onClick={() => toggleSection('specs')}
          className="w-full py-4 flex items-center justify-between text-left group"
        >
          <span className="font-heading text-xs font-bold uppercase tracking-wider text-gray-900 group-hover:text-brand-pink flex items-center">
            <Sparkles className="w-3.5 h-3.5 mr-2 text-brand-maroon" /> Specifications & Highlights
          </span>
          <ChevronDown
            className={`w-4 h-4 text-gray-500 transition-transform ${
              isOpen('specs') ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isOpen('specs') && (
          <div className="pb-5 pt-1 text-xs text-gray-700 animate-in fade-in-50">
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 bg-brand-ivory/60 p-4 rounded border border-gray-100">
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">Fabric</span>
                <span className="font-medium text-gray-900">{product.specifications.fabric}</span>
              </div>
              {product.specifications.neckline && (
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-semibold">Neckline</span>
                  <span className="font-medium text-gray-900">{product.specifications.neckline}</span>
                </div>
              )}
              {product.specifications.sleeve && (
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-semibold">Sleeve</span>
                  <span className="font-medium text-gray-900">{product.specifications.sleeve}</span>
                </div>
              )}
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">Pattern</span>
                <span className="font-medium text-gray-900">{product.specifications.pattern}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">Color</span>
                <span className="font-medium text-gray-900">{product.specifications.color}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">Occasion</span>
                <span className="font-medium text-gray-900">{product.specifications.occasion}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">Technique</span>
                <span className="font-medium text-gray-900">{product.specifications.technique}</span>
              </div>
              {product.specifications.material && (
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-semibold">Lining & Material</span>
                  <span className="font-medium text-gray-900">{product.specifications.material}</span>
                </div>
              )}
            </div>

            {/* Model Info Callout */}
            <div className="mt-3 flex items-center space-x-2 text-[11px] text-gray-600 bg-white p-2 rounded border border-gray-100">
              <Scissors className="w-3.5 h-3.5 text-brand-pink" />
              <span>
                Model Fit: Wearing size <strong>{product.modelInfo.size}</strong> (Height: <strong>{product.modelInfo.height}</strong>)
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 2. Care Instructions */}
      <div>
        <button
          type="button"
          onClick={() => toggleSection('care')}
          className="w-full py-4 flex items-center justify-between text-left group"
        >
          <span className="font-heading text-xs font-bold uppercase tracking-wider text-gray-900 group-hover:text-brand-pink flex items-center">
            <Info className="w-3.5 h-3.5 mr-2 text-brand-maroon" /> Wash & Care Instructions
          </span>
          <ChevronDown
            className={`w-4 h-4 text-gray-500 transition-transform ${
              isOpen('care') ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isOpen('care') && (
          <div className="pb-5 pt-1 text-xs text-gray-600 space-y-2 animate-in fade-in-50 leading-relaxed">
            <p>• {product.careInstructions}</p>
            <p>• <strong>DISCLAIMER:</strong> Slight colour variations may occur due to different photography lighting and screen resolutions.</p>
            <p>• Handcrafted garments may have subtle irregularities in weave or print, which add to their authentic charm.</p>
          </div>
        )}
      </div>

      {/* 3. Domestic & International Shipping */}
      <div>
        <button
          type="button"
          onClick={() => toggleSection('shipping')}
          className="w-full py-4 flex items-center justify-between text-left group"
        >
          <span className="font-heading text-xs font-bold uppercase tracking-wider text-gray-900 group-hover:text-brand-pink flex items-center">
            <Truck className="w-3.5 h-3.5 mr-2 text-brand-maroon" /> Domestic & Worldwide Shipping
          </span>
          <ChevronDown
            className={`w-4 h-4 text-gray-500 transition-transform ${
              isOpen('shipping') ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isOpen('shipping') && (
          <div className="pb-5 pt-1 text-xs text-gray-600 space-y-2.5 animate-in fade-in-50 leading-relaxed">
            <p>
              • <strong>Free Domestic Delivery:</strong> Enjoy complimentary shipping on all orders across India (prepaid & COD).
            </p>
            <p>
              • <strong>Handcrafted Timelines:</strong> Since all our outfits are handcrafted with intricate embroideries, dispatch typically takes <strong>3–7 business days</strong> for ready to ship pieces and 10–15 days for made-to-order collections.
            </p>
            <p>
              • <strong>Worldwide Delivery:</strong> We ship to 220+ destinations internationally via DHL and Aramex.
            </p>
            <p>
              • <strong>Unboxing Video:</strong> Please record a quick unboxing video when your parcel arrives to facilitate rapid resolution in the unlikely event of transit damage.
            </p>
          </div>
        )}
      </div>

      {/* 4. Returns & Exchanges */}
      <div>
        <button
          type="button"
          onClick={() => toggleSection('returns')}
          className="w-full py-4 flex items-center justify-between text-left group"
        >
          <span className="font-heading text-xs font-bold uppercase tracking-wider text-gray-900 group-hover:text-brand-pink flex items-center">
            <ShieldAlert className="w-3.5 h-3.5 mr-2 text-brand-maroon" /> Easy Exchanges & Support
          </span>
          <ChevronDown
            className={`w-4 h-4 text-gray-500 transition-transform ${
              isOpen('returns') ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isOpen('returns') && (
          <div className="pb-5 pt-1 text-xs text-gray-600 space-y-2 animate-in fade-in-50 leading-relaxed">
            <p>
              • <strong>Exchange Window:</strong> Request size exchanges within 48 hours of delivery through our dedicated support dashboard at <em>support@nasmine.com</em>.
            </p>
            <p>
              • <strong>Sale Items:</strong> Items purchased during the Tyohar SOS Clearance Sale are subject to exchange for alternative sizes based on inventory availability.
            </p>
            <p>
              • Customer Support Hotline: <strong>+91 141 3550000</strong> (Monday – Saturday, 9:30 AM to 6:30 PM IST).
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
