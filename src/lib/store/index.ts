import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { ProductSlice, createProductSlice } from "./productSlice";
import {
  CustomizationSlice,
  createCustomizationSlice,
} from "./customizationSlice";
import { CartSlice, createCartSlice } from "./cartSlice";
import { DeviceSlice, createDeviceSlice } from "./deviceSlice";

// Combine all slices
export type StoreState = ProductSlice &
  CustomizationSlice &
  CartSlice &
  DeviceSlice;

export const useStore = create<StoreState>()(
  devtools(
    persist(
      (...a) => ({
        ...createProductSlice(...a),
        ...createCustomizationSlice(...a),
        ...createCartSlice(...a),
        ...createDeviceSlice(...a),
      }),
      {
        name: "craftwood-store",
        partialize: (state) => ({
          // Only persist specific parts
          cart: state.cart,
          selectedProduct: state.selectedProduct,
          selectedDevice: state.selectedDevice,
          customization: state.customization,
        }),
      }
    ),
    {
      name: "craftwood-store",
    }
  )
);
