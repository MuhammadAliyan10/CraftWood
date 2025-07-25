"use client";

import React, { useState, useEffect } from "react";
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
  Upload,
  Type,
  Image as ImageIcon,
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
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/(ReuseableComponents)/ProductCard";
import { notFound, useRouter } from "next/navigation";
import Head from "next/head";
import { useStore } from "@/lib/store";

export default function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const resolvedParams = React.use(params);
  const id = parseInt(resolvedParams.id, 10);

  // Zustand store
  const {
    selectedProduct,
    setSelectedProduct,
    getProductById,
    clearSelectedProduct,
    products,
    getProductsByCategory,
    addToCart,
    totalItems,
    cart,
  } = useStore();

  // Local UI state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "description" | "features" | "reviews"
  >("description");
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Initialize product from store
  useEffect(() => {
    if (isNaN(id)) {
      notFound();
    }

    const product = getProductById(id);
    if (!product) {
      notFound();
    }

    setSelectedProduct(product);
    setIsLoading(false);

    // Reset UI state when product changes
    setCurrentImageIndex(0);
    setQuantity(1);
    setActiveTab("description");

    // Cleanup on unmount
    return () => {
      clearSelectedProduct();
    };
  }, [id, getProductById, setSelectedProduct, clearSelectedProduct]);

  // Check if product is already in wishlist (you can implement wishlist store later)
  useEffect(() => {
    if (selectedProduct) {
      // Simulate checking wishlist status
      // setIsWishlisted(isProductInWishlist(selectedProduct.id));
    }
  }, [selectedProduct]);

  // Loading state
  if (isLoading || !selectedProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading product details...</p>
        </motion.div>
      </div>
    );
  }

  // Product not found (handled by useEffect, but keep as fallback)
  if (!selectedProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
        <Head>
          <title>Product Not Found | CraftWood</title>
          <meta
            name="description"
            content="The requested product could not be found."
          />
        </Head>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200"
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
          <Link href="/products">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-xl">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const product = selectedProduct;

  // Calculate discount
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  // Get suggested products from store
  const suggestedProducts = products
    .filter((p) => p.id !== product.id)
    .sort((a, b) => (a.category === product.category ? -1 : 1))
    .slice(0, 4);

  // Image navigation handlers
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

  // Quantity handlers
  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  // Navigation handlers
  const handleCustomize = () => {
    try {
      if (!product) return;

      router.push(`/editor/${product.id}`);
    } catch (error) {
      console.error("Navigation error:", error);
      toast.error("Unable to open customization. Please try again.");
    }
  };
  // Add to cart handler with store integration
  const handleAddToCart = async () => {
    if (!product) return;

    setIsAddingToCart(true);

    try {
      // Create cart item
      const cartItem = {
        product: product,
        quantity: quantity,
        price: product.price,
        // No device or customization for direct purchases
      };

      // Add to store
      addToCart(cartItem);

      // Show success message
      toast.success(`${product.title} has been added to your cart!`, {
        description: `Quantity: ${quantity} • Total: Rs. ${(
          product.price * quantity
        ).toLocaleString()}`,
        action: {
          label: "View Cart",
          onClick: () => router.push("/cart"),
        },
      });

      // Reset quantity
      setQuantity(1);
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Failed to add item to cart. Please try again.");
    } finally {
      setIsAddingToCart(false);
    }
  };

  // Buy now handler
  const handleBuyNow = async () => {
    if (!product) return;

    try {
      // Add to cart first
      await handleAddToCart();

      // Navigate to checkout
      router.push("/checkout");
    } catch (error) {
      console.error("Buy now error:", error);
      toast.error("Unable to proceed to checkout. Please try again.");
    }
  };

  // Wishlist handler (implement when wishlist store is ready)
  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    if (!isWishlisted) {
      toast.success(`${product.title} added to wishlist!`);
    } else {
      toast.success(`${product.title} removed from wishlist!`);
    }
    // TODO: Integrate with wishlist store when implemented
    // toggleWishlist(product.id);
  };

  // Share handler
  const handleShare = async () => {
    const shareData = {
      title: product.title,
      text: product.description,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Product link copied to clipboard!");
      }
    } catch (error) {
      console.error("Share error:", error);
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Product link copied to clipboard!");
      } catch (clipboardError) {
        toast.error("Unable to share product link.");
      }
    }
  };

  // Check if product is in cart
  const isInCart = cart.some((item) => item.product.id === product.id);
  const cartQuantity = cart
    .filter((item) => item.product.id === product.id)
    .reduce((sum, item) => sum + item.quantity, 0);

  // Customization helpers
  const getCustomizationIcon = () => {
    if (!product.isCustomizable) return <Palette className="w-5 h-5" />;

    const hasImageUpload = product.features?.some(
      (f) =>
        f.toLowerCase().includes("image") || f.toLowerCase().includes("photo")
    );
    const hasTextCustomization = product.features?.some(
      (f) =>
        f.toLowerCase().includes("text") || f.toLowerCase().includes("name")
    );

    if (hasImageUpload && hasTextCustomization) {
      return <Palette className="w-5 h-5" />;
    } else if (hasImageUpload) {
      return <ImageIcon className="w-5 h-5" />;
    } else if (hasTextCustomization) {
      return <Type className="w-5 h-5" />;
    }
    return <Palette className="w-5 h-5" />;
  };

  const getCustomizationText = () => {
    if (!product.isCustomizable) return "Customize Now";

    const hasImageUpload = product.features?.some(
      (f) =>
        f.toLowerCase().includes("image") || f.toLowerCase().includes("photo")
    );
    const hasTextCustomization = product.features?.some(
      (f) =>
        f.toLowerCase().includes("text") || f.toLowerCase().includes("name")
    );

    if (hasImageUpload && hasTextCustomization) {
      return "Customize Design";
    } else if (hasImageUpload) {
      return "Upload Your Image";
    } else if (hasTextCustomization) {
      return "Add Custom Text";
    }
    return "Customize Now";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Head>
        <title>{product.title} | CraftWood</title>
        <meta
          name="description"
          content={`Customize the ${
            product.title
          }, a handcrafted ${product.category.toLowerCase()} with personalization options.`}
        />
        <meta property="og:title" content={`${product.title} | CraftWood`} />
        <meta property="og:description" content={product.description} />
        {product.images.length > 0 && (
          <meta property="og:image" content={product.images[0]} />
        )}
      </Head>

      {/* Navigation Bar */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/products">
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
                onClick={handleWishlistToggle}
                className={`rounded-full p-2 ${
                  isWishlisted
                    ? "text-red-500 bg-red-50"
                    : "text-muted-foreground hover:text-primary"
                }`}
                aria-label={
                  isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                }
              >
                <Heart
                  className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`}
                />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="rounded-full p-2 text-muted-foreground hover:text-primary"
                aria-label="Share product"
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
          {/* Image Section */}
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
                className="relative h-96 lg:h-[500px] bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl overflow-hidden shadow-2xl cursor-pointer border border-gray-200"
                onClick={() => product.images.length && setIsGalleryOpen(true)}
              >
                {product.images.length ? (
                  <Image
                    src={
                      product.images[currentImageIndex] || "/placeholder.jpg"
                    }
                    alt={product.title}
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
                    <Badge className="bg-red-500 text-white px-3 py-1 rounded-full font-semibold">
                      -{discount}%
                    </Badge>
                  )}
                  {product.isCustomizable && (
                    <Badge className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center gap-1">
                      <Palette className="w-3 h-3" />
                      Customizable
                    </Badge>
                  )}
                  {isInCart && (
                    <Badge className="bg-green-500 text-white px-3 py-1 rounded-full flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      In Cart ({cartQuantity})
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
                        : "border-gray-200 hover:border-primary/50"
                    }`}
                    aria-label={`View image ${index + 1}`}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Details Section */}
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
                  className="px-4 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary"
                >
                  {product.category}
                </Badge>
                <div className="px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 bg-green-100 text-green-700 border border-green-200">
                  <Check className="w-3 h-3" />
                  In Stock
                </div>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                {product.title}
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

            {/* Customization CTA */}
            {product.isCustomizable && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-2xl p-6 border border-primary/20">
                  <div className="flex items-center gap-3 mb-3">
                    {getCustomizationIcon()}
                    <h3 className="text-lg font-semibold text-foreground">
                      Make it Yours!
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {product.description}
                  </p>
                  <Button
                    onClick={handleCustomize}
                    className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    {getCustomizationIcon()}
                    <span className="ml-3">{getCustomizationText()}</span>
                    <Zap className="w-5 h-5 ml-3" />
                  </Button>
                </div>
              </div>
            )}

            {/* Quantity & Actions */}
            <div className="space-y-6">
              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="font-semibold text-foreground">Quantity:</span>
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="p-3 hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 py-3 font-semibold min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={increaseQuantity}
                    className="p-3 hover:bg-primary/10 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons - Only if NOT customizable */}
              {!product.isCustomizable && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                    className="py-6 rounded-xl text-lg font-semibold transition-all bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl"
                  >
                    {isAddingToCart ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Adding...
                      </div>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5 mr-3" />
                        {isInCart
                          ? `Add More (${cartQuantity} in cart)`
                          : "Add to Cart"}
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={handleBuyNow}
                    disabled={isAddingToCart}
                    className="py-6 rounded-xl text-lg font-semibold transition-all bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg hover:shadow-xl"
                  >
                    Buy Now
                  </Button>
                </div>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
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

        {/* Tabs Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <div className="flex">
                {[
                  { id: "description", label: "Description", icon: Info },
                  { id: "features", label: "Features", icon: Palette },
                  { id: "reviews", label: "Reviews", icon: Star },
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
                      {product.description}
                    </p>
                  </motion.div>
                )}

                {activeTab === "features" && (
                  <motion.div
                    key="features"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      Product Features
                    </h3>
                    {product.features && product.features.length > 0 ? (
                      <div className="grid md:grid-cols-2 gap-4">
                        {product.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg"
                          >
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="text-foreground font-medium">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">
                        No specific features listed for this product.
                      </p>
                    )}
                    {product.isCustomizable && (
                      <div className="mt-6">
                        <Button
                          onClick={handleCustomize}
                          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-xl"
                        >
                          Start Customizing Now
                          <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                        </Button>
                      </div>
                    )}
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
                      actual review data from the store.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Gallery Dialog */}
        <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
          <DialogContent className="max-w-5xl bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                {product.title} Gallery
              </DialogTitle>
              <DialogClose />
            </DialogHeader>
            <div className="relative h-[70vh] mt-6 rounded-xl overflow-hidden">
              {product.images.length ? (
                <Image
                  src={product.images[currentImageIndex] || "/placeholder.jpg"}
                  alt={`${product.title} - Image ${currentImageIndex + 1}`}
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
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Suggested Products Section */}
      {suggestedProducts.length > 0 && (
        <div className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 border-t border-gray-200">
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
                Discover more handcrafted treasures from our {product.category}{" "}
                collection that match your style.
              </p>
            </motion.div>

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
          </div>
        </div>
      )}

      {/* Floating Customize Button for Mobile */}
      {product.isCustomizable && (
        <div className="fixed bottom-6 right-6 lg:hidden z-40">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 200 }}
          >
            <Button
              onClick={handleCustomize}
              className="w-14 h-14 rounded-full shadow-2xl bg-primary hover:bg-primary/90 text-primary-foreground"
              aria-label="Customize product"
            >
              <Palette className="w-6 h-6" />
            </Button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
