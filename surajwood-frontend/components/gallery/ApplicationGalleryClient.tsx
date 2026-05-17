"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryItem {
  src: string;
  caption: string;
  tag: string;
}

const APPLICATION_GALLERY_IMAGES: Record<string, GalleryItem[]> = {
  kitchens: [
    {
      src: "/images/gallery/kitchen-new-1.png",
      caption: "High-Gloss Modular Kitchen — Bronze Gold ACRYLUX [Client Project]",
      tag: "Luxury Kitchen",
    },
    {
      src: "/images/gallery/kitchen-new-2.jpg",
      caption: "Contemporary Matte Kitchen — Storm Grey ACRYMATTE",
      tag: "Contemporary Kitchen",
    },
    {
      src: "/images/gallery/kitchen-new-3.jpg",
      caption: "Premium Copper Finished Kitchen — Mirror Red ACRYGLASS",
      tag: "Luxury Kitchen",
    },
    {
      src: "/images/gallery/kitchen-new-4.png",
      caption: "Minimalist Handleless Kitchen — Ice White ACRYLUX",
      tag: "Modern Kitchen",
    },
    {
      src: "/images/gallery/kitchen-new-5.png",
      caption: "Waterproof Gloss Modular Kitchen — Cream Pearl ACRYLUX [Client Project]",
      tag: "Modern Kitchen",
    },
    {
      src: "/images/gallery/kitchen-new-6.jpg",
      caption: "Bespoke Acrylic Glass Kitchen — Crystal Black ACRYGLASS",
      tag: "Contemporary Kitchen",
    },
  ],
  wardrobes: [
    {
      src: "/images/gallery/wardrobe-1.jpg",
      caption: "Premium Master Wardrobe Shutters — Arctic White ACRYLUX [Client Project]",
      tag: "Master Wardrobe",
    },
    {
      src: "/images/gallery/wardrobe-2.jpg",
      caption: "Luxury Dressing Room Slider Doors — Champagne Gold ACRYLUX",
      tag: "Dressing Room",
    },
    {
      src: "/images/gallery/wardrobe-3.jpg",
      caption: "Micro-Textured Satin Shutter Wardrobe — Silk Grey ACRYSILK [Client Project]",
      tag: "Master Wardrobe",
    },
    {
      src: "/images/gallery/wardrobe-new-kids.png",
      caption: "Vibrant Children's Bedroom Wardrobe — Sky Blue & Sunshine Yellow ACRYLUX",
      tag: "Kids Wardrobe",
    },
    {
      src: "/images/gallery/wardrobe-new-sliding.png",
      caption: "High-Gloss Bedroom Sliding Wardrobe — Arctic White ACRYLUX [Client Project]",
      tag: "Master Wardrobe",
    },
    {
      src: "/images/gallery/wardrobe-new-luxury.jpg",
      caption: "Luxury Glass Modular Wardrobe with Lit Vanity Mirror — Mirror Red ACRYGLASS",
      tag: "Luxury Walk-In",
    },
  ],
  commercial: [
    {
      src: "/images/gallery/commercial-premium.png",
      caption: "Modern Retail Countertop — Crystal White ACRYLUX [Client Project]",
      tag: "Commercial Counter",
    },
    {
      src: "/images/gallery/commercial-new-restaurant.jpg",
      caption: "Luxury Fine-Dining Wall Cladding — Mirror Red ACRYGLASS",
      tag: "Restaurant Lounge",
    },
    {
      src: "/images/gallery/commercial-new-jewelry.jpg",
      caption: "High-End Jewelry Boutique Showcase — Crystal Black ACRYGLASS & Gold Trimming",
      tag: "Luxury Retail",
    },
    {
      src: "/images/gallery/commercial-new-boutique.jpg",
      caption: "Fashion Showroom Feature Wall — Ruby Red ACRYLUX [Client Project]",
      tag: "Retail Showroom",
    },
    {
      src: "/images/gallery/commercial-new-lobby.jpg",
      caption: "Premium Corporate Reception Accent Wall — Metallic Bronze ACRYLUX",
      tag: "Corporate Lobby",
    },
    {
      src: "/images/gallery/commercial-new-showroom.png",
      caption: "Luxury Automobile Showroom Cladding — Arctic White ACRYLUX & Concrete Finish Reception",
      tag: "Luxury Showroom",
    },
  ],
  offices: [
    {
      src: "/images/gallery/office-1.jpg",
      caption: "Corporate Boardroom Console — Jet Black ACRYLUX [Client Project]",
      tag: "Executive Office",
    },
    {
      src: "/images/gallery/commercial-premium.png",
      caption: "Anti-Fingerprint Reception Desk — Arctic White ACRYMATTE",
      tag: "Reception Console",
    },
    {
      src: "/images/gallery/commercial-2.jpg",
      caption: "Modern Meeting Room Wall Paneling — Graphite Storm ACRYLUX",
      tag: "Meeting Room",
    },
  ],
  "kids-rooms": [
    {
      src: "/images/gallery/kids-new-bunkbed.png",
      caption: "Cozy Shared Children's Bedroom — Bright Orange Gloss ACRYLUX Wardrobes & Sky Blue Bunk Bed",
      tag: "Bunk Bed & Wardrobe",
    },
    {
      src: "/images/gallery/kids-new-nursery.png",
      caption: "Charming Baby Nursery — Pastel Mint Green ACRYMATTE Storage Cabinets & Toy Shelving",
      tag: "Nursery Storage",
    },
    {
      src: "/images/gallery/kids-new-playroom.png",
      caption: "Vibrant Creative Playroom — Sunflower Yellow & Royal Blue ACRYLUX Modular Cabinetry",
      tag: "Playroom Cabinets",
    },
    {
      src: "/images/gallery/kids-new-teen-purple.jpg",
      caption: "Cozy Teen Study Bedroom — Warm Wood Textured Wardrobes & Lilac Purple Accent Wall",
      tag: "Teen Study Bedroom",
    },
    {
      src: "/images/gallery/kids-new-pink-nook.png",
      caption: "Elegant Princess Bedroom — Matte Cream & Coral Pink Corner Wardrobes with Custom Shelving",
      tag: "Princess Wardrobe",
    },
    {
      src: "/images/gallery/kids-new-blue-study.png",
      caption: "Modern Children's Study Bedroom — Cobalt Blue & Mustard Yellow Modular Cabinets",
      tag: "Study & Cabinets",
    },
  ],
  "wall-paneling": [
    {
      src: "/images/gallery/wall-1.jpg",
      caption: "Premium Geometric Wall Paneling — Graphite Storm ACRYLUX [Client Project]",
      tag: "Statement Wall",
    },
    {
      src: "/images/gallery/22.jpg",
      caption: "Bespoke Mirror-Gloss Living Room Cladding — Crystal White ACRYGLASS",
      tag: "Living Room Cladding",
    },
    {
      src: "/images/gallery/23.jpg",
      caption: "Architectural Statement Wall Cladding — Sophisticated Grey ACRYGLASS MATTE",
      tag: "Architectural Wall",
    },
  ],
};

