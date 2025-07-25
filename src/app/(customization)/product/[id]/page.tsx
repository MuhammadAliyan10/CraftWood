"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Palette,
  ShoppingCart,
  Star,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Plus,
  Minus,
  Info,
  Check,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/(ReuseableComponents)/ProductCard";
import { notFound } from "next/navigation";
import Head from "next/head";

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
  description: string;
}

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
    description:
      "A beautifully crafted wooden award, perfect for recognizing achievements with a touch of elegance.",
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
    description:
      "A timeless vintage wall clock, adding rustic charm to any space.",
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
    description:
      "Personalize your phone with this durable, custom-designed cover.",
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
    description:
      "A handcrafted album to preserve your cherished family memories.",
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
    description: "A sleek, customizable key chain with intricate engravings.",
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
    description: "A personalized wooden house plate, perfect for home decor.",
  },
  {
    id: 7,
    name: "Leather Photo Album",
    price: 5000,
    images: ["/products/leatherAlbum/product1.jpg"],
    rating: 4.1,
    reviews: 60,
    isCustomizable: true,
    category: "Albums",
    inStock: true,
    description:
      "A premium leather-bound photo album for your special moments.",
  },
  {
    id: 8,
    name: "No Image Product",
    price: 2000,
    images: [],
    rating: 4.0,
    reviews: 30,
    isCustomizable: false,
    category: "Awards",
    inStock: true,
    description: "A test product with no images to ensure robust handling.",
  },
];

