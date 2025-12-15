import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { TRANSLATIONS, INITIAL_PRODUCTS } from '../constants';
import { Language } from '../types';

interface HeroProps {
  onShopNow: () => void;
  language: Language;
}

const Hero = ({ onShopNow, language }: HeroProps) => {
  const t = TRANSLATIONS[language];
  const isKhmer = language === 'km';

  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    // Get list of names based on current language
    const productNames = INITIAL_PRODUCTS.map(p =>
      language === 'km' && p.name_km ? p.name_km : p.name
    );

    const i = loopNum % productNames.length;
    const fullText = productNames[i];

    const handleTyping = () => {
      setText(isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
      );

      // Typing Speed Logic
      setTypingSpeed(isDeleting ? 50 : 150);

      // Finished Typing
      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000); // Pause at end
      }
      // Finished Deleting
      else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500); // Pause before next word
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, language, typingSpeed]);

  return (
    <div className="relative bg-brand-800 text-brand-50 overflow-hidden rounded-3xl mb-12 shadow-xl min-h-[500px] flex items-center justify-center">
      <div className="absolute inset-0 opacity-20 bg-[url('https://img.sanishtech.com/u/bebf7a55c45eee8666b21a3ddda6b223.png?v=1200&width=600?grayscale')] bg-cover bg-center" />
      <div className="relative px-8 py-12 text-center max-w-4xl mx-auto z-10">
        <div className="flex justify-center mb-8">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-brand-700 text-brand-100 uppercase tracking-widest border border-brand-600">
            <Sparkles className="w-3 h-3 mr-2" /> {t.handsoapWithLove}
          </span>
        </div>

        {/* Static Prefix Title */}
        <h2 className={`text-brand-200 font-serif font-medium mb-4 tracking-wide ${isKhmer ? 'text-xl' : 'text-2xl'}`}>
          {t.heroTitle}
        </h2>

        {/* Dynamic Typewriter Text */}
        <div className="h-24 md:h-32 flex items-center justify-center mb-6">
          <h1 className={`${isKhmer ? 'text-4xl md:text-6xl leading-relaxed' : 'text-5xl md:text-7xl'} font-serif font-bold tracking-tight`}>
            {text}
            <span className="animate-pulse text-brand-300">|</span>
          </h1>
        </div>

        <p className={`${isKhmer ? 'text-base md:text-lg' : 'text-lg md:text-xl'} text-brand-200 mb-10 max-w-2xl mx-auto leading-relaxed`}>
          {t.heroSubtitle}
        </p>

        <button
          onClick={onShopNow}
          className="bg-brand-50 text-brand-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:scale-105 transition-all shadow-lg active:scale-95"
        >
          {t.shopNow}
        </button>
      </div>
    </div>
  );
};

export default Hero;