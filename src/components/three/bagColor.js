// Derive a leather color for the 3D bag from the product's stated color,
// falling back to a deterministic pick so it never changes between renders.
const NAMED = {
  cream: '#e7dcc8',
  ivory: '#efe9dd',
  white: '#efe9dd',
  beige: '#d8c7a8',
  raffia: '#cbab72',
  straw: '#cbab72',
  champagne: '#c9a86a',
  gold: '#c79a5b',
  tan: '#b5936a',
  camel: '#a97b4f',
  cognac: '#8a5a34',
  brown: '#6f4a2a',
  chocolate: '#4a3524',
  espresso: '#3a2a20',
  noir: '#22201e',
  black: '#22201e',
  grey: '#8a8580',
  gray: '#8a8580',
  navy: '#28324a',
  blue: '#33506e',
  burgundy: '#6f2b34',
  wine: '#6f2b34',
  red: '#8a2b2b',
  olive: '#5f6b57',
  green: '#4c6350',
  pink: '#d49aa6',
  rose: '#c98a8a',
};

const PALETTE = ['#8a5a34', '#7d3b46', '#394a5a', '#2f2b28', '#6f4a2a', '#a97b4f', '#7a4a2e', '#5f6b57', '#b5936a'];

export function bagColorFromProduct(product) {
  const color = String(product?.specs?.Color || '').toLowerCase().trim();
  if (color) {
    for (const key of Object.keys(NAMED)) {
      if (color.includes(key)) return NAMED[key];
    }
  }
  const seed = String(product?.id || product?.title || 'bag');
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return PALETTE[h % PALETTE.length];
}
