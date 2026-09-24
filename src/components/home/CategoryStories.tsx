import React from 'react';
import { Link } from 'react-router-dom';
import { STORY_CIRCLES } from '../../data/categories';

export const CategoryStories: React.FC = () => {
  return (
    <section className="py-8 bg-white border-b border-gray-100 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-w-0">
        <div className="flex items-center justify-between sm:justify-center overflow-x-auto no-scrollbar space-x-6 sm:space-x-10 py-2 w-full">
          {STORY_CIRCLES.map((story) => (
            <Link
              key={story.id}
              to={story.href}
              className="flex flex-col items-center flex-shrink-0 group"
            >
              <div
                className={`relative w-18 h-18 sm:w-20 sm:h-20 rounded-full p-0.5 transition-transform duration-300 group-hover:scale-105 ${
                  story.isSale
                    ? 'bg-gradient-to-tr from-red-600 via-brand-pink to-amber-400'
                    : 'bg-gradient-to-tr from-amber-200 via-rose-300 to-amber-100'
                }`}
              >
                <div className="w-full h-full rounded-full p-0.5 bg-white">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                {story.isSale && (
                  <span className="absolute -bottom-1 -right-1 bg-red-600 text-white text-[8px] font-black uppercase px-1.5 py-0.2 rounded-full tracking-tighter shadow">
                    Sale
                  </span>
                )}
              </div>
              <span className="mt-2 text-xs font-medium text-gray-800 tracking-wide group-hover:text-brand-pink transition-colors">
                {story.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
