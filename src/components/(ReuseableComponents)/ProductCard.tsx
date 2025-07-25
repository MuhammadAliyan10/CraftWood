"use client";

import Image from "next/image";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  Palette,
  ShoppingCart,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

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

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <Link
      href={`/product/${product.id}`}
      aria-label={`View details for ${product.name}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.02 }}
        className="w-full max-w-[300px] mx-auto"
      >
        <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white group">
          <CardContent className="p-0">
            {/* Product Image Section */}
            <div className="relative h-56 bg-gradient-to-br from-primary/5 to-primary/10 overflow-hidden">
              <Image
                src={product.images[currentImageIndex]}
                alt={product.name}
                width={300}
                height={224}
                className="object-cover w-full h-full"
                priority={currentImageIndex === 0}
              />
              {discount > 0 && (
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-semibold shadow-md">
                  -{discount}%
                </div>
              )}
              {product.isCustomizable && (
                <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-lg text-xs font-semibold shadow-md flex items-center gap-1">
                  <Palette className="w-3 h-3" />
                  Custom
                </div>
              )}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-3 h-3" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-3 h-3" />
                  </button>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                    {product.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setCurrentImageIndex(index);
                        }}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${
                          index === currentImageIndex
                            ? "bg-white"
                            : "bg-white/50"
                        }`}
                        aria-label={`View image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
              <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <button
                  onClick={toggleLike}
                  className={`p-1.5 rounded-full shadow-md transition-all duration-300 ${
                    isLiked
                      ? "bg-red-500 text-white"
                      : "bg-white/90 hover:bg-white text-foreground"
                  }`}
                  aria-label={
                    isLiked ? "Remove from wishlist" : "Add to wishlist"
                  }
                >
                  <Heart
                    className="w-3 h-3"
                    fill={isLiked ? "currentColor" : "none"}
                  />
                </button>
                <button
                  className="p-1.5 bg-white/90 hover:bg-white text-foreground rounded-full shadow-md transition-all duration-300"
                  aria-label="View product details"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // Add view details logic here if needed
                  }}
                >
                  <Eye className="w-3 h-3" />
                </button>
                {product.isCustomizable && (
                  <Link href={`/product/${product.id}/customize`} passHref>
                    <button
                      className="p-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-md transition-all duration-300"
                      aria-label="Customize this product"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Palette className="w-3 h-3" />
                    </button>
                  </Link>
                )}
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary" className="text-xs px-2 py-0.5">
                  {product.category}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-muted-foreground font-medium">
                    {product.rating}
                  </span>
                </div>
              </div>
              <h3 className="font-semibold text-foreground text-sm leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg font-bold text-primary">
                  Rs. {product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-muted-foreground line-through">
                    Rs. {product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <div className="text-xs text-muted-foreground mb-3">
                ({product.reviews} reviews)
              </div>
              <Button
                disabled={!product.inStock}
                className={`w-full text-sm h-8 font-medium transition-all duration-300 ${
                  product.inStock
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <ShoppingCart className="w-3 h-3 mr-2" />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
