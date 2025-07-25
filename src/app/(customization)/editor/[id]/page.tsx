"use client";

import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
  Suspense,
} from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import * as THREE from "three";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  Environment,
  OrbitControls,
  useTexture,
} from "@react-three/drei";
// import {
//   KonvaStage as Stage,
//   Layer,
//   Image as KonvaImage,
//   Text as KonvaText,
//   Group,
//   Rect,
//   Transformer,
//   Circle,
//   Line,
// } from "react-konva";
// import Konva from "konva";
// import useImage from "use-image";
// import { debounce } from "lodash";
import { v4 as uuidv4 } from "uuid";
import { toPng, toJpeg, toSvg } from "html-to-image";
import {
  Upload,
  Type,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Undo,
  Redo,
  Save,
  Trash2,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Camera,
  Grid3X3,
  MousePointer,
  Layers,
  Copy,
  FlipHorizontal,
  FlipVertical,
  Sun,
  Moon,
  Settings,
  Underline,
  Strikethrough,
  Plus,
  Minus,
  Move,
  Hand,
  Square,
  Circle as CircleIcon,
  Triangle,
  Palette,
  Download,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Maximize2,
  Minimize2,
  ShoppingCart,
  ArrowLeft,
  Smartphone,
  Watch,
  Home,
  Key,
  PenTool,
  GripVertical,
  X,
  CheckSquare,
  CreditCard,
  TextCursorInput,
  Highlighter,
  PaintBucket,
  BoxSelect,
  CornerUpLeft,
  Filter,
  Scaling,
  Boxes,
  Shrink,
  Expand,
  LayoutGrid,
  PanelLeft,
  PanelRight,
  TextSelection,
  TextCursor,
  ScrollText,
  TextQuote,
  Baseline,
  Shuffle,
  Binary,
  Github,
  Clipboard,
  Wand2,
  Sparkles,
  SparkleIcon,
  Speech,
  CloudCog,
  LibrarySquare,
  SquareDashedBottom,
  Group as GroupIcon,
  Stars,
  Share2,
  History,
  PieChart,
  Sliders,
  Database,
  Save as SaveIcon,
  Loader2,
  PanelLeftClose,
  PanelRightClose,
  Text,
  CloudUpload,
  Check,
  RefreshCcw,
  Paperclip,
  FileCode,
  FileText,
  FileImage,
  FolderOpen,
  Monitor,
  Shield,
  Book,
  MessageSquare,
  BellRing,
  HelpCircle,
  Code2,
  Table,
  ListChecks,
  ShoppingCartIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Toggle } from "@/components/ui/toggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HexColorPicker, HexColorInput } from "react-colorful";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useHotkeys } from "react-hotkeys-hook";
import { useLocalStorage } from "react-use";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "@/components/ui/context-menu";
import { Progress } from "@/components/ui/progress";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Extended font list - comprehensive and categorized
const fonts = [
  // Sans-serif fonts
  { value: "Inter", label: "Inter", category: "Sans-serif", popular: true },
  { value: "Roboto", label: "Roboto", category: "Sans-serif", popular: true },
  { value: "Poppins", label: "Poppins", category: "Sans-serif", popular: true },
  {
    value: "Montserrat",
    label: "Montserrat",
    category: "Sans-serif",
    popular: true,
  },
  {
    value: "Open Sans",
    label: "Open Sans",
    category: "Sans-serif",
    popular: true,
  },
  { value: "Lato", label: "Lato", category: "Sans-serif", popular: true },
  { value: "Nunito", label: "Nunito", category: "Sans-serif" },
  { value: "Raleway", label: "Raleway", category: "Sans-serif" },
  { value: "Work Sans", label: "Work Sans", category: "Sans-serif" },
  { value: "Quicksand", label: "Quicksand", category: "Sans-serif" },

  // Serif fonts
  {
    value: "Playfair Display",
    label: "Playfair Display",
    category: "Serif",
    popular: true,
  },
  {
    value: "Merriweather",
    label: "Merriweather",
    category: "Serif",
    popular: true,
  },
  { value: "Lora", label: "Lora", category: "Serif" },
  { value: "Libre Baskerville", label: "Libre Baskerville", category: "Serif" },
  { value: "Cormorant", label: "Cormorant", category: "Serif" },
  { value: "Crimson Pro", label: "Crimson Pro", category: "Serif" },

  // Display fonts
  {
    value: "Bebas Neue",
    label: "Bebas Neue",
    category: "Display",
    popular: true,
  },
  { value: "Abril Fatface", label: "Abril Fatface", category: "Display" },
  { value: "Lobster", label: "Lobster", category: "Display" },
  { value: "Pacifico", label: "Pacifico", category: "Display" },

  // Monospace fonts
  {
    value: "JetBrains Mono",
    label: "JetBrains Mono",
    category: "Monospace",
    popular: true,
  },
  { value: "Fira Code", label: "Fira Code", category: "Monospace" },
  { value: "IBM Plex Mono", label: "IBM Plex Mono", category: "Monospace" },

  // Handwriting fonts
  {
    value: "Dancing Script",
    label: "Dancing Script",
    category: "Handwriting",
    popular: true,
  },
  { value: "Caveat", label: "Caveat", category: "Handwriting" },
  { value: "Satisfy", label: "Satisfy", category: "Handwriting" },
  { value: "Kalam", label: "Kalam", category: "Handwriting" },
  {
    value: "Shadows Into Light",
    label: "Shadows Into Light",
    category: "Handwriting",
  },
];

// Border style options
const borderStyles = [
  { value: "solid", label: "Solid" },
  { value: "dashed", label: "Dashed" },
  { value: "dotted", label: "Dotted" },
  { value: "double", label: "Double" },
  { value: "groove", label: "Groove" },
  { value: "ridge", label: "Ridge" },
  { value: "inset", label: "Inset" },
  { value: "outset", label: "Outset" },
];

// Text transform options
const textTransforms = [
  { value: "none", label: "None" },
  { value: "uppercase", label: "UPPERCASE" },
  { value: "lowercase", label: "lowercase" },
  { value: "capitalize", label: "Capitalize" },
];

// Blend mode options
const blendModes = [
  { value: "normal", label: "Normal" },
  { value: "multiply", label: "Multiply" },
  { value: "screen", label: "Screen" },
  { value: "overlay", label: "Overlay" },
  { value: "darken", label: "Darken" },
  { value: "lighten", label: "Lighten" },
  { value: "color-dodge", label: "Color Dodge" },
  { value: "color-burn", label: "Color Burn" },
  { value: "hard-light", label: "Hard Light" },
  { value: "soft-light", label: "Soft Light" },
  { value: "difference", label: "Difference" },
  { value: "exclusion", label: "Exclusion" },
  { value: "hue", label: "Hue" },
  { value: "saturation", label: "Saturation" },
  { value: "color", label: "Color" },
  { value: "luminosity", label: "Luminosity" },
];

// Shape options
const shapes = [
  { value: "rectangle", label: "Rectangle", icon: Square },
  { value: "circle", label: "Circle", icon: CircleIcon },
  { value: "triangle", label: "Triangle", icon: Triangle },
];

// Predefined color palettes
const colorPalettes = [
  {
    name: "Nature Wood",
    colors: ["#8B4513", "#A0522D", "#CD853F", "#DEB887", "#F5DEB3"],
    description: "Warm brown tones inspired by natural wood",
  },
  {
    name: "Modern Minimal",
    colors: ["#000000", "#333333", "#666666", "#999999", "#FFFFFF"],
    description: "Clean monochrome palette for elegant designs",
  },
  {
    name: "Pastel Dream",
    colors: ["#FFD1DC", "#FFF0F5", "#BDFFF3", "#BEEFB8", "#FFE4B5"],
    description: "Soft pastel colors for gentle aesthetics",
  },
  {
    name: "Bold Statement",
    colors: ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF"],
    description: "Vibrant primary colors for high-impact designs",
  },
  {
    name: "Earthy Tones",
    colors: ["#5F4B32", "#7B6245", "#9B8368", "#B7A58C", "#D9C5A0"],
    description: "Rich earth tones for natural, rustic designs",
  },
];

// Design templates organized by category and product type
const designTemplates = [
  {
    category: "Mobile Cases",
    templates: [
      {
        id: "mobile-template-1",
        name: "Modern Geometric",
        thumbnail: "/assets/templates/mobile/geometric.jpg",
        elements: [
          /* template elements would be defined here */
        ],
        tags: ["geometric", "modern", "minimal"],
      },
      {
        id: "mobile-template-2",
        name: "Floral Pattern",
        thumbnail: "/assets/templates/mobile/floral.jpg",
        elements: [
          /* template elements would be defined here */
        ],
        tags: ["floral", "nature", "decorative"],
      },
      {
        id: "mobile-template-3",
        name: "Custom Name",
        thumbnail: "/assets/templates/mobile/name.jpg",
        elements: [
          /* template elements would be defined here */
        ],
        tags: ["text", "personalized", "minimal"],
      },
    ],
  },
  {
    category: "Watch Accessories",
    templates: [
      {
        id: "watch-template-1",
        name: "Elegant Minimal",
        thumbnail: "/assets/templates/watch/minimal.jpg",
        elements: [
          /* template elements would be defined here */
        ],
        tags: ["minimal", "elegant", "classy"],
      },
      {
        id: "watch-template-2",
        name: "Modern Pattern",
        thumbnail: "/assets/templates/watch/pattern.jpg",
        elements: [
          /* template elements would be defined here */
        ],
        tags: ["pattern", "modern", "stylish"],
      },
    ],
  },
  {
    category: "Home Decor",
    templates: [
      {
        id: "nameplate-template-1",
        name: "Family Name",
        thumbnail: "/assets/templates/nameplate/family.jpg",
        elements: [
          /* template elements would be defined here */
        ],
        tags: ["family", "personalized", "elegant"],
      },
      {
        id: "nameplate-template-2",
        name: "Welcome Home",
        thumbnail: "/assets/templates/nameplate/welcome.jpg",
        elements: [
          /* template elements would be defined here */
        ],
        tags: ["welcome", "home", "decorative"],
      },
    ],
  },
];

// AI text suggestions based on product type
const aiTextSuggestions = {
  "Mobile Cases": [
    "Your Name",
    "Keep Calm and Carry On",
    "Best Dad Ever",
    "Adventure Awaits",
    "Live, Laugh, Love",
    "Born to Explore",
    "#VIBES",
    "Dream Big",
  ],
  "Watch Accessories": [
    "Time is Precious",
    "Seize the Day",
    "Every Moment Matters",
    "Your Initials",
    "Tempus Fugit",
    "Now is the Time",
  ],
  "Home Decor": [
    "The [Family Name] Family",
    "Home Sweet Home",
    "Welcome to Our Home",
    "Est. [Year]",
    "Where Love Grows",
    "Bless This Home",
  ],
  Accessories: [
    "Your Name",
    "Your Initials",
    "Best Friends",
    "Love",
    "Forever",
    "Adventure",
  ],
  Stationery: [
    "Your Name",
    "Your Initials",
    "Notes & Ideas",
    "From the Desk of...",
    "Thoughts & Dreams",
  ],
};

// Product type icons mapping
const productIcons = {
  "Mobile Cases": Smartphone,
  "Watch Accessories": Watch,
  "Home Decor": Home,
  Accessories: Key,
  Stationery: PenTool,
};

// Wood grain textures
const woodTextures = [
  { id: "oak", name: "Oak", url: "/assets/textures/oak-grain.jpg" },
  { id: "walnut", name: "Walnut", url: "/assets/textures/walnut-grain.jpg" },
  { id: "maple", name: "Maple", url: "/assets/textures/maple-grain.jpg" },
  { id: "cherry", name: "Cherry", url: "/assets/textures/cherry-grain.jpg" },
  { id: "pine", name: "Pine", url: "/assets/textures/pine-grain.jpg" },
];

// Material options for rendering preview
const materialOptions = [
  {
    id: "light-wood",
    name: "Light Wood",
    baseColor: "#D2B48C",
    roughness: 0.7,
    metalness: 0.1,
  },
  {
    id: "dark-wood",
    name: "Dark Wood",
    baseColor: "#5D4037",
    roughness: 0.65,
    metalness: 0.15,
  },
  {
    id: "polished-wood",
    name: "Polished Wood",
    baseColor: "#8D6E63",
    roughness: 0.3,
    metalness: 0.2,
  },
  {
    id: "natural-grain",
    name: "Natural Grain",
    baseColor: "#A1887F",
    roughness: 0.8,
    metalness: 0.05,
  },
];

// 3D Wood Model component with texture
const WoodProductModel = ({ productType, texture, material, design }) => {
  // This would render a 3D model of the product with the applied design
  // Implementation would use Three.js/React Three Fiber

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center text-sm text-muted-foreground">
        3D Preview would render here with selected material and applied design
      </div>
    </div>
  );
};

// Enhanced rendering component using Konva for better performance
const DesignCanvas = ({
  elements,
  selectedId,
  canvasDimensions,
  onSelect,
  onModify,
  gridEnabled,
}) => {
  // This would render the design elements using Konva for high-performance canvas rendering
  // Implementation would handle all element transformations and interactions

  return (
    <div className="w-full h-full relative">
      <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
        Advanced canvas rendering would be implemented here
      </div>
    </div>
  );
};

