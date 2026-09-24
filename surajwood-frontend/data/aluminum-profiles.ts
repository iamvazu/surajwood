export interface AluminumProduct {
  code: string;
  desc: string;
  size: string;
  drawing2d: string;
  cardImage?: string;
  endCap?: {
    code: string;
    desc: string;
    image?: string;
    priceUnit?: string;
  };
  finishes?: {
    name: string;
    price: string;
  }[];
}

export interface AluminumSeries {
  id: string;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  showcaseImage: string;
  closeups?: string[];
  products: AluminumProduct[];
}

export const ALUMINUM_SERIES: AluminumSeries[] = [
  {
    id: "ottimo",
    name: "OTTIMO SERIES",
    tagline: "Integrated Gola & Profile Handles",
    description: "The gold standard for handleless kitchen design, offering a seamless and ergonomic grip system for the modern home.",
    heroImage: "/images/products/aluminum/ottimo-kitchen.png",
    showcaseImage: "/images/products/aluminum/ottimo-showcase.png",
    closeups: [
      "/images/products/aluminum/ottimo-corner-1.png",
      "/images/products/aluminum/ottimo-corner-2.png",
      "/images/products/aluminum/ottimo-corner-3.png",
      "/images/products/aluminum/ottimo-corner-4.png",
    ],
    products: [
      {
        code: "PAPS-5220",
        desc: "Aluminum Shutter L Profile Handle with Gasket",
        size: "3.0 Mtr",
        drawing2d: "/images/products/aluminum/ottimo-paps-5220-2d.png",
        cardImage: "/images/products/aluminum/ottimo-paps-5220-card.png",
        endCap: {
          code: "PACP-5220",
          desc: "End Cap (2pc)",
          image: "/images/products/aluminum/ottimo-pacp-5220-endcap.png",
          priceUnit: "₹150 / 2pc",
        },
        finishes: [
          { name: "Black Brush", price: "₹3,100" },
          { name: "Bronze Brush", price: "₹3,100" },
          { name: "Coffee Painted", price: "₹3,350" },
          { name: "Anthracite Painted", price: "₹3,350" },
        ],
      },
      {
        code: "PAPS-5221",
        desc: "Aluminum Shutter C Profile Handle",
        size: "3.0 Mtr",
        drawing2d: "/images/products/aluminum/ottimo-paps-5221-2d.png",
        cardImage: "/images/products/aluminum/ottimo-paps-5221-card.png",
        endCap: {
          code: "PACP-5221",
          desc: "End Cap (2pc)",
          image: "/images/products/aluminum/ottimo-pacp-5221-endcap.png",
          priceUnit: "₹130 / 2pc",
        },
        finishes: [
          { name: "Black Brush", price: "₹2,400" },
          { name: "Bronze Brush", price: "₹2,400" },
          { name: "Coffee Painted", price: "₹2,600" },
          { name: "Anthracite Painted", price: "₹2,600" },
        ],
      },
      {
        code: "PAPS-5311",
        desc: "Aluminum Wall Gola Profile Handle with Gasket",
        size: "3.0 Mtr",
        drawing2d: "/images/products/aluminum/ottimo-paps-5311-2d.png",
        cardImage: "/images/products/aluminum/ottimo-paps-5311-card.png",
        endCap: {
          code: "PACP-5311",
          desc: "End Cap (2pc)",
          image: "/images/products/aluminum/ottimo-pacp-5311-endcap.png",
          priceUnit: "₹130 / 2pc",
        },
        finishes: [
          { name: "Black Brush", price: "₹2,600" },
          { name: "Bronze Brush", price: "₹2,600" },
          { name: "Coffee Painted", price: "₹2,850" },
          { name: "Anthracite Painted", price: "₹2,850" },
        ],
      },
      {
        code: "PAPS-5313",
        desc: "Aluminum 3 Side Profile",
        size: "3.0 Mtr",
        drawing2d: "/images/products/aluminum/ottimo-paps-5313-2d.png",
        cardImage: "/images/products/aluminum/ottimo-paps-5313-card.png",
        endCap: {
          code: "PACP-5313A / B",
          desc: "Steel / Aluminum Connectors (2pc)",
          image: "/images/products/aluminum/ottimo-pacp-5313-connector.png",
          priceUnit: "₹320 / 2pc",
        },
        finishes: [
          { name: "Black Brush", price: "₹3,050" },
          { name: "Bronze Brush", price: "₹3,050" },
          { name: "Coffee Painted", price: "₹3,350" },
          { name: "Anthracite Painted", price: "₹3,350" },
        ],
      },
    ],
  },
  {
    id: "aerolinea",
    name: "AEROLINEA SERIES",
    tagline: "Premium Shutter & Edge Profiles",
    description: "Slim-line architectural frames designed for minimalist glass shutters and clean cabinetry edges with a contemporary aesthetic.",
    heroImage: "/images/products/aluminum/aerolinea-wardrobe.png",
    showcaseImage: "/images/products/aluminum/aerolinea-showcase.png",
    products: [
      {
        code: "PAPS-6631",
        desc: "Aluminum Shutter L Profile Handle with Gasket",
        size: "3.0 Mtr",
        drawing2d: "/images/products/aluminum/aerolinea-paps-6631-2d.png",
        cardImage: "/images/products/aluminum/aerolinea-paps-6631-card.png",
        endCap: {
          code: "PACP-6631",
          desc: "End Cap (2pc)",
          image: "/images/products/aluminum/aerolinea-pacp-6631-endcap.png",
          priceUnit: "₹150 / 2pc",
        },
        finishes: [
          { name: "Black Brush", price: "₹3,300" },
          { name: "Bronze Brush", price: "₹3,300" },
          { name: "Coffee Painted", price: "₹3,600" },
          { name: "Anthracite Painted", price: "₹3,600" },
        ],
      },
      {
        code: "PAPS-6632",
        desc: "Aluminum Shutter C Profile Handle",
        size: "3.0 Mtr",
        drawing2d: "/images/products/aluminum/aerolinea-paps-6632-2d.png",
        cardImage: "/images/products/aluminum/aerolinea-paps-6632-card.png",
        endCap: {
          code: "PACP-6632",
          desc: "End Cap (2pc)",
          image: "/images/products/aluminum/aerolinea-pacp-6632-endcap.png",
          priceUnit: "₹130 / 2pc",
        },
        finishes: [
          { name: "Black Brush", price: "₹2,200" },
          { name: "Bronze Brush", price: "₹2,200" },
          { name: "Coffee Painted", price: "₹2,400" },
          { name: "Anthracite Painted", price: "₹2,400" },
        ],
      },
      {
        code: "PAPS-6634",
        desc: "Aluminum Edge Profile (T Patti)",
        size: "3.0 Mtr",
        drawing2d: "/images/products/aluminum/aerolinea-paps-6634-2d.png",
        cardImage: "/images/products/aluminum/aerolinea-paps-6634-card.png",
        endCap: {
          code: "PACP-6634",
          desc: "Corner Cap (2pc)",
          image: "/images/products/aluminum/aerolinea-pacp-6634-endcap.png",
          priceUnit: "₹60 / 2pc",
        },
        finishes: [
          { name: "Black Brush", price: "₹800" },
          { name: "Bronze Brush", price: "₹800" },
          { name: "Coffee Painted", price: "₹900" },
          { name: "Anthracite Painted", price: "₹900" },
        ],
      },
    ],
  },
  {
    id: "handle",
    name: "HANDLE PROFILES",
    tagline: "Ergonomic Shutter Solutions",
    description: "High-precision J and L profile handles engineered for effortless operation in high-end wardrobes and modular kitchens.",
    heroImage: "/images/products/aluminum/handle-showcase.png",
    showcaseImage: "/images/products/aluminum/handle-showcase.png",
    products: [
      {
        code: "PAPS-1336",
        desc: "Aluminum Shutter L Profile Handle",
        size: "3.0 Mtr",
        drawing2d: "/images/products/aluminum/handle-paps-1336-2d.png",
        cardImage: "/images/products/aluminum/handle-paps-1336-card.png",
        finishes: [
          { name: "Black Brush", price: "₹2,700" },
          { name: "Bronze Brush", price: "₹2,700" },
          { name: "Coffee Painted", price: "₹2,950" },
          { name: "Anthracite Painted", price: "₹2,950" },
        ],
      },
      {
        code: "PAPS-5677",
        desc: "Aluminum Shutter J Profile Handle with Gasket",
        size: "3.0 Mtr",
        drawing2d: "/images/products/aluminum/handle-paps-5677-2d.png",
        cardImage: "/images/products/aluminum/handle-paps-5677-card.png",
        finishes: [
          { name: "Black Brush", price: "₹2,850" },
          { name: "Bronze Brush", price: "₹2,850" },
          { name: "Coffee Painted", price: "₹3,150" },
          { name: "Anthracite Painted", price: "₹3,150" },
        ],
      },
      {
        code: "PAPS-1335",
        desc: "Aluminum Shutter Profile Handle with Gasket",
        size: "3.0 Mtr",
        drawing2d: "/images/products/aluminum/handle-paps-1335-2d.png",
        cardImage: "/images/products/aluminum/handle-paps-1335-card.png",
        finishes: [
          { name: "Black Brush", price: "₹2,900" },
          { name: "Bronze Brush", price: "₹2,900" },
          { name: "Coffee Painted", price: "₹3,200" },
          { name: "Anthracite Painted", price: "₹3,200" },
        ],
      },
    ],
  },
  {
    id: "shelf",
    name: "SHELF PROFILES",
    tagline: "Architectural Glass Support",
    description: "Specialized aluminum profiles for glass shelves with integrated structural support and lighting readiness for retail and luxury interiors.",
    heroImage: "/images/products/aluminum/shelf-showcase.png",
    showcaseImage: "/images/products/aluminum/shelf-showcase.png",
    products: [
      {
        code: "PAPS-5037",
        desc: "Aluminum Profile For Glass Shelf",
        size: "3.0 Mtr",
        drawing2d: "/images/products/aluminum/shelf-paps-5037-2d.png",
        cardImage: "/images/products/aluminum/shelf-paps-5037-card.png",
        finishes: [
          { name: "Black Brush", price: "₹3,900" },
          { name: "Bronze Brush", price: "₹3,900" },
          { name: "Coffee Painted", price: "₹4,300" },
          { name: "Anthracite Painted", price: "₹4,300" },
        ],
      },
      {
        code: "PAPS-5037A",
        desc: "Aluminum Profile For LED Glass Shelf",
        size: "3.0 Mtr",
        drawing2d: "/images/products/aluminum/shelf-paps-5037a-2d.png",
        cardImage: "/images/products/aluminum/shelf-paps-5037a-card.png",
        finishes: [
          { name: "Black Brush", price: "₹3,850" },
          { name: "Bronze Brush", price: "₹3,850" },
          { name: "Coffee Painted", price: "₹4,200" },
          { name: "Anthracite Painted", price: "₹4,200" },
        ],
      },
      {
        code: "PAHL-5037",
        desc: "Aluminum Glass Shelf Profile Holder",
        size: "Holder",
        drawing2d: "/images/products/aluminum/shelf-pahl-5037-2d.png",
        cardImage: "/images/products/aluminum/shelf-pahl-5037-card.png",
        finishes: [
          { name: "Black Brush", price: "₹470" },
          { name: "Bronze Brush", price: "₹470" },
          { name: "Coffee Painted", price: "₹470" },
          { name: "Anthracite Painted", price: "₹470" },
        ],
      },
    ],
  },
  {
    id: "hanging",
    name: "HANGING ROD",
    tagline: "Wardrobe Illumination Systems",
    description: "Premium aluminum wardrobe rods with integrated LED capabilities, creating a boutique walk-in closet experience.",
    heroImage: "/images/products/aluminum/hanging-showcase.png",
    showcaseImage: "/images/products/aluminum/hanging-showcase.png",
    products: [
      {
        code: "PAPS-6413",
        desc: "Aluminum LED Hanging Rod for Clothes",
        size: "3.0 Mtr",
        drawing2d: "/images/products/aluminum/hanging-paps-6413-2d.png",
        cardImage: "/images/products/aluminum/hanging-paps-6413-card.png",
        finishes: [
          { name: "Black Brush", price: "₹2,920" },
          { name: "Bronze Brush", price: "₹2,920" },
          { name: "Coffee Painted", price: "₹3,120" },
          { name: "Anthracite Painted", price: "₹3,120" },
        ],
      },
      {
        code: "PACP-6414",
        desc: "Aluminum Clothes Hanging Bracket (2pc)",
        size: "2pc",
        drawing2d: "/images/products/aluminum/hanging-pacp-6414-2d.png",
        cardImage: "/images/products/aluminum/hanging-pacp-6414-card.png",
        finishes: [
          { name: "Black Brush", price: "₹890 / 2pc" },
          { name: "Bronze Brush", price: "₹890 / 2pc" },
          { name: "Coffee Painted", price: "₹890 / 2pc" },
          { name: "Anthracite Painted", price: "₹890 / 2pc" },
        ],
      },
    ],
  },
  {
    id: "luminare",
    name: "LUMINARE SERIES",
    tagline: "LED Integrated Lighting Profiles",
    description: "Functional lighting ecosystems designed for optimal heat dissipation and spot-free diffusion in high-end cabinetry.",
    heroImage: "/images/products/aluminum/luminare-showcase.png",
    showcaseImage: "/images/products/aluminum/luminare-showcase.png",
    products: [
      {
        code: "PAPS-3136A",
        desc: "Aluminum 45° Degree LED Light Profile",
        size: "3.0 Mtr",
        drawing2d: "/images/products/aluminum/luminare-paps-3136a-2d.png",
        cardImage: "/images/products/aluminum/luminare-paps-3136a-card.png",
        finishes: [
          { name: "Black Brush", price: "₹1,950" },
          { name: "Bronze Brush", price: "₹1,950" },
          { name: "Coffee Painted", price: "₹2,100" },
          { name: "Anthracite Painted", price: "₹2,100" },
        ],
      },
      {
        code: "PAPS-3062A",
        desc: "Aluminum LED Light Profile",
        size: "3.0 Mtr",
        drawing2d: "/images/products/aluminum/luminare-paps-3062a-2d.png",
        cardImage: "/images/products/aluminum/luminare-paps-3062a-card.png",
        finishes: [
          { name: "Black Brush", price: "₹1,350" },
          { name: "Bronze Brush", price: "₹1,350" },
          { name: "Coffee Painted", price: "₹1,450" },
          { name: "Anthracite Painted", price: "₹1,450" },
        ],
      },
    ],
  },
  {
    id: "velaro",
    name: "VELARO SERIES",
    tagline: "Luxury Glass Shutter Systems",
    description: "High-precision sliding and fixed glass shutter profiles for sophisticated furniture design and architectural partitioning.",
    heroImage: "/images/products/aluminum/velaro-showcase.png",
    showcaseImage: "/images/products/aluminum/velaro-showcase.png",
    products: [
      {
        code: "PAPS-1351A",
        desc: "Glass Shutter Profile with Gasket",
        size: "3.0 Mtr",
        drawing2d: "/images/products/aluminum/velaro-paps-1351a-2d.png",
        cardImage: "/images/products/aluminum/velaro-paps-1351a-card.png",
        endCap: {
          code: "PACP-1351A",
          desc: "End Cap (2pc)",
          priceUnit: "₹60 / 2pc",
        },
        finishes: [
          { name: "Black Brush", price: "₹3,000" },
          { name: "Anthracite Painted", price: "₹3,160" },
          { name: "Coffee Painted", price: "₹3,160" },
          { name: "Champagne Painted", price: "₹3,160" },
        ],
      },
      {
        code: "PACN-1351A",
        desc: "Aluminum Steel Connector (Use per PAPS 1351A)",
        size: "4 Pcs",
        drawing2d: "/images/products/aluminum/velaro-pacn-1351a-2d.png",
        cardImage: "/images/products/aluminum/velaro-pacn-1351a-card.png",
        finishes: [
          { name: "Steel Connector (4 Pcs)", price: "₹520 / 4pc" },
        ],
      },
      {
        code: "PAHD-1351C",
        desc: "Aluminum Handle (128 mm)",
        size: "4pc",
        drawing2d: "/images/products/aluminum/velaro-pahd-1351c-2d.png",
        cardImage: "/images/products/aluminum/velaro-pahd-1351c-card.png",
        finishes: [
          { name: "Black Brush", price: "₹1,675 / 4pc" },
          { name: "Champagne Painted", price: "₹1,675 / 4pc" },
          { name: "Coffee Painted", price: "₹1,675 / 4pc" },
          { name: "Anthracite Painted", price: "₹1,675 / 4pc" },
        ],
      },
    ],
  },
];
