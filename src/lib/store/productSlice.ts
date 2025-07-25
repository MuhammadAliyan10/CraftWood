import { StateCreator } from "zustand";

export interface Product {
  id: number;
  title: string;
  description: string;
  images: string[];
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  category: string;
  productType: "mobile" | "watch" | "nameplate" | "keychain" | "pen";
  isCustomizable: boolean;
  features: string[];
  estimatedTime: string;
  isPopular?: boolean;
  tags?: string[];
}

export interface ProductSlice {
  // State
  products: Product[];
  selectedProduct: Product | null;
  featuredProducts: Product[];
  categories: string[];
  loading: boolean;
  error: string | null;

  // Actions
  setProducts: (products: Product[]) => void;
  setSelectedProduct: (product: Product | null) => void;
  getProductById: (id: number) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
  getFeaturedProducts: () => Product[];
  searchProducts: (query: string) => Product[];
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearSelectedProduct: () => void;
}

// Sample products data
const sampleProducts: Product[] = [
  {
    id: 1,
    title: "Premium Wooden Mobile Case",
    description:
      "Transform your mobile into a personalized masterpiece with our premium wooden cases. Perfect for protecting your device while showcasing your unique style.",
    images: [
      "/products/mobile-case-1.jpg",
      "/products/mobile-case-2.jpg",
      "/products/mobile-case-3.jpg",
      "/products/mobile-case-4.jpg",
    ],
    price: 2500,
    originalPrice: 3000,
    rating: 4.8,
    reviews: 127,
    category: "Mobile Cases",
    productType: "mobile",
    isCustomizable: true,
    features: [
      "Upload your own images",
      "Add custom text & quotes",
      "Premium wood material",
      "Precise camera cutouts",
      "Drop protection design",
      "Wireless charging compatible",
    ],
    estimatedTime: "3-5 business days",
    isPopular: true,
    tags: ["wooden", "premium", "customizable", "protection"],
  },
  {
    id: 2,
    title: "Smart Watch Custom Face",
    description:
      "Make your smartwatch truly yours with custom face designs that reflect your personality and style.",
    images: [
      "/products/watch-face-1.jpg",
      "/products/watch-face-2.jpg",
      "/products/watch-face-3.jpg",
    ],
    price: 1800,
    originalPrice: 2200,
    rating: 4.6,
    reviews: 89,
    category: "Watch Accessories",
    productType: "watch",
    isCustomizable: true,
    features: [
      "Custom photo backgrounds",
      "Personalized text elements",
      "Multiple design templates",
      "High-resolution display",
      "Easy installation",
    ],
    estimatedTime: "1-2 business days",
    isPopular: true,
    tags: ["smartwatch", "digital", "customizable"],
  },
  {
    id: 3,
    title: "Personalized House Name Plate",
    description:
      "Welcome guests with a beautiful personalized name plate that adds character to your home entrance.",
    images: [
      "/products/nameplate-1.jpg",
      "/products/nameplate-2.jpg",
      "/products/nameplate-3.jpg",
      "/products/nameplate-4.jpg",
    ],
    price: 3200,
    originalPrice: 4000,
    rating: 4.9,
    reviews: 156,
    category: "Home Decor",
    productType: "nameplate",
    isCustomizable: true,
    features: [
      "Custom family names",
      "Address personalization",
      "Weather-resistant material",
      "Multiple size options",
      "Professional engraving",
      "Easy wall mounting",
    ],
    estimatedTime: "5-7 business days",
    isPopular: true,
    tags: ["home", "nameplate", "engraving", "outdoor"],
  },
  {
    id: 4,
    title: "Custom Photo Keychain",
    description:
      "Carry your memories everywhere with our personalized keychains, perfect for gifts or personal use.",
    images: [
      "/products/keychain-1.jpg",
      "/products/keychain-2.jpg",
      "/products/keychain-3.jpg",
    ],
    price: 800,
    originalPrice: 1000,
    rating: 4.7,
    reviews: 203,
    category: "Accessories",
    productType: "keychain",
    isCustomizable: true,
    features: [
      "Miniature photo printing",
      "Custom text engraving",
      "Durable metal construction",
      "Multiple shape options",
      "Gift-ready packaging",
    ],
    estimatedTime: "2-3 business days",
    isPopular: false,
    tags: ["keychain", "photo", "gift", "portable"],
  },
  {
    id: 5,
    title: "Executive Custom Pen",
    description:
      "Elevate your writing experience with our personalized premium pens, perfect for professionals and students.",
    images: ["/products/pen-1.jpg", "/products/pen-2.jpg"],
    price: 1200,
    originalPrice: 1500,
    rating: 4.5,
    reviews: 67,
    category: "Stationery",
    productType: "pen",
    isCustomizable: true,
    features: [
      "Name engraving",
      "Premium metal body",
      "Smooth writing experience",
      "Corporate gift ready",
      "Luxury gift box included",
    ],
    estimatedTime: "3-4 business days",
    isPopular: false,
    tags: ["pen", "executive", "engraving", "professional"],
  },
];

export const createProductSlice: StateCreator<ProductSlice> = (set, get) => ({
  // Initial state
  products: sampleProducts,
  selectedProduct: null,
  featuredProducts: [],
  categories: [...new Set(sampleProducts.map((p) => p.category))],
  loading: false,
  error: null,

  // Actions
  setProducts: (products) => set({ products }),

  setSelectedProduct: (product) => set({ selectedProduct: product }),

  getProductById: (id) => {
    const products = get().products;
    return products.find((product) => product.id === id);
  },

  getProductsByCategory: (category) => {
    const products = get().products;
    return products.filter((product) => product.category === category);
  },

  getFeaturedProducts: () => {
    const products = get().products;
    return products.filter((product) => product.isPopular);
  },

  searchProducts: (query) => {
    const products = get().products;
    const lowercaseQuery = query.toLowerCase();
    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery) ||
        product.tags?.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
    );
  },

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearSelectedProduct: () => set({ selectedProduct: null }),
});
