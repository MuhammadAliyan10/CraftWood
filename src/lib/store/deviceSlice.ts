import { StateCreator } from "zustand";

export interface MobileModel {
  id: string;
  name: string;
  size: string;
  popular: boolean;
}

export interface MobileBrand {
  id: string;
  name: string;
  logo: string;
  color: string;
  popular: boolean;
  models: MobileModel[];
}

export interface Device {
  id: string;
  name: string;
  brand: string;
  dimensions: { width: number; height: number };
  cameraArea: { x: number; y: number; width: number; height: number } | null;
  designArea: { x: number; y: number; width: number; height: number };
}

export interface DeviceSlice {
  // State
  mobileBrands: MobileBrand[];
  selectedBrand: string | null;
  selectedDevice: Device | null;
  availableDevices: Device[];

  // Actions
  setSelectedBrand: (brandId: string | null) => void;
  setSelectedDevice: (device: Device | null) => void;
  getDevicesByBrand: (brandId: string) => MobileModel[];
  getBrandById: (brandId: string) => MobileBrand | undefined;
  getDeviceById: (deviceId: string) => Device | undefined;
  clearDeviceSelection: () => void;
}

// Mobile brands data
const mobileBrandsData: MobileBrand[] = [
  {
    id: "apple",
    name: "Apple",
    logo: "🍎",
    color: "bg-gray-100",
    popular: true,
    models: [
      {
        id: "iphone-15-pro-max",
        name: "iPhone 15 Pro Max",
        size: '6.7"',
        popular: true,
      },
      {
        id: "iphone-15-pro",
        name: "iPhone 15 Pro",
        size: '6.1"',
        popular: true,
      },
      {
        id: "iphone-15-plus",
        name: "iPhone 15 Plus",
        size: '6.7"',
        popular: false,
      },
      { id: "iphone-15", name: "iPhone 15", size: '6.1"', popular: true },
      {
        id: "iphone-14-pro-max",
        name: "iPhone 14 Pro Max",
        size: '6.7"',
        popular: true,
      },
      {
        id: "iphone-14-pro",
        name: "iPhone 14 Pro",
        size: '6.1"',
        popular: false,
      },
      {
        id: "iphone-14-plus",
        name: "iPhone 14 Plus",
        size: '6.7"',
        popular: false,
      },
      { id: "iphone-14", name: "iPhone 14", size: '6.1"', popular: true },
      {
        id: "iphone-13-pro-max",
        name: "iPhone 13 Pro Max",
        size: '6.7"',
        popular: false,
      },
      {
        id: "iphone-13-pro",
        name: "iPhone 13 Pro",
        size: '6.1"',
        popular: false,
      },
      { id: "iphone-13", name: "iPhone 13", size: '6.1"', popular: true },
      {
        id: "iphone-12-pro-max",
        name: "iPhone 12 Pro Max",
        size: '6.7"',
        popular: false,
      },
    ],
  },
  {
    id: "samsung",
    name: "Samsung",
    logo: "📱",
    color: "bg-blue-50",
    popular: true,
    models: [
      {
        id: "galaxy-s24-ultra",
        name: "Galaxy S24 Ultra",
        size: '6.8"',
        popular: true,
      },
      {
        id: "galaxy-s24-plus",
        name: "Galaxy S24+",
        size: '6.7"',
        popular: true,
      },
      { id: "galaxy-s24", name: "Galaxy S24", size: '6.2"', popular: true },
      {
        id: "galaxy-s23-ultra",
        name: "Galaxy S23 Ultra",
        size: '6.8"',
        popular: true,
      },
      {
        id: "galaxy-s23-plus",
        name: "Galaxy S23+",
        size: '6.6"',
        popular: false,
      },
      { id: "galaxy-s23", name: "Galaxy S23", size: '6.1"', popular: true },
      { id: "galaxy-a54", name: "Galaxy A54", size: '6.4"', popular: true },
      { id: "galaxy-a34", name: "Galaxy A34", size: '6.6"', popular: false },
      {
        id: "galaxy-note-20-ultra",
        name: "Note 20 Ultra",
        size: '6.9"',
        popular: false,
      },
    ],
  },
  {
    id: "xiaomi",
    name: "Xiaomi",
    logo: "🔥",
    color: "bg-orange-50",
    popular: true,
    models: [
      { id: "xiaomi-14-ultra", name: "14 Ultra", size: '6.73"', popular: true },
      { id: "xiaomi-14", name: "14", size: '6.36"', popular: true },
      { id: "xiaomi-13-pro", name: "13 Pro", size: '6.73"', popular: false },
      {
        id: "redmi-note-13-pro",
        name: "Redmi Note 13 Pro",
        size: '6.67"',
        popular: true,
      },
      {
        id: "redmi-note-13",
        name: "Redmi Note 13",
        size: '6.67"',
        popular: true,
      },
      { id: "poco-x6-pro", name: "POCO X6 Pro", size: '6.67"', popular: true },
    ],
  },
  {
    id: "oppo",
    name: "OPPO",
    logo: "💎",
    color: "bg-green-50",
    popular: false,
    models: [
      {
        id: "oppo-find-x7-ultra",
        name: "Find X7 Ultra",
        size: '6.82"',
        popular: true,
      },
      {
        id: "oppo-reno-11-pro",
        name: "Reno 11 Pro",
        size: '6.7"',
        popular: true,
      },
      { id: "oppo-reno-11", name: "Reno 11", size: '6.7"', popular: false },
      { id: "oppo-a98", name: "A98", size: '6.72"', popular: true },
      { id: "oppo-a78", name: "A78", size: '6.43"', popular: false },
    ],
  },
  {
    id: "vivo",
    name: "Vivo",
    logo: "⚡",
    color: "bg-purple-50",
    popular: false,
    models: [
      { id: "vivo-x100-pro", name: "X100 Pro", size: '6.78"', popular: true },
      { id: "vivo-v29-pro", name: "V29 Pro", size: '6.78"', popular: true },
      { id: "vivo-v29", name: "V29", size: '6.78"', popular: false },
      { id: "vivo-y100", name: "Y100", size: '6.67"', popular: true },
      { id: "vivo-y36", name: "Y36", size: '6.64"', popular: false },
    ],
  },
  {
    id: "realme",
    name: "Realme",
    logo: "🚀",
    color: "bg-yellow-50",
    popular: false,
    models: [
      { id: "realme-gt-5-pro", name: "GT 5 Pro", size: '6.78"', popular: true },
      {
        id: "realme-12-pro-plus",
        name: "12 Pro+",
        size: '6.7"',
        popular: true,
      },
      { id: "realme-12-pro", name: "12 Pro", size: '6.7"', popular: false },
      { id: "realme-c67", name: "C67", size: '6.43"', popular: true },
      { id: "realme-c53", name: "C53", size: '6.74"', popular: false },
    ],
  },
];

