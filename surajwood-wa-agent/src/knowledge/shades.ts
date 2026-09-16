/**
 * SurajWood Definitive Shade Database
 * Extracted directly from Official 2025 E-Book & 3D Membrane Catalog
 */

export interface ShadeItem {
  code: string;
  name: string;
  finish: string;
  collection: string;
  category: "acrylic" | "membrane";
  imageUrl: string;
  caption: string;
  searchTerms: string[];
}

export const ALL_SURAJ_SHADES: ShadeItem[] = [
  // ── ACRYLUX Solid Colors (1mm High Gloss, >90 GU, 3H Anti-Scratch) ──
  {
    code: "1301",
    name: "Red",
    finish: "High Gloss Solid",
    collection: "ACRYLUX Anti-Scratch Solids",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/1301.png",
    caption: "💎 *1301 Red | Solid* — ACRYLUX High-Gloss 92+ GU Optical Mirror Polish Acrylic.",
    searchTerms: ["1301", "red", "solid red", "1301 red", "acrylux red"],
  },
  {
    code: "1302",
    name: "White",
    finish: "High Gloss Solid",
    collection: "ACRYLUX Anti-Scratch Solids",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/1302.png",
    caption: "💎 *1302 White | Solid* — ACRYLUX High-Gloss Optical Mirror White (10-Yr UV Anti-Yellowing).",
    searchTerms: ["1302", "white", "whitw", "solid white", "1302 white", "acrylux white", "gloss white", "pure white"],
  },
  {
    code: "1303",
    name: "Cream",
    finish: "High Gloss Solid",
    collection: "ACRYLUX Anti-Scratch Solids",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/1303.png",
    caption: "💎 *1303 Cream | Solid* — ACRYLUX High-Gloss Warm Cream Acrylic.",
    searchTerms: ["1303", "cream", "solid cream", "1303 cream", "ivory cream", "gloss cream"],
  },
  {
    code: "2304",
    name: "Wine Red",
    finish: "High Gloss Solid",
    collection: "ACRYLUX Anti-Scratch Solids",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/2304.png",
    caption: "💎 *2304 Wine Red | Solid* — ACRYLUX Deep Wine Red High-Gloss Acrylic.",
    searchTerms: ["2304", "wine red", "wine", "burgundy", "2304 wine red", "2304 wine"],
  },
  {
    code: "1305",
    name: "Black",
    finish: "High Gloss Solid",
    collection: "ACRYLUX Anti-Scratch Solids",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/1305.png",
    caption: "💎 *1305 Black | Solid* — ACRYLUX High-Gloss Piano Black Optical Mirror Finish.",
    searchTerms: ["1305", "black", "piano black", "solid black", "1305 black", "gloss black"],
  },
  {
    code: "2308",
    name: "Stone Grey",
    finish: "High Gloss Solid",
    collection: "ACRYLUX Anti-Scratch Solids",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/2308.png",
    caption: "💎 *2308 Stone Grey | Solid* — ACRYLUX Neutral Stone Grey High-Gloss Acrylic.",
    searchTerms: ["2308", "stone grey", "stone gray", "2308 stone grey"],
  },
  {
    code: "1315",
    name: "Cappuccino",
    finish: "High Gloss Solid",
    collection: "ACRYLUX Anti-Scratch Solids",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/1315.png",
    caption: "💎 *1315 Cappuccino | Solid* — ACRYLUX Warm Cappuccino High-Gloss Acrylic.",
    searchTerms: ["1315", "cappuccino", "1315 cappuccino", "latte", "caramel beige"],
  },
  {
    code: "1317",
    name: "Purple",
    finish: "High Gloss Solid",
    collection: "ACRYLUX Anti-Scratch Solids",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/1317.png",
    caption: "💎 *1317 Purple | Solid* — ACRYLUX Deep Royal Purple High-Gloss Acrylic.",
    searchTerms: ["1317", "purple", "violet", "1317 purple"],
  },
  {
    code: "2318",
    name: "Green",
    finish: "High Gloss Solid",
    collection: "ACRYLUX Anti-Scratch Solids",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/2318.png",
    caption: "💎 *2318 Green | Solid* — ACRYLUX High-Gloss Green Acrylic.",
    searchTerms: ["2318", "green", "2318 green", "lime green", "olive green"],
  },
  {
    code: "1323",
    name: "Dark Grey",
    finish: "High Gloss Solid",
    collection: "ACRYLUX Anti-Scratch Solids",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/1323.png",
    caption: "💎 *1323 Dark Grey | Solid* — ACRYLUX Charcoal Dark Grey High-Gloss Acrylic.",
    searchTerms: ["1323", "dark grey", "dark gray", "charcoal", "1323 dark grey"],
  },
  {
    code: "1327",
    name: "Turquoise",
    finish: "High Gloss Solid",
    collection: "ACRYLUX Anti-Scratch Solids",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/1327.png",
    caption: "💎 *1327 Turquoise | Solid* — ACRYLUX Vibrant Turquoise Cyan High-Gloss Acrylic.",
    searchTerms: ["1327", "turquoise", "cyan", "aqua", "1327 turquoise"],
  },
  {
    code: "1330",
    name: "Designer White",
    finish: "High Gloss Solid",
    collection: "ACRYLUX Anti-Scratch Solids",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/1330.png",
    caption: "💎 *1330 Designer White | Solid* — ACRYLUX Designer Bright White High-Gloss Acrylic.",
    searchTerms: ["1330", "designer white", "1330 white", "1330 designer white"],
  },
  {
    code: "1331",
    name: "Feather Blue",
    finish: "High Gloss Solid",
    collection: "ACRYLUX Anti-Scratch Solids",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/1331.png",
    caption: "💎 *1331 Feather Blue | Solid* — ACRYLUX Pastel Sky Feather Blue High-Gloss Acrylic.",
    searchTerms: ["1331", "feather blue", "sky blue", "light blue", "1331 blue"],
  },
  {
    code: "1332",
    name: "Cobalt Blue",
    finish: "High Gloss Solid",
    collection: "ACRYLUX Anti-Scratch Solids",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/1332.png",
    caption: "💎 *1332 Cobalt Blue | Solid* — ACRYLUX Rich Cobalt Royal Blue High-Gloss Acrylic.",
    searchTerms: ["1332", "cobalt blue", "cobalt", "1332 cobalt blue"],
  },
  {
    code: "1333",
    name: "Sea Green",
    finish: "High Gloss Solid",
    collection: "ACRYLUX Anti-Scratch Solids",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/1333.png",
    caption: "💎 *1333 Sea Green | Solid* — ACRYLUX Muted Sea Green High-Gloss Acrylic.",
    searchTerms: ["1333", "sea green", "1333 sea green", "sage gloss"],
  },
  {
    code: "1336",
    name: "Grey",
    finish: "High Gloss Solid",
    collection: "ACRYLUX Anti-Scratch Solids",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/1336.png",
    caption: "💎 *1336 Grey | Solid* — ACRYLUX Mid-Tone Architectural Grey High-Gloss Acrylic.",
    searchTerms: ["1336", "grey", "gray", "1336 grey"],
  },
  {
    code: "1337",
    name: "Cashmere",
    finish: "High Gloss Solid",
    collection: "ACRYLUX Anti-Scratch Solids",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/1337.png",
    caption: "💎 *1337 Cashmere | Solid* — ACRYLUX Elegant Warm Cashmere High-Gloss Acrylic.",
    searchTerms: ["1337", "cashmere", "kaschmir", "1337 cashmere"],
  },
  {
    code: "1339",
    name: "State Grey",
    finish: "High Gloss Solid",
    collection: "ACRYLUX Anti-Scratch Solids",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/1339.png",
    caption: "💎 *1339 State Grey | Solid* — ACRYLUX Deep Slate State Grey High-Gloss Acrylic.",
    searchTerms: ["1339", "state grey", "slate grey", "1339 state grey"],
  },
  {
    code: "1318",
    name: "Verde Gloss",
    finish: "High Gloss Solid (New)",
    collection: "ACRYLUX Anti-Scratch Solids",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/1318.png",
    caption: "💎 *1318 Verde Gloss | Solid (New)* — ACRYLUX Deep Forest Verde Green High-Gloss Acrylic.",
    searchTerms: ["1318", "verde", "verde gloss", "forest green", "1318 verde"],
  },
  {
    code: "1319",
    name: "Rosso Gloss",
    finish: "High Gloss Solid (New)",
    collection: "ACRYLUX Anti-Scratch Solids",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/1319.png",
    caption: "💎 *1319 Rosso Gloss | Solid (New)* — ACRYLUX Tuscan Rosso Maroon High-Gloss Acrylic.",
    searchTerms: ["1319", "rosso", "rosso gloss", "maroon", "1319 rosso"],
  },

  // ── ACRYLUX Metallic Colors (1mm High Gloss Metallic / Pearl) ──
  {
    code: "1306",
    name: "Metallic Grey",
    finish: "Metallic High Gloss",
    collection: "ACRYLUX Metallic Series",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/1306.png",
    caption: "🌟 *1306 Metallic Grey* — ACRYLUX Sparkling Metallic Silver-Grey Acrylic.",
    searchTerms: ["1306", "metallic grey", "metallic gray", "silver grey", "1306 metallic grey"],
  },
  {
    code: "2307",
    name: "White Metallic",
    finish: "Metallic High Gloss",
    collection: "ACRYLUX Metallic Series",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/2307.png",
    caption: "🌟 *2307 White | Metallic* — ACRYLUX Pearl Shimmer White Metallic Acrylic.",
    searchTerms: ["2307", "white metallic", "metallic white", "pearl white", "2307 white metallic", "2307 metallic"],
  },
  {
    code: "1314",
    name: "Metallic Blue",
    finish: "Metallic High Gloss",
    collection: "ACRYLUX Metallic Series",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/1314.png",
    caption: "🌟 *1314 Metallic Blue* — ACRYLUX Electric Shimmer Blue Metallic Acrylic.",
    searchTerms: ["1314", "metallic blue", "shimmer blue", "1314 metallic blue"],
  },
  {
    code: "1322",
    name: "Anthrasite Metallic",
    finish: "Metallic High Gloss",
    collection: "ACRYLUX Metallic Series",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/1322.png",
    caption: "🌟 *1322 Anthrasite | Metallic* — ACRYLUX Deep Anthracite Dark Gunmetal Metallic Acrylic.",
    searchTerms: ["1322", "anthrasite", "anthracite", "gunmetal", "1322 anthrasite"],
  },
  {
    code: "1324",
    name: "Metallic Black",
    finish: "Metallic High Gloss",
    collection: "ACRYLUX Metallic Series",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/1324.png",
    caption: "🌟 *1324 Metallic Black* — ACRYLUX Sparkling Onyx Metallic Black Acrylic.",
    searchTerms: ["1324", "metallic black", "sparkling black", "1324 metallic black"],
  },
  {
    code: "1338",
    name: "Metallic Beige",
    finish: "Metallic High Gloss",
    collection: "ACRYLUX Metallic Series",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/1338.png",
    caption: "🌟 *1338 Metallic Beige* — ACRYLUX Soft Champagne Gold Metallic Acrylic.",
    searchTerms: ["1338", "metallic beige", "champagne metallic", "gold metallic", "1338 metallic beige"],
  },
  {
    code: "1340",
    name: "Metallic Basalt",
    finish: "Metallic High Gloss",
    collection: "ACRYLUX Metallic Series",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/1340.png",
    caption: "🌟 *1340 Metallic Basalt* — ACRYLUX Warm Mineral Basalt Metallic Acrylic.",
    searchTerms: ["1340", "metallic basalt", "basalt", "1340 metallic basalt"],
  },

  // ── ACRYLUX Designs & Wood Grains ──
  {
    code: "2309",
    name: "Brushed Aluminium",
    finish: "Design High Gloss",
    collection: "ACRYLUX Design Series",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/2309.png",
    caption: "🌟 *2309 Brushed Aluminium | Design* — ACRYLUX Linear Brushed Metal Texture Acrylic.",
    searchTerms: ["2309", "brushed aluminium", "brushed aluminum", "brushed metal", "2309 brushed"],
  },
  {
    code: "2311",
    name: "Textile",
    finish: "Design High Gloss",
    collection: "ACRYLUX Design Series",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/2311.png",
    caption: "🌟 *2311 Textile | Design* — ACRYLUX Woven Fabric Texture Pattern Acrylic.",
    searchTerms: ["2311", "textile", "fabric", "woven", "2311 textile"],
  },
  {
    code: "2313",
    name: "Copper Textile",
    finish: "Design High Gloss",
    collection: "ACRYLUX Design Series",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/2313.png",
    caption: "🌟 *2313 Copper Textile | Design* — ACRYLUX Warm Copper Shimmer Woven Texture Acrylic.",
    searchTerms: ["2313", "copper textile", "copper", "2313 copper"],
  },
  {
    code: "2320",
    name: "Light Zebrano",
    finish: "Wood Grain High Gloss",
    collection: "ACRYLUX Wood Grain Series",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/2320.png",
    caption: "🌳 *2320 Light Zebrano | Design* — ACRYLUX Prismatic Golden Zebrano Wood Look Acrylic.",
    searchTerms: ["2320", "light zebrano", "zebrano", "light wood", "2320 zebrano"],
  },
  {
    code: "2321",
    name: "Dark Zebrano",
    finish: "Wood Grain High Gloss",
    collection: "ACRYLUX Wood Grain Series",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/2321.png",
    caption: "🌳 *2321 Dark Zebrano | Design* — ACRYLUX Rich Walnut Striated Dark Zebrano Acrylic.",
    searchTerms: ["2321", "dark zebrano", "dark wood", "2321 zebrano"],
  },
  {
    code: "2328",
    name: "ELM / Black",
    finish: "Wood Grain High Gloss",
    collection: "ACRYLUX Wood Grain Series",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/2328.png",
    caption: "🌳 *2328 ELM / Black | Wood* — ACRYLUX Japanese Smoked Black Elm Wood Grain Acrylic.",
    searchTerms: ["2328", "elm", "elm black", "black wood", "smoked elm", "2328 elm"],
  },

  // ── ACRYMATTE Super Smooth (1mm Nano-Matte Anti-Fingerprint) ──
  {
    code: "3302",
    name: "White",
    finish: "Super Smooth Nano-Matte",
    collection: "ACRYMATTE Super Smooth",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/3302.png",
    caption: "✨ *3302 White | Solid* — ACRYMATTE Zero-Reflectance Anti-Fingerprint Matte White.",
    searchTerms: ["3302", "matte white", "3302 white", "acrymatte white", "velvet white"],
  },
  {
    code: "3303",
    name: "Cream",
    finish: "Super Smooth Nano-Matte",
    collection: "ACRYMATTE Super Smooth",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/3303.png",
    caption: "✨ *3303 Cream | Solid* — ACRYMATTE Velvety Warm Cream Matte Acrylic.",
    searchTerms: ["3303", "matte cream", "3303 cream", "acrymatte cream"],
  },
  {
    code: "3305",
    name: "Black",
    finish: "Super Smooth Nano-Matte",
    collection: "ACRYMATTE Super Smooth",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/3305.png",
    caption: "✨ *3305 Black | Solid* — ACRYMATTE Ultra-Deep Velvet Black Anti-Fingerprint Matte.",
    searchTerms: ["3305", "matte black", "3305 black", "acrymatte black", "velvet black"],
  },
  {
    code: "3315",
    name: "Cappuccino",
    finish: "Super Smooth Nano-Matte",
    collection: "ACRYMATTE Super Smooth",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/3315.png",
    caption: "✨ *3315 Cappuccino | Solid* — ACRYMATTE Warm Latte Cappuccino Matte Acrylic.",
    searchTerms: ["3315", "matte cappuccino", "3315 cappuccino"],
  },
  {
    code: "3318",
    name: "Verde",
    finish: "Super Smooth Nano-Matte (New)",
    collection: "ACRYMATTE Super Smooth",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/3318.png",
    caption: "🌿 *3318 Verde | Solid (New)* — ACRYMATTE Japandi Botanical Verde Green Matte Acrylic.",
    searchTerms: ["3318", "verde matte", "sage green", "3318 verde", "matte green"],
  },
  {
    code: "3319",
    name: "Rosso",
    finish: "Super Smooth Nano-Matte (New)",
    collection: "ACRYMATTE Super Smooth",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/3319.png",
    caption: "✨ *3319 Rosso | Solid (New)* — ACRYMATTE Tuscan Terracotta Rosso Red Matte Acrylic.",
    searchTerms: ["3319", "rosso matte", "terracotta", "3319 rosso", "matte red"],
  },
  {
    code: "3323",
    name: "Dark Grey",
    finish: "Super Smooth Nano-Matte (New)",
    collection: "ACRYMATTE Super Smooth",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/3323.png",
    caption: "✨ *3323 Dark Grey | Solid (New)* — ACRYMATTE Velvet Dark Charcoal Grey Matte Acrylic.",
    searchTerms: ["3323", "matte dark grey", "3323 dark grey"],
  },
  {
    code: "3325",
    name: "Urban Grey",
    finish: "Super Smooth Nano-Matte (New)",
    collection: "ACRYMATTE Super Smooth",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/3325.png",
    caption: "✨ *3325 Urban Grey | Solid (New)* — ACRYMATTE Contemporary Architectural Urban Grey Matte.",
    searchTerms: ["3325", "urban grey", "urban gray", "3325 urban grey", "urban grey matte"],
  },
  {
    code: "3331",
    name: "Feather Blue",
    finish: "Super Smooth Nano-Matte",
    collection: "ACRYMATTE Super Smooth",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/3331.png",
    caption: "✨ *3331 Feather Blue | Solid* — ACRYMATTE Powder Sky Feather Blue Matte Acrylic.",
    searchTerms: ["3331", "feather blue matte", "3331 feather blue"],
  },
  {
    code: "3333",
    name: "Sea Green",
    finish: "Super Smooth Nano-Matte",
    collection: "ACRYMATTE Super Smooth",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/3333.png",
    caption: "✨ *3333 Sea Green | Solid* — ACRYMATTE Coastal Mineral Sea Green Matte Acrylic.",
    searchTerms: ["3333", "sea green matte", "3333 sea green"],
  },
  {
    code: "3334",
    name: "Royal Blue",
    finish: "Super Smooth Nano-Matte",
    collection: "ACRYMATTE Super Smooth",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/3334.png",
    caption: "✨ *3334 Royal Blue | Solid* — ACRYMATTE Deep Midnight Royal Blue Matte Acrylic.",
    searchTerms: ["3334", "royal blue", "midnight blue", "3334 royal blue", "matte navy"],
  },
  {
    code: "3335",
    name: "Light Grey",
    finish: "Super Smooth Nano-Matte (New)",
    collection: "ACRYMATTE Super Smooth",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/3335.png",
    caption: "✨ *3335 Light Grey | Solid (New)* — ACRYMATTE Minimalist Mist Light Grey Matte Acrylic.",
    searchTerms: ["3335", "light grey", "light gray", "3335 light grey"],
  },
  {
    code: "3336",
    name: "Grey",
    finish: "Super Smooth Nano-Matte",
    collection: "ACRYMATTE Super Smooth",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/3336.png",
    caption: "✨ *3336 Grey | Solid* — ACRYMATTE Neutral Mid Grey Matte Acrylic.",
    searchTerms: ["3336", "matte grey", "3336 grey"],
  },
  {
    code: "3337",
    name: "Cashmere",
    finish: "Super Smooth Nano-Matte",
    collection: "ACRYMATTE Super Smooth",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/3337.png",
    caption: "✨ *3337 Cashmere | Solid* — ACRYMATTE Soft Warm Cashmere Matte Acrylic.",
    searchTerms: ["3337", "cashmere matte", "3337 cashmere"],
  },
  {
    code: "3339",
    name: "State Grey",
    finish: "Super Smooth Nano-Matte",
    collection: "ACRYMATTE Super Smooth",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/3339.png",
    caption: "✨ *3339 State Grey | Solid* — ACRYMATTE Industrial Slate State Grey Matte Acrylic.",
    searchTerms: ["3339", "state grey matte", "3339 state grey"],
  },

  // ── ACRYSILK (1mm Satin Matte Finish) ──
  {
    code: "5001",
    name: "Patina",
    finish: "1mm Satin Matte Finish",
    collection: "ACRYSILK Series",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/5001.png",
    caption: "✨ *5001 | Patina* — ACRYSILK Tactile Satin Silk Mineral Grey.",
    searchTerms: ["5001", "patina", "5001 patina", "acrysilk patina"],
  },
  {
    code: "5002",
    name: "Aurum",
    finish: "1mm Satin Matte Finish",
    collection: "ACRYSILK Series",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/5002.png",
    caption: "✨ *5002 | Aurum* — ACRYSILK Warm Rose Gold Silk Texture Acrylic.",
    searchTerms: ["5002", "aurum", "rose gold", "5002 aurum"],
  },
  {
    code: "5003",
    name: "Argenti",
    finish: "1mm Satin Matte Finish",
    collection: "ACRYSILK Series",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/5003.png",
    caption: "✨ *5003 | Argenti* — ACRYSILK Pale Silver Satin Silk Acrylic.",
    searchTerms: ["5003", "argenti", "silver silk", "5003 argenti"],
  },
  {
    code: "5004",
    name: "Scandia",
    finish: "1mm Satin Matte Finish",
    collection: "ACRYSILK Series",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/5004.png",
    caption: "✨ *5004 | Scandia* — ACRYSILK Nordic Light Metallic Silk Acrylic.",
    searchTerms: ["5004", "scandia", "5004 scandia"],
  },
  {
    code: "5005",
    name: "Griseo",
    finish: "1mm Satin Matte Finish",
    collection: "ACRYSILK Series",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/5005.png",
    caption: "✨ *5005 | Griseo* — ACRYSILK Deep Slate Grey Satin Silk Acrylic.",
    searchTerms: ["5005", "griseo", "5005 griseo"],
  },
  {
    code: "5006",
    name: "Cuprous",
    finish: "1mm Satin Matte Finish",
    collection: "ACRYSILK Series",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/5006.png",
    caption: "✨ *5006 | Cuprous* — ACRYSILK Imperial Emerald Green Silk Texture Acrylic.",
    searchTerms: ["5006", "cuprous", "emerald silk", "5006 cuprous"],
  },

  // ── ACRYGLASS (2mm Solid Crystal Polymer Glass - Gloss & Matte) ──
  {
    code: "402",
    name: "White (2mm Gloss)",
    finish: "2mm Crystal Glass Gloss",
    collection: "ACRYGLASS 2mm Series",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/402.png",
    caption: "💎 *402 White* — ACRYGLASS 2mm Solid Crystal Polymer Glass (Gloss, 45° Chamfer Ready).",
    searchTerms: ["402", "402 white", "acryglass 402", "2mm white"],
  },
  {
    code: "403",
    name: "Cream (2mm Gloss)",
    finish: "2mm Crystal Glass Gloss",
    collection: "ACRYGLASS 2mm Series",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/403.png",
    caption: "💎 *403 Cream* — ACRYGLASS 2mm Solid Crystal Polymer Glass (Gloss).",
    searchTerms: ["403", "403 cream", "acryglass 403"],
  },
  {
    code: "418",
    name: "Sea Green (2mm Gloss)",
    finish: "2mm Crystal Glass Gloss",
    collection: "ACRYGLASS 2mm Series",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/418.png",
    caption: "💎 *418 Sea Green* — ACRYGLASS 2mm Solid Crystal Polymer Glass (Gloss).",
    searchTerms: ["418", "418 sea green", "acryglass 418"],
  },
  {
    code: "423",
    name: "Dark Grey (2mm Gloss)",
    finish: "2mm Crystal Glass Gloss",
    collection: "ACRYGLASS 2mm Series",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/423.png",
    caption: "💎 *423 Dark Grey* — ACRYGLASS 2mm Solid Crystal Polymer Glass (Gloss).",
    searchTerms: ["423", "423 dark grey", "acryglass 423"],
  },
  {
    code: "302",
    name: "White (2mm Matte)",
    finish: "2mm Crystal Glass Matte",
    collection: "ACRYGLASS MATTE 2mm Series",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/302.png",
    caption: "💎 *302 White* — ACRYGLASS MATTE 2mm Solid Crystal Polymer Glass (Matte).",
    searchTerms: ["302", "302 white", "acryglass matte 302"],
  },
  {
    code: "318",
    name: "Sea Green (2mm Matte)",
    finish: "2mm Crystal Glass Matte",
    collection: "ACRYGLASS MATTE 2mm Series",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/318.png",
    caption: "💎 *318 Sea Green* — ACRYGLASS MATTE 2mm Solid Crystal Polymer Glass (Matte).",
    searchTerms: ["318", "318 sea green", "acryglass matte 318"],
  },
  {
    code: "340",
    name: "Brown Metallic (2mm Matte)",
    finish: "2mm Crystal Glass Matte Metallic",
    collection: "ACRYGLASS MATTE 2mm Series",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/340.png",
    caption: "💎 *340 Brown | Metallic (New)* — ACRYGLASS MATTE 2mm Crystal Polymer Glass.",
    searchTerms: ["340", "340 brown", "340 metallic"],
  },
  {
    code: "341",
    name: "Titanio Metallic (2mm Matte)",
    finish: "2mm Crystal Glass Matte Metallic",
    collection: "ACRYGLASS MATTE 2mm Series",
    category: "acrylic",
    imageUrl: "https://www.surajwood.com/images/shades/341.png",
    caption: "💎 *341 Titanio | Metallic (New)* — ACRYGLASS MATTE 2mm Crystal Polymer Glass.",
    searchTerms: ["341", "341 titanio", "titanio"],
  },

  // ── 3D Membrane Colors (36 Shades) ──
  {
    code: "030-WG",
    name: "Artisan Oak Nature",
    finish: "Synchronized Timber Grain",
    collection: "3D Membrane (Wood Grain)",
    category: "membrane",
    imageUrl: "https://www.surajwood.com/images/products/membrane-shutters/030-wg-artisan-oak-nature.jpg",
    caption: "🌳 *030-WG Artisan Oak Nature* — 3D Membrane Natural Wood Grain.",
    searchTerms: ["030-wg", "030", "artisan oak", "artisan oak nature", "oak membrane"],
  },
  {
    code: "004-PS",
    name: "Reed Green",
    finish: "Soft-Sheen Silk Solid",
    collection: "3D Membrane (Perfect Silk)",
    category: "membrane",
    imageUrl: "https://www.surajwood.com/images/products/membrane-shutters/004-ps-reed-green.jpg",
    caption: "🌿 *004-PS Reed Green* — 3D Membrane Perfect Silk Botanical Green.",
    searchTerms: ["004-ps", "004", "reed green", "membrane green"],
  },
  {
    code: "017-PT",
    name: "Parisian Blue",
    finish: "Velvety Ultra-Matte",
    collection: "3D Membrane (Porcelain Touch)",
    category: "membrane",
    imageUrl: "https://www.surajwood.com/images/products/membrane-shutters/017-pt-parisian-blue.jpg",
    caption: "🔷 *017-PT Parisian Blue* — 3D Membrane Porcelain Touch Velvety Matte.",
    searchTerms: ["017-pt", "017", "parisian blue", "membrane blue"],
  },
  {
    code: "008-PT",
    name: "Alpin Weiß",
    finish: "Velvety Ultra-Matte",
    collection: "3D Membrane (Porcelain Touch)",
    category: "membrane",
    imageUrl: "https://www.surajwood.com/images/products/membrane-shutters/008-pt-alpin-weib.jpg",
    caption: "⚪ *008-PT Alpin Weiß* — 3D Membrane Porcelain Touch Pristine White.",
    searchTerms: ["008-pt", "008", "alpin weib", "alpin white", "membrane white"],
  },
];

