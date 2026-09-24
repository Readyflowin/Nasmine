import React, { useState, useEffect } from 'react';

const MESSAGES = [
  '✨ FREE SHIPPING ACROSS INDIA ON ALL PREPAID & COD ORDERS ✨',
  '🔥 TYOHAR SALE IS LIVE: UP TO 60% OFF | USE CODE: UTSAV10 FOR EXTRA 10% OFF 🔥',
  '🌏 WORLDWIDE SHIPPING TO OVER 220+ COUNTRIES 🌏',
  '🌸 HANDCRAFTED LUXURY FEMALE KURTIS & ETHNIC WEAR 🌸'
];

export const AnnouncementBar: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % MESSAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#7d1a29] text-white text-[11px] sm:text-xs tracking-wider uppercase font-medium py-2 px-3 sm:px-4 transition-all w-full overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between w-full min-w-0">
        <div className="hidden md:flex items-center space-x-4 text-[11px] opacity-90 flex-shrink-0">
          <span>CURRENCY: <strong>INR (₹)</strong></span>
          <span>|</span>
          <a href="tel:+911413550000" className="hover:underline">HELP: +91 141 3550000</a>
        </div>

        <div className="flex-1 min-w-0 text-center font-normal tracking-luxury transition-opacity duration-500 overflow-hidden whitespace-nowrap text-ellipsis px-1 sm:px-2">
          {MESSAGES[currentIdx]}
        </div>

        <div className="hidden md:flex items-center space-x-4 text-[11px] opacity-90 flex-shrink-0">
          <a href="/pages/track-order" className="hover:underline">TRACK ORDER</a>
          <span>|</span>
          <a href="/pages/contact-us" className="hover:underline">STORES</a>
        </div>
      </div>
    </div>
  );
};
