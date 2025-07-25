import { ParallaxScroll } from "@/components/Global/parallax-scroll";
import { Badge, GalleryHorizontal, TrendingUp } from "lucide-react";
import React from "react";

const images = [
  "/products/award/product1.jpg",
  "/products/clock/product1.jpg",
  "/products/award/product2.jpg ",
  "/products/clock/product1.jpg ",
  "/products/mobileCover/product2.jpg ",
  "/products/clock/product2.jpg ",
  "/products/familyAlbum/product1.jpg ",
  "/products/housePlate/product1.jpg ",
  "/products/familyAlbum/product1.jpg ",
  "/products/keyChain/Product1.jpg ",
  "/products/mobileCover/Product1.jpg ",
  "/products/keyChain/Product2.jpg ",
  "/products/mobileCover/Product2.jpg ",
  "/products/wall/Product1.jpg",
  "/products/badge/Product1.jpg",
  "/products/mobileCover/Product3.jpg",
  "/products/badge/Product1.jpg",
];

const GalleryPage = () => {
  return (
    <div className="min-h-screen bg-background py-10">
      <div className="text-center mb-3 px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
          Explore Our Gallery
        </h2>
        <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
          Browse our handcrafted products in a stunning gallery view.
        </p>
      </div>
      <ParallaxScroll images={images} />
    </div>
  );
};

export default GalleryPage;
