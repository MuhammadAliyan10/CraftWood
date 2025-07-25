"use client";

import { motion } from "framer-motion";
import {
  TreePine,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  ArrowRight,
  CreditCard,
  Truck,
  Shield,
  Award,
  Scale3D,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerLinks = {
  products: [
    { name: "Phone Cases", href: "/products/phone-cases" },
    { name: "Wall Art", href: "/products/wall-art" },
    { name: "Name Plates", href: "/products/name-plates" },
    { name: "Home Decor", href: "/products/home-decor" },
    { name: "Custom Orders", href: "/custom" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Story", href: "/story" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
    { name: "Blog", href: "/blog" },
  ],
  support: [
    { name: "Help Center", href: "/help" },
    { name: "Contact Us", href: "/contact" },
    { name: "Shipping Info", href: "/shipping" },
    { name: "Returns", href: "/returns" },
    { name: "Size Guide", href: "/size-guide" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Refund Policy", href: "/refunds" },
  ],
};

const socialLinks = [
  {
    name: "Facebook",
    icon: Facebook,
    href: "https://facebook.com/craftwood",
    color: "hover:text-blue-600",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://instagram.com/craftwood",
    color: "hover:text-pink-600",
  },
  {
    name: "Twitter",
    icon: Twitter,
    href: "https://twitter.com/craftwood",
    color: "hover:text-blue-400",
  },
  {
    name: "YouTube",
    icon: Youtube,
    href: "https://youtube.com/craftwood",
    color: "hover:text-red-600",
  },
];

const paymentMethods = [
  "EasyPaisa",
  "JazzCash",
  "Bank Transfer",
  "Cash on Delivery",
];

export default function Footer() {
  return (
    <footer className="bg-secondary text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Company Info - Takes 2 columns on large screens */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <Scale3D className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">CraftWood</h3>
                <p className="text-sm text-gray-300">Handcrafted Excellence</p>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed max-w-md text-sm">
              Creating beautiful, handcrafted wooden products that blend
              traditional craftsmanship with modern design. Each piece is made
              with love and attention to detail in Pakistan.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm text-gray-300">+92 302 6767428</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm text-gray-300">info@craftwood.pk</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm text-gray-300">
                  Sillanwali, Punjab, Pakistan
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-700 hover:bg-primary rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                >
                  <social.icon className="w-4 h-4 text-gray-300 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors text-sm hover:translate-x-1 transform duration-200 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors text-sm hover:translate-x-1 transform duration-200 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors text-sm hover:translate-x-1 transform duration-200 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 pt-8 border-t border-gray-700">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-xl font-semibold mb-2 text-white">
                Stay Updated
              </h4>
              <p className="text-gray-300 text-sm">
                Subscribe to our newsletter for the latest products, exclusive
                offers, and crafting tips.
              </p>
            </div>
            <div className="flex gap-3">
              <Input
                placeholder="Enter your email"
                className="flex-1 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-primary"
              />
              <Button className="bg-primary hover:bg-primary/90 px-6">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: Truck,
                title: "Free Shipping",
                subtitle: "On orders over Rs. 3000",
                color: "text-green-400",
              },
              {
                icon: Shield,
                title: "Secure Payment",
                subtitle: "Multiple payment options",
                color: "text-blue-400",
              },
              {
                icon: Award,
                title: "Quality Guarantee",
                subtitle: "100% handcrafted",
                color: "text-yellow-400",
              },
              {
                icon: CreditCard,
                title: "Easy Returns",
                subtitle: "30-day return policy",
                color: "text-purple-400",
              },
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 group">
                <div className="w-12 h-12 bg-gray-700 group-hover:bg-primary/20 rounded-xl flex items-center justify-center transition-all duration-300">
                  <feature.icon
                    className={`w-5 h-5 ${feature.color} group-hover:text-primary`}
                  />
                </div>
                <div>
                  <div className="font-medium text-sm text-white">
                    {feature.title}
                  </div>
                  <div className="text-xs text-gray-400">
                    {feature.subtitle}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 bg-black">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400">
              © 2024 CraftWood. All rights reserved. Made by Muhammad Aliyan in
              Pakistan.
            </div>

            {/* Payment Methods */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">We accept:</span>
              <div className="flex space-x-2">
                {paymentMethods.map((method) => (
                  <div
                    key={method}
                    className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg text-xs font-medium text-gray-300 transition-colors"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
