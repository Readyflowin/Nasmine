import React from 'react';
import { Award, Feather, HeartHandshake, ShieldCheck } from 'lucide-react';

export const ValueProps: React.FC = () => {
  return (
    <section className="py-14 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center p-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-rose-50 text-brand-pink flex items-center justify-center mb-3">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-gray-900 mb-1">
              Jaipur Craftsmanship
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Every fold, gota piping, and block print is crafted by skilled indigenous artisans in Rajasthan.
            </p>
          </div>

          <div className="text-center p-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-rose-50 text-brand-pink flex items-center justify-center mb-3">
              <Feather className="w-6 h-6" />
            </div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-gray-900 mb-1">
              Pure Natural Fabrics
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Breathable Chanderi, mulmul cotton, Kota doria, and rich festive satin silks with zero synthetic itch.
            </p>
          </div>

          <div className="text-center p-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-rose-50 text-brand-pink flex items-center justify-center mb-3">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-gray-900 mb-1">
              Ethical & Sustainable
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Fair wages, safe working ateliers, eco-friendly azo-free dyes, and zero plastic packaging.
            </p>
          </div>

          <div className="text-center p-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-rose-50 text-brand-pink flex items-center justify-center mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-gray-900 mb-1">
              Authenticity Guaranteed
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              100% original designs manufactured in-house with multi-point quality inspections.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
