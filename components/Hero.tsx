import React from 'react';
import { Sparkles } from 'lucide-react';

interface HeroProps {
  onShopNow: () => void;
}

const Hero = ({ onShopNow }: HeroProps) => {
  return (
    <div className="relative bg-brand-800 text-brand-50 overflow-hidden rounded-3xl mb-12 shadow-xl">
      <div className="absolute inset-0 opacity-20 bg-[url('https://i.pinimg.com/736x/3b/0a/5f/3b0a5ff7aa174062bc5f7912b7eb1f5f.jpg?v=1200&width=600?grayscale')] bg-cover bg-center" />
      <div className="relative px-8 py-24 md:py-32 text-center max-w-4xl mx-auto">
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-brand-700 text-brand-100 uppercase tracking-widest">
            <Sparkles className="w-3 h-3 mr-2" /> Handsoap with Love
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 tracking-tight">
          Pure Ingredients.<br />Natural Radiance.
        </h1>
        <p className="text-lg md:text-xl text-brand-200 mb-10 max-w-2xl mx-auto leading-relaxed">
          Discover our collection of small-batch, artisanal soaps made from the finest organic oils and botanicals.
          Luxurious lather, naturally.
        </p>
        <button
          onClick={onShopNow}
          className="bg-brand-50 text-brand-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:scale-105 transition-all shadow-lg active:scale-95"
        >
          Soap Collection
        </button>
      </div>
    </div>
  );
};

export default Hero;