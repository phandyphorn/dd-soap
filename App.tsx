import React, { useState, useEffect } from 'react';
import { Product, CartItem, ViewState, CustomerDetails, Language } from './types';
import { INITIAL_PRODUCTS, TELEGRAM_USERNAME, ADMIN_PASSWORD, TRANSLATIONS } from './constants';
import ProductList from './components/ProductList';
import CartDrawer from './components/CartDrawer';
import AdminPanel from './components/AdminPanel';
import ProductDetail from './components/ProductDetail';
import Hero from './components/Hero';
import { ShoppingBag, Settings, LogOut, Send, MapPin, Phone, User, Home, Lock, Globe } from 'lucide-react';

// --- Sub-components moved outside App to prevent re-render focus loss ---

interface CheckoutViewProps {
  cart: CartItem[];
  t: typeof TRANSLATIONS['en'];
  customerDetails: CustomerDetails;
  setCustomerDetails: React.Dispatch<React.SetStateAction<CustomerDetails>>;
  handleTelegramCheckout: (e: React.FormEvent) => void;
  setView: (view: ViewState) => void;
}

const CheckoutView: React.FC<CheckoutViewProps> = ({
  cart,
  t,
  customerDetails,
  setCustomerDetails,
  handleTelegramCheckout,
  setView
}) => (
  <div className="max-w-2xl mx-auto p-8 bg-white rounded-3xl shadow-xl border border-brand-100 my-8">
    <div className="flex items-center mb-8 pb-4 border-b border-brand-100">
      <button
        onClick={() => setView('HOME')}
        className="mr-4 p-3 bg-brand-50 text-brand-900 rounded-full hover:bg-brand-100 transition-colors border border-brand-200 shadow-sm"
        title="Return Home"
      >
        <Home className="w-5 h-5" />
      </button>
      <h2 className="text-3xl font-serif font-bold text-brand-900">{t.completeOrder}</h2>
    </div>

    <div className="mb-8 bg-brand-50 p-6 rounded-2xl">
      <h3 className="font-bold text-brand-800 mb-4">{t.orderSummary}</h3>
      {cart.map(item => (
        <div key={item.id} className="flex justify-between text-sm mb-2 text-brand-700">
          <span>{item.name} x {item.quantity}</span>
          <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      ))}
      <div className="mt-4 pt-4 border-t border-brand-200 flex justify-between font-bold text-lg text-brand-900">
        <span>{t.total}</span>
        <span>${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</span>
      </div>
    </div>

    <form onSubmit={handleTelegramCheckout} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-brand-700 mb-2 flex items-center">
          <User className="w-4 h-4 mr-2" /> {t.fullName}
        </label>
        <input
          required
          className="w-full p-3 border border-brand-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none bg-brand-50/30"
          value={customerDetails.name}
          onChange={e => setCustomerDetails({ ...customerDetails, name: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-brand-700 mb-2 flex items-center">
          <Phone className="w-4 h-4 mr-2" /> {t.phone}
        </label>
        <input
          required
          type="tel"
          className="w-full p-3 border border-brand-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none bg-brand-50/30"
          value={customerDetails.phone}
          onChange={e => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-brand-700 mb-2 flex items-center">
          <MapPin className="w-4 h-4 mr-2" /> {t.address}
        </label>
        <textarea
          required
          rows={3}
          className="w-full p-3 border border-brand-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none bg-brand-50/30"
          value={customerDetails.address}
          onChange={e => setCustomerDetails({ ...customerDetails, address: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-brand-700 mb-2">{t.notes}</label>
        <textarea
          rows={2}
          className="w-full p-3 border border-brand-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none bg-brand-50/30"
          value={customerDetails.note}
          onChange={e => setCustomerDetails({ ...customerDetails, note: e.target.value })}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#0088cc] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#0077b5] transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
      >
        <Send className="w-5 h-5 mr-3" /> {t.sendTelegram}
      </button>
      <p className="text-center text-xs text-brand-400 mt-4">
        {t.redirectNote}
      </p>
    </form>
  </div>
);

interface LoginViewProps {
  t: typeof TRANSLATIONS['en'];
  passwordInput: string;
  setPasswordInput: (val: string) => void;
  handleLogin: (e: React.FormEvent) => void;
  loginError: boolean;
  setView: (view: ViewState) => void;
}

const LoginView: React.FC<LoginViewProps> = ({
  t,
  passwordInput,
  setPasswordInput,
  handleLogin,
  loginError,
  setView
}) => (
  <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-3xl shadow-xl border border-brand-100 text-center animate-[slideIn_0.3s_ease-out]">
    <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <Lock className="w-8 h-8 text-brand-600" />
    </div>
    <h2 className="text-2xl font-serif font-bold text-brand-900 mb-2">{t.ownerAccess}</h2>
    <p className="text-brand-500 mb-8">{t.enterPassword}</p>

    <form onSubmit={handleLogin}>
      <input
        type="password"
        autoFocus
        value={passwordInput}
        onChange={(e) => setPasswordInput(e.target.value)}
        className="w-full p-4 border border-brand-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none mb-4 text-center text-lg tracking-widest bg-brand-50"
        placeholder="••••"
      />
      {loginError && <p className="text-red-500 text-sm mb-4">Incorrect password. Please try again.</p>}
      <button
        type="submit"
        className="w-full bg-brand-800 text-brand-50 py-4 rounded-xl font-bold text-lg hover:bg-brand-700 transition-all shadow-lg"
      >
        {t.unlock}
      </button>
    </form>
    <button onClick={() => setView('HOME')} className="mt-6 text-brand-400 hover:text-brand-600 text-sm font-medium">
      {t.returnStore}
    </button>
  </div>
);


const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [view, setView] = useState<ViewState>('HOME');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [language, setLanguage] = useState<Language>('en');

  // Auth State
  const [isAdmin, setIsAdmin] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Checkout Form State
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: '',
    address: '',
    phone: '',
    note: ''
  });

  const t = TRANSLATIONS[language];

  // Load Initial Data
  useEffect(() => {
    const savedProducts = localStorage.getItem('suds_products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts(INITIAL_PRODUCTS);
      localStorage.setItem('suds_products', JSON.stringify(INITIAL_PRODUCTS));
    }
  }, []);

  // Save on change
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('suds_products', JSON.stringify(products));
    }
  }, [products]);

  // Cart Logic
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) return { ...item, quantity: Math.max(1, item.quantity + delta) };
      return item;
    }));
  };

  // Navigation Logic
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setView('PRODUCT_DETAIL');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // CRUD Logic
  const handleAddProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm("Are you sure you want to delete this soap?")) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  // Login Logic
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setView('ADMIN');
      setLoginError(false);
      setPasswordInput('');
    } else {
      setLoginError(true);
    }
  };

  // Language Toggle
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'km' : 'en');
  };

  // Telegram Checkout
  const handleTelegramCheckout = (e: React.FormEvent) => {
    e.preventDefault();

    const itemsList = cart.map(item => `- ${item.name} x ${item.quantity} ($${(item.price * item.quantity).toFixed(2)})`).join('\n');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);

    // Build the message text
    const text = `🧼 *New Soap Order!* 🧼\n\n` +
      `*Items:*\n${itemsList}\n\n` +
      `*Total:* $${total}\n\n` +
      `*Customer Details:*\n` +
      `👤 Name: ${customerDetails.name}\n` +
      `📞 Phone: ${customerDetails.phone}\n` +
      `📍 Address: ${customerDetails.address}\n` +
      `📝 Note: ${customerDetails.note || 'None'}`;

    // Properly encode the message for URL
    const encodedMessage = encodeURIComponent(text);
    const url = `https://t.me/${TELEGRAM_USERNAME}?text=${encodedMessage}`;
    
    window.open(url, '_blank');
    setCart([]);
    setView('HOME');
    setCustomerDetails({ name: '', address: '', phone: '', note: '' });
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-brand-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setView('HOME')}
          >
            <img
              src="https://img.sanishtech.com/u/f59425de27ba0f4147e6ce562b91b87e.png?v=400&w=400"
              alt={t.brandName}
              className="h-12 md:h-16 w-auto object-contain"
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center px-3 py-2 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-full text-sm font-bold text-brand-800 transition-colors shadow-sm"
              title="Switch Language"
            >
              <Globe className="w-4 h-4 mr-1.5" />
              {language === 'en' ? 'EN' : 'ខ្មែរ'}
            </button>

            {view === 'HOME' && (
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-3 bg-brand-50 text-brand-800 rounded-full hover:bg-brand-100 transition-all shadow-sm border border-brand-200"
                title="View Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-sm ring-2 ring-white">
                    {cart.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                )}
              </button>
            )}

            <button
              onClick={() => {
                if (view === 'ADMIN' || view === 'ADMIN_LOGIN') {
                  setView('HOME');
                  setIsAdmin(false); // Secure logout
                } else {
                  setView(isAdmin ? 'ADMIN' : 'ADMIN_LOGIN');
                }
              }}
              className={`p-3 rounded-full transition-all shadow-sm border ${view === 'ADMIN' || view === 'ADMIN_LOGIN'
                ? 'bg-brand-800 text-brand-50 border-brand-800 hover:bg-brand-700'
                : 'bg-white text-brand-600 border-brand-200 hover:bg-brand-50'}`}
              title={view === 'ADMIN' ? 'Logout Admin' : 'Admin Login'}
            >
              {view === 'ADMIN' || view === 'ADMIN_LOGIN' ? <LogOut className="w-5 h-5" /> : <Settings className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {view === 'HOME' && (
          <>
            <Hero onShopNow={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })} language={language} />
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-serif font-bold text-brand-900 mb-4">{t.ourCollection}</h2>
              <div className="w-24 h-1 bg-brand-300 mx-auto rounded-full"></div>
            </div>
            <ProductList
              products={products}
              onAddToCart={addToCart}
              onProductClick={handleProductClick}
              language={language}
            />
          </>
        )}

        {view === 'PRODUCT_DETAIL' && selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onBack={() => setView('HOME')}
            onAddToCart={addToCart}
            language={language}
          />
        )}

        {view === 'ADMIN' && (
          <AdminPanel
            products={products}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            onClose={() => {
              setView('HOME');
              setIsAdmin(false);
            }}
          />
        )}

        {view === 'ADMIN_LOGIN' && (
          <LoginView
            t={t}
            passwordInput={passwordInput}
            setPasswordInput={setPasswordInput}
            handleLogin={handleLogin}
            loginError={loginError}
            setView={setView}
          />
        )}

        {view === 'CHECKOUT' && (
          <CheckoutView
            cart={cart}
            t={t}
            customerDetails={customerDetails}
            setCustomerDetails={setCustomerDetails}
            handleTelegramCheckout={handleTelegramCheckout}
            setView={setView}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-brand-900 text-brand-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-serif font-bold text-xl mb-4">{t.brandName}</h3>
            <p className="text-sm leading-relaxed opacity-80">
              {t.handcrafted}
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">{t.contact}</h4>
            <p className="text-sm opacity-80">phornphandy20@gmail.com</p>
            <p className="text-sm opacity-80">0979856605</p>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onCheckout={() => {
          setIsCartOpen(false);
          setView('CHECKOUT');
        }}
        language={language}
      />
    </div>
  );
};

export default App;