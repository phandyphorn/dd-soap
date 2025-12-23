
import { Product } from './types';

export const TELEGRAM_USERNAME = "phornphandy";
export const TELEGRAM_BOT_USERNAME = "LoukNisLoukNosBot"; // Replace with your actual bot username from @BotFather
export const ADMIN_PASSWORD = "123"; // Simple password for owner access


export const TRANSLATIONS = {
  en: {
    heroTitle: "We Have Fresh:",
    heroSubtitle: "I am selling these quality items. If you need them, please contact my Telegram or order by adding to the basket.",
    shopNow: "Shop Now",
    ourCollection: "Our Collection",
    addToCart: "Add to Cart",
    scent: "Details",
    aboutSoap: "About this item",
    ingredients: "Ingredients",
    scentProfile: "Scent/Flavor",
    backToCollection: "Back to Collection",
    yourCart: "Your Cart",
    subtotal: "Subtotal",
    proceedCheckout: "Proceed to Checkout",
    cartEmpty: "Your cart is empty",
    startAdding: "Start adding items!",
    continueShopping: "Continue Shopping",
    completeOrder: "Complete Your Order",
    orderSummary: "Order Summary",
    total: "Total",
    fullName: "Full Name",
    phone: "Phone Number",
    address: "Delivery Address",
    notes: "Order Notes (Optional)",
    sendTelegram: "Send Order via Telegram",
    redirectNote: "You will be redirected to Telegram to send the message.",
    contact: "Contact",
    legal: "Legal",
    handcrafted: "Locally sourced and homemade with care. Quality you can trust.",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    ownerAccess: "Owner Access",
    enterPassword: "Please enter the password to manage inventory.",
    unlock: "Unlock Dashboard",
    returnStore: "Return to Store",
    handsoapWithLove: "Homemade with Love",
    brandName: "Sell This Sell That",
    chatWithAI: "Chat with AI Assistant",
    aiHelp: "How can I help you?"
  },
  km: {
    heroTitle: "មានលក់៖",
    heroSubtitle: "ប្រសិនបើលោកអ្នកត្រូវការ សូមទំនាក់ទំនងមកកាន់ Telegram របស់ខ្ញុំ ឬកម្មង់តាមរយៈការដាក់ចូលក្នុងកន្ត្រក។",
    shopNow: "មើលផលិតផល",
    ourCollection: "ផលិតផលរបស់យើង",
    addToCart: "ដាក់ចូលកន្ត្រក",
    scent: "ព័ត៌មាន",
    aboutSoap: "អំពីផលិតផលនេះ",
    ingredients: "គ្រឿងផ្សំ",
    scentProfile: "រសជាតិ/ក្លិន",
    backToCollection: "ត្រឡប់ក្រោយ",
    yourCart: "កន្ត្រករបស់អ្នក",
    subtotal: "សរុប",
    proceedCheckout: "បន្តទៅការទូទាត់",
    cartEmpty: "កន្ត្រករបស់អ្នកទទេ",
    startAdding: "ចាប់ផ្តើមជ្រើសរើសទំនិញ!",
    continueShopping: "បន្តការទិញទំនិញ",
    completeOrder: "បំពេញការបញ្ជាទិញ",
    orderSummary: "សង្ខេបការបញ្ជាទិញ",
    total: "សរុប",
    fullName: "ឈ្មោះពេញ",
    phone: "លេខទូរស័ព្ទ",
    address: "អាសយដ្ឋានដឹកជញ្ជូន",
    notes: "កំណត់ចំណាំ (ជម្រើស)",
    sendTelegram: "ផ្ញើការបញ្ជាទិញតាម Telegram",
    redirectNote: "អ្នកនឹងត្រូវបានបញ្ជូនទៅ Telegram ដើម្បីផ្ញើសារ។",
    contact: "ទំនាក់ទំនង",
    legal: "ផ្លូវច្បាប់",
    handcrafted: "ផលិតផលក្នុងស្រុក ធ្វើដោយយកចិត្តទុកដាក់។",
    privacy: "គោលការណ៍​ភាព​ឯកជន",
    terms: "លក្ខខណ្ឌនៃសេវាកម្ម",
    ownerAccess: "ចូលគណនីម្ចាស់ហាង",
    enterPassword: "សូមបញ្ចូលពាក្យសម្ងាត់ដើម្បីគ្រប់គ្រងស្តុក។",
    unlock: "បើកផ្ទាំងគ្រប់គ្រង",
    returnStore: "ត្រឡប់ទៅហាងវិញ",
    handsoapWithLove: "ផលិតដោយក្តីស្រឡាញ់",
    brandName: "លក់នេះ លក់នោះ",
    chatWithAI: "ជជែកជាមួយ AI",
    aiHelp: "តើខ្ញុំអាចជួយអ្វីបានខ្លះ?"
  }
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Dish Soap',
    name_km: 'សាប៊ូលាងចាន',
    price: 0.4,
    description: 'A powerful dish soap that cuts through grease effortlessly.',
    description_km: 'សាប៊ូលាងចាន ឆ្នាំង ជំរះបានល្អ។',
    image: 'https://i.imgur.com/BjhE7RE.jpeg',
    images: [
      'https://i.imgur.com/BjhE7RE.jpeg',
      'https://i.imgur.com/PnZhSI5.jpeg',
      'https://i.imgur.com/FOOuWTy.jpeg',
    ],
    scent: 'Lemon Zest',
    scent_km: 'ក្លិនក្រូចឆ្មា',
    ingredients: 'Sodium Lauryl Sulfate, Water, Lemon Essence',
    ingredients_km: 'វត្ថុធាតុដើមក្នុងការបង្កើតសាប៊ូ លាយជាមួយក្លិនក្រូចឆ្មា'
  },
  {
    id: '2',
    name: 'Ombox',
    name_km: 'អំបុក',
    price: 0.4,
    description: 'Made from fresh, newly harvested rice.',
    description_km: 'ធ្វើពីស្រូវទើបប្រមូលផលថ្មីៗ។',
    image: 'https://i.imgur.com/bkdveiE.jpeg',
    images: [
      'https://i.imgur.com/bkdveiE.jpeg',
      'https://i.imgur.com/a8JTP2K.jpeg',
      'https://i.imgur.com/3UnrwV0.jpeg',
    ],
    scent: 'Fresh Rice',
    scent_km: 'ក្លិនស្រូវថ្មី',
    ingredients: '100% Rice',
    ingredients_km: 'ស្រូវ'
  },
  {
    id: '3',
    name: 'Crispy Rice',
    name_km: 'បាយក្តាំង',
    price: 1.75,
    description: 'Delicious crispy rice mixed with sweet milk.',
    description_km: 'រសជាតិឆ្ងាញ់ លាយជាមួយបាយក្តាំងនិងទឹកដោះគោ Tune។',
    image: 'https://i.imgur.com/pjyCbQA.jpeg',
    images: [
      'https://i.imgur.com/pjyCbQA.jpeg',
      'https://i.imgur.com/gj6aE7x.jpeg',
      'https://i.imgur.com/K2hpjuw.jpeg',
      'https://i.imgur.com/gUsV0Kx.jpeg'
    ],
    scent: 'Milk & Rice',
    scent_km: 'ក្លិនទឹកដោះគោនិងអង្ករ',
    ingredients: 'Rice, Milk, Pork Floss',
    ingredients_km: 'អង្ករ, ទឹកដោះគោ, សាច់ជ្រូកផាត់'
  },
  {
    id: '4',
    name: 'Papaya',
    name_km: 'ល្ហុង',
    price: 1.25,
    description: 'Sweet and natural taste from ripe papaya.',
    description_km: 'រសជាតិឆ្ងាញ់ ផ្អែមពីធម្មជាតិ។',
    image: 'https://i.imgur.com/vx8kNc7.jpeg',
    images: [
      'https://i.imgur.com/V6gwk1S.jpeg',
      'https://i.imgur.com/ijz2gCN.jpeg',
      'https://i.imgur.com/w8PB76R.jpeg',
      'https://i.imgur.com/DjtlYYy.jpeg'
    ],
    scent: 'Ripe Papaya',
    scent_km: 'ក្លិនល្ហុងទុំធម្មជាតិ',
    ingredients: 'Natural Papaya',
    ingredients_km: 'ល្ហុងធម្មជាតិមកពីខេត្តពោធិ៍សាត់'
  }
];
