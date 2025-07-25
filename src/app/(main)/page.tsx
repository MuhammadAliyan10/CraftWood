"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  ShoppingCart,
  ArrowRight,
  Truck,
  Shield,
  Award,
  Users,
  TrendingUp,
  Eye,
  Heart,
  Zap,
  CheckCircle,
  Phone,
  Clock,
  MapPin,
  Play,
  Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "./components/Navbar";
import ProductCard from "@/components/(ReuseableComponents)/ProductCard";
import Footer from "@/components/(ReuseableComponents)/Footer";
import Product3DGallery, {
  Product3dGallery,
} from "@/components/(ReuseableComponents)/Product3DGallery";

// Hero carousel data

const heroSlides = [
  {
    id: 1,
    title: "Custom Wooden Phone Cases",
    subtitle: "Premium handcrafted protection for your device",
    price: "Rs. 2,500",
    originalPrice: "Rs. 3,000",
    description:
      "Protect your phone with style using our premium wooden cases, crafted from sustainably sourced wood.",
    features: [
      "Premium Wood",
      "Custom Engraving",
      "Perfect Fit",
      "Drop Protection",
    ],
    badge: "Best Seller",
  },
  {
    id: 2,
    title: "Handcrafted Name Plates",
    subtitle: "Beautiful wooden nameplates for your home",
    price: "Rs. 3,200",
    originalPrice: "Rs. 4,000",
    description:
      "Welcome guests with elegant wooden nameplates, customized with your family name and design.",
    features: [
      "Weather Resistant",
      "Custom Text",
      "Various Woods",
      "Easy Install",
    ],
    badge: "Most Popular",
  },
  {
    id: 3,
    title: "Wooden Wall Art",
    subtitle: "Transform your living space with natural beauty",
    price: "Rs. 4,800",
    originalPrice: "Rs. 6,000",
    description:
      "Unique wooden wall art pieces that bring warmth and character to any modern home.",
    features: ["Handcrafted", "Various Sizes", "Custom Design", "Modern Style"],
    badge: "Limited Edition",
  },
];

// Featured products data
const featuredProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro Wooden Case",
    price: 2500,
    originalPrice: 3000,
    images: ["/product-1.jpg", "/product-1-2.jpg", "/product-1-3.jpg"],
    rating: 4.8,
    reviews: 124,
    isCustomizable: true,
    category: "Phone Cases",
    inStock: true,
  },
  {
    id: 2,
    name: "Custom Family Name Plate",
    price: 3200,
    originalPrice: 4000,
    images: ["/product-2.jpg", "/product-2-2.jpg"],
    rating: 4.9,
    reviews: 89,
    isCustomizable: true,
    category: "Name Plates",
    inStock: true,
  },
  {
    id: 3,
    name: "Handcrafted Wall Clock",
    price: 3500,
    originalPrice: 4000,
    images: ["/product-3.jpg", "/product-3-2.jpg", "/product-3-3.jpg"],
    rating: 4.7,
    reviews: 156,
    isCustomizable: false,
    category: "Home Decor",
    inStock: true,
  },
  {
    id: 4,
    name: "Executive Desk Organizer",
    price: 2800,
    originalPrice: 3200,
    images: ["/product-4.jpg", "/product-4-2.jpg"],
    rating: 4.6,
    reviews: 78,
    isCustomizable: true,
    category: "Office",
    inStock: true,
  },
  {
    id: 5,
    name: "Modern Table Lamp",
    price: 4200,
    originalPrice: 4800,
    images: ["/product-5.jpg", "/product-5-2.jpg"],
    rating: 4.9,
    reviews: 92,
    isCustomizable: true,
    category: "Lighting",
    inStock: true,
  },
  {
    id: 6,
    name: "Personalized Photo Frame",
    price: 1800,
    originalPrice: 2200,
    images: ["/product-6.jpg", "/product-6-2.jpg"],
    rating: 4.5,
    reviews: 67,
    isCustomizable: true,
    category: "Frames",
    inStock: true,
  },
  {
    id: 7,
    name: "Wooden Key Holder",
    price: 1500,
    originalPrice: 1800,
    images: ["/product-7.jpg", "/product-7-2.jpg"],
    rating: 4.7,
    reviews: 45,
    isCustomizable: true,
    category: "Home Decor",
    inStock: true,
  },
  {
    id: 8,
    name: "Premium Coaster Set",
    price: 1200,
    originalPrice: 1500,
    images: ["/product-8.jpg", "/product-8-2.jpg"],
    rating: 4.4,
    reviews: 32,
    isCustomizable: true,
    category: "Accessories",
    inStock: true,
  },
];

