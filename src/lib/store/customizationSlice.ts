import { StateCreator } from "zustand";

export interface CustomElement {
  id: string;
  type: "image" | "text";
  content: string;
  position: { x: number; y: number };
  scale: number;
  rotation: number;
  opacity: number;
  zIndex: number;
  locked: boolean;
  visible: boolean;
  // Text specific
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  textAlign?: "left" | "center" | "right";
  isBold?: boolean;
  isItalic?: boolean;
  isUnderline?: boolean;
  isStrikethrough?: boolean;
  letterSpacing?: number;
  lineHeight?: number;
  textShadow?: string;
  // Image specific
  flipX?: boolean;
  flipY?: boolean;
  borderRadius?: number;
  border?: boolean;
  borderColor?: string;
  borderWidth?: number;
  brightness?: number;
  contrast?: number;
  saturation?: number;
  blur?: number;
}

export interface CustomizationData {
  elements: CustomElement[];
  selectedElementId: string | null;
  darkMode: boolean;
  zoom: number;
  canvasPosition: { x: number; y: number };
  showGrid: boolean;
  showCameraZone: boolean;
  cameraPosition: { x: number; y: number };
  tool: "select" | "hand" | "text" | "image";
  leftSidebarWidth: number;
  rightSidebarWidth: number;
  leftSidebarExpanded: boolean;
  rightSidebarExpanded: boolean;
}

export interface CustomizationSlice {
  // State
  customization: CustomizationData;
  history: CustomizationData[];
  historyIndex: number;
  isDesigning: boolean;

  // Actions
  updateCustomization: (updates: Partial<CustomizationData>) => void;
  addElement: (element: CustomElement) => void;
  updateElement: (elementId: string, updates: Partial<CustomElement>) => void;
  removeElement: (elementId: string) => void;
  duplicateElement: (elementId: string) => void;
  selectElement: (elementId: string | null) => void;
  reorderElement: (
    elementId: string,
    direction: "up" | "down" | "top" | "bottom"
  ) => void;
  undo: () => void;
  redo: () => void;
  clearCustomization: () => void;
  setDesigning: (isDesigning: boolean) => void;
  saveToHistory: () => void;
}

const initialCustomization: CustomizationData = {
  elements: [],
  selectedElementId: null,
  darkMode: false,
  zoom: 100,
  canvasPosition: { x: 0, y: 0 },
  showGrid: false,
  showCameraZone: true,
  cameraPosition: { x: 20, y: 40 },
  tool: "select",
  leftSidebarWidth: 280,
  rightSidebarWidth: 320,
  leftSidebarExpanded: true,
  rightSidebarExpanded: true,
};

export const createCustomizationSlice: StateCreator<CustomizationSlice> = (
  set,
  get
) => ({
  // Initial state
  customization: initialCustomization,
  history: [initialCustomization],
  historyIndex: 0,
  isDesigning: false,

  // Actions
  updateCustomization: (updates) => {
    const current = get().customization;
    const newCustomization = { ...current, ...updates };
    set({ customization: newCustomization });
    get().saveToHistory();
  },

  addElement: (element) => {
    const current = get().customization;
    const newCustomization = {
      ...current,
      elements: [...current.elements, element],
      selectedElementId: element.id,
    };
    set({ customization: newCustomization });
    get().saveToHistory();
  },

  updateElement: (elementId, updates) => {
    const current = get().customization;
    const newElements = current.elements.map((el) =>
      el.id === elementId ? { ...el, ...updates } : el
    );
    const newCustomization = {
      ...current,
      elements: newElements,
    };
    set({ customization: newCustomization });
    get().saveToHistory();
  },

  removeElement: (elementId) => {
    const current = get().customization;
    const newElements = current.elements.filter((el) => el.id !== elementId);
    const newCustomization = {
      ...current,
      elements: newElements,
      selectedElementId:
        current.selectedElementId === elementId
          ? null
          : current.selectedElementId,
    };
    set({ customization: newCustomization });
    get().saveToHistory();
  },

  duplicateElement: (elementId) => {
    const current = get().customization;
    const element = current.elements.find((el) => el.id === elementId);
    if (!element) return;

    const newElement = {
      ...element,
      id: `element_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      position: { x: element.position.x + 10, y: element.position.y + 10 },
      zIndex: Math.max(...current.elements.map((el) => el.zIndex)) + 1,
    };

    const newCustomization = {
      ...current,
      elements: [...current.elements, newElement],
      selectedElementId: newElement.id,
    };
    set({ customization: newCustomization });
    get().saveToHistory();
  },

  selectElement: (elementId) => {
    const current = get().customization;
    const newCustomization = {
      ...current,
      selectedElementId: elementId,
    };
    set({ customization: newCustomization });
  },

  reorderElement: (elementId, direction) => {
    const current = get().customization;
    const elements = [...current.elements];
    const element = elements.find((el) => el.id === elementId);
    if (!element) return;

    const maxZIndex = Math.max(...elements.map((el) => el.zIndex));
    const minZIndex = Math.min(...elements.map((el) => el.zIndex));

    let newZIndex = element.zIndex;
    switch (direction) {
      case "up":
        newZIndex = Math.min(maxZIndex, element.zIndex + 1);
        break;
      case "down":
        newZIndex = Math.max(minZIndex, element.zIndex - 1);
        break;
      case "top":
        newZIndex = maxZIndex + 1;
        break;
      case "bottom":
        newZIndex = minZIndex - 1;
        break;
    }

    get().updateElement(elementId, { zIndex: newZIndex });
  },

  undo: () => {
    const { history, historyIndex } = get();
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      set({
        customization: history[newIndex],
        historyIndex: newIndex,
      });
    }
  },

  redo: () => {
    const { history, historyIndex } = get();
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      set({
        customization: history[newIndex],
        historyIndex: newIndex,
      });
    }
  },

  clearCustomization: () => {
    set({
      customization: initialCustomization,
      history: [initialCustomization],
      historyIndex: 0,
    });
  },

  setDesigning: (isDesigning) => set({ isDesigning }),

  saveToHistory: () => {
    const { customization, history, historyIndex } = get();
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ ...customization });

    // Limit history to 50 entries
    if (newHistory.length > 50) {
      newHistory.shift();
    }

    set({
      history: newHistory,
      historyIndex: newHistory.length - 1,
    });
  },
});