// AI design assistant component
const DesignAssistant = ({ productType, onSuggest, onApply }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const generateSuggestions = async () => {
    setIsGenerating(true);

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In real implementation, this would call an AI service
    const mockSuggestions = [
      {
        type: "layout",
        name: "Centered Text with Image",
        preview: "/assets/suggestions/layout-1.jpg",
      },
      {
        type: "color",
        name: "Nature-inspired Palette",
        colors: ["#5D4037", "#7D5A50", "#B58463", "#E6CCB2"],
      },
      {
        type: "text",
        content:
          aiTextSuggestions[productType][
            Math.floor(Math.random() * aiTextSuggestions[productType].length)
          ],
      },
    ];

    setSuggestions(mockSuggestions);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-medium">Design Assistant</h3>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="h-7 text-xs"
          onClick={generateSuggestions}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
              Thinking...
            </>
          ) : (
            <>
              <Wand2 className="w-3 h-3 mr-1" />
              Suggest Ideas
            </>
          )}
        </Button>
      </div>

      {suggestions.length > 0 && (
        <div className="space-y-2">
          {suggestions.map((suggestion, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="p-3">
                <CardTitle className="text-xs flex items-center">
                  {suggestion.type === "layout" && (
                    <LayoutGrid className="w-3 h-3 mr-1" />
                  )}
                  {suggestion.type === "color" && (
                    <Palette className="w-3 h-3 mr-1" />
                  )}
                  {suggestion.type === "text" && (
                    <Text className="w-3 h-3 mr-1" />
                  )}
                  {suggestion.name ||
                    suggestion.type.charAt(0).toUpperCase() +
                      suggestion.type.slice(1)}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                {suggestion.type === "layout" && (
                  <AspectRatio ratio={4 / 3}>
                    <Image
                      src={suggestion.preview}
                      alt={suggestion.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </AspectRatio>
                )}
                {suggestion.type === "color" && (
                  <div className="flex gap-1">
                    {suggestion.colors.map((color, j) => (
                      <div
                        key={j}
                        className="w-full h-8 rounded-sm"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                )}
                {suggestion.type === "text" && (
                  <div className="bg-muted/30 p-2 rounded-md text-center">
                    <p className="text-sm">{suggestion.content}</p>
                  </div>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-full mt-2 text-xs h-7"
                  onClick={() => onApply(suggestion)}
                >
                  <Plus className="w-3 h-3 mr-1" /> Apply to Design
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {suggestions.length === 0 && !isGenerating && (
        <div className="bg-muted/30 p-3 rounded-md text-center">
          <p className="text-xs text-muted-foreground">
            Click "Suggest Ideas" to get AI-powered design recommendations
            tailored to your product
          </p>
        </div>
      )}
    </div>
  );
};

// Version history component
const VersionHistory = ({ versions, onRestore }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Version History</h3>
        <Badge variant="outline" className="text-[10px]">
          Auto-saved
        </Badge>
      </div>

      <ScrollArea className="h-[200px]">
        <div className="space-y-1">
          {versions.map((version) => (
            <div
              key={version.id}
              className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50 cursor-pointer text-xs"
              onClick={() => onRestore(version.id)}
            >
              <div>
                <p className="font-medium">{version.name}</p>
                <p className="text-[10px] text-muted-foreground">
                  {version.timestamp}
                </p>
              </div>
              <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                <CornerUpLeft className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

// Smart guides component
const SmartGuides = ({ elements, activeElement }) => {
  // This would calculate and render alignment guides between elements

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Smart guides would render here */}
    </div>
  );
};

export default function EditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const resolvedParams = React.use(params);
  const productId = parseInt(resolvedParams.id, 10);

  // Zustand store
  const {
    // Product state
    selectedProduct,
    setSelectedProduct,
    getProductById,
    clearSelectedProduct,
    // Customization state
    customization,
    updateCustomization,
    addElement,
    updateElement,
    removeElement,
    duplicateElement,
    selectElement,
    reorderElement,
    undo,
    redo,
    clearCustomization,
    setDesigning,
    // Cart state
    addToCart,
  } = useStore();

  // UI refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftSidebarRef = useRef<HTMLDivElement>(null);
  const rightSidebarRef = useRef<HTMLDivElement>(null);

  // UI state
  const [isDragging, setIsDragging] = useState(false);
  const [dragElement, setDragElement] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [canvasDragging, setCanvasDragging] = useState(false);
  const [canvasDragStart, setCanvasDragStart] = useState({ x: 0, y: 0 });
  const [resizing, setResizing] = useState<"left" | "right" | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [initError, setInitError] = useState<string | null>(null);
  const [leftSidebarWidth, setLeftSidebarWidth] = useState(280);
  const [rightSidebarWidth, setRightSidebarWidth] = useState(320);
  const [leftSidebarVisible, setLeftSidebarVisible] = useState(true);
  const [rightSidebarVisible, setRightSidebarVisible] = useState(true);
  const [activeTab, setActiveTab] = useState("design");
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [currentColorProperty, setCurrentColorProperty] = useState<
    string | null
  >(null);
  const [userPerspective, setUserPerspective] = useState<
    "designer" | "developer"
  >("designer");
  const [zoomValue, setZoomValue] = useState(100);
  const [wheelZoomEnabled, setWheelZoomEnabled] = useState(true);
  const [showTemplatesModal, setShowTemplatesModal] = useState(false);
  const [showColorPaletteModal, setShowColorPaletteModal] = useState(false);
  const [selectedColorPalette, setSelectedColorPalette] = useState(
    colorPalettes[0]
  );
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [renderMode, setRenderMode] = useState<"standard" | "advanced" | "3d">(
    "standard"
  );
  const [selectedWoodTexture, setSelectedWoodTexture] = useState(
    woodTextures[0]
  );
  const [selectedMaterial, setSelectedMaterial] = useState(materialOptions[0]);
  const [autosaveEnabled, setAutosaveEnabled] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState("png");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [versionHistory, setVersionHistory] = useState([
    { id: "v1", name: "Initial Design", timestamp: "2025-07-25 19:15:32" },
    { id: "v2", name: "Added Text", timestamp: "2025-07-25 19:25:47" },
    { id: "v3", name: "Added Logo", timestamp: "2025-07-25 19:38:21" },
  ]);
  const [showDesignAssistant, setShowDesignAssistant] = useState(false);
  const [selectedElements, setSelectedElements] = useState<string[]>([]);
  const [gridSnapping, setGridSnapping] = useState(true);
  const [rulerVisible, setRulerVisible] = useState(false);
  const [groupingEnabled, setGroupingEnabled] = useState(false);
  const [elementsUndoStack, setElementsUndoStack] = useState<any[]>([]);
  const [elementsRedoStack, setElementsRedoStack] = useState<any[]>([]);

  const addTextElement = () => {
    try {
      // Add to undo stack first
      setElementsUndoStack((prev) => [
        ...prev,
        {
          action: "add",
          elements: [...customization.elements],
        },
      ]);

      // Clear redo stack
      setElementsRedoStack([]);

      // Get AI suggestion for the product type if available
      const suggestions = aiTextSuggestions[selectedProduct?.category || ""];
      const suggestedText =
        suggestions?.length > 0
          ? suggestions[Math.floor(Math.random() * suggestions.length)]
          : "Your Text Here";

      const newElement = {
        id: generateId(),
        type: "text" as const,
        content: suggestedText,
        position: { x: 50, y: 50 },
        dimensions: { width: "auto", height: "auto" },
        scale: 1,
        rotation: 0,
        opacity: 100,
        zIndex: customization.elements.length + 1,
        locked: false,
        visible: true,
        fontSize: 24,
        fontFamily: "Inter",
        fontWeight: 400,
        fontStyle: "normal",
        color: customization.darkMode ? "#ffffff" : "#000000",
        textAlign: "center" as const,
        isBold: false,
        isItalic: false,
        isUnderline: false,
        isStrikethrough: false,
        letterSpacing: 0,
        lineHeight: 1.4,
        textDecoration: "none",
        textTransform: "none",
        textIndent: 0,
        textShadow: {
          enabled: false,
          x: 0,
          y: 2,
          blur: 4,
          color: "rgba(0,0,0,0.3)",
        },
        backgroundColor: "transparent",
        padding: { top: 0, right: 0, bottom: 0, left: 0 },
        border: false,
        borderColor: "#000000",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 0,
        boxShadow: {
          enabled: false,
          x: 0,
          y: 4,
          blur: 8,
          spread: 0,
          color: "rgba(0,0,0,0.2)",
        },
      };

      addElement(newElement);
      updateCustomization({ tool: "select" });
      toast.success("Text element added!");
    } catch (error) {
      console.error("Error adding text:", error);
      toast.error("Failed to add text element");
    }
  };

  // Enhanced keyboard shortcuts with useHotkeys
  useHotkeys(
    "ctrl+z, cmd+z",
    (e) => {
      e.preventDefault();
      undo();
    },
    { enableOnFormTags: false }
  );
  useHotkeys(
    "ctrl+shift+z, cmd+shift+z, ctrl+y, cmd+y",
    (e) => {
      e.preventDefault();
      redo();
    },
    { enableOnFormTags: false }
  );
  useHotkeys(
    "ctrl+d, cmd+d",
    (e) => {
      e.preventDefault();
      if (customization.selectedElementId)
        duplicateElement(customization.selectedElementId);
    },
    { enableOnFormTags: false }
  );
  useHotkeys("v", () => updateCustomization({ tool: "select" }), {
    enableOnFormTags: false,
  });
  useHotkeys("h", () => updateCustomization({ tool: "hand" }), {
    enableOnFormTags: false,
  });
  useHotkeys("t", addTextElement, { enableOnFormTags: false });
  useHotkeys(
    "g",
    () => updateCustomization({ showGrid: !customization.showGrid }),
    { enableOnFormTags: false }
  );
  useHotkeys("r", () => setRulerVisible(!rulerVisible), {
    enableOnFormTags: false,
  });
  useHotkeys(
    "ctrl+=, cmd+=",
    (e) => {
      e.preventDefault();
      setZoom(zoomValue + 10);
    },
    { enableOnFormTags: false }
  );
  useHotkeys(
    "ctrl+-, cmd+-",
    (e) => {
      e.preventDefault();
      setZoom(zoomValue - 10);
    },
    { enableOnFormTags: false }
  );
  useHotkeys(
    "ctrl+0, cmd+0",
    (e) => {
      e.preventDefault();
      setZoom(100);
    },
    { enableOnFormTags: false }
  );
  useHotkeys(
    "delete, backspace",
    () => {
      if (customization.selectedElementId)
        removeElement(customization.selectedElementId);
    },
    { enableOnFormTags: false }
  );
  useHotkeys("escape", () => selectElement(null), { enableOnFormTags: false });
  useHotkeys(
    "ctrl+/, cmd+/",
    (e) => {
      e.preventDefault();
      setShowKeyboardShortcuts(true);
    },
    { enableOnFormTags: false }
  );
  useHotkeys(
    "ctrl+s, cmd+s",
    (e) => {
      e.preventDefault();
      saveDesign();
    },
    { enableOnFormTags: false }
  );
  useHotkeys(
    "ctrl+g, cmd+g",
    (e) => {
      e.preventDefault();
      if (selectedElements.length > 1) groupElements();
    },
    { enableOnFormTags: false }
  );

  // Initialize editor from store
  useEffect(() => {
    const initializeEditor = async () => {
      try {
        console.log("Initializing editor for product ID:", productId);
        setIsLoading(true);
        setInitError(null);
        setDesigning(true);

        // Validate product ID
        if (isNaN(productId)) {
          setInitError("Invalid product ID");
          return;
        }

        // Get product from store
        const product = getProductById(productId);
        if (!product) {
          setInitError("Product not found");
          return;
        }

        console.log("Product loaded:", product);

        // Set the product in store
        setSelectedProduct(product);

        // Get canvas dimensions based on product type
        const canvasDimensions = getCanvasDimensions(product.category);
        console.log("Canvas dimensions:", canvasDimensions);

        // Initialize customization with product-specific settings
        updateCustomization({
          selectedProductType: product.productType,
          canvasPosition: { x: 0, y: 0 },
          zoom: 100,
          showGrid: false,
          tool: "select",
          elements: [],
          selectedElementId: null,
        });

        // Simulate loading of resources (textures, fonts, etc.)
        await new Promise((resolve) => setTimeout(resolve, 800));

        toast.success(`${product.title} editor loaded successfully!`);

        // Start autosave interval
        const now = new Date();
        setLastSaved(now);
      } catch (error) {
        console.error("Editor initialization error:", error);
        setInitError("Failed to initialize editor");
        toast.error("Failed to initialize editor");
      } finally {
        setIsLoading(false);
      }
    };

    initializeEditor();

    // Cleanup on unmount
    return () => {
      setDesigning(false);
      clearSelectedProduct();
    };
  }, [
    productId,
    getProductById,
    setSelectedProduct,
    clearSelectedProduct,
    updateCustomization,
    setDesigning,
  ]);

  // Autosave functionality
  useEffect(() => {
    if (!autosaveEnabled || !selectedProduct) return;

    const autosaveInterval = setInterval(() => {
      if (customization.elements.length > 0) {
        saveDesign(true);
      }
    }, 60000); // Autosave every minute

    return () => clearInterval(autosaveInterval);
  }, [autosaveEnabled, customization.elements, selectedProduct]);

  // Save design function
  const saveDesign = async (isAuto = false) => {
    if (isSaving) return;

    try {
      setIsSaving(true);

      // Simulate API call to save design
      await new Promise((resolve) => setTimeout(resolve, 700));

      const now = new Date();
      setLastSaved(now);

      if (!isAuto) {
        toast.success("Design saved successfully!");
      }

      // Add to version history
      const newVersion = {
        id: `v${versionHistory.length + 1}`,
        name: isAuto ? "Auto-saved design" : "Manually saved design",
        timestamp: now.toLocaleString(),
        design: JSON.stringify(customization.elements),
      };

      setVersionHistory((prev) => [newVersion, ...prev]);
    } catch (error) {
      console.error("Error saving design:", error);
      toast.error("Failed to save design");
    } finally {
      setIsSaving(false);
    }
  };

  // Export design function
  const exportDesign = async (format = "png") => {
    if (isExporting || !canvasRef.current) return;

    try {
      setIsExporting(true);

      // Use html-to-image to export the canvas
      let dataUrl;
      switch (format) {
        case "png":
          dataUrl = await toPng(canvasRef.current);
          break;
        case "jpeg":
          dataUrl = await toJpeg(canvasRef.current);
          break;
        case "svg":
          dataUrl = await toSvg(canvasRef.current);
          break;
        default:
          dataUrl = await toPng(canvasRef.current);
      }

      // Create download link
      const link = document.createElement("a");
      link.download = `${selectedProduct.title.replace(
        /\s+/g,
        "-"
      )}-design.${format}`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success(`Design exported as ${format.toUpperCase()}`);
    } catch (error) {
      console.error("Error exporting design:", error);
      toast.error("Failed to export design");
    } finally {
      setIsExporting(false);
    }
  };

  // Handle sidebar resizing
  const handleResizeStart =
    (side: "left" | "right") => (e: React.MouseEvent) => {
      e.preventDefault();
      setResizing(side);
    };

  const handleResizeMove = useCallback(
    (e: MouseEvent) => {
      if (!resizing || !containerRef.current) return;

      const container = containerRef.current.getBoundingClientRect();

      if (resizing === "left") {
        const newWidth = Math.max(
          240,
          Math.min(480, e.clientX - container.left)
        );
        setLeftSidebarWidth(newWidth);
      } else if (resizing === "right") {
        const newWidth = Math.max(
          240,
          Math.min(600, container.right - e.clientX)
        );
        setRightSidebarWidth(newWidth);
      }
    },
    [resizing]
  );

  const handleResizeEnd = useCallback(() => {
    setResizing(null);
  }, []);

  // Set up resize event listeners
  useEffect(() => {
    if (resizing) {
      window.addEventListener("mousemove", handleResizeMove);
      window.addEventListener("mouseup", handleResizeEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleResizeMove);
      window.removeEventListener("mouseup", handleResizeEnd);
    };
  }, [resizing, handleResizeMove, handleResizeEnd]);

  // Mouse wheel zoom handling
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!wheelZoomEnabled || !canvasRef.current) return;

      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const zoomDelta = e.deltaY < 0 ? 5 : -5;
        const newZoom = Math.max(10, Math.min(400, zoomValue + zoomDelta));
        setZoomValue(newZoom);
        updateCustomization({ zoom: newZoom });
      }
    };

    canvasRef.current?.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      canvasRef.current?.removeEventListener("wheel", handleWheel);
    };
  }, [wheelZoomEnabled, zoomValue, updateCustomization]);

  // Get canvas dimensions based on product type
  const getCanvasDimensions = (category: string) => {
    const dimensions = {
      "Mobile Cases": { width: 360, height: 720, type: "mobile" },
      "Watch Accessories": { width: 300, height: 300, type: "watch" },
      "Home Decor": { width: 400, height: 200, type: "nameplate" },
      Accessories: { width: 200, height: 200, type: "keychain" },
      Stationery: { width: 400, height: 80, type: "pen" },
    };

    return (
      dimensions[category as keyof typeof dimensions] || {
        width: 400,
        height: 400,
        type: "default",
      }
    );
  };

  // Get product icon based on category
  const getProductIcon = (category: string) => {
    return productIcons[category as keyof typeof productIcons] || Palette;
  };

  // Generate unique ID for elements
  const generateId = () => `element_${Date.now()}_${uuidv4()}`;

  // Add image element to store with extended properties
  const addImageElement = (imageUrl: string) => {
    try {
      // Add to undo stack first
      setElementsUndoStack((prev) => [
        ...prev,
        {
          action: "add",
          elements: [...customization.elements],
        },
      ]);

      // Clear redo stack
      setElementsRedoStack([]);

      const newElement = {
        id: generateId(),
        type: "image" as const,
        content: imageUrl,
        position: { x: 50, y: 50 },
        dimensions: { width: 150, height: 150 },
        scale: 1,
        rotation: 0,
        opacity: 100,
        zIndex: customization.elements.length + 1,
        locked: false,
        visible: true,
        flipX: false,
        flipY: false,
        borderRadius: 0,
        border: false,
        borderColor: "#000000",
        borderWidth: 1,
        borderStyle: "solid",
        brightness: 100,
        contrast: 100,
        saturation: 100,
        hueRotate: 0,
        blur: 0,
        sepia: 0,
        grayscale: 0,
        backgroundTransparency: 0,
        backgroundBlendMode: "normal",
        boxShadow: {
          enabled: false,
          x: 0,
          y: 4,
          blur: 8,
          spread: 0,
          color: "rgba(0,0,0,0.2)",
        },
        aspectRatio: "auto",
        objectFit: "cover",
        mixBlendMode: "normal",
        metadata: {
          addedAt: new Date().toISOString(),
          originalSize: { width: 0, height: 0 }, // Would be set by examining the actual image
        },
      };

      addElement(newElement);
      updateCustomization({ tool: "select" });
      toast.success("Image added successfully!");
    } catch (error) {
      console.error("Error adding image:", error);
      toast.error("Failed to add image");
    }
  };

  // Add shape element
  const addShapeElement = (shapeType: string) => {
    try {
      // Add to undo stack first
      setElementsUndoStack((prev) => [
        ...prev,
        {
          action: "add",
          elements: [...customization.elements],
        },
      ]);

      // Clear redo stack
      setElementsRedoStack([]);

      const newElement = {
        id: generateId(),
        type: "shape" as const,
        shapeType, // rectangle, circle, triangle, etc.
        position: { x: 50, y: 50 },
        dimensions: {
          width: shapeType === "circle" ? 100 : 150,
          height:
            shapeType === "circle" ? 100 : shapeType === "triangle" ? 130 : 100,
        },
        scale: 1,
        rotation: 0,
        opacity: 100,
        zIndex: customization.elements.length + 1,
        locked: false,
        visible: true,
        fill: selectedColorPalette.colors[0],
        stroke: "transparent",
        strokeWidth: 0,
        borderRadius: shapeType === "rectangle" ? 0 : 0,
        boxShadow: {
          enabled: false,
          x: 0,
          y: 4,
          blur: 8,
          spread: 0,
          color: "rgba(0,0,0,0.2)",
        },
      };

      addElement(newElement);
      updateCustomization({ tool: "select" });
      toast.success(
        `${shapeType.charAt(0).toUpperCase() + shapeType.slice(1)} added`
      );
    } catch (error) {
      console.error(`Error adding ${shapeType}:`, error);
      toast.error(`Failed to add ${shapeType}`);
    }
  };

  // Add text element to store with extended properties

  // Group selected elements
  const groupElements = () => {
    if (selectedElements.length < 2) return;

    try {
      // Add to undo stack first
      setElementsUndoStack((prev) => [
        ...prev,
        {
          action: "group",
          elements: [...customization.elements],
          selectedElements: [...selectedElements],
        },
      ]);

      // Clear redo stack
      setElementsRedoStack([]);

      const groupedElements = customization.elements.filter((el) =>
        selectedElements.includes(el.id)
      );

      // Calculate group bounds
      let minX = Infinity,
        minY = Infinity,
        maxX = -Infinity,
        maxY = -Infinity;

      groupedElements.forEach((el) => {
        const elWidth = el.dimensions?.width || 100;
        const elHeight = el.dimensions?.height || 100;

        const left = el.position.x - elWidth / 2;
        const right = el.position.x + elWidth / 2;
        const top = el.position.y - elHeight / 2;
        const bottom = el.position.y + elHeight / 2;

        minX = Math.min(minX, left);
        maxX = Math.max(maxX, right);
        minY = Math.min(minY, top);
        maxY = Math.max(maxY, bottom);
      });

      const groupWidth = maxX - minX;
      const groupHeight = maxY - minY;
      const groupX = minX + groupWidth / 2;
      const groupY = minY + groupHeight / 2;

      // Create group element
      const newGroup = {
        id: generateId(),
        type: "group" as const,
        position: { x: groupX, y: groupY },
        dimensions: { width: groupWidth, height: groupHeight },
        scale: 1,
        rotation: 0,
        opacity: 100,
        zIndex: Math.max(...groupedElements.map((el) => el.zIndex)) + 1,
        locked: false,
        visible: true,
        children: groupedElements.map((el) => ({
          ...el,
          originalPosition: { ...el.position },
          relativePosition: {
            x: el.position.x - groupX,
            y: el.position.y - groupY,
          },
        })),
      };

      // Remove individual elements
      groupedElements.forEach((el) => {
        removeElement(el.id);
      });

      // Add group
      addElement(newGroup);
      selectElement(newGroup.id);
      setSelectedElements([newGroup.id]);

      toast.success(`${groupedElements.length} elements grouped`);
    } catch (error) {
      console.error("Error grouping elements:", error);
      toast.error("Failed to group elements");
    }
  };

  // Ungroup elements
  const ungroupElements = (groupId: string) => {
    const group = customization.elements.find((el) => el.id === groupId);
    if (!group || group.type !== "group") return;

    try {
      // Add to undo stack first
      setElementsUndoStack((prev) => [
        ...prev,
        {
          action: "ungroup",
          elements: [...customization.elements],
          group: group,
        },
      ]);

      // Clear redo stack
      setElementsRedoStack([]);

      // Add individual elements back
      group.children.forEach((child) => {
        const newElement = {
          ...child,
          id: generateId(), // Give it a new ID
          position: {
            x: group.position.x + child.relativePosition.x,
            y: group.position.y + child.relativePosition.y,
          },
        };

        delete newElement.originalPosition;
        delete newElement.relativePosition;

        addElement(newElement);
      });

      // Remove group
      removeElement(groupId);
      selectElement(null);
      setSelectedElements([]);

      toast.success(`Group ungrouped into ${group.children.length} elements`);
    } catch (error) {
      console.error("Error ungrouping elements:", error);
      toast.error("Failed to ungroup elements");
    }
  };

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Image size must be less than 10MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          addImageElement(e.target.result as string);
        }
      };
      reader.onerror = () => {
        toast.error("Failed to read image file");
      };
      reader.readAsDataURL(file);
    }
  };

  // Canvas drag and pan
  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (customization.tool === "hand") {
      setCanvasDragging(true);
      setCanvasDragStart({
        x: e.clientX - customization.canvasPosition.x,
        y: e.clientY - customization.canvasPosition.y,
      });
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (canvasDragging && customization.tool === "hand") {
      updateCustomization({
        canvasPosition: {
          x: e.clientX - canvasDragStart.x,
          y: e.clientY - canvasDragStart.y,
        },
      });
    }
  };

  const handleCanvasMouseUp = () => {
    setCanvasDragging(false);
  };

  // Element dragging
  const handleElementMouseDown = (e: React.MouseEvent, elementId: string) => {
    if (customization.tool !== "select") return;

    const element = customization.elements.find((el) => el.id === elementId);
    if (!element || element.locked) return;

    setIsDragging(true);
    setDragElement(elementId);

    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const elementRect = e.currentTarget.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - elementRect.left - elementRect.width / 2,
        y: e.clientY - elementRect.top - elementRect.height / 2,
      });
    }

    // Handle multi-selection with shift key
    if (e.shiftKey) {
      if (selectedElements.includes(elementId)) {
        // Remove from selection if already selected
        setSelectedElements((prev) => prev.filter((id) => id !== elementId));
      } else {
        // Add to selection
        setSelectedElements((prev) => [...prev, elementId]);
      }
    } else {
      // Clear selection and select only this element if shift isn't pressed
      selectElement(elementId);
      setSelectedElements([elementId]);
    }

    e.preventDefault();
    e.stopPropagation();
  };

  const handleElementMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !dragElement || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    let x = ((e.clientX - rect.left - dragOffset.x) / rect.width) * 100;
    let y = ((e.clientY - rect.top - dragOffset.y) / rect.height) * 100;

    // Apply grid snapping if enabled
    if (gridSnapping && customization.showGrid) {
      const gridSize = 5; // 5% grid
      x = Math.round(x / gridSize) * gridSize;
      y = Math.round(y / gridSize) * gridSize;
    }

    x = Math.max(5, Math.min(95, x));
    y = Math.max(5, Math.min(95, y));

    // Update single element or all selected elements
    if (selectedElements.length > 1 && selectedElements.includes(dragElement)) {
      // Get the delta movement
      const element = customization.elements.find(
        (el) => el.id === dragElement
      );
      if (!element) return;

      const deltaX = x - element.position.x;
      const deltaY = y - element.position.y;

      // Move all selected elements by the same delta
      selectedElements.forEach((id) => {
        const el = customization.elements.find((e) => e.id === id);
        if (el && !el.locked) {
          updateElement(id, {
            position: {
              x: Math.max(5, Math.min(95, el.position.x + deltaX)),
              y: Math.max(5, Math.min(95, el.position.y + deltaY)),
            },
          });
        }
      });
    } else {
      // Move just the dragged element
      updateElement(dragElement, {
        position: { x, y },
      });
    }
  };

  const handleElementMouseUp = () => {
    if (isDragging && dragElement) {
      // Add movement to undo stack
      setElementsUndoStack((prev) => [
        ...prev,
        {
          action: "move",
          elements: [...customization.elements],
        },
      ]);

      // Clear redo stack
      setElementsRedoStack([]);
    }

    setIsDragging(false);
    setDragElement(null);
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleElementMouseUp);
    document.addEventListener("mouseup", handleCanvasMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleElementMouseUp);
      document.removeEventListener("mouseup", handleCanvasMouseUp);
    };
  }, [isDragging, dragElement]);

  // Get selected element from store
  const selectedElement = customization.elements.find(
    (el) => el.id === customization.selectedElementId
  );

  // Apply template to design
  const applyTemplate = (template: any) => {
    if (!template) return;

    try {
      // Store current state for undo
      setElementsUndoStack((prev) => [
        ...prev,
        {
          action: "template",
          elements: [...customization.elements],
        },
      ]);

      // Clear existing elements
      customization.elements.forEach((el) => {
        removeElement(el.id);
      });

      // Add template elements
      template.elements.forEach((el) => {
        addElement({
          ...el,
          id: generateId(), // Give each element a new ID
        });
      });

      setShowTemplatesModal(false);
      toast.success(`Template "${template.name}" applied successfully!`);
    } catch (error) {
      console.error("Error applying template:", error);
      toast.error("Failed to apply template");
    }
  };

  // Apply color palette
  const applyColorPalette = (palette: any) => {
    setSelectedColorPalette(palette);
    setShowColorPaletteModal(false);

    // If elements exist, ask if user wants to update existing elements
    if (customization.elements.length > 0) {
      toast({
        title: "Apply colors to existing elements?",
        description: "This will update colors of your text and shape elements.",
        action: {
          label: "Apply Colors",
          onClick: () => {
            // Store current state for undo
            setElementsUndoStack((prev) => [
              ...prev,
              {
                action: "colors",
                elements: [...customization.elements],
              },
            ]);

            // Apply colors to elements
            customization.elements.forEach((el, index) => {
              const colorIndex = index % palette.colors.length;

              if (el.type === "text") {
                updateElement(el.id, { color: palette.colors[colorIndex] });
              } else if (el.type === "shape") {
                updateElement(el.id, { fill: palette.colors[colorIndex] });
              }
            });

            toast.success("Color palette applied to elements");
          },
        },
      });
    }
  };

  // Apply AI suggestion
  const applyAISuggestion = (suggestion: any) => {
    try {
      // Store current state for undo
      setElementsUndoStack((prev) => [
        ...prev,
        {
          action: "ai-suggestion",
          elements: [...customization.elements],
        },
      ]);

      if (suggestion.type === "text") {
        addTextElement();
        // Find the newly added element
        const lastElement =
          customization.elements[customization.elements.length - 1];
        if (lastElement) {
          updateElement(lastElement.id, {
            content: suggestion.content,
          });
        }
      } else if (suggestion.type === "color") {
        // Apply the color palette
        applyColorPalette({
          name: "AI Suggested Palette",
          colors: suggestion.colors,
          description: "Colors suggested by AI",
        });
      } else if (suggestion.type === "layout") {
        // In a real implementation, this would apply a template
        toast.info("Layout suggestions would apply predefined arrangements");
      }

      toast.success("AI suggestion applied");
    } catch (error) {
      console.error("Error applying AI suggestion:", error);
      toast.error("Failed to apply suggestion");
    }
  };

  // Handle add to cart / order now
  const handleProceedToOrder = async () => {
    try {
      if (!selectedProduct || customization.elements.length === 0) {
        toast.error("Please add some design elements before ordering");
        return;
      }

      // Save design first
      await saveDesign();

      // Extract essential design data
      const designData = {
        product: selectedProduct,
        customization: customization,
        timestamp: new Date().toISOString(),
        version: versionHistory[0], // Most recent version
      };

      // Add to cart
      const cartItem = {
        product: selectedProduct,
        customization: customization,
        quantity: 1,
        price: selectedProduct.price,
        designPreview: await captureDesignThumbnail(),
      };

      // Continuing from where the code was cut off in handleProceedToOrder function:

      addToCart(cartItem);

      // Show success toast and navigate to checkout
      toast.success("Design saved! Proceeding to checkout...", {
        duration: 3000,
      });

      // Navigate to checkout with a small delay to allow toast to be seen
      setTimeout(() => {
        router.push("/checkout");
      }, 1000);
    } catch (error) {
      console.error("Order error:", error);
      toast.error("Failed to process order");
    }
  };

  // Capture design thumbnail for cart/preview
  const captureDesignThumbnail = async () => {
    if (!canvasRef.current) return null;

    try {
      const dataUrl = await toPng(canvasRef.current, {
        quality: 0.85,
        width: 300,
        height: 300 * (canvasDimensions.height / canvasDimensions.width),
        canvasWidth: 300,
        canvasHeight: 300 * (canvasDimensions.height / canvasDimensions.width),
      });

      return dataUrl;
    } catch (error) {
      console.error("Error capturing thumbnail:", error);
      return null;
    }
  };

  // Set zoom directly
  const setZoom = (zoom: number) => {
    const newZoom = Math.max(10, Math.min(400, zoom));
    setZoomValue(newZoom);
    updateCustomization({ zoom: newZoom });
  };

  // Handle resize of element
  const handleElementResize = (
    elementId: string,
    dimensions: { width: number | string; height: number | string }
  ) => {
    // Store current state for undo
    setElementsUndoStack((prev) => [
      ...prev,
      {
        action: "resize",
        elements: [...customization.elements],
      },
    ]);

    updateElement(elementId, { dimensions });

    // Clear redo stack after a change
    setElementsRedoStack([]);
  };

  // Restore version from history
  const restoreVersion = (versionId: string) => {
    try {
      const version = versionHistory.find((v) => v.id === versionId);
      if (!version || !version.design) {
        toast.error("Version data not found");
        return;
      }

      // Store current state for undo
      setElementsUndoStack((prev) => [
        ...prev,
        {
          action: "restore-version",
          elements: [...customization.elements],
        },
      ]);

      // Parse the design data
      const restoredElements = JSON.parse(version.design);

      // Clear existing elements
      customization.elements.forEach((el) => {
        removeElement(el.id);
      });

      // Add restored elements
      restoredElements.forEach((el: any) => {
        addElement({
          ...el,
          id: generateId(), // Give each element a new ID to avoid conflicts
        });
      });

      toast.success(`Restored version: ${version.name}`);
    } catch (error) {
      console.error("Error restoring version:", error);
      toast.error("Failed to restore version");
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-3 flex items-center justify-center">
              {selectedProduct?.category &&
                getProductIcon(selectedProduct.category) && (
                  <ShoppingCartIcon className="w-10 h-10 text-primary opacity-50" />
                )}
            </div>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Loading Pro Design Studio
          </h3>
          <p className="text-muted-foreground mb-8">
            Setting up your professional design environment...
          </p>
          <div className="w-64 mx-auto">
            <Progress value={65} className="h-1" />
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Loading resources and textures...
          </p>
        </motion.div>
      </div>
    );
  }

  // Error state
  if (initError || !selectedProduct) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto p-8 bg-card rounded-2xl shadow-xl border"
        >
          <div className="w-16 h-16 mx-auto mb-6 bg-destructive/10 rounded-full flex items-center justify-center">
            <ArrowLeft className="w-8 h-8 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-4">
            {initError || "Product Not Found"}
          </h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {initError
              ? "There was an error loading the product editor."
              : `Product with ID "${productId}" could not be found.`}
          </p>
          <Link href="/products">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const canvasDimensions = getCanvasDimensions(selectedProduct.category);
  const ProductIcon = getProductIcon(selectedProduct.category);

  return (
    <div
      className={cn(
        "h-screen flex flex-col transition-colors duration-200",
        customization.darkMode
          ? "bg-gray-950 text-gray-100"
          : "bg-gray-50 text-gray-900"
      )}
    >
      {/* Top Toolbar */}
      <div
        className={cn(
          "h-12 border-b flex items-center px-3 justify-between transition-colors duration-200",
          customization.darkMode
            ? "bg-gray-950 border-gray-800"
            : "bg-white border-gray-200"
        )}
      >
        <div className="flex items-center gap-2">
          {/* Back Button & Logo */}
          <div className="flex items-center gap-2">
            <Link href={`/product/${selectedProduct.id}`}>
              <Button variant="ghost" size="sm" className="p-1">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
                <ProductIcon className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xs font-semibold text-foreground">
                  {selectedProduct.title}
                </h1>
                <p className="text-[10px] text-muted-foreground">
                  Pro Editor • {selectedProduct.category}
                </p>
              </div>
            </div>
          </div>

          <Separator orientation="vertical" className="h-5 mx-1" />

          {/* File Controls */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs gap-1"
              >
                File
                <ChevronRight className="w-3 h-3 rotate-90 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60">
              <DropdownMenuLabel className="text-xs">Project</DropdownMenuLabel>
              <DropdownMenuItem onClick={saveDesign} className="text-xs gap-2">
                <SaveIcon className="w-3.5 h-3.5" />
                Save Design
                <div className="ml-auto text-muted-foreground text-[10px]">
                  Ctrl+S
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-xs">Export</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => exportDesign("png")}
                className="text-xs gap-2"
              >
                <FileImage className="w-3.5 h-3.5" />
                Export as PNG
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => exportDesign("jpeg")}
                className="text-xs gap-2"
              >
                <FileImage className="w-3.5 h-3.5" />
                Export as JPEG
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => exportDesign("svg")}
                className="text-xs gap-2"
              >
                <FileCode className="w-3.5 h-3.5" />
                Export as SVG
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setShowTemplatesModal(true)}
                className="text-xs gap-2"
              >
                <FolderOpen className="w-3.5 h-3.5" />
                Open Template
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleProceedToOrder}
                className="text-xs gap-2"
              >
                <CreditCard className="w-3.5 h-3.5" />
                Complete Order
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs gap-1"
              >
                Edit
                <ChevronRight className="w-3 h-3 rotate-90 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60">
              <DropdownMenuItem onClick={undo} className="text-xs gap-2">
                <Undo className="w-3.5 h-3.5" />
                Undo
                <div className="ml-auto text-muted-foreground text-[10px]">
                  Ctrl+Z
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={redo} className="text-xs gap-2">
                <Redo className="w-3.5 h-3.5" />
                Redo
                <div className="ml-auto text-muted-foreground text-[10px]">
                  Ctrl+Y
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  if (selectedElement) {
                    duplicateElement(selectedElement.id);
                  }
                }}
                className="text-xs gap-2"
              >
                <Copy className="w-3.5 h-3.5" />
                Duplicate
                <div className="ml-auto text-muted-foreground text-[10px]">
                  Ctrl+D
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  if (selectedElements.length > 1) {
                    groupElements();
                  }
                }}
                className="text-xs gap-2"
                disabled={selectedElements.length < 2}
              >
                <GroupIcon className="w-3.5 h-3.5" />
                Group Elements
                <div className="ml-auto text-muted-foreground text-[10px]">
                  Ctrl+G
                </div>
              </DropdownMenuItem>
              {selectedElement?.type === "group" && (
                <DropdownMenuItem
                  onClick={() => ungroupElements(selectedElement.id)}
                  className="text-xs gap-2"
                >
                  <Boxes className="w-3.5 h-3.5" />
                  Ungroup
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  updateCustomization({ showGrid: !customization.showGrid })
                }
                className="text-xs gap-2"
              >
                <Grid3X3 className="w-3.5 h-3.5" />
                {customization.showGrid ? "Hide Grid" : "Show Grid"}
                <div className="ml-auto text-muted-foreground text-[10px]">
                  G
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setGridSnapping(!gridSnapping)}
                className="text-xs gap-2"
              >
                <Binary className="w-3.5 h-3.5" />
                {gridSnapping ? "Disable Snapping" : "Enable Snapping"}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setRulerVisible(!rulerVisible)}
                className="text-xs gap-2"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                {rulerVisible ? "Hide Rulers" : "Show Rulers"}
                <div className="ml-auto text-muted-foreground text-[10px]">
                  R
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs gap-1"
              >
                View
                <ChevronRight className="w-3 h-3 rotate-90 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60">
              <DropdownMenuItem
                onClick={() => setZoom(100)}
                className="text-xs gap-2"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                Reset Zoom (100%)
                <div className="ml-auto text-muted-foreground text-[10px]">
                  Ctrl+0
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setZoom(zoomValue + 10)}
                className="text-xs gap-2"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                Zoom In
                <div className="ml-auto text-muted-foreground text-[10px]">
                  Ctrl++
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setZoom(zoomValue - 10)}
                className="text-xs gap-2"
              >
                <ZoomOut className="w-3.5 h-3.5" />
                Zoom Out
                <div className="ml-auto text-muted-foreground text-[10px]">
                  Ctrl+-
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  setRenderMode(renderMode === "standard" ? "3d" : "standard")
                }
                className="text-xs gap-2"
              >
                <Monitor className="w-3.5 h-3.5" />
                {renderMode === "standard"
                  ? "3D Preview Mode"
                  : "Standard View Mode"}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  updateCustomization({ darkMode: !customization.darkMode })
                }
                className="text-xs gap-2"
              >
                {customization.darkMode ? (
                  <Sun className="w-3.5 h-3.5" />
                ) : (
                  <Moon className="w-3.5 h-3.5" />
                )}
                {customization.darkMode ? "Light Theme" : "Dark Theme"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setLeftSidebarVisible(!leftSidebarVisible)}
                className="text-xs gap-2"
              >
                {leftSidebarVisible ? (
                  <PanelLeftClose className="w-3.5 h-3.5" />
                ) : (
                  <PanelLeft className="w-3.5 h-3.5" />
                )}
                {leftSidebarVisible ? "Hide Layers Panel" : "Show Layers Panel"}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setRightSidebarVisible(!rightSidebarVisible)}
                className="text-xs gap-2"
              >
                {rightSidebarVisible ? (
                  <PanelRightClose className="w-3.5 h-3.5" />
                ) : (
                  <PanelRight className="w-3.5 h-3.5" />
                )}
                {rightSidebarVisible
                  ? "Hide Properties Panel"
                  : "Show Properties Panel"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs gap-1"
              >
                Insert
                <ChevronRight className="w-3 h-3 rotate-90 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuItem
                onClick={addTextElement}
                className="text-xs gap-2"
              >
                <Type className="w-3.5 h-3.5" />
                Text
                <div className="ml-auto text-muted-foreground text-[10px]">
                  T
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => fileInputRef.current?.click()}
                className="text-xs gap-2"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                Image
                <div className="ml-auto text-muted-foreground text-[10px]">
                  I
                </div>
              </DropdownMenuItem>

              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="text-xs gap-2">
                  <Square className="w-3.5 h-3.5" />
                  Shape
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="w-32">
                  <DropdownMenuItem
                    onClick={() => addShapeElement("rectangle")}
                    className="text-xs gap-2"
                  >
                    <Square className="w-3.5 h-3.5" />
                    Rectangle
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => addShapeElement("circle")}
                    className="text-xs gap-2"
                  >
                    <CircleIcon className="w-3.5 h-3.5" />
                    Circle
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => addShapeElement("triangle")}
                    className="text-xs gap-2"
                  >
                    <Triangle className="w-3.5 h-3.5" />
                    Triangle
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setShowTemplatesModal(true)}
                className="text-xs gap-2"
              >
                <LibrarySquare className="w-3.5 h-3.5" />
                Template
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setShowColorPaletteModal(true)}
                className="text-xs gap-2"
              >
                <Palette className="w-3.5 h-3.5" />
                Color Palette
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Separator orientation="vertical" className="h-5 mx-1" />

          {/* History Controls */}
          <div className="flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={undo}
                    className="h-7 w-7 p-0"
                  >
                    <Undo className="w-3.5 h-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">
                  Undo (Ctrl+Z)
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={redo}
                    className="h-7 w-7 p-0"
                  >
                    <Redo className="w-3.5 h-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">
                  Redo (Ctrl+Y)
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <Separator orientation="vertical" className="h-5 mx-1" />

          {/* Tools */}
          <div className="flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={
                      customization.tool === "select" ? "default" : "ghost"
                    }
                    size="sm"
                    onClick={() => updateCustomization({ tool: "select" })}
                    className="h-7 w-7 p-0"
                  >
                    <MousePointer className="w-3.5 h-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">
                  Select Tool (V)
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={
                      customization.tool === "hand" ? "default" : "ghost"
                    }
                    size="sm"
                    onClick={() => updateCustomization({ tool: "hand" })}
                    className="h-7 w-7 p-0"
                  >
                    <Hand className="w-3.5 h-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">
                  Pan Tool (H)
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Popover>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <Plus className="w-3.5 h-3.5" />
                      </Button>
                    </PopoverTrigger>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="text-xs">
                    Add Elements
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <PopoverContent side="bottom" className="w-48 p-2">
                <div className="grid grid-cols-2 gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addTextElement}
                    className="h-8 text-xs flex flex-col gap-1 justify-center"
                  >
                    <Type className="w-3.5 h-3.5" />
                    Text
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="h-8 text-xs flex flex-col gap-1 justify-center"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    Image
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addShapeElement("rectangle")}
                    className="h-8 text-xs flex flex-col gap-1 justify-center"
                  >
                    <Square className="w-3.5 h-3.5" />
                    Rectangle
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addShapeElement("circle")}
                    className="h-8 text-xs flex flex-col gap-1 justify-center"
                  >
                    <CircleIcon className="w-3.5 h-3.5" />
                    Circle
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="h-7 w-7 p-0"
                  >
                    <Upload className="w-3.5 h-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">
                  Upload Image
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* AI Design Assistant Button */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={showDesignAssistant ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setShowDesignAssistant(!showDesignAssistant)}
                    className="h-7 w-7 p-0"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">
                  AI Design Assistant
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Center Controls */}
        <div className="flex items-center gap-2">
          {/* Zoom Controls */}
          <div className="flex items-center gap-1 bg-muted/50 rounded-md px-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setZoom(zoomValue - 10)}
              className="h-6 w-6 p-0"
            >
              <Minus className="w-3 h-3" />
            </Button>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 px-1 text-xs">
                  {zoomValue}%
                </Button>
              </PopoverTrigger>
              <PopoverContent side="bottom" className="w-48 p-2">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-xs">Zoom</Label>
                    <Input
                      type="number"
                      value={zoomValue}
                      onChange={(e) => setZoom(parseInt(e.target.value) || 100)}
                      className="w-16 h-6 text-xs"
                    />
                  </div>
                  <Slider
                    value={[zoomValue]}
                    onValueChange={([value]) => setZoom(value)}
                    min={10}
                    max={400}
                    step={1}
                    className="py-1"
                  />
                  <div className="grid grid-cols-3 gap-1 pt-1">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs h-7"
                      onClick={() => setZoom(50)}
                    >
                      50%
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs h-7"
                      onClick={() => setZoom(100)}
                    >
                      100%
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs h-7"
                      onClick={() => setZoom(200)}
                    >
                      200%
                    </Button>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <Label className="text-xs">Wheel Zoom</Label>
                    <Switch
                      checked={wheelZoomEnabled}
                      onCheckedChange={setWheelZoomEnabled}
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setZoom(zoomValue + 10)}
              className="h-6 w-6 p-0"
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>

          {/* View Controls */}
          <div className="flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={customization.showGrid ? "default" : "ghost"}
                    size="sm"
                    onClick={() =>
                      updateCustomization({ showGrid: !customization.showGrid })
                    }
                    className="h-7 w-7 p-0"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">
                  Toggle Grid (G)
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={gridSnapping ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setGridSnapping(!gridSnapping)}
                    className="h-7 w-7 p-0"
                  >
                    <Binary className="w-3.5 h-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">
                  {gridSnapping ? "Disable Snapping" : "Enable Snapping"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setRenderMode(
                        renderMode === "standard" ? "3d" : "standard"
                      )
                    }
                    className="h-7 w-7 p-0"
                  >
                    {renderMode === "standard" ? (
                      <Monitor className="w-3.5 h-3.5" />
                    ) : (
                      <Layers className="w-3.5 h-3.5" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">
                  {renderMode === "standard" ? "3D Preview" : "2D Editor"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    updateCustomization({ darkMode: !customization.darkMode })
                  }
                  className="h-7 w-7 p-0"
                >
                  {customization.darkMode ? (
                    <Sun className="w-3.5 h-3.5" />
                  ) : (
                    <Moon className="w-3.5 h-3.5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">
                Toggle Theme
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLeftSidebarVisible(!leftSidebarVisible)}
                  className="h-7 w-7 p-0"
                >
                  <PanelLeft className="w-3.5 h-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">
                Toggle Layers Panel
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setRightSidebarVisible(!rightSidebarVisible)}
                  className="h-7 w-7 p-0"
                >
                  <PanelRight className="w-3.5 h-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">
                Toggle Properties Panel
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowKeyboardShortcuts(true)}
                  className="h-7 w-7 p-0"
                >
                  <Sliders className="w-3.5 h-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">
                Settings & Shortcuts
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Separator orientation="vertical" className="h-5" />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={saveDesign}
                  size="sm"
                  variant={isSaving ? "outline" : "ghost"}
                  className="h-7 text-xs px-2"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <SaveIcon className="w-3.5 h-3.5 mr-1" />
                      Save
                    </>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">
                Save Design (Ctrl+S)
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button
            onClick={handleProceedToOrder}
            size="sm"
            className="h-7 text-xs px-3 bg-primary hover:bg-primary/90"
          >
            <CreditCard className="w-3.5 h-3.5 mr-1" />
            Order Now
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden" ref={containerRef}>
        {/* Left Sidebar */}
        {leftSidebarVisible && (
          <div
            ref={leftSidebarRef}
            className={cn(
              "border-r transition-all duration-200 flex flex-col relative",
              customization.darkMode
                ? "bg-gray-950 border-gray-800"
                : "bg-white border-gray-200"
            )}
            style={{ width: `${leftSidebarWidth}px` }}
          >
            {/* Resize handle */}
            <div
              className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-primary/40 z-10"
              onMouseDown={handleResizeStart("left")}
            ></div>

            {/* Sidebar Header */}
            <div className="h-10 border-b flex items-center px-3 justify-between">
              <h3 className="text-xs font-medium text-foreground">
                Layers & Elements
              </h3>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={addTextElement}
                >
                  <Type className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <ImageIcon className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => addShapeElement("rectangle")}
                >
                  <Square className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {/* Sidebar Content */}
            <ScrollArea className="flex-1">
              <div className="p-3 space-y-4">
                {/* Tabs */}
                <Tabs defaultValue="layers" className="w-full">
                  <TabsList className="w-full grid grid-cols-3 h-7">
                    <TabsTrigger value="layers" className="text-[10px]">
                      Layers
                    </TabsTrigger>
                    <TabsTrigger value="templates" className="text-[10px]">
                      Templates
                    </TabsTrigger>
                    <TabsTrigger value="history" className="text-[10px]">
                      History
                    </TabsTrigger>
                  </TabsList>

                  {/* Layers Tab Content */}
                  <TabsContent value="layers" className="mt-2 space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                        Elements ({customization.elements.length})
                      </Label>
                      <div className="flex items-center gap-1">
                        {customization.elements.length > 0 && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-5 w-5 p-0"
                                  onClick={() => {
                                    // Clear all elements after confirmation
                                    toast({
                                      title: "Clear all elements?",
                                      description:
                                        "This action cannot be undone.",
                                      action: {
                                        label: "Clear All",
                                        onClick: () => {
                                          // Store for undo
                                          setElementsUndoStack((prev) => [
                                            ...prev,
                                            {
                                              action: "clear-all",
                                              elements: [
                                                ...customization.elements,
                                              ],
                                            },
                                          ]);

                                          // Clear elements
                                          customization.elements.forEach((el) =>
                                            removeElement(el.id)
                                          );

                                          // Clear redo stack
                                          setElementsRedoStack([]);
                                        },
                                      },
                                    });
                                  }}
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent
                                side="bottom"
                                className="text-[10px]"
                              >
                                Clear All
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-5 w-5 p-0"
                        >
                          <Filter className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      {customization.elements
                        .sort((a, b) => b.zIndex - a.zIndex)
                        .map((element) => (
                          <ContextMenu key={element.id}>
                            <ContextMenuTrigger>
                              <div
                                className={cn(
                                  "flex items-center gap-2 p-1.5 rounded-md cursor-pointer text-xs transition-colors",
                                  customization.selectedElementId ===
                                    element.id ||
                                    selectedElements.includes(element.id)
                                    ? "bg-primary/10 border border-primary/20"
                                    : customization.darkMode
                                    ? "hover:bg-gray-800"
                                    : "hover:bg-gray-50"
                                )}
                                onClick={(e) => {
                                  if (e.shiftKey) {
                                    if (selectedElements.includes(element.id)) {
                                      // Remove from selection if already selected
                                      setSelectedElements((prev) =>
                                        prev.filter((id) => id !== element.id)
                                      );
                                    } else {
                                      // Add to selection
                                      setSelectedElements((prev) => [
                                        ...prev,
                                        element.id,
                                      ]);
                                    }
                                  } else {
                                    // Clear selection and select only this element if shift isn't pressed
                                    selectElement(element.id);
                                    setSelectedElements([element.id]);
                                  }
                                }}
                              >
                                <div className="flex items-center gap-1.5 flex-1 min-w-0">
                                  <div
                                    className={cn(
                                      "w-5 h-5 rounded flex items-center justify-center",
                                      element.type === "image"
                                        ? "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400"
                                        : element.type === "text"
                                        ? "bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400"
                                        : element.type === "shape"
                                        ? "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400"
                                        : element.type === "group"
                                        ? "bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400"
                                        : "bg-gray-100 text-gray-600 dark:bg-gray-900/50 dark:text-gray-400"
                                    )}
                                  >
                                    {element.type === "image" ? (
                                      <ImageIcon className="w-2.5 h-2.5" />
                                    ) : element.type === "text" ? (
                                      <Type className="w-2.5 h-2.5" />
                                    ) : element.type === "shape" ? (
                                      element.shapeType === "circle" ? (
                                        <CircleIcon className="w-2.5 h-2.5" />
                                      ) : element.shapeType === "triangle" ? (
                                        <Triangle className="w-2.5 h-2.5" />
                                      ) : (
                                        <Square className="w-2.5 h-2.5" />
                                      )
                                    ) : element.type === "group" ? (
                                      <GroupIcon className="w-2.5 h-2.5" />
                                    ) : (
                                      <Boxes className="w-2.5 h-2.5" />
                                    )}
                                  </div>

                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium truncate text-[11px]">
                                      {element.type === "text"
                                        ? element.content.slice(0, 20) +
                                          (element.content.length > 20
                                            ? "..."
                                            : "")
                                        : element.type === "image"
                                        ? `Image ${
                                            customization.elements.indexOf(
                                              element
                                            ) + 1
                                          }`
                                        : element.type === "shape"
                                        ? `${
                                            element.shapeType
                                              .charAt(0)
                                              .toUpperCase() +
                                            element.shapeType.slice(1)
                                          } ${
                                            customization.elements.indexOf(
                                              element
                                            ) + 1
                                          }`
                                        : element.type === "group"
                                        ? `Group (${element.children.length})`
                                        : `Element ${
                                            customization.elements.indexOf(
                                              element
                                            ) + 1
                                          }`}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-center">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      updateElement(element.id, {
                                        visible: !element.visible,
                                      });
                                    }}
                                    className="h-5 w-5 p-0"
                                  >
                                    {element.visible ? (
                                      <Eye className="w-2.5 h-2.5" />
                                    ) : (
                                      <EyeOff className="w-2.5 h-2.5" />
                                    )}
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      updateElement(element.id, {
                                        locked: !element.locked,
                                      });
                                    }}
                                    className="h-5 w-5 p-0"
                                  >
                                    {element.locked ? (
                                      <Lock className="w-2.5 h-2.5" />
                                    ) : (
                                      <Unlock className="w-2.5 h-2.5" />
                                    )}
                                  </Button>
                                </div>
                              </div>
                            </ContextMenuTrigger>

                            <ContextMenuContent className="w-48">
                              <ContextMenuItem
                                onClick={() => duplicateElement(element.id)}
                                className="text-xs gap-2"
                              >
                                <Copy className="w-3 h-3" /> Duplicate
                              </ContextMenuItem>
                              <ContextMenuItem
                                onClick={() => removeElement(element.id)}
                                className="text-xs gap-2 text-red-600"
                              >
                                <Trash2 className="w-3 h-3" /> Delete
                              </ContextMenuItem>
                              <ContextMenuSeparator />
                              <ContextMenuItem
                                onClick={() =>
                                  reorderElement(element.id, "top")
                                }
                                className="text-xs gap-2"
                              >
                                <Layers className="w-3 h-3" /> Bring to Front
                              </ContextMenuItem>
                              <ContextMenuItem
                                onClick={() =>
                                  reorderElement(element.id, "bottom")
                                }
                                className="text-xs gap-2"
                              >
                                <Layers className="w-3 h-3" /> Send to Back
                              </ContextMenuItem>
                              <ContextMenuSeparator />
                              <ContextMenuItem
                                onClick={() =>
                                  updateElement(element.id, {
                                    locked: !element.locked,
                                  })
                                }
                                className="text-xs gap-2"
                              >
                                {element.locked ? (
                                  <>
                                    <Unlock className="w-3 h-3" /> Unlock
                                  </>
                                ) : (
                                  <>
                                    <Lock className="w-3 h-3" /> Lock
                                  </>
                                )}
                              </ContextMenuItem>
                              {element.type === "group" && (
                                <ContextMenuItem
                                  onClick={() => ungroupElements(element.id)}
                                  className="text-xs gap-2"
                                >
                                  <Boxes className="w-3 h-3" /> Ungroup
                                </ContextMenuItem>
                              )}
                            </ContextMenuContent>
                          </ContextMenu>
                        ))}

                      {customization.elements.length === 0 && (
                        <div className="text-center py-6 px-2">
                          <div
                            className={cn(
                              "w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-2",
                              customization.darkMode
                                ? "bg-gray-800"
                                : "bg-gray-100"
                            )}
                          >
                            <Layers
                              className={cn(
                                "w-5 h-5",
                                customization.darkMode
                                  ? "text-gray-600"
                                  : "text-gray-400"
                              )}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            No elements yet
                          </p>
                          <p className="text-[10px] text-muted-foreground mt-1">
                            Start by adding text, images or shapes
                          </p>
                          <div className="flex gap-1 mt-3 justify-center">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-6 text-[10px]"
                              onClick={addTextElement}
                            >
                              <Type className="w-3 h-3 mr-1" /> Add Text
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-6 text-[10px]"
                              onClick={() => fileInputRef.current?.click()}
                            >
                              <ImageIcon className="w-3 h-3 mr-1" /> Add Image
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  {/* Templates Tab Content */}
                  <TabsContent value="templates" className="mt-2 space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                        Design Templates
                      </Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 p-0 text-[10px]"
                        onClick={() => setShowTemplatesModal(true)}
                      >
                        <FolderOpen className="w-3 h-3 mr-1" />
                        Browse All
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {designTemplates
                        .find(
                          (category) =>
                            category.category === selectedProduct.category
                        )
                        ?.templates.slice(0, 2)
                        .map((template, i) => (
                          <Card key={i} className="overflow-hidden">
                            <div className="aspect-[3/2] bg-muted relative">
                              {template.thumbnail && (
                                <Image
                                  src={template.thumbnail}
                                  alt={template.name}
                                  fill
                                  className="object-cover"
                                />
                              )}
                            </div>
                            <CardContent className="p-2">
                              <div className="flex items-center justify-between">
                                <p className="text-[11px] font-medium">
                                  {template.name}
                                </p>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-5 w-5 p-0"
                                  onClick={() => applyTemplate(template)}
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}

                      <div className="flex items-center justify-center p-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-[10px] w-full h-6"
                          onClick={() => setShowColorPaletteModal(true)}
                        >
                          <Palette className="w-3 h-3 mr-1" /> Color Palettes
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    {/* Show AI Design Assistant in sidebar */}
                    <DesignAssistant
                      productType={selectedProduct.category}
                      onSuggest={() => {}}
                      onApply={applyAISuggestion}
                    />
                  </TabsContent>

                  {/* History Tab Content */}
                  <TabsContent value="history" className="mt-2">
                    <VersionHistory
                      versions={versionHistory}
                      onRestore={restoreVersion}
                    />
                  </TabsContent>
                </Tabs>

                <Separator />

                {/* Canvas Info */}
                <div className="space-y-2">
                  <Label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                    Canvas Information
                  </Label>

                  <div className="space-y-1 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Product:</span>
                      <span>{selectedProduct.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category:</span>
                      <span>{selectedProduct.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Size:</span>
                      <span>
                        {canvasDimensions.width} × {canvasDimensions.height}px
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Elements:</span>
                      <span>{customization.elements.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last saved:</span>
                      <span>
                        {lastSaved
                          ? new Date(lastSaved).toLocaleTimeString()
                          : "Never"}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <Label className="text-[10px] text-muted-foreground">
                      Auto-save
                    </Label>
                    <Switch
                      checked={autosaveEnabled}
                      onCheckedChange={setAutosaveEnabled}
                      size="sm"
                    />
                  </div>
                </div>
              </div>
            </ScrollArea>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        )}

        {/* Canvas Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div
            className={cn(
              "flex-1 overflow-hidden relative",
              customization.darkMode ? "bg-gray-900" : "bg-gray-100"
            )}
          >
            {/* Rulers */}
            {rulerVisible && (
              <>
                {/* Horizontal ruler */}
                <div
                  className={cn(
                    "absolute top-0 left-0 right-0 h-5 border-b z-10",
                    customization.darkMode
                      ? "bg-gray-950/80 border-gray-800"
                      : "bg-gray-50/80 border-gray-200"
                  )}
                >
                  <div className="relative w-full h-full">
                    {/* Ruler markings would go here */}
                  </div>
                </div>

                {/* Vertical ruler */}
                <div
                  className={cn(
                    "absolute top-0 left-0 bottom-0 w-5 border-r z-10",
                    customization.darkMode
                      ? "bg-gray-950/80 border-gray-800"
                      : "bg-gray-50/80 border-gray-200"
                  )}
                >
                  <div className="relative w-full h-full">
                    {/* Ruler markings would go here */}
                  </div>
                </div>
              </>
            )}

            <div
              className="w-full h-full flex items-center justify-center p-8"
              onMouseDown={handleCanvasMouseDown}
              onMouseMove={handleCanvasMouseMove}
              onMouseUp={handleCanvasMouseUp}
              style={{
                cursor:
                  customization.tool === "hand"
                    ? canvasDragging
                      ? "grabbing"
                      : "grab"
                    : "default",
              }}
            >
              <div
                ref={canvasRef}
                className={cn(
                  "relative shadow-2xl border overflow-hidden transition-all duration-200 rounded-xl",
                  customization.darkMode
                    ? "border-gray-700 bg-gray-800"
                    : "border-gray-300 bg-white",
                  canvasDimensions.type === "mobile" && "rounded-3xl",
                  canvasDimensions.type === "watch" && "rounded-full",
                  canvasDimensions.type === "nameplate" && "rounded-lg",
                  canvasDimensions.type === "keychain" && "rounded-2xl",
                  canvasDimensions.type === "pen" && "rounded-full"
                )}
                style={{
                  width: `${
                    canvasDimensions.width * (customization.zoom / 100)
                  }px`,
                  height: `${
                    canvasDimensions.height * (customization.zoom / 100)
                  }px`,
                  transform: `translate(${customization.canvasPosition.x}px, ${customization.canvasPosition.y}px)`,
                }}
                onMouseMove={handleElementMouseMove}
                onClick={() => {
                  selectElement(null);
                  setSelectedElements([]);
                }}
              >
                {/* Wood texture background */}
                <div
                  className={cn(
                    "absolute inset-0 opacity-20 bg-repeat",
                    customization.darkMode
                      ? "bg-gradient-to-br from-amber-900 to-amber-800"
                      : "bg-gradient-to-br from-amber-100 to-amber-200"
                  )}
                  style={{
                    backgroundImage: `url(${
                      selectedWoodTexture.url ||
                      "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M0 0h60v60H0V0zm30 30h30v30H30V30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
                    })`,
                  }}
                />

                {/* Product info overlay */}
                <div className="absolute top-3 left-3">
                  <Badge
                    className={cn(
                      "text-[10px] px-1.5 py-0.5",
                      customization.darkMode
                        ? "bg-gray-700/80 text-gray-300"
                        : "bg-white/80 text-gray-700"
                    )}
                  >
                    {selectedProduct.category} • {canvasDimensions.width}×
                    {canvasDimensions.height}px
                  </Badge>
                </div>

                {/* Grid Overlay */}
                {customization.showGrid && (
                  <div className="absolute inset-0 pointer-events-none opacity-15">
                    <div className="w-full h-full grid grid-cols-12 grid-rows-24">
                      {Array.from({ length: 12 * 24 }).map((_, i) => (
                        <div
                          key={i}
                          className={cn(
                            "border",
                            customization.darkMode
                              ? "border-gray-600"
                              : "border-gray-400"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Smart guides */}
                {customization.tool === "select" && selectedElement && (
                  <SmartGuides
                    elements={customization.elements}
                    activeElement={selectedElement}
                  />
                )}

                {/* Custom Elements */}
                {customization.elements
                  .filter((el) => el.visible)
                  .sort((a, b) => a.zIndex - b.zIndex)
                  .map((element) => (
                    <div
                      key={element.id}
                      className={cn(
                        "absolute select-none transition-all duration-100",
                        customization.tool === "select" &&
                          !element.locked &&
                          "cursor-move",
                        (customization.selectedElementId === element.id ||
                          selectedElements.includes(element.id)) &&
                          "ring-1 ring-primary ring-offset-0"
                      )}
                      style={{
                        left: `${element.position.x}%`,
                        top: `${element.position.y}%`,
                        transform: `translate(-50%, -50%) scale(${
                          element.scale
                        }) rotate(${element.rotation}deg) ${
                          element.flipX ? "scaleX(-1)" : ""
                        } ${element.flipY ? "scaleY(-1)" : ""}`,
                        opacity: element.opacity / 100,
                        zIndex: element.zIndex,
                        width: element.dimensions?.width
                          ? typeof element.dimensions.width === "string"
                            ? element.dimensions.width
                            : `${element.dimensions.width}px`
                          : "auto",
                        height: element.dimensions?.height
                          ? typeof element.dimensions.height === "string"
                            ? element.dimensions.height
                            : `${element.dimensions.height}px`
                          : "auto",
                      }}
                      onMouseDown={(e) => handleElementMouseDown(e, element.id)}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (e.shiftKey) {
                          // Multi-selection
                          if (selectedElements.includes(element.id)) {
                            setSelectedElements((prev) =>
                              prev.filter((id) => id !== element.id)
                            );
                          } else {
                            setSelectedElements((prev) => [
                              ...prev,
                              element.id,
                            ]);
                          }
                        } else {
                          // Single selection
                          selectElement(element.id);
                          setSelectedElements([element.id]);
                        }
                      }}
                    >
                      {element.type === "image" ? (
                        <div
                          className="relative overflow-hidden w-full h-full"
                          style={{
                            borderRadius: `${element.borderRadius}px`,
                            border: element.border
                              ? `${element.borderWidth}px ${
                                  element.borderStyle || "solid"
                                } ${element.borderColor}`
                              : "none",
                            filter: `brightness(${
                              element.brightness
                            }%) contrast(${element.contrast}%) saturate(${
                              element.saturation
                            }%) blur(${element.blur}px) grayscale(${
                              element.grayscale || 0
                            }%) sepia(${element.sepia || 0}%) hue-rotate(${
                              element.hueRotate || 0
                            }deg)`,
                            boxShadow: element.boxShadow?.enabled
                              ? `${element.boxShadow.x}px ${element.boxShadow.y}px ${element.boxShadow.blur}px ${element.boxShadow.spread}px ${element.boxShadow.color}`
                              : "none",
                            mixBlendMode: element.mixBlendMode || "normal",
                          }}
                        >
                          <Image
                            src={element.content}
                            alt="Custom element"
                            width={200}
                            height={200}
                            className="object-cover w-full h-full"
                            style={{
                              objectFit: element.objectFit || "cover",
                            }}
                          />
                        </div>
                      ) : element.type === "text" ? (
                        <div
                          className="whitespace-pre-wrap w-full h-full flex items-center justify-center"
                          style={{
                            fontSize: `${element.fontSize}px`,
                            fontFamily: element.fontFamily,
                            color: element.color,
                            textAlign: element.textAlign,
                            fontWeight:
                              element.fontWeight ||
                              (element.isBold ? "bold" : "normal"),
                            fontStyle: element.isItalic ? "italic" : "normal",
                            textDecoration:
                              `${element.isUnderline ? "underline" : ""} ${
                                element.isStrikethrough ? "line-through" : ""
                              }`.trim() ||
                              element.textDecoration ||
                              "none",
                            letterSpacing: `${element.letterSpacing}px`,
                            lineHeight: element.lineHeight,
                            textTransform: element.textTransform || "none",
                            padding: element.padding
                              ? `${element.padding.top}px ${element.padding.right}px ${element.padding.bottom}px ${element.padding.left}px`
                              : "0",
                            backgroundColor:
                              element.backgroundColor || "transparent",
                            borderRadius: `${element.borderRadius || 0}px`,
                            border: element.border
                              ? `${element.borderWidth}px ${
                                  element.borderStyle || "solid"
                                } ${element.borderColor}`
                              : "none",
                            boxShadow: element.textShadow?.enabled
                              ? `${element.textShadow.x}px ${element.textShadow.y}px ${element.textShadow.blur}px ${element.textShadow.color}`
                              : "none",
                          }}
                        >
                          {element.content}
                        </div>
                      ) : element.type === "shape" ? (
                        <div
                          className="w-full h-full"
                          style={{
                            backgroundColor: element.fill,
                            borderRadius:
                              element.shapeType === "circle"
                                ? "50%"
                                : element.shapeType === "rectangle"
                                ? `${element.borderRadius || 0}px`
                                : "0",
                            border:
                              element.strokeWidth > 0
                                ? `${element.strokeWidth}px ${element.stroke} solid`
                                : "none",
                            boxShadow: element.boxShadow?.enabled
                              ? `${element.boxShadow.x}px ${element.boxShadow.y}px ${element.boxShadow.blur}px ${element.boxShadow.spread}px ${element.boxShadow.color}`
                              : "none",
                            clipPath:
                              element.shapeType === "triangle"
                                ? "polygon(50% 0%, 0% 100%, 100% 100%)"
                                : "none",
                          }}
                        />
                      ) : element.type === "group" ? (
                        <div className="w-full h-full relative">
                          {/* Group container - this would actually render nested elements in a real implementation */}
                          <div className="absolute inset-0 border border-dashed border-primary/40 rounded pointer-events-none" />
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-primary/70">
                            Group ({element.children?.length || 0})
                          </div>
                        </div>
                      ) : (
                        <div>Unknown element type</div>
                      )}

                      {/* Selection Handles for Resizing and Rotating */}
                      {(customization.selectedElementId === element.id ||
                        selectedElements.includes(element.id)) &&
                        customization.tool === "select" &&
                        !element.locked && (
                          <>
                            {/* Corner Handles */}
                            <div
                              className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-primary rounded-full shadow-md cursor-nwse-resize"
                              onMouseDown={(e) => {
                                e.stopPropagation();
                                // Would implement resizing logic for top-left corner
                              }}
                            />
                            <div
                              className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-primary rounded-full shadow-md cursor-nesw-resize"
                              onMouseDown={(e) => {
                                e.stopPropagation();
                                // Would implement resizing logic for top-right corner
                              }}
                            />
                            <div
                              className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-primary rounded-full shadow-md cursor-nesw-resize"
                              onMouseDown={(e) => {
                                e.stopPropagation();
                                // Would implement resizing logic for bottom-left corner
                              }}
                            />
                            <div
                              className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-primary rounded-full shadow-md cursor-nwse-resize"
                              onMouseDown={(e) => {
                                e.stopPropagation();
                                // Would implement resizing logic for bottom-right corner
                              }}
                            />

                            {/* Middle Handles */}
                            <div
                              className="absolute top-1/2 -left-1.5 w-3 h-3 bg-white border-2 border-primary rounded-full shadow-md cursor-ew-resize -translate-y-1/2"
                              onMouseDown={(e) => {
                                e.stopPropagation();
                                // Would implement resizing logic for left side
                              }}
                            />
                            <div
                              className="absolute top-1/2 -right-1.5 w-3 h-3 bg-white border-2 border-primary rounded-full shadow-md cursor-ew-resize -translate-y-1/2"
                              onMouseDown={(e) => {
                                e.stopPropagation();
                                // Would implement resizing logic for right side
                              }}
                            />
                            <div
                              className="absolute -top-1.5 left-1/2 w-3 h-3 bg-white border-2 border-primary rounded-full shadow-md cursor-ns-resize -translate-x-1/2"
                              onMouseDown={(e) => {
                                e.stopPropagation();
                                // Would implement resizing logic for top side
                              }}
                            />
                            <div
                              className="absolute -bottom-1.5 left-1/2 w-3 h-3 bg-white border-2 border-primary rounded-full shadow-md cursor-ns-resize -translate-x-1/2"
                              onMouseDown={(e) => {
                                e.stopPropagation();
                                // Would implement resizing logic for bottom side
                              }}
                            />

                            {/* Rotation Handle */}
                            <div
                              className="absolute -top-8 left-1/2 w-3 h-3 bg-primary rounded-full shadow-md cursor-move -translate-x-1/2"
                              onMouseDown={(e) => {
                                e.stopPropagation();
                                // Would implement rotation logic
                              }}
                            />
                            <div className="absolute -top-8 left-1/2 w-0.5 h-6 bg-primary -translate-x-1/2" />

                            {/* Quick Actions */}
                            <div
                              className={cn(
                                "absolute -top-10 -right-3 transform flex gap-0.5 rounded-lg shadow-lg border p-0.5",
                                customization.darkMode
                                  ? "bg-gray-800 border-gray-700"
                                  : "bg-white border-gray-200"
                              )}
                            >
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  duplicateElement(element.id);
                                }}
                                className="h-5 w-5 p-0"
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Toggle lock status
                                  updateElement(element.id, {
                                    locked: !element.locked,
                                  });
                                }}
                                className="h-5 w-5 p-0"
                              >
                                {element.locked ? (
                                  <Lock className="w-3 h-3" />
                                ) : (
                                  <Unlock className="w-3 h-3" />
                                )}
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeElement(element.id);
                                }}
                                className="h-5 w-5 p-0 text-red-600"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>

                            {/* Position Info */}
                            <div
                              className={cn(
                                "absolute -bottom-7 left-1/2 transform -translate-x-1/2 text-[10px] bg-gray-900/90 text-white rounded px-1.5 py-0.5"
                              )}
                            >
                              {Math.round(element.position.x)}%,{" "}
                              {Math.round(element.position.y)}%
                            </div>
                          </>
                        )}
                    </div>
                  ))}

                {/* Empty State */}
                {customization.elements.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center space-y-3 max-w-xs">
                      <div
                        className={cn(
                          "w-14 h-14 rounded-xl flex items-center justify-center mx-auto",
                          customization.darkMode
                            ? "bg-gray-700"
                            : "bg-primary/10"
                        )}
                      >
                        <ProductIcon
                          className={cn(
                            "w-7 h-7",
                            customization.darkMode
                              ? "text-gray-400"
                              : "text-primary"
                          )}
                        />
                      </div>
                      <div>
                        <h3
                          className={cn(
                            "text-base font-semibold mb-1",
                            customization.darkMode
                              ? "text-gray-200"
                              : "text-gray-700"
                          )}
                        >
                          Design Your {selectedProduct.title}
                        </h3>
                        <p
                          className={cn(
                            "text-xs leading-relaxed",
                            customization.darkMode
                              ? "text-gray-400"
                              : "text-gray-500"
                          )}
                        >
                          Add text, images, or shapes to create your custom
                          design
                        </p>
                        <div className="flex gap-2 mt-4 justify-center">
                          <Button
                            variant="default"
                            size="sm"
                            onClick={addTextElement}
                            className="text-xs"
                          >
                            <Type className="w-3.5 h-3.5 mr-1.5" />
                            Add Text
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => fileInputRef.current?.click()}
                            className="text-xs"
                          >
                            <ImageIcon className="w-3.5 h-3.5 mr-1.5" />
                            Add Image
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Canvas Footer */}
          <div
            className={cn(
              "h-8 border-t flex items-center justify-between px-4",
              customization.darkMode
                ? "bg-gray-950 border-gray-800"
                : "bg-white border-gray-200"
            )}
          >
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>{customization.elements.length} elements</span>
              <span>•</span>
              <span>{zoomValue}% zoom</span>
              <span>•</span>
              <span>
                {canvasDimensions.width}×{canvasDimensions.height}px
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor:
                      selectedWoodTexture.id === woodTextures[0].id
                        ? "#D2B48C"
                        : "#8B4513",
                  }}
                ></div>
                {selectedWoodTexture.name} wood
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              {selectedElement && (
                <span className="text-xs text-muted-foreground">
                  {selectedElement.type === "text"
                    ? "Text"
                    : selectedElement.type === "image"
                    ? "Image"
                    : selectedElement.type === "shape"
                    ? "Shape"
                    : "Group"}{" "}
                  selected
                </span>
              )}
              {isSaving && (
                <span className="text-xs text-muted-foreground flex items-center">
                  <Loader2 className="w-3 h-3 animate-spin mr-1" /> Saving...
                </span>
              )}
              {lastSaved && !isSaving && (
                <span className="text-xs text-muted-foreground flex items-center">
                  <CheckSquare className="w-3 h-3 mr-1 text-green-500" />
                  Saved at {lastSaved.toLocaleTimeString()}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Properties */}
        {rightSidebarVisible && selectedElement && (
          <div
            ref={rightSidebarRef}
            className={cn(
              "border-l transition-all duration-200 flex flex-col relative",
              customization.darkMode
                ? "bg-gray-950 border-gray-800"
                : "bg-white border-gray-200"
            )}
            style={{ width: `${rightSidebarWidth}px` }}
          >
            {/* Resize handle */}
            <div
              className="absolute top-0 left-0 w-1 h-full cursor-col-resize hover:bg-primary/40 z-10"
              onMouseDown={handleResizeStart("right")}
            ></div>

            {/* Sidebar Header */}
            <div className="h-10 border-b flex items-center justify-between px-3">
              <div className="flex items-center gap-1.5">
                <div
                  className={cn(
                    "w-5 h-5 rounded flex items-center justify-center",
                    selectedElement.type === "image"
                      ? "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400"
                      : selectedElement.type === "text"
                      ? "bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400"
                      : selectedElement.type === "shape"
                      ? "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400"
                      : "bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400"
                  )}
                >
                  {selectedElement.type === "image" ? (
                    <ImageIcon className="w-3 h-3" />
                  ) : selectedElement.type === "text" ? (
                    <Type className="w-3 h-3" />
                  ) : selectedElement.type === "shape" ? (
                    selectedElement.shapeType === "circle" ? (
                      <CircleIcon className="w-3 h-3" />
                    ) : selectedElement.shapeType === "triangle" ? (
                      <Triangle className="w-3 h-3" />
                    ) : (
                      <Square className="w-3 h-3" />
                    )
                  ) : (
                    <GroupIcon className="w-3 h-3" />
                  )}
                </div>
                <h3 className="text-xs font-medium text-foreground">
                  {selectedElement.type === "text"
                    ? "Text"
                    : selectedElement.type === "image"
                    ? "Image"
                    : selectedElement.type === "shape"
                    ? selectedElement.shapeType.charAt(0).toUpperCase() +
                      selectedElement.shapeType.slice(1)
                    : "Group"}{" "}
                  Properties
                </h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => selectElement(null)}
                className="h-6 w-6 p-0"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>

            {/* Properties Content */}
            <ScrollArea className="flex-1">
              <div className="px-3 py-2">
                <Tabs defaultValue="style">
                  <TabsList className="w-full grid grid-cols-3 h-7">
                    <TabsTrigger value="style" className="text-[10px]">
                      Style
                    </TabsTrigger>
                    <TabsTrigger value="layout" className="text-[10px]">
                      Layout
                    </TabsTrigger>
                    <TabsTrigger value="effects" className="text-[10px]">
                      Effects
                    </TabsTrigger>
                  </TabsList>

                  {/* Style Tab */}
                  <TabsContent value="style" className="mt-2 space-y-4">
                    {/* Text-specific properties */}
                    {selectedElement.type === "text" && (
                      <>
                        <div className="space-y-2">
                          <Label className="text-xs font-medium">
                            Text Content
                          </Label>
                          <Textarea
                            value={selectedElement.content}
                            onChange={(e) =>
                              updateElement(selectedElement.id, {
                                content: e.target.value,
                              })
                            }
                            className="min-h-[80px] text-xs resize-none"
                            placeholder="Enter text here..."
                          />
                        </div>

                        <Accordion
                          type="multiple"
                          className="w-full space-y-2"
                          defaultValue={["typography"]}
                        >
                          {/* Typography */}
                          <AccordionItem
                            value="typography"
                            className="border rounded-md overflow-hidden"
                          >
                            <AccordionTrigger className="px-3 py-1.5 text-xs font-medium hover:no-underline">
                              Typography
                            </AccordionTrigger>
                            <AccordionContent className="pt-0 px-3 pb-3 space-y-3">
                              <div className="space-y-2">
                                <Label className="text-[11px] text-muted-foreground">
                                  Font Family
                                </Label>
                                <Select
                                  value={selectedElement.fontFamily}
                                  onValueChange={(fontFamily) =>
                                    updateElement(selectedElement.id, {
                                      fontFamily,
                                    })
                                  }
                                >
                                  <SelectTrigger className="h-8 text-xs">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectLabel className="text-xs font-semibold">
                                        Popular
                                      </SelectLabel>
                                      {fonts
                                        .filter((f) => f.popular)
                                        .map((font) => (
                                          <SelectItem
                                            key={font.value}
                                            value={font.value}
                                            className="text-xs"
                                          >
                                            <span
                                              style={{ fontFamily: font.value }}
                                            >
                                              {font.label}
                                            </span>
                                          </SelectItem>
                                        ))}
                                    </SelectGroup>
                                    <SelectGroup>
                                      <SelectLabel className="text-xs font-semibold">
                                        Sans-serif
                                      </SelectLabel>
                                      {fonts
                                        .filter(
                                          (f) =>
                                            f.category === "Sans-serif" &&
                                            !f.popular
                                        )
                                        .map((font) => (
                                          <SelectItem
                                            key={font.value}
                                            value={font.value}
                                            className="text-xs"
                                          >
                                            <span
                                              style={{ fontFamily: font.value }}
                                            >
                                              {font.label}
                                            </span>
                                          </SelectItem>
                                        ))}
                                    </SelectGroup>
                                    <SelectGroup>
                                      <SelectLabel className="text-xs font-semibold">
                                        Serif
                                      </SelectLabel>
                                      {fonts
                                        .filter(
                                          (f) =>
                                            f.category === "Serif" && !f.popular
                                        )
                                        .map((font) => (
                                          <SelectItem
                                            key={font.value}
                                            value={font.value}
                                            className="text-xs"
                                          >
                                            <span
                                              style={{ fontFamily: font.value }}
                                            >
                                              {font.label}
                                            </span>
                                          </SelectItem>
                                        ))}
                                    </SelectGroup>
                                    <SelectGroup>
                                      <SelectLabel className="text-xs font-semibold">
                                        Display
                                      </SelectLabel>
                                      {fonts
                                        .filter(
                                          (f) =>
                                            f.category === "Display" &&
                                            !f.popular
                                        )
                                        .map((font) => (
                                          <SelectItem
                                            key={font.value}
                                            value={font.value}
                                            className="text-xs"
                                          >
                                            <span
                                              style={{ fontFamily: font.value }}
                                            >
                                              {font.label}
                                            </span>
                                          </SelectItem>
                                        ))}
                                    </SelectGroup>
                                    <SelectGroup>
                                      <SelectLabel className="text-xs font-semibold">
                                        Monospace
                                      </SelectLabel>
                                      {fonts
                                        .filter(
                                          (f) =>
                                            f.category === "Monospace" &&
                                            !f.popular
                                        )
                                        .map((font) => (
                                          <SelectItem
                                            key={font.value}
                                            value={font.value}
                                            className="text-xs"
                                          >
                                            <span
                                              style={{ fontFamily: font.value }}
                                            >
                                              {font.label}
                                            </span>
                                          </SelectItem>
                                        ))}
                                    </SelectGroup>
                                    <SelectGroup>
                                      <SelectLabel className="text-xs font-semibold">
                                        Handwriting
                                      </SelectLabel>
                                      {fonts
                                        .filter(
                                          (f) =>
                                            f.category === "Handwriting" &&
                                            !f.popular
                                        )
                                        .map((font) => (
                                          <SelectItem
                                            key={font.value}
                                            value={font.value}
                                            className="text-xs"
                                          >
                                            <span
                                              style={{ fontFamily: font.value }}
                                            >
                                              {font.label}
                                            </span>
                                          </SelectItem>
                                        ))}
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <Label className="text-[11px] text-muted-foreground">
                                    Font Size
                                  </Label>
                                  <div className="flex items-center">
                                    <Input
                                      type="number"
                                      value={selectedElement.fontSize}
                                      onChange={(e) =>
                                        updateElement(selectedElement.id, {
                                          fontSize:
                                            parseInt(e.target.value) || 16,
                                        })
                                      }
                                      className="w-12 h-6 text-xs px-1"
                                    />
                                    <span className="text-[10px] text-muted-foreground ml-1">
                                      px
                                    </span>
                                  </div>
                                </div>
                                <Slider
                                  value={[selectedElement.fontSize]}
                                  onValueChange={([fontSize]) =>
                                    updateElement(selectedElement.id, {
                                      fontSize,
                                    })
                                  }
                                  min={8}
                                  max={120}
                                  step={1}
                                  className="py-1"
                                />
                              </div>

                              <div className="space-y-1.5">
                                <Label className="text-[11px] text-muted-foreground">
                                  Text Style
                                </Label>
                                <div className="grid grid-cols-4 gap-1">
                                  <Toggle
                                    pressed={selectedElement.isBold}
                                    onPressedChange={(isBold) =>
                                      updateElement(selectedElement.id, {
                                        isBold,
                                      })
                                    }
                                    size="sm"
                                    className="h-7 text-xs data-[state=on]:bg-muted-foreground/30"
                                  >
                                    <Bold className="w-3 h-3" />
                                  </Toggle>
                                  <Toggle
                                    pressed={selectedElement.isItalic}
                                    onPressedChange={(isItalic) =>
                                      updateElement(selectedElement.id, {
                                        isItalic,
                                      })
                                    }
                                    size="sm"
                                    className="h-7 text-xs data-[state=on]:bg-muted-foreground/30"
                                  >
                                    <Italic className="w-3 h-3" />
                                  </Toggle>
                                  <Toggle
                                    pressed={selectedElement.isUnderline}
                                    onPressedChange={(isUnderline) =>
                                      updateElement(selectedElement.id, {
                                        isUnderline,
                                      })
                                    }
                                    size="sm"
                                    className="h-7 text-xs data-[state=on]:bg-muted-foreground/30"
                                  >
                                    <Underline className="w-3 h-3" />
                                  </Toggle>
                                  <Toggle
                                    pressed={selectedElement.isStrikethrough}
                                    onPressedChange={(isStrikethrough) =>
                                      updateElement(selectedElement.id, {
                                        isStrikethrough,
                                      })
                                    }
                                    size="sm"
                                    className="h-7 text-xs data-[state=on]:bg-muted-foreground/30"
                                  >
                                    <Strikethrough className="w-3 h-3" />
                                  </Toggle>
                                </div>
                              </div>

                              <div className="space-y-1.5">
                                <Label className="text-[11px] text-muted-foreground">
                                  Alignment
                                </Label>
                                <div className="grid grid-cols-3 gap-1">
                                  <Toggle
                                    pressed={
                                      selectedElement.textAlign === "left"
                                    }
                                    onPressedChange={() =>
                                      updateElement(selectedElement.id, {
                                        textAlign: "left",
                                      })
                                    }
                                    size="sm"
                                    className="h-7 text-xs data-[state=on]:bg-muted-foreground/30"
                                  >
                                    <AlignLeft className="w-3 h-3" />
                                  </Toggle>
                                  <Toggle
                                    pressed={
                                      selectedElement.textAlign === "center"
                                    }
                                    onPressedChange={() =>
                                      updateElement(selectedElement.id, {
                                        textAlign: "center",
                                      })
                                    }
                                    size="sm"
                                    className="h-7 text-xs data-[state=on]:bg-muted-foreground/30"
                                  >
                                    <AlignCenter className="w-3 h-3" />
                                  </Toggle>
                                  <Toggle
                                    pressed={
                                      selectedElement.textAlign === "right"
                                    }
                                    onPressedChange={() =>
                                      updateElement(selectedElement.id, {
                                        textAlign: "right",
                                      })
                                    }
                                    size="sm"
                                    className="h-7 text-xs data-[state=on]:bg-muted-foreground/30"
                                  >
                                    <AlignRight className="w-3 h-3" />
                                  </Toggle>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <Label className="text-[11px] text-muted-foreground">
                                    Letter Spacing
                                  </Label>
                                  <div className="flex items-center">
                                    <Input
                                      type="number"
                                      value={selectedElement.letterSpacing}
                                      onChange={(e) =>
                                        updateElement(selectedElement.id, {
                                          letterSpacing:
                                            parseFloat(e.target.value) || 0,
                                        })
                                      }
                                      className="w-12 h-6 text-xs px-1"
                                    />
                                    <span className="text-[10px] text-muted-foreground ml-1">
                                      px
                                    </span>
                                  </div>
                                </div>
                                <Slider
                                  value={[selectedElement.letterSpacing]}
                                  onValueChange={([letterSpacing]) =>
                                    updateElement(selectedElement.id, {
                                      letterSpacing,
                                    })
                                  }
                                  min={-5}
                                  max={20}
                                  step={0.5}
                                  className="py-1"
                                />
                              </div>

                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <Label className="text-[11px] text-muted-foreground">
                                    Line Height
                                  </Label>
                                  <div className="flex items-center">
                                    <Input
                                      type="number"
                                      value={selectedElement.lineHeight}
                                      onChange={(e) =>
                                        updateElement(selectedElement.id, {
                                          lineHeight:
                                            parseFloat(e.target.value) || 1,
                                        })
                                      }
                                      className="w-12 h-6 text-xs px-1"
                                      step={0.1}
                                    />
                                    <span className="text-[10px] text-muted-foreground ml-1">
                                      ×
                                    </span>
                                  </div>
                                </div>
                                <Slider
                                  value={[selectedElement.lineHeight]}
                                  onValueChange={([lineHeight]) =>
                                    updateElement(selectedElement.id, {
                                      lineHeight,
                                    })
                                  }
                                  min={0.5}
                                  max={3}
                                  step={0.1}
                                  className="py-1"
                                />
                              </div>

                              <div className="space-y-1.5">
                                <Label className="text-[11px] text-muted-foreground">
                                  Text Transform
                                </Label>
                                <Select
                                  value={
                                    selectedElement.textTransform || "none"
                                  }
                                  onValueChange={(textTransform) =>
                                    updateElement(selectedElement.id, {
                                      textTransform,
                                    })
                                  }
                                >
                                  <SelectTrigger className="h-7 text-xs">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {textTransforms.map((transform) => (
                                      <SelectItem
                                        key={transform.value}
                                        value={transform.value}
                                        className="text-xs"
                                      >
                                        {transform.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </AccordionContent>
                          </AccordionItem>

                          {/* Color & Background */}
                          <AccordionItem
                            value="color"
                            className="border rounded-md overflow-hidden"
                          >
                            <AccordionTrigger className="px-3 py-1.5 text-xs font-medium hover:no-underline">
                              Color & Background
                            </AccordionTrigger>
                            <AccordionContent className="pt-0 px-3 pb-3 space-y-3">
                              <div className="space-y-1.5">
                                <Label className="text-[11px] text-muted-foreground">
                                  Text Color
                                </Label>
                                <div className="flex items-center gap-2">
                                  <div
                                    className="w-8 h-8 rounded border cursor-pointer"
                                    style={{
                                      backgroundColor: selectedElement.color,
                                    }}
                                    onClick={() => {
                                      setCurrentColorProperty("color");
                                      setColorPickerOpen(true);
                                    }}
                                  />
                                  <Input
                                    type="text"
                                    value={selectedElement.color}
                                    onChange={(e) =>
                                      updateElement(selectedElement.id, {
                                        color: e.target.value,
                                      })
                                    }
                                    className="h-7 text-xs flex-1"
                                  />
                                </div>

                                {/* Color palette swatches */}
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {selectedColorPalette.colors.map(
                                    (color, index) => (
                                      <div
                                        key={index}
                                        className="w-5 h-5 rounded-md cursor-pointer border hover:scale-110 transition-transform"
                                        style={{ backgroundColor: color }}
                                        onClick={() =>
                                          updateElement(selectedElement.id, {
                                            color,
                                          })
                                        }
                                      />
                                    )
                                  )}
                                </div>
                              </div>

                              <div className="space-y-1.5">
                                <Label className="text-[11px] text-muted-foreground">
                                  Background
                                </Label>
                                <div className="flex items-center gap-2">
                                  <div
                                    className="w-8 h-8 rounded border cursor-pointer"
                                    style={{
                                      backgroundColor:
                                        selectedElement.backgroundColor ||
                                        "transparent",
                                      backgroundImage:
                                        selectedElement.backgroundColor ===
                                        "transparent"
                                          ? "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)"
                                          : "none",
                                      backgroundSize: "8px 8px",
                                      backgroundPosition:
                                        "0 0, 0 4px, 4px -4px, -4px 0px",
                                    }}
                                    onClick={() => {
                                      setCurrentColorProperty(
                                        "backgroundColor"
                                      );
                                      setColorPickerOpen(true);
                                    }}
                                  />
                                  <Input
                                    type="text"
                                    value={
                                      selectedElement.backgroundColor ||
                                      "transparent"
                                    }
                                    onChange={(e) =>
                                      updateElement(selectedElement.id, {
                                        backgroundColor: e.target.value,
                                      })
                                    }
                                    className="h-7 text-xs flex-1"
                                  />
                                </div>

                                {/* Preset background options */}
                                <div className="flex flex-wrap gap-1 mt-1">
                                  <div
                                    className="w-5 h-5 rounded-md cursor-pointer border hover:scale-110 transition-transform bg-transparent"
                                    style={{
                                      backgroundImage:
                                        "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
                                      backgroundSize: "6px 6px",
                                    }}
                                    onClick={() =>
                                      updateElement(selectedElement.id, {
                                        backgroundColor: "transparent",
                                      })
                                    }
                                  />
                                  {selectedColorPalette.colors.map(
                                    (color, index) => (
                                      <div
                                        key={index}
                                        className="w-5 h-5 rounded-md cursor-pointer border hover:scale-110 transition-transform"
                                        style={{ backgroundColor: color }}
                                        onClick={() =>
                                          updateElement(selectedElement.id, {
                                            backgroundColor: color,
                                          })
                                        }
                                      />
                                    )
                                  )}
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </>
                    )}

                    {/* Shape-specific properties */}
                    {selectedElement.type === "shape" && (
                      <Accordion
                        type="multiple"
                        className="w-full space-y-2"
                        defaultValue={["shape-style"]}
                      >
                        <AccordionItem
                          value="shape-style"
                          className="border rounded-md overflow-hidden"
                        >
                          <AccordionTrigger className="px-3 py-1.5 text-xs font-medium hover:no-underline">
                            Shape Style
                          </AccordionTrigger>
                          <AccordionContent className="pt-0 px-3 pb-3 space-y-3">
                            {/* Shape type */}
                            <div className="space-y-1.5">
                              <Label className="text-[11px] text-muted-foreground">
                                Shape Type
                              </Label>
                              <div className="grid grid-cols-3 gap-2">
                                {shapes.map((shape) => (
                                  <Button
                                    key={shape.value}
                                    variant={
                                      selectedElement.shapeType === shape.value
                                        ? "default"
                                        : "outline"
                                    }
                                    size="sm"
                                    className="h-7 text-xs p-0"
                                    onClick={() =>
                                      updateElement(selectedElement.id, {
                                        shapeType: shape.value,
                                      })
                                    }
                                  >
                                    <shape.icon className="w-3 h-3 mr-1" />
                                    {shape.label}
                                  </Button>
                                ))}
                              </div>
                            </div>

                            {/* Fill color */}
                            <div className="space-y-1.5">
                              <Label className="text-[11px] text-muted-foreground">
                                Fill Color
                              </Label>
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-8 h-8 rounded border cursor-pointer"
                                  style={{
                                    backgroundColor: selectedElement.fill,
                                  }}
                                  onClick={() => {
                                    setCurrentColorProperty("fill");
                                    setColorPickerOpen(true);
                                  }}
                                />
                                <Input
                                  type="text"
                                  value={selectedElement.fill}
                                  onChange={(e) =>
                                    updateElement(selectedElement.id, {
                                      fill: e.target.value,
                                    })
                                  }
                                  className="h-7 text-xs flex-1"
                                />
                              </div>

                              {/* Color palette swatches */}
                              <div className="flex flex-wrap gap-1 mt-1">
                                {selectedColorPalette.colors.map(
                                  (color, index) => (
                                    <div
                                      key={index}
                                      className="w-5 h-5 rounded-md cursor-pointer border hover:scale-110 transition-transform"
                                      style={{ backgroundColor: color }}
                                      onClick={() =>
                                        updateElement(selectedElement.id, {
                                          fill: color,
                                        })
                                      }
                                    />
                                  )
                                )}
                              </div>
                            </div>

                            {/* Border/Stroke */}
                            <div className="flex items-center justify-between">
                              <Label className="text-[11px] text-muted-foreground">
                                Stroke
                              </Label>
                              <Switch
                                checked={selectedElement.strokeWidth > 0}
                                onCheckedChange={(checked) =>
                                  updateElement(selectedElement.id, {
                                    strokeWidth: checked ? 1 : 0,
                                    stroke: checked ? "#000000" : "transparent",
                                  })
                                }
                              />
                            </div>

                            {selectedElement.strokeWidth > 0 && (
                              <>
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <Label className="text-[11px] text-muted-foreground">
                                      Stroke Width
                                    </Label>
                                    <div className="flex items-center">
                                      <Input
                                        type="number"
                                        value={selectedElement.strokeWidth}
                                        onChange={(e) =>
                                          updateElement(selectedElement.id, {
                                            strokeWidth:
                                              parseInt(e.target.value) || 1,
                                          })
                                        }
                                        className="w-12 h-6 text-xs px-1"
                                      />
                                      <span className="text-[10px] text-muted-foreground ml-1">
                                        px
                                      </span>
                                    </div>
                                  </div>
                                  <Slider
                                    value={[selectedElement.strokeWidth]}
                                    onValueChange={([strokeWidth]) =>
                                      updateElement(selectedElement.id, {
                                        strokeWidth,
                                      })
                                    }
                                    min={0}
                                    max={20}
                                    step={1}
                                    className="py-1"
                                  />
                                </div>

                                <div className="space-y-1.5">
                                  <Label className="text-[11px] text-muted-foreground">
                                    Stroke Color
                                  </Label>
                                  <div className="flex items-center gap-2">
                                    <div
                                      className="w-8 h-8 rounded border cursor-pointer"
                                      style={{
                                        backgroundColor: selectedElement.stroke,
                                      }}
                                      onClick={() => {
                                        setCurrentColorProperty("stroke");
                                        setColorPickerOpen(true);
                                      }}
                                    />
                                    <Input
                                      type="text"
                                      value={selectedElement.stroke}
                                      onChange={(e) =>
                                        updateElement(selectedElement.id, {
                                          stroke: e.target.value,
                                        })
                                      }
                                      className="h-7 text-xs flex-1"
                                    />
                                  </div>
                                </div>
                              </>
                            )}

                            {/* Border radius (only for rectangle) */}
                            {selectedElement.shapeType === "rectangle" && (
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <Label className="text-[11px] text-muted-foreground">
                                    Corner Radius
                                  </Label>
                                  <div className="flex items-center">
                                    <Input
                                      type="number"
                                      value={selectedElement.borderRadius || 0}
                                      onChange={(e) =>
                                        updateElement(selectedElement.id, {
                                          borderRadius:
                                            parseInt(e.target.value) || 0,
                                        })
                                      }
                                      className="w-12 h-6 text-xs px-1"
                                    />
                                    <span className="text-[10px] text-muted-foreground ml-1">
                                      px
                                    </span>
                                  </div>
                                </div>
                                <Slider
                                  value={[selectedElement.borderRadius || 0]}
                                  onValueChange={([borderRadius]) =>
                                    updateElement(selectedElement.id, {
                                      borderRadius,
                                    })
                                  }
                                  min={0}
                                  max={50}
                                  step={1}
                                  className="py-1"
                                />
                              </div>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    )}

                    {/* Image-specific properties */}
                    {selectedElement.type === "image" && (
                      <Accordion
                        type="multiple"
                        className="w-full space-y-2"
                        defaultValue={["adjustments"]}
                      >
                        {/* Image Adjustments */}
                        <AccordionItem
                          value="adjustments"
                          className="border rounded-md overflow-hidden"
                        >
                          <AccordionTrigger className="px-3 py-1.5 text-xs font-medium hover:no-underline">
                            Image Adjustments
                          </AccordionTrigger>
                          <AccordionContent className="pt-0 px-3 pb-3 space-y-3">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <Label className="text-[11px] text-muted-foreground">
                                  Brightness
                                </Label>
                                <div className="flex items-center">
                                  <Input
                                    type="number"
                                    value={selectedElement.brightness}
                                    onChange={(e) =>
                                      updateElement(selectedElement.id, {
                                        brightness:
                                          parseInt(e.target.value) || 100,
                                      })
                                    }
                                    className="w-12 h-6 text-xs px-1"
                                  />
                                  <span className="text-[10px] text-muted-foreground ml-1">
                                    %
                                  </span>
                                </div>
                              </div>
                              <Slider
                                value={[selectedElement.brightness]}
                                onValueChange={([brightness]) =>
                                  updateElement(selectedElement.id, {
                                    brightness,
                                  })
                                }
                                min={0}
                                max={200}
                                step={1}
                                className="py-1"
                              />
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <Label className="text-[11px] text-muted-foreground">
                                  Contrast
                                </Label>
                                <div className="flex items-center">
                                  <Input
                                    type="number"
                                    value={selectedElement.contrast}
                                    onChange={(e) =>
                                      updateElement(selectedElement.id, {
                                        contrast:
                                          parseInt(e.target.value) || 100,
                                      })
                                    }
                                    className="w-12 h-6 text-xs px-1"
                                  />
                                  <span className="text-[10px] text-muted-foreground ml-1">
                                    %
                                  </span>
                                </div>
                              </div>
                              <Slider
                                value={[selectedElement.contrast]}
                                onValueChange={([contrast]) =>
                                  updateElement(selectedElement.id, {
                                    contrast,
                                  })
                                }
                                min={0}
                                max={200}
                                step={1}
                                className="py-1"
                              />
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <Label className="text-[11px] text-muted-foreground">
                                  Saturation
                                </Label>
                                <div className="flex items-center">
                                  <Input
                                    type="number"
                                    value={selectedElement.saturation}
                                    onChange={(e) =>
                                      updateElement(selectedElement.id, {
                                        saturation:
                                          parseInt(e.target.value) || 100,
                                      })
                                    }
                                    className="w-12 h-6 text-xs px-1"
                                  />
                                  <span className="text-[10px] text-muted-foreground ml-1">
                                    %
                                  </span>
                                </div>
                              </div>
                              <Slider
                                value={[selectedElement.saturation]}
                                onValueChange={([saturation]) =>
                                  updateElement(selectedElement.id, {
                                    saturation,
                                  })
                                }
                                min={0}
                                max={200}
                                step={1}
                                className="py-1"
                              />
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <Label className="text-[11px] text-muted-foreground">
                                  Blur
                                </Label>
                                <div className="flex items-center">
                                  <Input
                                    type="number"
                                    value={selectedElement.blur}
                                    onChange={(e) =>
                                      updateElement(selectedElement.id, {
                                        blur: parseInt(e.target.value) || 0,
                                      })
                                    }
                                    className="w-12 h-6 text-xs px-1"
                                  />
                                  <span className="text-[10px] text-muted-foreground ml-1">
                                    px
                                  </span>
                                </div>
                              </div>
                              <Slider
                                value={[selectedElement.blur || 0]}
                                onValueChange={([blur]) =>
                                  updateElement(selectedElement.id, { blur })
                                }
                                min={0}
                                max={20}
                                step={0.5}
                                className="py-1"
                              />
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <Label className="text-[11px] text-muted-foreground">
                                  Grayscale
                                </Label>
                                <div className="flex items-center">
                                  <Input
                                    type="number"
                                    value={selectedElement.grayscale || 0}
                                    onChange={(e) =>
                                      updateElement(selectedElement.id, {
                                        grayscale:
                                          parseInt(e.target.value) || 0,
                                      })
                                    }
                                    className="w-12 h-6 text-xs px-1"
                                  />
                                  <span className="text-[10px] text-muted-foreground ml-1">
                                    %
                                  </span>
                                </div>
                              </div>
                              <Slider
                                value={[selectedElement.grayscale || 0]}
                                onValueChange={([grayscale]) =>
                                  updateElement(selectedElement.id, {
                                    grayscale,
                                  })
                                }
                                min={0}
                                max={100}
                                step={1}
                                className="py-1"
                              />
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        {/* Border & Shape */}
                        <AccordionItem
                          value="border"
                          className="border rounded-md overflow-hidden"
                        >
                          <AccordionTrigger className="px-3 py-1.5 text-xs font-medium hover:no-underline">
                            Border & Shape
                          </AccordionTrigger>
                          <AccordionContent className="pt-0 px-3 pb-3 space-y-3">
                            <div className="flex items-center justify-between">
                              <Label className="text-[11px] text-muted-foreground">
                                Add Border
                              </Label>
                              <Switch
                                checked={selectedElement.border}
                                onCheckedChange={(border) =>
                                  updateElement(selectedElement.id, { border })
                                }
                              />
                            </div>

                            {selectedElement.border && (
                              <>
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <Label className="text-[11px] text-muted-foreground">
                                      Border Width
                                    </Label>
                                    <div className="flex items-center">
                                      <Input
                                        type="number"
                                        value={selectedElement.borderWidth}
                                        onChange={(e) =>
                                          updateElement(selectedElement.id, {
                                            borderWidth:
                                              parseInt(e.target.value) || 1,
                                          })
                                        }
                                        className="w-12 h-6 text-xs px-1"
                                      />
                                      <span className="text-[10px] text-muted-foreground ml-1">
                                        px
                                      </span>
                                    </div>
                                  </div>
                                  <Slider
                                    value={[selectedElement.borderWidth]}
                                    onValueChange={([borderWidth]) =>
                                      updateElement(selectedElement.id, {
                                        borderWidth,
                                      })
                                    }
                                    min={1}
                                    max={20}
                                    step={1}
                                    className="py-1"
                                  />
                                </div>

                                <div className="space-y-1.5">
                                  <Label className="text-[11px] text-muted-foreground">
                                    Border Style
                                  </Label>
                                  <Select
                                    value={
                                      selectedElement.borderStyle || "solid"
                                    }
                                    onValueChange={(borderStyle) =>
                                      updateElement(selectedElement.id, {
                                        borderStyle,
                                      })
                                    }
                                  >
                                    <SelectTrigger className="h-7 text-xs">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {borderStyles.map((style) => (
                                        <SelectItem
                                          key={style.value}
                                          value={style.value}
                                          className="text-xs"
                                        >
                                          {style.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div className="space-y-1.5">
                                  <Label className="text-[11px] text-muted-foreground">
                                    Border Color
                                  </Label>
                                  <div className="flex items-center gap-2">
                                    <div
                                      className="w-8 h-8 rounded border cursor-pointer"
                                      style={{
                                        backgroundColor:
                                          selectedElement.borderColor,
                                      }}
                                      onClick={() => {
                                        setCurrentColorProperty("borderColor");
                                        setColorPickerOpen(true);
                                      }}
                                    />
                                    <Input
                                      type="text"
                                      value={selectedElement.borderColor}
                                      onChange={(e) =>
                                        updateElement(selectedElement.id, {
                                          borderColor: e.target.value,
                                        })
                                      }
                                      className="h-7 text-xs flex-1"
                                    />
                                  </div>
                                </div>
                              </>
                            )}

                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <Label className="text-[11px] text-muted-foreground">
                                  Border Radius
                                </Label>
                                <div className="flex items-center">
                                  <Input
                                    type="number"
                                    value={selectedElement.borderRadius || 0}
                                    onChange={(e) =>
                                      updateElement(selectedElement.id, {
                                        borderRadius:
                                          parseInt(e.target.value) || 0,
                                      })
                                    }
                                    className="w-12 h-6 text-xs px-1"
                                  />
                                  <span className="text-[10px] text-muted-foreground ml-1">
                                    px
                                  </span>
                                </div>
                              </div>
                              <Slider
                                value={[selectedElement.borderRadius || 0]}
                                onValueChange={([borderRadius]) =>
                                  updateElement(selectedElement.id, {
                                    borderRadius,
                                  })
                                }
                                min={0}
                                max={100}
                                step={1}
                                className="py-1"
                              />
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    )}

                    {/* Group-specific properties */}
                    {selectedElement.type === "group" && (
                      <div className="space-y-4">
                        <div className="rounded-md border overflow-hidden">
                          <div className="px-3 py-2">
                            <div className="flex items-center justify-between">
                              <h3 className="text-xs font-medium">
                                Group Contents
                              </h3>
                              <Badge variant="outline" className="text-[10px]">
                                {selectedElement.children?.length || 0} items
                              </Badge>
                            </div>
                            <p className="text-[11px] text-muted-foreground mt-1 mb-2">
                              This group contains multiple elements that can be
                              manipulated together.
                            </p>
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full text-xs h-7"
                              onClick={() =>
                                ungroupElements(selectedElement.id)
                              }
                            >
                              <Boxes className="w-3 h-3 mr-1.5" /> Ungroup
                              Elements
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  {/* Layout Tab */}
                  <TabsContent value="layout" className="mt-2 space-y-4">
                    <Accordion
                      type="multiple"
                      className="w-full space-y-2"
                      defaultValue={["position"]}
                    >
                      {/* Position */}
                      <AccordionItem
                        value="position"
                        className="border rounded-md overflow-hidden"
                      >
                        <AccordionTrigger className="px-3 py-1.5 text-xs font-medium hover:no-underline">
                          Position
                        </AccordionTrigger>
                        <AccordionContent className="pt-0 px-3 pb-3 space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1.5">
                              <Label className="text-[11px] text-muted-foreground">
                                X Position (%)
                              </Label>
                              <Input
                                type="number"
                                value={Math.round(selectedElement.position.x)}
                                onChange={(e) =>
                                  updateElement(selectedElement.id, {
                                    position: {
                                      ...selectedElement.position,
                                      x: Number(e.target.value),
                                    },
                                  })
                                }
                                className="h-7 text-xs"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <Label className="text-[11px] text-muted-foreground">
                                Y Position (%)
                              </Label>
                              <Input
                                type="number"
                                value={Math.round(selectedElement.position.y)}
                                onChange={(e) =>
                                  updateElement(selectedElement.id, {
                                    position: {
                                      ...selectedElement.position,
                                      y: Number(e.target.value),
                                    },
                                  })
                                }
                                className="h-7 text-xs"
                              />
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      {/* Dimensions */}
                      <AccordionItem
                        value="dimensions"
                        className="border rounded-md overflow-hidden"
                      >
                        <AccordionTrigger className="px-3 py-1.5 text-xs font-medium hover:no-underline">
                          Size & Scale
                        </AccordionTrigger>
                        <AccordionContent className="pt-0 px-3 pb-3 space-y-3">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label className="text-[11px] text-muted-foreground">
                                Scale
                              </Label>
                              <div className="flex items-center">
                                <Input
                                  type="number"
                                  value={Math.round(
                                    selectedElement.scale * 100
                                  )}
                                  onChange={(e) =>
                                    updateElement(selectedElement.id, {
                                      scale:
                                        parseInt(e.target.value) / 100 || 1,
                                    })
                                  }
                                  className="w-12 h-6 text-xs px-1"
                                />
                                <span className="text-[10px] text-muted-foreground ml-1">
                                  %
                                </span>
                              </div>
                            </div>
                            <Slider
                              value={[selectedElement.scale * 100]}
                              onValueChange={([value]) =>
                                updateElement(selectedElement.id, {
                                  scale: value / 100,
                                })
                              }
                              min={10}
                              max={300}
                              step={1}
                              className="py-1"
                            />
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label className="text-[11px] text-muted-foreground">
                                Rotation
                              </Label>
                              <div className="flex items-center">
                                <Input
                                  type="number"
                                  value={selectedElement.rotation}
                                  onChange={(e) =>
                                    updateElement(selectedElement.id, {
                                      rotation: parseInt(e.target.value) || 0,
                                    })
                                  }
                                  className="w-12 h-6 text-xs px-1"
                                />
                                <span className="text-[10px] text-muted-foreground ml-1">
                                  °
                                </span>
                              </div>
                            </div>
                            <Slider
                              value={[selectedElement.rotation]}
                              onValueChange={([rotation]) =>
                                updateElement(selectedElement.id, { rotation })
                              }
                              min={-180}
                              max={180}
                              step={1}
                              className="py-1"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3 pt-1">
                            <div className="space-y-1.5">
                              <Label className="text-[11px] text-muted-foreground">
                                Width
                              </Label>
                              <div className="flex items-center">
                                <Input
                                  type="number"
                                  value={
                                    typeof selectedElement.dimensions?.width ===
                                    "number"
                                      ? selectedElement.dimensions.width
                                      : ""
                                  }
                                  onChange={(e) => {
                                    const width = e.target.value
                                      ? parseInt(e.target.value)
                                      : "auto";
                                    handleElementResize(selectedElement.id, {
                                      ...selectedElement.dimensions,
                                      width,
                                    });
                                  }}
                                  className="h-7 text-xs"
                                  placeholder="auto"
                                />
                                <span className="text-[10px] text-muted-foreground ml-1">
                                  px
                                </span>
                              </div>
                            </div>
                            <div className="space-y-1.5">
                              <Label className="text-[11px] text-muted-foreground">
                                Height
                              </Label>
                              <div className="flex items-center">
                                <Input
                                  type="number"
                                  value={
                                    typeof selectedElement.dimensions
                                      ?.height === "number"
                                      ? selectedElement.dimensions.height
                                      : ""
                                  }
                                  onChange={(e) => {
                                    const height = e.target.value
                                      ? parseInt(e.target.value)
                                      : "auto";
                                    handleElementResize(selectedElement.id, {
                                      ...selectedElement.dimensions,
                                      height,
                                    });
                                  }}
                                  className="h-7 text-xs"
                                  placeholder="auto"
                                />
                                <span className="text-[10px] text-muted-foreground ml-1">
                                  px
                                </span>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </TabsContent>
                  {/* Effects Tab */}
                  <TabsContent value="effects" className="mt-2 space-y-4">
                    {/* Example placeholder for effects */}
                    <div className="space-y-2">
                      <Label className="text-xs font-medium">Effects</Label>
                      <p className="text-xs text-muted-foreground">
                        Shadow, Blur, and more effect controls go here.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
      {/* Color Picker Modal */}
      <Dialog open={colorPickerOpen} onOpenChange={setColorPickerOpen}>
        <DialogContent className="w-80">
          <DialogHeader>
            <DialogTitle className="text-sm">Choose Color</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4">
            <HexColorPicker
              color={
                selectedElement
                  ? selectedElement[
                      currentColorProperty as keyof typeof selectedElement
                    ] || "#000000"
                  : "#000000"
              }
              onChange={(color) => {
                if (selectedElement && currentColorProperty) {
                  updateElement(selectedElement.id, {
                    [currentColorProperty]: color,
                  });
                }
              }}
            />
            <HexColorInput
              color={
                selectedElement
                  ? selectedElement[
                      currentColorProperty as keyof typeof selectedElement
                    ] || "#000000"
                  : "#000000"
              }
              onChange={(color) => {
                if (selectedElement && currentColorProperty) {
                  updateElement(selectedElement.id, {
                    [currentColorProperty]: color,
                  });
                }
              }}
              className="border rounded px-2 py-1 text-xs"
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setColorPickerOpen(false)}
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Templates Modal */}
      <Dialog open={showTemplatesModal} onOpenChange={setShowTemplatesModal}>
        <DialogContent className="w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-sm">Choose a Template</DialogTitle>
            <DialogDescription>
              Browse and apply a design template to your canvas.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-4 pt-2">
            {designTemplates
              .find(
                (category) => category.category === selectedProduct.category
              )
              ?.templates.map((template, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="aspect-[3/2] bg-muted relative">
                    {template.thumbnail && (
                      <Image
                        src={template.thumbnail}
                        alt={template.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <CardContent className="p-2">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-medium">{template.name}</p>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-5 w-5 p-0"
                        onClick={() => applyTemplate(template)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </DialogContent>
      </Dialog>
      {/* Color Palette Modal */}
      <Dialog
        open={showColorPaletteModal}
        onOpenChange={setShowColorPaletteModal}
      >
        <DialogContent className="w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-sm">Choose Color Palette</DialogTitle>
            <DialogDescription>
              Apply a color palette to your design elements.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3 pt-2">
            {colorPalettes.map((palette, i) => (
              <Card
                key={i}
                className={cn(
                  "overflow-hidden border cursor-pointer transition-all duration-100",
                  selectedColorPalette.name === palette.name &&
                    "border-primary ring-1 ring-primary"
                )}
                onClick={() => applyColorPalette(palette)}
              >
                <CardContent className="p-2">
                  <div className="flex gap-1 mb-2">
                    {palette.colors.map((color, j) => (
                      <div
                        key={j}
                        className="h-5 w-5 rounded"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <p className="text-xs font-medium">{palette.name}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {palette.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
      {/* Keyboard Shortcuts Modal */}
      <Dialog
        open={showKeyboardShortcuts}
        onOpenChange={setShowKeyboardShortcuts}
      >
        <DialogContent className="w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-sm">Keyboard Shortcuts</DialogTitle>
          </DialogHeader>
          <div className="pt-2">
            <ul className="text-xs space-y-1">
              <li>
                <b>Ctrl+S</b> - Save Design
              </li>
              <li>
                <b>Ctrl+Z</b> - Undo
              </li>
              <li>
                <b>Ctrl+Y</b> - Redo
              </li>
              <li>
                <b>V</b> - Select Tool
              </li>
              <li>
                <b>H</b> - Pan Tool
              </li>
              <li>
                <b>T</b> - Add Text
              </li>
              <li>
                <b>Delete</b> - Delete Element
              </li>
              <li>
                <b>G</b> - Toggle Grid
              </li>
              <li>
                <b>R</b> - Toggle Ruler
              </li>
              <li>
                <b>Ctrl+G</b> - Group Elements
              </li>
              <li>
                <b>Ctrl+0</b> - Reset Zoom
              </li>
              <li>
                <b>Ctrl+/, Cmd+/</b> - Show Shortcuts
              </li>
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
