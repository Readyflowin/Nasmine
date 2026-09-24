import React from 'react';

interface BrandLogoProps {
  variant?: 'header' | 'footer' | 'mobile' | 'icon-only';
  className?: string;
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'header',
  className = '',
  showSubtitle = true,
}) => {
  const isDark = variant === 'footer';
  const isMobile = variant === 'mobile';
  const isIconOnly = variant === 'icon-only';

  const textColor = isDark ? 'text-white' : 'text-[#1a1a1a]';
  const subtextColor = isDark ? 'text-pink-300' : 'text-[#8b263e]';
  const iconColor = isDark ? '#f472b6' : '#8b263e';
  const goldColor = '#c5a059';

  return (
    <div className={`inline-flex flex-col items-center justify-center ${className}`}>
      {/* Brand Icon + Name Container */}
      <div className="flex items-center space-x-2.5">
        {/* Nasmine Floral Emblem SVG */}
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={
            isIconOnly
              ? 'w-10 h-10 flex-shrink-0'
              : isMobile
              ? 'w-5 h-5 flex-shrink-0'
              : 'w-5 h-5 sm:w-7 sm:h-7 lg:w-8 lg:h-8 flex-shrink-0'
          }
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={`nasmineGrad-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={goldColor} />
              <stop offset="50%" stopColor={iconColor} />
              <stop offset="100%" stopColor={goldColor} />
            </linearGradient>
          </defs>

          {/* Outer Dashed Orbit */}
          <circle
            cx="24"
            cy="24"
            r="22"
            stroke={`url(#nasmineGrad-${variant})`}
            strokeWidth="0.8"
            strokeDasharray="2 3"
            opacity="0.55"
          />

          {/* Compass / Cardinal Jasmine Petals */}
          {/* Top Petal */}
          <path
            d="M24 6 C21 13, 19 18, 24 24 C29 18, 27 13, 24 6 Z"
            fill={`url(#nasmineGrad-${variant})`}
            opacity="0.95"
          />
          {/* Bottom Petal */}
          <path
            d="M24 42 C21 35, 19 30, 24 24 C29 30, 27 35, 24 42 Z"
            fill={`url(#nasmineGrad-${variant})`}
            opacity="0.95"
          />
          {/* Left Petal */}
          <path
            d="M6 24 C13 21, 18 19, 24 24 C18 29, 13 27, 6 24 Z"
            fill={`url(#nasmineGrad-${variant})`}
            opacity="0.95"
          />
          {/* Right Petal */}
          <path
            d="M42 24 C35 21, 30 19, 24 24 C30 29, 35 27, 42 24 Z"
            fill={`url(#nasmineGrad-${variant})`}
            opacity="0.95"
          />

          {/* Diagonal Secondary Jasmine Petals */}
          <path
            d="M11 11 C17 16, 20 19, 24 24 C19 20, 16 17, 11 11 Z"
            fill={goldColor}
            opacity="0.85"
          />
          <path
            d="M37 11 C31 16, 28 19, 24 24 C29 20, 32 17, 37 11 Z"
            fill={goldColor}
            opacity="0.85"
          />
          <path
            d="M11 37 C17 32, 20 29, 24 24 C19 28, 16 31, 11 37 Z"
            fill={goldColor}
            opacity="0.85"
          />
          <path
            d="M37 37 C31 32, 28 29, 24 24 C29 28, 32 31, 37 37 Z"
            fill={goldColor}
            opacity="0.85"
          />

          {/* Central Floral Core & Jewel */}
          <circle cx="24" cy="24" r="3.5" fill="#ffffff" stroke={iconColor} strokeWidth="1.2" />
          <polygon points="24,21.5 26.5,24 24,26.5 21.5,24" fill={goldColor} />
        </svg>

        {/* Brand Name Typography */}
        {!isIconOnly && (
          <span
            className={`font-heading leading-none ${
              isMobile
                ? 'text-lg sm:text-xl tracking-[0.18em]'
                : isDark
                ? 'text-xl sm:text-2xl lg:text-3xl tracking-[0.22em] sm:tracking-[0.28em]'
                : 'text-lg sm:text-2xl lg:text-[2rem] tracking-[0.16em] sm:tracking-[0.28em]'
            } font-normal uppercase ${textColor} group-hover:opacity-90 transition-opacity whitespace-nowrap`}
          >
            NASMINE
          </span>
        )}
      </div>

      {/* Subtitle / Category Focus */}
      {!isIconOnly && showSubtitle && (
        <div className="flex items-center space-x-1 sm:space-x-1.5 mt-0.5 sm:mt-1.5">
          <span className="w-2 sm:w-3 h-[1px] bg-gradient-to-r from-transparent to-[#c5a059]" />
          <span
            className={`block font-body ${
              isMobile ? 'text-[7px] tracking-[0.2em]' : 'text-[7.5px] sm:text-[9px] tracking-[0.22em] sm:tracking-[0.36em]'
            } ${subtextColor} uppercase font-medium whitespace-nowrap`}
          >
            FEMALE KURTI&apos;S
          </span>
          <span className="w-2 sm:w-3 h-[1px] bg-gradient-to-l from-transparent to-[#c5a059]" />
        </div>
      )}
    </div>
  );
};
