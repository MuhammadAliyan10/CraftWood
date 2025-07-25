import { StateCreator } from "zustand";
import { Product } from "./productSlice";
import { Device } from "./deviceSlice";
import { CustomizationData } from "./customizationSlice";

export interface CartItem {
  id: string;
  product: Product;
  device?: Device;
  customization?: CustomizationData;
  quantity: number;
  price: number;
  addedAt: Date;
}

export interface CartSlice {
  // State
  cart: CartItem[];
  isOpen: boolean;
  totalItems: number;
  totalPrice: number;

  // Actions
  addToCart: (item: Omit<CartItem, "id" | "addedAt">) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getCartItem: (itemId: string) => CartItem | undefined;
  calculateTotals: () => void;
}

export const createCartSlice: StateCreator<CartSlice> = (set, get) => ({
  // Initial state
  cart: [],
  isOpen: false,
  totalItems: 0,
  totalPrice: 0,

  // Actions
  addToCart: (item) => {
    const newItem: CartItem = {
      ...item,
      id: `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      addedAt: new Date(),
    };

    const currentCart = get().cart;
    set({ cart: [...currentCart, newItem] });
    get().calculateTotals();
  },

  removeFromCart: (itemId) => {
    const currentCart = get().cart;
    const newCart = currentCart.filter((item) => item.id !== itemId);
    set({ cart: newCart });
    get().calculateTotals();
  },

  updateQuantity: (itemId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(itemId);
      return;
    }

    const currentCart = get().cart;
    const newCart = currentCart.map((item) =>
      item.id === itemId ? { ...item, quantity } : item
    );
    set({ cart: newCart });
    get().calculateTotals();
  },

  clearCart: () => {
    set({ cart: [], totalItems: 0, totalPrice: 0 });
  },

  toggleCart: () => {
    set({ isOpen: !get().isOpen });
  },

  getCartItem: (itemId) => {
    return get().cart.find((item) => item.id === itemId);
  },

  calculateTotals: () => {
    const cart = get().cart;
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    set({ totalItems, totalPrice });
  },
});