// Categories
const categories = [
  { name: "Phone Cases", count: 45, icon: "📱" },
  { name: "Wall Art", count: 32, icon: "🖼️" },
  { name: "Name Plates", count: 28, icon: "🏠" },
  { name: "Home Decor", count: 56, icon: "🏡" },
  { name: "Office Items", count: 23, icon: "💼" },
  { name: "Lighting", count: 18, icon: "💡" },
];

// Customer testimonials
const testimonials = [
  {
    id: 1,
    name: "Ahmed Hassan",
    location: "Lahore",
    rating: 5,
    text: "Amazing quality! The wooden phone case is beautifully crafted and fits perfectly. Highly recommend CraftWood!",
    product: "iPhone Case",
  },
  {
    id: 2,
    name: "Fatima Khan",
    location: "Karachi",
    rating: 5,
    text: "The custom name plate exceeded my expectations. Perfect for our new home. Great customer service too!",
    product: "Name Plate",
  },
  {
    id: 3,
    name: "Ali Raza",
    location: "Islamabad",
    rating: 5,
    text: "Fast delivery and excellent craftsmanship. The wall art piece looks stunning in our living room.",
    product: "Wall Art",
  },
];

// Process steps
const processSteps = [
  {
    step: 1,
    title: "Choose Your Product",
    description:
      "Browse our collection of handcrafted wooden items or start with a custom design.",
    icon: "🎯",
  },
  {
    step: 2,
    title: "Customize Design",
    description:
      "Upload your image, add text, or work with our designers to create something unique.",
    icon: "🎨",
  },
  {
    step: 3,
    title: "Review & Order",
    description:
      "Preview your design, confirm details, and place your order with secure payment.",
    icon: "✅",
  },
  {
    step: 4,
    title: "Fast Delivery",
    description:
      "We craft your item with care and deliver it to your doorstep within 5-7 business days.",
    icon: "🚚",
  },
];

