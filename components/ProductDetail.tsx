import React, { useState, useEffect } from 'react';
import { Product, Language } from '../types';
import { ArrowLeft, Plus, Droplets, Leaf } from 'lucide-react';
import { TRANSLATIONS } from '../constants';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
  language: Language;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onAddToCart, language }) => {
  const t = TRANSLATIONS[language];

  // Initialize with the product's main image
  const [activeImage, setActiveImage] = useState(product.image);
  
  // Zoom State
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  // Ensure we have a list of images. If product.images is missing, use product.image
  const galleryImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.image];

  // Reset active image when product changes
  useEffect(() => {
    setActiveImage(product.image);
  }, [product]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  // Helper to get localized text
  const getLocalizedText = (en: string, km?: string) => {
    return language === 'km' && km ? km : en;
  };

  const displayName = getLocalizedText(product.name, product.name_km);
  const displayDescription = getLocalizedText(product.description, product.description_km);
  const displayScent = getLocalizedText(product.scent, product.scent_km);
  const displayIngredients = getLocalizedText(product.ingredients, product.ingredients_km);

  return (
    <div className="animate-[fadeIn_0.3s_ease-out] pb-12">
      <button
        onClick={onBack}
        className="mb-6 flex items-center text-brand-600 hover:text-brand-900 transition-colors font-medium bg-brand-50 px-4 py-2 rounded-lg border border-brand-200 shadow-sm"
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> {t.backToCollection}
      </button>

      <div className="bg-white rounded-3xl shadow-xl border border-brand-100 overflow-hidden relative">
        <div className="grid md:grid-cols-12 gap-0 relative">
          
          {/* Gallery Section - Widened to 7 cols */}
          <div className="md:col-span-7 bg-white border-b md:border-b-0 md:border-r border-brand-100 p-4 md:p-8 flex flex-col-reverse md:flex-row gap-6 h-auto md:min-h-[600px]">
            {/* Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto md:w-24 flex-shrink-0 scrollbar-hide py-2 md:py-0 justify-center md:justify-start">
                {galleryImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(img)}
                    onMouseEnter={() => setActiveImage(img)}
                    className={`relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                      activeImage === img 
                        ? 'border-brand-600 shadow-md ring-2 ring-brand-100' 
                        : 'border-brand-100 hover:border-brand-300 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Image Container */}
            <div 
              className="flex-1 relative rounded-2xl overflow-hidden bg-brand-50 border border-brand-100 flex items-center justify-center h-[400px] md:h-auto group p-4 cursor-crosshair"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
               <img
                src={activeImage}
                alt={displayName}
                className="w-full h-full object-contain mix-blend-multiply relative z-10 pointer-events-none"
              />
              
              {/* Desktop Lens Effect (Visual Indicator) */}
              {isZoomed && (
                <div 
                  className="hidden md:block absolute w-32 h-32 border border-brand-400 bg-brand-900/10 backdrop-blur-[1px] pointer-events-none rounded-full shadow-lg z-20"
                  style={{
                    left: `${mousePos.x}%`,
                    top: `${mousePos.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              )}
            </div>
          </div>

          {/* Details Section - Narrowed to 5 cols */}
          <div className="md:col-span-5 relative bg-white h-full">
             
             {/* Zoom View Overlay - Covers the details section on hover (Desktop only) */}
             {isZoomed && (
               <div 
                  className="hidden md:block absolute inset-0 z-30 bg-white p-4 overflow-hidden border-l border-brand-200"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
                    backgroundSize: '200%', // 2x Zoom
                    backgroundRepeat: 'no-repeat'
                  }}
               >
                 <div className="absolute bottom-4 right-4 bg-brand-900/80 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                   Zoomed View
                 </div>
               </div>
             )}

             {/* Normal Detail Content */}
             <div className="p-8 md:p-12 flex flex-col justify-center h-full overflow-y-auto">
                <div className="mb-6 pb-6 border-b border-brand-100">
                    <h1 className="text-4xl font-serif font-bold text-brand-900 mb-2">{displayName}</h1>
                    <p className="text-3xl text-brand-700 font-serif font-bold">${product.price.toFixed(2)}</p>
                </div>

                <h3 className="font-bold text-brand-900 text-sm uppercase tracking-wide mb-2">{t.aboutSoap}</h3>
                <p className="text-brand-600 text-lg leading-relaxed mb-8">
                  {displayDescription}
                </p>

                <div className="space-y-4 mb-8 bg-brand-50/50 p-6 rounded-2xl border border-brand-100">
                  <div className="flex items-start">
                    <div className="bg-white p-2 rounded-lg mr-4 text-brand-700 shadow-sm border border-brand-100">
                        <Droplets className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-900 text-sm uppercase tracking-wide">{t.scentProfile}</h3>
                      <p className="text-brand-600">{displayScent}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-white p-2 rounded-lg mr-4 text-brand-700 shadow-sm border border-brand-100">
                        <Leaf className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-900 text-sm uppercase tracking-wide">{t.ingredients}</h3>
                      <p className="text-brand-600">{displayIngredients}</p>
                    </div>
                  </div>
                </div>

                <button
                    onClick={() => onAddToCart(product)}
                    className="w-full bg-brand-800 text-brand-50 py-4 rounded-xl font-bold text-lg hover:bg-brand-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center active:scale-[0.98]"
                  >
                    <Plus className="w-5 h-5 mr-3" /> {t.addToCart}
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;