import React from 'react';
import { Product, Language } from '../types';
import { Plus, Info } from 'lucide-react';
import { TRANSLATIONS } from '../constants';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
  language: Language;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart, onProductClick, language }) => {
  const t = TRANSLATIONS[language];
  
  return (
    <div id="shop" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => {
        const displayName = language === 'km' && product.name_km ? product.name_km : product.name;
        const displayDesc = language === 'km' && product.description_km ? product.description_km : product.description;
        const displayScent = language === 'km' && product.scent_km ? product.scent_km : product.scent;

        return (
          <div 
            key={product.id} 
            onClick={() => onProductClick(product)}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-brand-orange-100 flex flex-col cursor-pointer"
          >
            <div className="relative aspect-square overflow-hidden bg-brand-orange-50">
              <img 
                src={product.image} 
                alt={displayName} 
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-black font-bold text-sm shadow-sm">
                ${product.price.toFixed(2)}
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-serif text-xl font-bold text-black transition-colors">{displayName}</h3>
              </div>
              <p className="text-black text-sm mb-4 line-clamp-2 flex-1">{displayDesc}</p>
              
              <div className="space-y-3 mt-auto">
                <div className="flex items-center text-xs text-black bg-brand-orange-50 p-2 rounded-lg">
                  <Info className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{t.scent}: {displayScent}</span>
                </div>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                  }}
                  className="w-full flex items-center justify-center bg-transparent text-black py-3 rounded-xl font-medium hover:bg-brand-orange-400 hover:text-black transition-all active:bg-brand-orange-900 active:text-black shadow-sm hover:shadow-md border-2 border-brand-orange-400"
                >
                  <Plus className="w-5 h-5 mr-2" /> {t.addToCart}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;