const images3d = [
  "https://picsum.photos/600/400?random=1",
  "https://picsum.photos/600/400?random=2",
  "https://picsum.photos/600/400?random=3",
  "https://picsum.photos/600/400?random=4",
  "https://picsum.photos/600/400?random=5",
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleProducts, setVisibleProducts] = useState(4);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-advance hero carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Responsive product count
  useEffect(() => {
    const updateVisibleProducts = () => {
      if (window.innerWidth >= 1024) setVisibleProducts(4);
      else if (window.innerWidth >= 768) setVisibleProducts(3);
      else if (window.innerWidth >= 640) setVisibleProducts(2);
      else setVisibleProducts(1);
    };

    updateVisibleProducts();
    window.addEventListener("resize", updateVisibleProducts);
    return () => window.removeEventListener("resize", updateVisibleProducts);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  // Smooth scroll for products
  const scrollProducts = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const targetScroll =
        direction === "left"
          ? currentScroll - scrollAmount
          : currentScroll + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };
  const handleProductClick = (product: any) => {
    console.log("Product clicked:", product);
    // Handle product click - navigate to product page or open modal
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-transparent pt-20 pb-10 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh] py-8">
            {/* Left Content */}
            <div className="space-y-8 lg:pr-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3">
                    <Badge className="bg-orange-100 text-orange-700 border-orange-200 px-3 py-1">
                      {heroSlides[currentSlide].badge}
                    </Badge>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                      <span className="ml-2 text-sm text-muted-foreground">
                        (4.8/5)
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                      {heroSlides[currentSlide].title}
                    </h1>
                    <p className="text-xl text-muted-foreground">
                      {heroSlides[currentSlide].subtitle}
                    </p>
                    <p className="text-base text-muted-foreground max-w-lg leading-relaxed">
                      {heroSlides[currentSlide].description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-3">
                    {heroSlides[currentSlide].features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Price and CTA */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl font-bold text-primary">
                        {heroSlides[currentSlide].price}
                      </span>
                      <span className="text-xl text-muted-foreground line-through">
                        {heroSlides[currentSlide].originalPrice}
                      </span>
                      <Badge className="bg-red-100 text-red-700 border-red-200">
                        Save 20%
                      </Badge>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8"
                      >
                        <ShoppingCart className="mr-2 w-5 h-5" />
                        Order Now
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      >
                        <Eye className="mr-2 w-4 h-4" />
                        View Gallery
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Content - Product Showcase */}
            <div className="relative">
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    transition={{ duration: 0.6 }}
                    className="aspect-square bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl flex items-center justify-center relative overflow-hidden"
                  >
                    <div className="w-3/4 h-3/4 bg-primary/20 rounded-xl flex items-center justify-center">
                      <span className="text-primary font-semibold text-lg">
                        Product Preview
                      </span>
                    </div>

                    {/* Floating elements */}
                    <div className="absolute top-4 right-4 bg-green-500 text-white rounded-full px-3 py-1 text-xs font-semibold animate-pulse">
                      In Stock
                    </div>
                    <div className="absolute bottom-4 left-4 bg-blue-500 text-white rounded-full px-3 py-1 text-xs font-semibold">
                      Customizable
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <button
                  onClick={prevSlide}
                  className="absolute top-1/2 -translate-y-1/2 -left-6 bg-white hover:bg-primary hover:text-white rounded-full p-3 shadow-lg transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute top-1/2 -translate-y-1/2 -right-6 bg-white hover:bg-primary hover:text-white rounded-full p-3 shadow-lg transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Carousel Indicators */}
              <div className="flex justify-center gap-2 mt-6">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "bg-primary w-8"
                        : "bg-primary/30 w-2 hover:bg-primary/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 text-center">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <div className="text-lg font-bold text-foreground">5000+</div>
                <div className="text-xs text-muted-foreground">
                  Happy Customers
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              <div>
                <div className="text-lg font-bold text-foreground">500+</div>
                <div className="text-xs text-muted-foreground">Products</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <div>
                <div className="text-lg font-bold text-foreground">4.8/5</div>
                <div className="text-xs text-muted-foreground">Rating</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <div className="text-lg font-bold text-foreground">24/7</div>
                <div className="text-xs text-muted-foreground">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our wide range of handcrafted wooden products for every
              need
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0 shadow-sm group-hover:scale-105 bg-white">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl mb-3">{category.icon}</div>
                    <h3 className="font-semibold text-foreground text-sm mb-1">
                      {category.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {category.count} items
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section - Improved Gallery */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              <TrendingUp className="w-4 h-4 mr-2" />
              3D Gallery
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Products in 3D
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience our products in stunning 3D. Drag to rotate and explore
              every detail.
            </p>
          </div>

          <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Product3dGallery
              images={images3d}
              width={350}
              perspective={2500}
              imageDistance={400}
              backgroundColor="transparent"
              hoverOpacity={0.3}
              animationDuration={2}
              staggerDelay={0.15}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple steps to get your custom wooden masterpiece
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary/30"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real reviews from satisfied customers across Pakistan
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <Card className="p-8 shadow-lg border-0 bg-muted/30">
                  <CardContent className="space-y-6">
                    <Quote className="w-8 h-8 text-primary mx-auto" />
                    <p className="text-lg text-foreground leading-relaxed italic">
                      "{testimonials[currentTestimonial].text}"
                    </p>
                    <div className="flex justify-center">
                      {[...Array(testimonials[currentTestimonial].rating)].map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 fill-yellow-400 text-yellow-400"
                          />
                        )
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">
                        {testimonials[currentTestimonial].name}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center justify-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        {testimonials[currentTestimonial].location} •{" "}
                        {testimonials[currentTestimonial].product}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Testimonial Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentTestimonial
                      ? "bg-primary w-6"
                      : "bg-primary/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose CraftWood?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the finest craftsmanship with modern convenience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: "Premium Quality",
                description:
                  "Hand-selected wood materials with expert craftsmanship for lasting durability and beauty.",
              },
              {
                icon: Users,
                title: "Custom Design",
                description:
                  "Upload your photo and see real-time preview before ordering. Make it truly yours.",
              },
              {
                icon: Truck,
                title: "Fast Delivery",
                description:
                  "Quick delivery across Pakistan with real-time tracking and careful packaging.",
              },
              {
                icon: Shield,
                title: "Secure Payment",
                description:
                  "Multiple payment options including EasyPaisa, JazzCash, and Cash on Delivery.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="text-center p-6 border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 bg-white h-full">
                  <CardContent className="space-y-4">
                    <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mx-auto">
                      <feature.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Support Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Need Help or Have Questions?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our friendly customer support team is here to help you with any
                questions about our products, customization options, or orders.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Call Us</div>
                    <div className="text-muted-foreground">+92 300 1234567</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      Business Hours
                    </div>
                    <div className="text-muted-foreground">
                      Mon-Sat: 9AM-8PM
                    </div>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Phone className="mr-2 w-4 h-4" />
                Contact Support
              </Button>
            </div>

            <div className="bg-muted/30 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-foreground mb-6">
                Quick Links
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Track Your Order",
                  "Shipping Info",
                  "Return Policy",
                  "Size Guide",
                  "Care Instructions",
                  "Bulk Orders",
                ].map((link, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm py-2"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground">
                Ready to Create Something Beautiful?
              </h2>
              <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
                Start customizing your wooden masterpiece today. Upload your
                design and see it come to life with our expert craftsmanship and
                attention to detail.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold px-8"
              >
                <Zap className="mr-2 w-5 h-5" />
                Start Customizing
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                <Eye className="mr-2 w-4 h-4" />
                Browse Gallery
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