interface ApplicationGalleryClientProps {
  slug: string;
  appName: string;
  fallbackImages: string[];
}

export default function ApplicationGalleryClient({
  slug,
  appName,
  fallbackImages,
}: ApplicationGalleryClientProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Get configured gallery items or map fallback fallbackImages
  const galleryItems: GalleryItem[] =
    APPLICATION_GALLERY_IMAGES[slug] ??
    fallbackImages.map((src, i) => ({
      src,
      caption: `${appName} Acrylic Panel Application ${i + 1}`,
      tag: `${appName}`,
    }));

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev !== null && prev > 0 ? prev - 1 : galleryItems.length - 1
        );
      }
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev !== null && prev < galleryItems.length - 1 ? prev + 1 : 0
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, galleryItems.length]);

  return (
    <section className="bg-cream py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-copper text-sm font-semibold uppercase tracking-widest mb-2">
            Gallery
          </p>
          <h2 className="font-heading text-3xl font-bold text-navy">
            {appName} Inspiration
          </h2>
        </div>

        {/* Premium 3x3 High Fidelity Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxIndex(idx)}
              className="relative rounded-2xl overflow-hidden aspect-[4/3] group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 bg-white"
            >
              <Image
                src={item.src}
                alt={item.caption}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Visual Accent Pill & Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <span className="self-start bg-copper text-white text-[9px] font-extrabold uppercase tracking-wider px-2 py-1 rounded-md mb-2">
                  {item.tag}
                </span>
                <p className="text-white text-xs font-bold leading-snug line-clamp-2">
                  {item.caption}
                </p>
              </div>

              {/* Default display tag */}
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-navy text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm group-hover:opacity-0 transition-opacity">
                {item.tag}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen 4K Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-navy/95 backdrop-blur-md flex flex-col justify-between p-4 md:p-8 animate-fade-in">
          {/* Lightbox Header */}
          <div className="flex justify-between items-center text-white relative z-10">
            <span className="bg-copper text-white text-[9px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full">
              {galleryItems[lightboxIndex].tag}
            </span>
            <div className="flex items-center gap-6">
              <span className="text-xs font-bold text-white/50">
                {lightboxIndex + 1} / {galleryItems.length}
              </span>
              <button
                onClick={() => setLightboxIndex(null)}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Lightbox Center Slider */}
          <div className="flex-grow flex items-center justify-between relative max-w-6xl mx-auto w-full">
            {/* Left navigation arrow */}
            <button
              onClick={() =>
                setLightboxIndex((prev) =>
                  prev !== null && prev > 0 ? prev - 1 : galleryItems.length - 1
                )
              }
              className="absolute left-0 md:-left-16 z-20 p-3 bg-white/5 hover:bg-white/15 border border-white/10 rounded-full transition-all text-white hover:scale-105"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Slider Image with height bounds */}
            <div className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center p-4">
              <Image
                src={galleryItems[lightboxIndex].src}
                alt={galleryItems[lightboxIndex].caption}
                fill
                className="object-contain rounded-xl select-none"
                sizes="(max-width: 1024px) 100vw, 85vw"
                priority
              />
            </div>

            {/* Right navigation arrow */}
            <button
              onClick={() =>
                setLightboxIndex((prev) =>
                  prev !== null && prev < galleryItems.length - 1 ? prev + 1 : 0
                )
              }
              className="absolute right-0 md:-right-16 z-20 p-3 bg-white/5 hover:bg-white/15 border border-white/10 rounded-full transition-all text-white hover:scale-105"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Caption Footer */}
          <div className="text-center p-4 relative z-10 max-w-xl mx-auto">
            <p className="text-white text-sm font-semibold leading-relaxed">
              {galleryItems[lightboxIndex].caption}
            </p>
            <p className="text-[10px] text-white/40 mt-1 uppercase tracking-widest font-extrabold">
              Press Escape to exit • Use keyboard arrows to navigate
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
