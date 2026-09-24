import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: number;
  desktopImage: string;
  mobileImage: string;
  tagline: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  align: 'left' | 'center' | 'right';
}

const SLIDES: Slide[] = [
  {
    id: 1,
    desktopImage: 'https://cdn.shopify.com/s/files/1/2542/7564/files/1_a1af71eb-dc61-4eca-8a80-238607d0b5dd.jpg?v=1768904282',
    mobileImage: 'https://cdn.shopify.com/s/files/1/2542/7564/files/1_a1af71eb-dc61-4eca-8a80-238607d0b5dd.jpg?v=1768904282',
    tagline: 'THE GRAND FESTIVE EDIT',
    title: 'TYOHAR SALE',
    subtitle: 'FLAT 50% - 60% OFF ON LUXURY CHANDERI & LEHENGAS',
    ctaText: 'SHOP THE SALE',
    ctaLink: '/collections/sos-sale',
    align: 'left'
  },
  {
    id: 2,
    desktopImage: 'https://cdn.shopify.com/s/files/1/2542/7564/files/1_7258e590-b662-4a57-a602-f8ca515ef7ef.jpg?v=1768911739',
    mobileImage: 'https://cdn.shopify.com/s/files/1/2542/7564/files/1_7258e590-b662-4a57-a602-f8ca515ef7ef.jpg?v=1768911739',
    tagline: 'HANDCRAFTED AT NASMINE',
    title: 'ROYAL LEHENGAS',
    subtitle: 'Voluminous 8-meter kalis with artisanal zardozi embroidery',
    ctaText: 'EXPLORE LEHENGAS',
    ctaLink: '/collections/lehenga-set',
    align: 'center'
  },
  {
    id: 3,
    desktopImage: 'https://cdn.shopify.com/s/files/1/2542/7564/files/Aachho_July358084.jpg?v=1787643326',
    mobileImage: 'https://cdn.shopify.com/s/files/1/2542/7564/files/Aachho_July358084.jpg?v=1787643326',
    tagline: 'EXCLUSIVE FEMALE KURTI EDIT',
    title: 'CHANDERI & DORIA KURTIS',
    subtitle: 'Artisanal embroideries • Breathable Cotton Mulmul Lining',
    ctaText: 'SHOP KURTA SETS',
    ctaLink: '/collections/kurta-set',
    align: 'right'
  }
];

export const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);

  const slide = SLIDES[currentSlide];

  return (
    <div className="relative w-full h-[65vh] sm:h-[75vh] lg:h-[85vh] overflow-hidden bg-gray-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <picture>
          <source media="(max-width: 640px)" srcSet={slide.mobileImage} />
          <img
            src={slide.desktopImage}
            alt={slide.title}
            className="w-full h-full object-cover object-center transition-all duration-1000 scale-100"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
      </div>

      {/* Content Container */}
      <div className="relative h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex items-center">
        <div
          className={`w-full max-w-2xl text-white ${
            slide.align === 'center'
              ? 'mx-auto text-center'
              : slide.align === 'right'
              ? 'ml-auto text-right'
              : 'text-left'
          }`}
        >
          <span className="inline-block text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase mb-2 text-rose-200">
            {slide.tagline}
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-normal tracking-luxury uppercase text-white mb-3 leading-tight drop-shadow-md">
            {slide.title}
          </h1>
          <p className="text-xs sm:text-base font-light tracking-wide text-gray-200 mb-6 max-w-lg leading-relaxed drop-shadow">
            {slide.subtitle}
          </p>
          <div>
            <Link
              to={slide.ctaLink}
              className="btn-shine inline-block px-8 py-3.5 bg-brand-pink hover:bg-brand-pink-hover text-white text-xs uppercase tracking-luxury font-bold rounded-sm shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              {slide.ctaText}
            </Link>
          </div>
        </div>
      </div>

      {/* Arrow Controls */}
      <button
        type="button"
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-all focus:outline-none hidden sm:block"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-all focus:outline-none hidden sm:block"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-5 inset-x-0 flex justify-center space-x-2">
        {SLIDES.map((s, idx) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentSlide ? 'w-8 bg-brand-pink' : 'w-2 bg-white/50'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
