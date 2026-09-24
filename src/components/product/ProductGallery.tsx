import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, title }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const prev = () => setSelectedIdx((prev) => (prev - 1 + images.length) % images.length);
  const next = () => setSelectedIdx((prev) => (prev + 1) % images.length);

  return (
    <>
      <div className="flex flex-col-reverse lg:flex-row gap-4 w-full min-w-0">
        {/* Thumbnails (Vertical on desktop) */}
        <div className="flex lg:flex-col overflow-x-auto lg:overflow-y-auto no-scrollbar gap-2.5 sm:gap-3 w-full lg:w-20 flex-shrink-0 py-1 lg:max-h-[calc(100vh-130px)]">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIdx(idx)}
              className={`relative aspect-[3/4] w-14 sm:w-16 lg:w-full rounded overflow-hidden flex-shrink-0 border-2 transition-all ${
                selectedIdx === idx
                  ? 'border-brand-pink shadow-sm scale-102'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`${title} thumbnail ${idx + 1}`}
                className="w-full h-full object-cover object-top"
              />
            </button>
          ))}
        </div>

        {/* Main Stage Image */}
        <div className="relative flex-1 aspect-[3/4] bg-gray-50 rounded-sm overflow-hidden group w-full min-w-0 lg:max-h-[calc(100vh-130px)] flex items-center justify-center">
          <img
            src={images[selectedIdx]}
            alt={`${title} main view`}
            className="w-full h-full object-cover object-top transition-transform duration-500 cursor-zoom-in"
            onClick={() => setIsLightboxOpen(true)}
          />

          {/* Lightbox Trigger Icon */}
          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white text-gray-700 rounded-full shadow-md backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
            title="Expand image"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          {/* Mobile Navigation Arrows */}
          <button
            type="button"
            onClick={prev}
            className="lg:hidden absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/70 text-black rounded-full"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={next}
            className="lg:hidden absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/70 text-black rounded-full"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Image index counter badge */}
          <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded font-mono">
            {selectedIdx + 1} / {images.length}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 p-2 text-white hover:text-gray-300"
          >
            <X className="w-8 h-8" />
          </button>

          <img
            src={images[selectedIdx]}
            alt={title}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded"
          />

          <button
            type="button"
            onClick={prev}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/40 text-white rounded-full"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/40 text-white rounded-full"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </>
  );
};
