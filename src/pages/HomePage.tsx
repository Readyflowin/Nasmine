import React from 'react';
import { HeroSlider } from '../components/home/HeroSlider';
import { CategoryStories } from '../components/home/CategoryStories';
import { FlashSaleSection } from '../components/home/FlashSaleSection';
import { CuratedCollections } from '../components/home/CuratedCollections';
import { SpottedOnCelebs } from '../components/home/SpottedOnCelebs';
import { ValueProps } from '../components/home/ValueProps';

export const HomePage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* 1. Hero Promotional Carousel */}
      <HeroSlider />

      {/* 2. Circular Story Navigation Reels */}
      <CategoryStories />

      {/* 3. Limited Time Flash Sale (SOS Tyohar Sale) */}
      <FlashSaleSection />

      {/* 4. Curated Bestsellers & Fresh Arrivals */}
      <CuratedCollections />

      {/* 5. Spotted on Celebrities Lookbook */}
      <SpottedOnCelebs />

      {/* 6. Brand Heritage & Artisan Values */}
      <ValueProps />
    </div>
  );
};
