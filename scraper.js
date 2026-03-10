import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';

const BASE_URL = 'https://www.pcparadise.ma';

async function fetchWithRetry(url, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const { data } = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
            return data;
        } catch (e) {
            console.log(`Failed to fetch ${url}, retrying...`);
            await new Promise(r => setTimeout(r, 1000));
        }
    }
    return null;
}

async function scrapeAll() {
    let page = 1;
    let allProducts = [];

    while (true) {
        console.log(`Scraping list page ${page}...`);
        const data = await fetchWithRetry(`${BASE_URL}/?page=${page}`);
        if (!data) break;

        const $ = cheerio.load(data);
        const Objectcards = $('.card a').filter((_, el) => $(el).attr('href').startsWith('/product/'));
        const uniqueLinks = Array.from(new Set(Objectcards.map((i, el) => $(el).attr('href')).get()));

        if (uniqueLinks.length === 0) {
            break;
        }

        for (let link of uniqueLinks) {
            const productUrl = BASE_URL + link;
            console.log(`Scraping product: ${productUrl}`);
            const prodData = await fetchWithRetry(productUrl);
            if (!prodData) continue;

            const $p = cheerio.load(prodData);

            const title = $p('.product-title').text().trim();
            const description = $p('.product-detail-description').text().trim();

            let price = $p('.spec-value .price').text().trim();
            if (!price) {
                price = $p('.spec-item').filter((i, el) => $p(el).find('.spec-label').text().includes('Price')).find('.spec-value').text().trim();
            }

            const images = [];
            $p('.thumbnail img').each((i, el) => {
                const src = $p(el).attr('src');
                if (src) images.push(src);
            });
            if (images.length === 0) {
                images.push($p('#main-product-image').attr('src'));
            }

            const specs = {};
            $p('.spec-item').each((i, el) => {
                const label = $p(el).find('.spec-label').text().replace(':', '').trim();
                const value = $p(el).find('.spec-value').text().trim();
                if (label && label !== 'Price') {
                    specs[label] = value;
                }
            });

            allProducts.push({
                id: link.split('--').pop().replace('/', ''),
                url: productUrl,
                title,
                description,
                price,
                images: Array.from(new Set(images)),
                specs
            });
        }
        page++;

        // Safety break, typically these sites don't have > 20 pages
        if (page > 10) break;
    }

    fs.writeFileSync('src/data/catalog.json', JSON.stringify(allProducts, null, 2));
    console.log(`Done scraping. Total products saved: ${allProducts.length}`);
}

fs.mkdirSync('src/data', { recursive: true });
scrapeAll();
