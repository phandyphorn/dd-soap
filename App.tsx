import React, { useState, useEffect } from "react";
import {
  Product,
  CartItem,
  ViewState,
  CustomerDetails,
  Language,
} from "./types";
import {
  INITIAL_PRODUCTS,
  TELEGRAM_USERNAME,
  TELEGRAM_BOT_USERNAME,
  ADMIN_PASSWORD,
  TRANSLATIONS,
} from "./constants";
import ProductList from "./components/ProductList";
import CartDrawer from "./components/CartDrawer";
import AdminPanel from "./components/AdminPanel";
import ProductDetail from "./components/ProductDetail";
import Hero from "./components/Hero";
import {
  ShoppingBag,
  Settings,
  LogOut,
  Send,
  MapPin,
  Phone,
  User,
  Home,
  Lock,
  Globe,
  MessageCircle,
} from "lucide-react";

// --- Sub-components moved outside App to prevent re-render focus loss ---

interface CheckoutViewProps {
  cart: CartItem[];
  t: (typeof TRANSLATIONS)["en"];
  customerDetails: CustomerDetails;
  setCustomerDetails: React.Dispatch<React.SetStateAction<CustomerDetails>>;
  handleTelegramCheckout: (e: React.FormEvent) => void;
  setView: (view: ViewState) => void;
  isSubmitting: boolean;
  orderStatus: "IDLE" | "SUCCESS" | "ERROR";
}

const CheckoutView: React.FC<CheckoutViewProps> = ({
  cart,
  t,
  customerDetails,
  setCustomerDetails,
  handleTelegramCheckout,
  setView,
  isSubmitting,
  orderStatus,
}) => (
  <div className="max-w-2xl mx-auto p-8 bg-white rounded-3xl shadow-xl border border-brand-orange-100 my-8">
    <div className="flex items-center mb-8 pb-4 border-b border-brand-orange-100">
      <button
        onClick={() => setView("HOME")}
        className="mr-4 p-3 bg-transparent text-black rounded-full hover:bg-brand-orange-900 hover:text-black transition-all border-2 border-brand-orange-900 shadow-sm"
        title="Return Home"
      >
        <Home className="w-5 h-5" />
      </button>
      <h2 className="text-3xl font-serif font-bold text-black">
        {t.completeOrder}
      </h2>
    </div>

    <div className="mb-8 bg-brand-orange-50 p-6 rounded-2xl">
      <h3 className="font-bold text-black mb-4">{t.orderSummary}</h3>
      {cart.map((item) => (
        <div
          key={item.id}
          className="flex justify-between text-sm mb-2 text-black"
        >
          <span>
            {item.name} x {item.quantity}
          </span>
          <span className="font-medium">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      ))}
      <div className="mt-4 pt-4 border-t border-brand-orange-200 flex justify-between font-bold text-lg text-black">
        <span>{t.total}</span>
        <span>
          $
          {cart
            .reduce((sum, item) => sum + item.price * item.quantity, 0)
            .toFixed(2)}
        </span>
      </div>
    </div>

    <form onSubmit={handleTelegramCheckout} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-black mb-2 flex items-center">
          <Phone className="w-4 h-4 mr-2" /> {t.phone}
        </label>
        <input
          required
          type="tel"
          className="w-full p-3 border border-brand-orange-200 rounded-xl focus:ring-2 focus:ring-brand-orange-400 focus:outline-none bg-brand-orange-50/30"
          value={customerDetails.phone}
          onChange={(e) =>
            setCustomerDetails({ ...customerDetails, phone: e.target.value })
          }
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-black mb-2 flex items-center">
          <MapPin className="w-4 h-4 mr-2" /> {t.address}
        </label>
        <textarea
          required
          rows={3}
          className="w-full p-3 border border-brand-orange-200 rounded-xl focus:ring-2 focus:ring-brand-orange-400 focus:outline-none bg-brand-orange-50/30"
          value={customerDetails.address}
          onChange={(e) =>
            setCustomerDetails({ ...customerDetails, address: e.target.value })
          }
        />
      </div>

      {orderStatus === "SUCCESS" && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-center font-medium animate-bounce">
          ✅ Order sent successfully! Redirecting...
        </div>
      )}

      {orderStatus === "ERROR" && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-center font-medium">
          ❌ Failed to send order. Please try again.
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting || orderStatus === "SUCCESS"}
        className={`w-full text-black py-4 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center border-2 border-brand-orange-900 ${
          isSubmitting || orderStatus === "SUCCESS"
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-brand-orange-900 hover:text-black hover:shadow-xl"
        }`}
      >
        {isSubmitting ? (
          <span className="flex items-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Sending...
          </span>
        ) : (
          <>
            <Send className="w-5 h-5 mr-3" /> {t.sendTelegram}
          </>
        )}
      </button>
      <p className="text-center text-xs text-black mt-4">{t.redirectNote}</p>
    </form>
  </div>
);

