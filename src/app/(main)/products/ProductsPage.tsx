"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Filter,
  SortAsc,
  Star,
  Heart,
  ShoppingCart,
  Eye,
  ChevronLeft,
  ChevronRight,
  Palette,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Product3dGallery } from "@/components/(ReuseableComponents)/Product3DGallery"; // Adjust path as needed
import ProductCard from "@/components/(ReuseableComponents)/ProductCard";
import SectionHeader from "@/components/(ReuseableComponents)/SectionHeader";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  rating: number;
  reviews: number;
  isCustomizable: boolean;
  category: string;
  inStock: boolean;
}

// ProductCard Component (Enhanced)

// SectionHeader Component (Enhanced)

// Products Page
const products: Product[] = [
  {
    id: 1,
    name: "Handcrafted Wooden Award",
    price: 2500,
    originalPrice: 3000,
    images: ["/products/award/product1.jpg", "/products/award/product2.jpg"],
    rating: 4.5,
    reviews: 120,
    isCustomizable: true,
    category: "Awards",
    inStock: true,
  },
  {
    id: 2,
    name: "Vintage Wall Clock",
    price: 3500,
    images: ["/products/clock/product1.jpg", "/products/clock/product2.jpg"],
    rating: 4.2,
    reviews: 85,
    isCustomizable: false,
    category: "Clocks",
    inStock: true,
  },
  {
    id: 3,
    name: "Custom Phone Cover",
    price: 1500,
    originalPrice: 2000,
    images: [
      "/products/mobileCover/product1.jpg",
      "/products/mobileCover/product2.jpg",
    ],
    rating: 4.7,
    reviews: 200,
    isCustomizable: true,
    category: "Phone Cases",
    inStock: true,
  },
  {
    id: 4,
    name: "Family Photo Album",
    price: 4500,
    images: ["/products/familyAlbum/product1.jpg"],
    rating: 4.0,
    reviews: 50,
    isCustomizable: false,
    category: "Albums",
    inStock: false,
  },
  {
    id: 5,
    name: "Engraved Key Chain",
    price: 800,
    images: [
      "/products/keyChain/product1.jpg",
      "/products/keyChain/product2.jpg",
    ],
    rating: 4.3,
    reviews: 90,
    isCustomizable: true,
    category: "Key Chains",
    inStock: true,
  },
  {
    id: 6,
    name: "Wooden House Plate",
    price: 2800,
    images: ["/products/housePlate/product1.jpg"],
    rating: 4.6,
    reviews: 110,
    isCustomizable: true,
    category: "Name Plates",
    inStock: true,
  },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("default");

  const categories = ["All", ...new Set(products.map((p) => p.category))];
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return a.id - b.id; // default
  });

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Featured 3D Gallery Section */}
        <SectionHeader
          title="Featured Products"
          description="Discover our full range of handcrafted antiques and crafts."
        />

        {/* Filters and Sorting */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`text-sm ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "border-primary/50 text-foreground hover:bg-primary/10"
                }`}
                onClick={() => setSelectedCategory(category)}
                aria-label={`Filter by ${category}`}
              >
                {category}
              </Button>
            ))}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="border-primary/50 text-foreground hover:bg-primary/10"
              >
                <SortAsc className="w-4 h-4 mr-2" />
                Sort by:{" "}
                {sortBy === "default" ? "Default" : sortBy.replace("-", " ")}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 border border-border"
            >
              <DropdownMenuItem onClick={() => setSortBy("default")}>
                Default
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("price-low")}>
                Price: Low to High
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("price-high")}>
                Price: High to Low
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("rating")}>
                Rating
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* All Products Section */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
