"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  TreePine,
  User,
  Heart,
  Package,
  Phone,
  Mail,
  Scale3D,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation"; // Import usePathname
import Link from "next/link";
import Image from "next/image";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Custom Design", href: "/customize" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

const quickLinks = [
  { name: "Phone Cases", href: "/products/phone-cases" },
  { name: "Wall Art", href: "/products/wall-art" },
  { name: "Name Plates", href: "/products/name-plates" },
  { name: "Custom Orders", href: "/custom" },
];

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartItems] = useState(3); // Mock cart count
  const [wishlistItems] = useState(5); // Mock wishlist count
  const pathname = usePathname(); // Get current pathname

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // Handle search logic here
    }
  };

  return (
    <>
      {/* Top Info Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="hidden md:block bg-background/90 text-muted-foreground py-2.5 border-b border-border/50"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between text-sm font-medium">
            <div className="flex items-center space-x-2 mb-2 sm:mb-0">
              <MapPin className="w-4 h-4 text-primary" />
              <address className="not-italic">
                <a
                  href="/contact"
                  className="hover:text-primary transition-colors duration-200"
                  aria-label="Visit our store in Sillanwali, Pakistan"
                >
                  Sillanwali, Pakistan
                </a>
              </address>
            </div>
            <div className="flex items-center space-x-4 text-center sm:text-left">
              <a
                href="/shipping"
                className="hover:text-primary transition-colors duration-200"
                aria-label="Learn about free shipping on orders over Rs. 3,000"
              >
                Free shipping on orders over Rs. 3,000
              </a>
              <Separator
                orientation="vertical"
                className="h-4 bg-border/50 hidden sm:block"
              />
              <a
                href="/new-arrivals"
                className="hover:text-primary transition-colors duration-200"
                aria-label="Explore new arrivals weekly"
              >
                ✨ New arrivals weekly
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-border"
            : "bg-white/90 backdrop-blur-md border-b border-border/50"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link href="/" aria-label="Rafique Antiques Home">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group"
              >
                <div className="relative">
                  <Image
                    src="/logo/Icon.png"
                    alt="Rafique Antiques Logo"
                    width={40}
                    height={40}
                    className="object-contain sm:w-12 sm:h-12 rounded-md shadow-sm group-hover:shadow-md transition-shadow duration-200"
                    priority
                  />
                </div>
                <div className="hidden md:block xs:block">
                  <h1 className="text-lg sm:text-xl lg:text-xl font-semibold text-primary group-hover:text-primary transition-colors duration-200">
                    Rafique Antiques
                  </h1>
                  <p className="text-[10px] sm:text-xs text-muted-foreground leading-tight">
                    Handcrafted Excellence
                  </p>
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item, index) => (
                <Link
                  id={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200 group ${
                    pathname === item.href
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary transition-all duration-300 ${
                      pathname === item.href ? "w-6" : "w-0 group-hover:w-6"
                    }`}
                  ></span>
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-2 lg:space-x-3">
              {/* Search */}
              <div className="relative">
                <AnimatePresence>
                  {isSearchOpen ? (
                    <motion.form
                      onSubmit={handleSearch}
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 280, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-50"
                    >
                      <div className="relative">
                        <Input
                          placeholder="Search products, categories..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pr-20 pl-4 h-10 border-primary/30 focus:border-primary shadow-lg"
                          autoFocus
                          onBlur={() => {
                            setTimeout(() => setIsSearchOpen(false), 200);
                          }}
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                          <Button
                            type="submit"
                            size="sm"
                            className="h-6 px-2 bg-primary hover:bg-primary/90"
                          >
                            <Search className="w-3 h-3" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 hover:bg-destructive/10"
                            onClick={() => setIsSearchOpen(false)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </motion.form>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsSearchOpen(true)}
                      className="text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
                    >
                      <Search className="w-5 h-5" />
                    </Button>
                  )}
                </AnimatePresence>
              </div>

              {/* Wishlist - Desktop Only */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex text-foreground hover:text-primary hover:bg-primary/10 relative transition-all duration-200"
              >
                <Heart className="w-5 h-5" />
                {wishlistItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white min-w-[18px] h-[18px] rounded-full flex items-center justify-center text-xs p-0">
                    {wishlistItems}
                  </Badge>
                )}
              </Button>

              {/* Cart */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-foreground hover:text-primary hover:bg-primary/10 relative transition-all duration-200"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {cartItems > 0 && (
                      <Badge className="absolute -top-2 -right-2 bg-primary hover:bg-primary/90 text-primary-foreground min-w-[18px] h-[18px] rounded-full flex items-center justify-center text-xs p-0">
                        {cartItems}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg bg-card/95 backdrop-blur-lg">
                  <SheetHeader className="space-y-4">
                    <SheetTitle className="text-foreground flex items-center space-x-2">
                      <ShoppingCart className="w-5 h-5" />
                      <span>Shopping Cart ({cartItems})</span>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 space-y-4">
                    <div className="text-center py-12 text-muted-foreground">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShoppingCart className="w-8 h-8 opacity-50" />
                      </div>
                      <h3 className="font-semibold mb-2">Your cart is empty</h3>
                      <p className="text-sm mb-4">
                        Add some beautiful wooden crafts to get started!
                      </p>
                      <SheetClose asChild>
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                          Continue Shopping
                        </Button>
                      </SheetClose>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              {/* User Account - Desktop */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hidden md:flex text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
                  >
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 border border-border"
                >
                  <DropdownMenuItem>
                    <User className="w-4 h-4 mr-2" />
                    My Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Package className="w-4 h-4 mr-2" />
                    My Orders
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Heart className="w-4 h-4 mr-2" />
                    Wishlist
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-full sm:max-w-sm bg-card/95 backdrop-blur-lg"
                >
                  <SheetHeader className="space-y-4">
                    <SheetTitle className="text-foreground flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                        <TreePine className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <span>CraftWood</span>
                    </SheetTitle>
                  </SheetHeader>

                  <div className="mt-8 space-y-6">
                    {/* Mobile Navigation */}
                    <div className="space-y-2">
                      {navigationItems.map((item) => (
                        <SheetClose asChild key={item.name}>
                          <a
                            href={item.href}
                            className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                              pathname === item.href
                                ? "text-primary bg-primary/10 border-l-4 border-primary"
                                : "text-foreground hover:text-primary hover:bg-primary/5"
                            }`}
                          >
                            {item.name}
                          </a>
                        </SheetClose>
                      ))}
                    </div>

                    <Separator />

                    {/* Quick Links */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground mb-3">
                        Quick Links
                      </h4>
                      {quickLinks.map((link) => (
                        <SheetClose asChild key={link.name}>
                          <a
                            href={link.href}
                            className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            {link.name}
                          </a>
                        </SheetClose>
                      ))}
                    </div>

                    <Separator />

                    {/* Mobile Actions */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">
                          Wishlist
                        </span>
                        <Badge variant="secondary">{wishlistItems}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">
                          Cart
                        </span>
                        <Badge className="bg-primary text-primary-foreground">
                          {cartItems}
                        </Badge>
                      </div>
                    </div>

                    <Separator />

                    {/* Contact Info */}
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        <span>+92 300 1234567</span>
                      </div>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        <span>info@craftwood.pk</span>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
