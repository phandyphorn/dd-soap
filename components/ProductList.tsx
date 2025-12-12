import React from 'react';
import { Product } from '../types';
import { Plus, Info } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart, onProductClick }) => {
  return (
    <div id="shop" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <div 
          key={product.id} 
          onClick={() => onProductClick(product)}
          className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-brand-100 flex flex-col cursor-pointer"
        >
          <div className="relative aspect-square overflow-hidden bg-brand-50">
            <img 
              src={product.image} 
              alt={product.name} 
              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-brand-900 font-bold text-sm shadow-sm">
              ${product.price.toFixed(2)}
            </div>
          </div>
          
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-serif text-xl font-bold text-brand-900 group-hover:text-brand-700 transition-colors">{product.name}</h3>
            </div>
            <p className="text-brand-600 text-sm mb-4 line-clamp-2 flex-1">{product.description}</p>
            
            <div className="space-y-3 mt-auto">
              <div className="flex items-center text-xs text-brand-500 bg-brand-50 p-2 rounded-lg">
                <Info className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate">Scent: {product.scent}</span>
              </div>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(product);
                }}
                className="w-full flex items-center justify-center bg-brand-800 text-brand-50 py-3 rounded-xl font-medium hover:bg-brand-700 transition-colors active:bg-brand-900 shadow-sm hover:shadow-md"
              >
                <Plus className="w-5 h-5 mr-2" /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;