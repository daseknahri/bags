import fs from 'fs';

const currentData = JSON.parse(fs.readFileSync('src/data/catalog.json', 'utf8'));

// Generate some realistic dummy products for the new categories
const newProducts = [
    {
        id: "iphone-15-pro",
        url: "#",
        title: "iPhone 15 Pro",
        description: "Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and a more versatile Pro camera system.",
        price: "12,999.00 DHs",
        images: ["https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800"],
        specs: {
            Category: "Phones",
            Brand: "Apple",
            Storage: "256GB"
        },
        promotion: true,
        discountPrice: "11,500.00 DHs"
    },
    {
        id: "samsung-s24-ultra",
        url: "#",
        title: "Samsung Galaxy S24 Ultra",
        description: "Welcome to the era of mobile AI. Galaxy S24 Ultra unleashes new levels of creativity, productivity, and possibility.",
        price: "13,499.00 DHs",
        images: ["https://images.unsplash.com/photo-1707920150495-9bfded9541a4?auto=format&fit=crop&q=80&w=800"],
        specs: {
            Category: "Phones",
            Brand: "Samsung",
            Storage: "512GB"
        }
    },
    {
        id: "airpods-pro-2",
        url: "#",
        title: "AirPods Pro (2nd Generation)",
        description: "Up to 2x more Active Noise Cancellation than the previous generation. Transparency mode lets you hear the world around you.",
        price: "2,799.00 DHs",
        images: ["https://images.unsplash.com/photo-1628202926206-c63a34b19fb4?auto=format&fit=crop&q=80&w=800"],
        specs: {
            Category: "Accessories",
            Brand: "Apple",
            Type: "Audio"
        },
        promotion: true,
        discountPrice: "2,499.00 DHs"
    },
    {
        id: "sony-wh1000xm5",
        url: "#",
        title: "Sony WH-1000XM5",
        description: "Industry-leading noise cancellation. Exceptional sound quality and superior comfort for all-day listening.",
        price: "3,899.00 DHs",
        images: ["https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800"],
        specs: {
            Category: "Accessories",
            Brand: "Sony",
            Type: "Audio"
        }
    },
    {
        id: "anker-usb-c-cable",
        url: "#",
        title: "Anker Powerline III USB-C Cable",
        description: "Ultra-durable 100W fast charging cable. Built to last with reinforced stress points.",
        price: "199.00 DHs",
        images: ["https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&q=80&w=800"],
        specs: {
            Category: "Complementaries",
            Brand: "Anker",
            Type: "Cables"
        }
    },
    {
        id: "apple-20w-charger",
        url: "#",
        title: "Apple 20W USB-C Power Adapter",
        description: "Fast, efficient charging at home, in the office, or on the go.",
        price: "249.00 DHs",
        images: ["https://images.unsplash.com/photo-1606012499144-b0d59e86baeb?auto=format&fit=crop&q=80&w=800"],
        specs: {
            Category: "Complementaries",
            Brand: "Apple",
            Type: "Chargers"
        }
    },
    {
        id: "logitech-mx-master-3s",
        url: "#",
        title: "Logitech MX Master 3S",
        description: "An iconic mouse remastered for ultimate tactility, performance, and flow.",
        price: "1,199.00 DHs",
        images: ["https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=800"],
        specs: {
            Category: "Accessories",
            Brand: "Logitech",
            Type: "Peripherals"
        }
    }
];

// Add 'Category' to existing laptop data so they render correctly
const modifiedCurrentData = currentData.map(product => {
    product.specs = product.specs || {};
    product.specs.Category = "Laptops";

    // Randomly make some existing products promotional for the promos page
    if (Math.random() > 0.8) {
        product.promotion = true;
        const currentPriceParts = product.price.replace(/[^\d]/g, '');
        const currentPriceNum = parseInt(currentPriceParts);
        if (!isNaN(currentPriceNum)) {
            const discounted = currentPriceNum * 0.85; // 15% off
            // Format back with commas
            product.discountPrice = discounted.toLocaleString('en-US') + ".00 DHs";
        }
    }

    return product;
});

const mergedData = [...modifiedCurrentData, ...newProducts];

fs.writeFileSync('src/data/catalog.json', JSON.stringify(mergedData, null, 2));
console.log(`Successfully expanded catalog from ${currentData.length} to ${mergedData.length} items. Added Categories: Laptops, Phones, Accessories, Complementaries`);
