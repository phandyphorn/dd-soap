import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { ArrowLeft, Plus, Droplets, Leaf } from 'lucide-react';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onAddToCart }) => {
  // Initialize with the product's main image
  const [activeImage, setActiveImage] = useState(product.image);
  
  // Ensure we have a list of images. If product.images is missing, use product.image
  const galleryImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.image];

  // Reset active image when product changes
  useEffect(() => {
    setActiveImage(product.image);
  }, [product]);

  return (
    <div className="animate-[fadeIn_0.3s_ease-out] pb-12">
      <button
        onClick={onBack}
        className="mb-6 flex items-center text-brand-600 hover:text-brand-900 transition-colors font-medium bg-brand-50 px-4 py-2 rounded-lg border border-brand-200 shadow-sm"
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> Back to Collection
      </button>

      <div className="bg-white rounded-3xl shadow-xl border border-brand-100 overflow-hidden">
        <div className="grid md:grid-cols-12 gap-0">
          
          {/* Gallery Section - Widened to 7 cols */}
          <div className="md:col-span-7 bg-white border-b md:border-b-0 md:border-r border-brand-100 p-4 md:p-8 flex flex-col-reverse md:flex-row gap-6 h-auto md:min-h-[600px]">
            {/* Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto md:w-24 flex-shrink-0 scrollbar-hide py-2 md:py-0 justify-center md:justify-start">
                {galleryImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(img)}
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

            {/* Main Image */}
            <div className="flex-1 relative rounded-2xl overflow-hidden bg-brand-50 border border-brand-100 flex items-center justify-center h-[400px] md:h-auto group p-4">
               <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-contain mix-blend-multiply"
              />
            </div>
          </div>

          {/* Details Section - Narrowed to 5 cols */}
          <div className="md:col-span-5 p-8 md:p-12 flex flex-col justify-center h-full overflow-y-auto bg-white">
             <div className="mb-6 pb-6 border-b border-brand-100">
                <h1 className="text-4xl font-serif font-bold text-brand-900 mb-2">{product.name}</h1>
                <p className="text-3xl text-brand-700 font-serif font-bold">${product.price.toFixed(2)}</p>
             </div>

             <h3 className="font-bold text-brand-900 text-sm uppercase tracking-wide mb-2">About this soap</h3>
             <p className="text-brand-600 text-lg leading-relaxed mb-8">
               {product.description}
             </p>

             <div className="space-y-4 mb-8 bg-brand-50/50 p-6 rounded-2xl border border-brand-100">
               <div className="flex items-start">
                 <div className="bg-white p-2 rounded-lg mr-4 text-brand-700 shadow-sm border border-brand-100">
                    <Droplets className="w-5 h-5" />
                 </div>
                 <div>
                   <h3 className="font-bold text-brand-900 text-sm uppercase tracking-wide">Scent Profile</h3>
                   <p className="text-brand-600">{product.scent}</p>
                 </div>
               </div>

               <div className="flex items-start">
                 <div className="bg-white p-2 rounded-lg mr-4 text-brand-700 shadow-sm border border-brand-100">
                    <Leaf className="w-5 h-5" />
                 </div>
                 <div>
                   <h3 className="font-bold text-brand-900 text-sm uppercase tracking-wide">Ingredients</h3>
                   <p className="text-brand-600">{product.ingredients}</p>
                 </div>
               </div>
             </div>

             <button
                onClick={() => onAddToCart(product)}
                className="w-full bg-brand-800 text-brand-50 py-4 rounded-xl font-bold text-lg hover:bg-brand-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center active:scale-[0.98]"
              >
                <Plus className="w-5 h-5 mr-3" /> Add to Cart
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;