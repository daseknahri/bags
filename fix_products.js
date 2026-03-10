// Fix corrupted products.json: images (space-separated string → array), specs (PS @{} string → object)
import fs from 'fs';

const raw = fs.readFileSync('server/data/products.json', 'utf8');
const products = JSON.parse(raw);

function parseImages(val) {
    if (Array.isArray(val)) return val.filter(Boolean);
    if (typeof val === 'string') return val.split(/\s+/).filter(u => u.startsWith('http'));
    return [];
}

function parseSpecs(val) {
    if (val && typeof val === 'object' && !Array.isArray(val)) return val;
    if (Array.isArray(val)) {
        // already in array form? convert to object
        const obj = {};
        val.forEach(s => { if (s.key) obj[s.key] = s.value; });
        return obj;
    }
    if (typeof val === 'string') {
        // PowerShell @{Brand=HP; CPU=Intel i5} format
        const inner = val.replace(/^@\{/, '').replace(/\}$/, '');
        const obj = {};
        inner.split(';').forEach(part => {
            const [k, ...rest] = part.split('=');
            if (k && k.trim()) obj[k.trim()] = rest.join('=').trim();
        });
        return obj;
    }
    return {};
}

const fixed = products.map(p => ({
    ...p,
    images: parseImages(p.images),
    specs: parseSpecs(p.specs),
}));

fs.writeFileSync('server/data/products.json', JSON.stringify(fixed, null, 2));
console.log(`Fixed ${fixed.length} products.`);
fixed.slice(0, 3).forEach(p => {
    console.log(`  ${p.title}: ${p.images.length} images, specs keys: ${Object.keys(p.specs).join(', ')}`);
});