export default function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = React.use(params);
  const id = parseInt(resolvedParams.id, 10);
  if (isNaN(id)) {
    notFound();
  }

  const product = products.find((p) => p.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "description" | "reviews" | "shipping"
  >("description");

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
        <Head>
          <title>Product Not Found | Rafique Antiques</title>
          <meta
            name="description"
            content="The requested product could not be found."
          />
        </Head>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto p-8 bg-background/80 backdrop-blur-sm rounded-2xl shadow-xl border border-border/20"
        >
          <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
            <X className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Product Not Found
          </h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            The product you are looking for does not exist or has been removed
            from our catalog.
          </p>
          <Link href="/products" aria-label="Back to products">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-xl">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const suggestedProducts = products
    .filter((p) => p.id !== product.id)
    .sort((a, b) => (a.category === product.category ? -1 : 1))
    .slice(0, 4);

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % (product.images.length || 1));
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + (product.images.length || 1)) % (product.images.length || 1)
    );
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Head>
        <title>{product.name} | Rafique Antiques</title>
        <meta
          name="description"
          content={`Explore the ${
            product.name
          }, a handcrafted ${product.category.toLowerCase()} with a rating of ${
            product.rating
          }.`}
        />
      </Head>

      {/* Enhanced Navigation Bar */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/products" aria-label="Back to products">
              <Button
                variant="ghost"
                className="text-foreground hover:text-primary hover:bg-primary/10 rounded-xl px-4 py-2"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Products
              </Button>
            </Link>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`rounded-full p-2 ${
                  isWishlisted
                    ? "text-red-500 bg-red-50"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`}
                />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full p-2 text-muted-foreground hover:text-primary"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Product Details Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Enhanced Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative group">
              <motion.div
                whileHover={{ scale: product.images.length ? 1.02 : 1 }}
                transition={{ duration: 0.3 }}
                className="relative h-96 lg:h-[500px] bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl overflow-hidden shadow-2xl cursor-pointer border border-border/20"
                onClick={() => product.images.length && setIsGalleryOpen(true)}
                aria-label={`View gallery for ${product.name}`}
                role="button"
                tabIndex={product.images.length ? 0 : -1}
                onKeyDown={(e) =>
                  product.images.length &&
                  e.key === "Enter" &&
                  setIsGalleryOpen(true)
                }
              >
                {product.images.length ? (
                  <Image
                    src={
                      product.images[currentImageIndex] || "/placeholder.jpg"
                    }
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    priority={currentImageIndex === 0}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                        <Info className="w-8 h-8 text-primary" />
                      </div>
                      <p className="text-sm">No Image Available</p>
                    </div>
                  </div>
                )}

                {/* Floating badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {discount > 0 && (
                    <Badge className="bg-primary text-primary-foreground px-3 py-1 rounded-full font-semibold">
                      -{discount}%
                    </Badge>
                  )}
                  {product.isCustomizable && (
                    <Badge className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
                      <Palette className="w-3 h-3 mr-1" />
                      Customizable
                    </Badge>
                  )}
                </div>

                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </motion.div>
            </div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      index === currentImageIndex
                        ? "border-primary shadow-lg"
                        : "border-border/20 hover:border-primary/50"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Enhanced Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Product Header */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <Badge
                  variant="secondary"
                  className="px-4 py-1 rounded-full text-sm font-medium"
                >
                  {product.category}
                </Badge>
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    product.inStock
                      ? "bg-green-100 text-green-700 border border-green-200"
                      : "bg-red-100 text-red-700 border border-red-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {product.inStock ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <X className="w-3 h-3" />
                    )}
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </div>
                </div>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                {product.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="font-semibold text-foreground">
                    {product.rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
              </div>

              {/* Price Section */}
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-bold text-primary">
                    Rs. {product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <div className="flex items-center gap-2">
                      <span className="text-xl text-muted-foreground line-through">
                        Rs. {product.originalPrice.toLocaleString()}
                      </span>
                      <span className="text-green-600 font-semibold">
                        Save Rs.{" "}
                        {(
                          product.originalPrice - product.price
                        ).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Customize Button */}
            {product.isCustomizable && (
              <Link href={`/product/${product.id}/customize`} passHref>
                <Button
                  className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground py-6 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                  aria-label="Customize this product"
                >
                  <Palette className="w-5 h-5 mr-3" />
                  Customize Your Own Design
                  <Zap className="w-5 h-5 ml-3" />
                </Button>
              </Link>
            )}

            {/* Quantity & Actions */}
            <div className="space-y-6">
              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="font-semibold text-foreground">Quantity:</span>
                <div className="flex items-center border border-border rounded-xl overflow-hidden">
                  <button
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="p-3 hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 py-3 font-semibold min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={increaseQuantity}
                    className="p-3 hover:bg-primary/10 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button
                  disabled={!product.inStock}
                  className={`py-6 rounded-xl text-lg font-semibold transition-all ${
                    product.inStock
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                  aria-label="Add to cart"
                >
                  <ShoppingCart className="w-5 h-5 mr-3" />
                  Add to Cart
                </Button>
                <Button
                  disabled={!product.inStock}
                  className={`py-6 rounded-xl text-lg font-semibold transition-all ${
                    product.inStock
                      ? "bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg hover:shadow-xl"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                  aria-label="Buy now"
                >
                  Buy Now
                </Button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/20">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Truck className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">
                  Free Shipping
                </p>
                <p className="text-xs text-muted-foreground">
                  On orders over Rs. 2000
                </p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">
                  Quality Guarantee
                </p>
                <p className="text-xs text-muted-foreground">
                  Handcrafted excellence
                </p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <RotateCcw className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">
                  Easy Returns
                </p>
                <p className="text-xs text-muted-foreground">
                  30-day return policy
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Tabs Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="bg-background/80 backdrop-blur-sm rounded-2xl shadow-xl border border-border/20 overflow-hidden">
            {/* Tab Navigation */}
            <div className="border-b border-border/20">
              <div className="flex">
                {[
                  { id: "description", label: "Description", icon: Info },
                  { id: "reviews", label: "Reviews", icon: Star },
                  { id: "shipping", label: "Shipping", icon: Truck },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-semibold transition-all ${
                      activeTab === tab.id
                        ? "text-primary border-b-2 border-primary bg-primary/5"
                        : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-8">
              <AnimatePresence mode="wait">
                {activeTab === "description" && (
                  <motion.div
                    key="description"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      Product Description
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {product.description ||
                        "No description available for this product."}
                    </p>
                  </motion.div>
                )}

                {activeTab === "reviews" && (
                  <motion.div
                    key="reviews"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-foreground">
                        Customer Reviews
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.floor(product.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-semibold">
                          {product.rating.toFixed(1)}
                        </span>
                        <span className="text-muted-foreground">
                          ({product.reviews} reviews)
                        </span>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      Reviews functionality would be implemented here with
                      actual review data.
                    </p>
                  </motion.div>
                )}

                {activeTab === "shipping" && (
                  <motion.div
                    key="shipping"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      Shipping Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">
                          Delivery Options
                        </h4>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• Standard Delivery: 5-7 business days</li>
                          <li>• Express Delivery: 2-3 business days</li>
                          <li>• Same Day Delivery (select cities)</li>
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">
                          Return Policy
                        </h4>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• 30-day return window</li>
                          <li>• Free returns on defective items</li>
                          <li>• Original packaging required</li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Gallery Dialog */}
        <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
          <DialogContent className="max-w-5xl bg-background/95 backdrop-blur-xl border border-border/20 rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                {product.name} Gallery
              </DialogTitle>
              <DialogClose aria-label="Close gallery" />
            </DialogHeader>
            <div className="relative h-[70vh] mt-6 rounded-xl overflow-hidden">
              {product.images.length ? (
                <Image
                  src={product.images[currentImageIndex] || "/placeholder.jpg"}
                  alt={`${product.name} - Image ${currentImageIndex + 1}`}
                  fill
                  className="object-contain"
                  priority={currentImageIndex === 0}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                      <Info className="w-8 h-8 text-primary" />
                    </div>
                    <p>No Images Available</p>
                  </div>
                </div>
              )}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-xl backdrop-blur-sm transition-all"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-xl backdrop-blur-sm transition-all"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {product.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          index === currentImageIndex
                            ? "bg-primary scale-125"
                            : "bg-primary/30 hover:bg-primary/60"
                        }`}
                        aria-label={`View image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Enhanced Suggested Products Section */}
      <div className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 border-t border-border/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              You May Also Like
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              {suggestedProducts.length
                ? `Discover more handcrafted treasures${
                    product.category
                      ? ` from our ${product.category} collection`
                      : ""
                  } that match your style and preferences.`
                : "Explore other handcrafted products from our curated collection."}
            </p>
          </motion.div>

          {suggestedProducts.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              <AnimatePresence>
                {suggestedProducts.map((suggestedProduct, index) => (
                  <motion.div
                    key={suggestedProduct.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8 }}
                    className="group"
                  >
                    <ProductCard product={suggestedProduct} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                <Info className="w-8 h-8 text-primary" />
              </div>
              <p className="text-muted-foreground text-lg">
                No related products available at the moment.
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 lg:hidden z-40">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 200 }}
        >
          <Button
            disabled={!product.inStock}
            onClick={() => {
              // Scroll to action buttons on mobile
              const actionSection = document.querySelector(
                '[aria-label="Add to cart"]'
              );
              actionSection?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`w-14 h-14 rounded-full shadow-2xl ${
              product.inStock
                ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
            aria-label="Quick add to cart"
          >
            <ShoppingCart className="w-6 h-6" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
