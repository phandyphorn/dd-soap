import { CartItem, Language } from '../types';
import { X, Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';
import { TRANSLATIONS } from '../constants';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onCheckout: () => void;
  language: Language;
}

const CartDrawer = ({ isOpen, onClose, cart, onRemove, onUpdateQuantity, onCheckout, language }: CartDrawerProps) => {
  const t = TRANSLATIONS[language];
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">

          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-brand-100">
            <div className="flex items-center">
              <ShoppingBag className="w-5 h-5 mr-3 text-brand-700" />
              <h2 className="text-xl font-serif font-bold text-brand-900">{t.yourCart} ({cart.reduce((acc, i) => acc + i.quantity, 0)})</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 border border-gray-200 text-gray-500 transition-colors shadow-sm"
              title="Close Cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-brand-400">
                <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
                <p className="text-lg font-medium">{t.cartEmpty}</p>
                <p className="text-sm">{t.startAdding}</p>
                <button onClick={onClose} className="mt-6 text-brand-600 font-bold hover:underline">
                  {t.continueShopping}
                </button>
              </div>
            ) : (
              cart.map(item => {
                const displayName = language === 'km' && item.name_km ? item.name_km : item.name;
                const displayScent = language === 'km' && item.scent_km ? item.scent_km : item.scent;

                return (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-20 bg-brand-50 rounded-lg overflow-hidden flex-shrink-0 border border-brand-100">
                      <img src={item.image} alt={displayName} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-brand-900 line-clamp-1">{displayName}</h3>
                          <p className="font-serif font-bold text-brand-700">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <p className="text-xs text-brand-400">{displayScent}</p>
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center gap-3 bg-brand-50 rounded-lg p-1 border border-brand-100">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className={`w-7 h-7 flex items-center justify-center bg-white rounded-md border border-brand-200 text-brand-600 shadow-sm ${item.quantity <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:border-brand-300'}`}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-bold text-brand-800 w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="w-7 h-7 flex items-center justify-center bg-white rounded-md border border-brand-200 text-brand-600 hover:border-brand-300 shadow-sm"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemove(item.id)}
                          className="p-2 text-red-500 bg-red-50 hover:bg-red-100 rounded-lg border border-red-100 transition-colors shadow-sm"
                          title="Remove Item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-brand-100 bg-brand-50/50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-brand-600">{t.subtotal}</span>
                <span className="text-2xl font-serif font-bold text-brand-900">${total.toFixed(2)}</span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full bg-brand-800 text-brand-50 py-4 rounded-xl font-bold text-lg hover:bg-brand-700 transition-all flex items-center justify-center shadow-lg hover:shadow-xl active:scale-[0.98]"
              >
                {t.proceedCheckout} <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;