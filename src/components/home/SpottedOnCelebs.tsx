import React from 'react';
import { Star, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const CELEB_FEATURES = [
  {
    id: 1,
    name: 'Kriti Sanon',
    outfit: 'Vibha Magenta Chanderi Suit',
    image: 'https://cdn.shopify.com/s/files/1/2542/7564/files/1_a1af71eb-dc61-4eca-8a80-238607d0b5dd.jpg?v=1768904282',
    link: '/products/vibha-magenta-solid-chanderi-suit-set'
  },
  {
    id: 2,
    name: 'Madhuri Dixit',
    outfit: 'Mehka Crimson Satin Lehenga',
    image: 'https://cdn.shopify.com/s/files/1/2542/7564/files/1_7258e590-b662-4a57-a602-f8ca515ef7ef.jpg?v=1768911739',
    link: '/products/mehka-red-solid-satin-lehenga-set'
  },
  {
    id: 3,
    name: 'Sara Ali Khan',
    outfit: 'Padma Beige Gota Anarkali',
    image: 'https://cdn.shopify.com/s/files/1/2542/7564/files/1_4f82314f-c3c9-43c5-88cf-f72efa475255.jpg?v=1768903808',
    link: '/products/padma-beige-solid-chanderi-suit-set'
  },
  {
    id: 4,
    name: 'Bhumi Pednekar',
    outfit: 'Kunda Handpainted Chanderi Set',
    image: 'https://cdn.shopify.com/s/files/1/2542/7564/files/1_d0742484-1fec-43ee-8c1e-33f5fad89f8b.jpg?v=1768914389',
    link: '/products/kunda-peach-handpainted-chanderi-suit-set'
  }
];

export const SpottedOnCelebs: React.FC = () => {
  return (
    <section className="py-16 bg-brand-ivory border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-1 text-xs font-bold text-brand-maroon uppercase tracking-widest mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Celebrity Approved Fashion</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl text-gray-900 tracking-luxury uppercase font-normal">
            Spotted In Nasmine
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Bollywood favourites handcrafted with timeless Indian grace.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {CELEB_FEATURES.map((celeb) => (
            <Link
              key={celeb.id}
              to={celeb.link}
              className="group block relative rounded-sm overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={celeb.image}
                  alt={celeb.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-3 text-center">
                <span className="text-xs font-bold text-gray-900 group-hover:text-brand-pink transition-colors block">
                  {celeb.name}
                </span>
                <span className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                  wearing {celeb.outfit}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