/**
 * Intelligent shade extractor: finds exact codes or shade names in user query
 */
export function findRequestedShades(userText: string): ShadeItem[] {
  const query = userText.toLowerCase().replace(/[,/]/g, " ");
  const matched: ShadeItem[] = [];
  const addedCodes = new Set<string>();

  // 1. Check for exact code mentions with word boundaries (e.g., "1302", "3325", "2307", "030-wg", "004-ps")
  for (const item of ALL_SURAJ_SHADES) {
    const codeEscaped = item.code.toLowerCase().replace("-", "\\-");
    const codePattern = new RegExp(`\\b${codeEscaped}\\b`, "i");
    if (codePattern.test(query) && !addedCodes.has(item.code)) {
      matched.push(item);
      addedCodes.add(item.code);
    }
  }

  // 2. Check for multi-word specific phrases (e.g. "urban grey", "white metallic", "light zebrano", "dark zebrano", "feather blue", "sea green", "royal blue", "wine red", "designer white", "brushed aluminium", "artisan oak")
  for (const item of ALL_SURAJ_SHADES) {
    if (addedCodes.has(item.code)) continue;

    for (const term of item.searchTerms) {
      if (term.includes(" ") && query.includes(term.toLowerCase())) {
        matched.push(item);
        addedCodes.add(item.code);
        break;
      }
    }
  }

  // 3. If still no specific shade codes or multi-word phrases matched, check distinctive single-word unique shade names
  if (matched.length === 0) {
    const distinctiveNames = [
      "zebrano", "patina", "aurum", "argenti", "scandia", "griseo", "cuprous",
      "cappuccino", "anthrasite", "anthracite", "turquoise", "cashmere", "kaschmir",
      "rosso", "verde", "titanio", "wotan", "artisan oak"
    ];
    for (const item of ALL_SURAJ_SHADES) {
      if (addedCodes.has(item.code)) continue;
      for (const dName of distinctiveNames) {
        if (item.name.toLowerCase().includes(dName) && query.includes(dName)) {
          matched.push(item);
          addedCodes.add(item.code);
          break;
        }
      }
    }
  }

  return matched;
}