// Device data with proper dimensions
const deviceData: Device[] = [
  {
    id: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    dimensions: { width: 360, height: 720 },
    cameraArea: { x: 20, y: 40, width: 100, height: 80 },
    designArea: { x: 30, y: 150, width: 300, height: 540 },
  },
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro",
    brand: "Apple",
    dimensions: { width: 340, height: 680 },
    cameraArea: { x: 20, y: 40, width: 95, height: 75 },
    designArea: { x: 30, y: 140, width: 280, height: 510 },
  },
  {
    id: "galaxy-s24-ultra",
    name: "Galaxy S24 Ultra",
    brand: "Samsung",
    dimensions: { width: 350, height: 700 },
    cameraArea: { x: 25, y: 35, width: 120, height: 50 },
    designArea: { x: 30, y: 120, width: 290, height: 550 },
  },
  // Add more devices as needed
];

export const createDeviceSlice: StateCreator<DeviceSlice> = (set, get) => ({
  // Initial state
  mobileBrands: mobileBrandsData,
  selectedBrand: null,
  selectedDevice: null,
  availableDevices: deviceData,

  // Actions
  setSelectedBrand: (brandId) => set({ selectedBrand: brandId }),

  setSelectedDevice: (device) => set({ selectedDevice: device }),

  getDevicesByBrand: (brandId) => {
    const brand = get().mobileBrands.find((b) => b.id === brandId);
    return brand?.models || [];
  },

  getBrandById: (brandId) => {
    return get().mobileBrands.find((brand) => brand.id === brandId);
  },

  getDeviceById: (deviceId) => {
    return get().availableDevices.find((device) => device.id === deviceId);
  },

  clearDeviceSelection: () =>
    set({
      selectedBrand: null,
      selectedDevice: null,
    }),
});
