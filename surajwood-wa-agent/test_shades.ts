import { ALL_SURAJ_SHADES, ShadeItem } from "./src/knowledge/shades";

export function findRequestedShadesRefined(userText: string): ShadeItem[] {
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
      // Only multi-word terms (containing space)
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

const testQueries = [
  "i like to see shade code 1302 whitw 3325 urban grey and 2307 white metallic",
  "show me 1302",
  "can I see 3325 and 2307",
  "show me urban grey and white metallic",
  "arcylic panel kitchen",
  "show me zebrano wood",
  "membrane shutter colors",
  "402 white 2mm glass",
  "can i see rosso and verde",
];

for (const q of testQueries) {
  const result = findRequestedShadesRefined(q);
  console.log(`\nQuery: "${q}"`);
  console.log(`Matched (${result.length}):`, result.map(r => `${r.code} ${r.name} (${r.imageUrl})`));
}
