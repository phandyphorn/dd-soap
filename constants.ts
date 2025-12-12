import { Product } from './types';

export const TELEGRAM_USERNAME = "phornphandy"; // Replace with actual username
export const ADMIN_PASSWORD = "123"; // Simple password for owner access

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Baby Soap',
    price: 6.00,
    description: 'A soothing blend of French lavender and chamomile to help you relax after a long day.',
    image: 'https://m.media-amazon.com/images/I/71EIaHWmJFL._AC_UF400,400_QL80_.jpg',
    images: [
      'https://m.media-amazon.com/images/I/71EIaHWmJFL._AC_UF400,400_QL80_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/51IR54hXawL._AC_UL400_SR600%2C400_.jpg',
      'https://m.media-amazon.com/images/I/719d0%2Bd6HML._AC_UF400%2C400_QL80_.jpg'
    ],
    scent: 'Lavender & Chamomile',
    ingredients: 'Olive Oil, Coconut Oil, Lavender Essential Oil, Dried Lavender Buds'
  },
  {
    id: '2',
    name: 'Citrus Burst',
    price: 11.00,
    description: 'Wake up refreshed with the zesty scent of lemon, lime, and sweet orange.',
    image: 'https://images-na.ssl-images-amazon.com/images/I/81avJwK7QML._AC_UL400_SR400,400_.jpg',
    images: [
      'https://saavynaturals.com/cdn/shop/files/2_f308927d-3b1c-4a14-a0f5-5337c71e8d49_440x400.jpg?v=1761803855',
      'https://images-na.ssl-images-amazon.com/images/I/81g2vq%2BjMiL._AC_UL400_SR400%2C400_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/81EmfoJJ5yL._AC_UL400_SR400%2C400_.jpg'
    ],
    scent: 'Lemon, Lime, Orange',
    ingredients: 'Shea Butter, Lemon Peel, Orange Essential Oil'
  },
  {
    id: '3',
    name: 'Oatmeal Honey',
    price: 14.00,
    description: 'Gentle exfoliation with organic oats and raw honey, perfect for sensitive skin.',
    image: 'https://i5.walmartimages.com/dfw/6e29e393-6b2b/k2-_16b794fa-74a2-4464-b477-f5f237c05b68.v1.jpg?v=400&width=400',
    images: [
      'https://i5.walmartimages.com/dfw/6e29e393-6b2b/k2-_16b794fa-74a2-4464-b477-f5f237c05b68.v1.jpg?v=400&width=400',
      'https://m.media-amazon.com/images/I/812+t2+j+L._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71s+G2+j+L._AC_SL1500_.jpg'
    ],
    scent: 'Sweet Honey & Almond',
    ingredients: 'Goat Milk, Rolled Oats, Raw Honey, Almond Oil'
  },
  {
    id: '4',
    name: 'Charcoal Detox',
    price: 13.50,
    description: 'Activated charcoal draws out impurities while tea tree oil clarifies the skin.',
    image: 'https://merrybath.com/cdn/shop/files/Handmade_Lavender_Soap5.jpg?v=400&width=400',
    images: [
      'https://merrybath.com/cdn/shop/files/Handmade_Lavender_Soap5.jpg?v=400&width=400',
      'https://m.media-amazon.com/images/I/61+M2+j+L._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71+M2+j+L._AC_SL1500_.jpg'
    ],
    scent: 'Tea Tree & Mint',
    ingredients: 'Activated Charcoal, Tea Tree Oil, Peppermint Oil'
  }
];