interface LoginViewProps {
  t: (typeof TRANSLATIONS)["en"];
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
  setView,
}) => (
  <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-3xl shadow-xl border border-brand-orange-100 text-center animate-[slideIn_0.3s_ease-out]">
    <div className="w-16 h-16 bg-brand-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <Lock className="w-8 h-8 text-black" />
    </div>
    <h2 className="text-2xl font-serif font-bold text-black mb-2">
      {t.ownerAccess}
    </h2>
    <p className="text-black mb-8">{t.enterPassword}</p>

    <form onSubmit={handleLogin}>
      <input
        type="password"
        autoFocus
        value={passwordInput}
        onChange={(e) => setPasswordInput(e.target.value)}
        className="w-full p-4 border border-brand-orange-200 rounded-xl focus:ring-2 focus:ring-brand-orange-400 focus:outline-none mb-4 text-center text-lg tracking-widest bg-brand-orange-50"
        placeholder="••••"
      />
      {loginError && (
        <p className="text-red-500 text-sm mb-4">
          Incorrect password. Please try again.
        </p>
      )}
      <button
        type="submit"
        className="w-full bg-transparent text-black py-4 rounded-xl font-bold text-lg hover:bg-brand-orange-900 hover:text-black transition-all shadow-lg border-2 border-brand-orange-900"
      >
        {t.unlock}
      </button>
    </form>
    <button
      onClick={() => setView("HOME")}
      className="mt-6 text-black hover:text-black transition-all border-2 border-brand-orange-600 hover:bg-brand-orange-600 rounded-lg px-4 py-2 text-sm font-medium"
    >
      {t.returnStore}
    </button>
  </div>
);

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [view, setView] = useState<ViewState>("HOME");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [language, setLanguage] = useState<Language>("en");

  // Auth State
  const [isAdmin, setIsAdmin] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState(false);

  // Checkout Form State
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    address: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderStatus, setOrderStatus] = useState<"IDLE" | "SUCCESS" | "ERROR">(
    "IDLE"
  );

  const t = TRANSLATIONS[language];

  // Load Initial Data
  useEffect(() => {
    const savedProducts = localStorage.getItem("suds_products");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts(INITIAL_PRODUCTS);
      localStorage.setItem("suds_products", JSON.stringify(INITIAL_PRODUCTS));
    }
  }, []);

  // Save on change
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("suds_products", JSON.stringify(products));
    }
  }, [products]);

  // Cart Logic
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id)
          return { ...item, quantity: Math.max(1, item.quantity + delta) };
        return item;
      })
    );
  };

  // Navigation Logic
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setView("PRODUCT_DETAIL");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // CRUD Logic
  const handleAddProduct = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // Login Logic
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setView("ADMIN");
      setLoginError(false);
      setPasswordInput("");
    } else {
      setLoginError(true);
    }
  };

  // Language Toggle
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "km" : "en"));
  };

  // Telegram Checkout
  const handleTelegramCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setOrderStatus("IDLE");

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: customerDetails.phone,
          address: customerDetails.address,
          items: cart.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
          total,
        }),
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("API_NOT_FOUND");
        }
        throw new Error("SEND_FAILED");
      }

      setOrderStatus("SUCCESS");
      setCart([]);
      setTimeout(() => {
        setView("HOME");
        setOrderStatus("IDLE");
        setCustomerDetails({ address: "", phone: "" });
      }, 3000);
    } catch (error: any) {
      console.error("Checkout error:", error);

      // FALLBACK: If API is missing (common in local dev) or fails, use the old redirect method
      if (
        error.message === "API_NOT_FOUND" ||
        !window.location.hostname.includes("vercel.app")
      ) {
        const itemsList = cart
          .map(
            (item) =>
              `- ${item.name} x ${item.quantity} ($${(
                item.price * item.quantity
              ).toFixed(2)})`
          )
          .join("\n");
        const text =
          `🛍️ *New Items Order!* 🧼\n\n` +
          `*Items:*\n${itemsList}\n\n` +
          `*Total:* $${total.toFixed(2)}\n\n` +
          `*Customer Details:*\n` +
          `📞 Phone: ${customerDetails.phone}\n` +
          `📍 Address: ${customerDetails.address}`;

        const encodedMessage = encodeURIComponent(text);
        const url = `https://t.me/${TELEGRAM_BOT_USERNAME}?text=${encodedMessage}`;

        window.open(url, "_blank");
        setCart([]);
        setView("HOME");
        setCustomerDetails({ address: "", phone: "" });
      } else {
        setOrderStatus("ERROR");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-brand-orange-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setView("HOME")}
          >
            <img
              src="https://i.imgur.com/XVYm2ri.png"
              alt={t.brandName}
              className="h-12 md:h-16 w-auto object-contain"
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center px-4 py-2 bg-transparent hover:bg-brand-orange-900 border-2 border-brand-orange-900 rounded-full text-sm font-bold text-black hover:text-black transition-all shadow-sm"
              title="Switch Language"
            >
              <Globe className="w-4 h-4 mr-1.5" />
              {language === "en" ? "EN" : "ខ្មែរ"}
            </button>

            {view === "HOME" && (
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-3 bg-transparent text-black rounded-full hover:bg-brand-orange-900 hover:text-black transition-all shadow-sm border-2 border-brand-orange-900"
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
                if (view === "ADMIN" || view === "ADMIN_LOGIN") {
                  setView("HOME");
                  setIsAdmin(false); // Secure logout
                } else {
                  setView(isAdmin ? "ADMIN" : "ADMIN_LOGIN");
                }
              }}
              className={`p-3 rounded-full transition-all shadow-sm border-2 ${
                view === "ADMIN" || view === "ADMIN_LOGIN"
                  ? "bg-brand-orange-900 text-black border-brand-orange-900 hover:bg-transparent hover:text-black"
                  : "bg-transparent text-black border-brand-orange-900 hover:bg-brand-orange-900 hover:text-black"
              }`}
              title={view === "ADMIN" ? "Logout Admin" : "Admin Login"}
            >
              {view === "ADMIN" || view === "ADMIN_LOGIN" ? (
                <LogOut className="w-5 h-5" />
              ) : (
                <Settings className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {view === "HOME" && (
          <>
            <Hero
              onShopNow={() =>
                document
                  .getElementById("shop")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              language={language}
            />
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-serif font-bold text-black mb-4">
                {t.ourCollection}
              </h2>
              <div className="w-24 h-1 bg-brand-orange-400 mx-auto rounded-full"></div>
            </div>
            <ProductList
              products={products}
              onAddToCart={addToCart}
              onProductClick={handleProductClick}
              language={language}
            />
          </>
        )}

        {view === "PRODUCT_DETAIL" && selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onBack={() => setView("HOME")}
            onAddToCart={addToCart}
            language={language}
          />
        )}

        {view === "ADMIN" && (
          <AdminPanel
            products={products}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            onClose={() => {
              setView("HOME");
              setIsAdmin(false);
            }}
          />
        )}

        {view === "ADMIN_LOGIN" && (
          <LoginView
            t={t}
            passwordInput={passwordInput}
            setPasswordInput={setPasswordInput}
            handleLogin={handleLogin}
            loginError={loginError}
            setView={setView}
          />
        )}

        {view === "CHECKOUT" && (
          <CheckoutView
            cart={cart}
            t={t}
            customerDetails={customerDetails}
            setCustomerDetails={setCustomerDetails}
            handleTelegramCheckout={handleTelegramCheckout}
            setView={setView}
            isSubmitting={isSubmitting}
            orderStatus={orderStatus}
          />
        )}
      </main>

      {/* Floating Chat Button for AI - Points to the BOT */}
      <a
        href={`https://t.me/${TELEGRAM_BOT_USERNAME}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group flex items-center"
        title={t.chatWithAI}
      >
        <div className="mr-3 bg-white px-4 py-2 rounded-2xl shadow-xl border border-brand-orange-100 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 pointer-events-none">
          <p className="text-sm font-bold text-black whitespace-nowrap">
            {t.aiHelp}
          </p>
        </div>
        <div className="w-14 h-14 bg-[#0088cc] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all animate-bounce hover:animate-none">
          <MessageCircle className="w-7 h-7" />
        </div>
      </a>

      {/* Footer */}
      <footer className="bg-brand-orange-400 text-black py-12 mt-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-black font-serif font-bold text-xl mb-4">
              {t.brandName}
            </h3>
            <p className="text-sm text-black leading-relaxed opacity-80">
              {t.handcrafted}
            </p>
          </div>
          <div>
            <h4 className="text-black font-bold mb-4">{t.contact}</h4>
            <p className="text-sm text-black">phornphandy20@gmail.com</p>
            <p className="text-sm text-black">0979856605</p>
            <a
              href={`https://t.me/${TELEGRAM_BOT_USERNAME}`}
              target="_blank"
              className="text-sm text-black font-bold mt-2 inline-block hover:underline"
            >
              {t.chatWithAI}
            </a>
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
          setView("CHECKOUT");
        }}
        language={language}
      />
    </div>
  );
};

export default App;
