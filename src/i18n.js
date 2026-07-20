import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            common: {
                loading: "Loading",
                error: "Error"
            },
            nav: {
                home: "Home",
                catalog: "Shop",
                promotion: "Offers",
                blog: "Journal",
                about: "About",
                location: "Visit",
                cart: "Cart"
            },
            hero: {
                welcome: "Kago Bags",
                subtitle: "Premium bags for workdays, weekends, and evening plans. Curated in Morocco with fast WhatsApp ordering.",
                shopNow: "Shop Bags",
                viewPromos: "View Offers"
            },
            catalog: {
                featured: "Featured Bags",
                fullCatalog: "Shop The Collection",
                explore: "Filter by silhouette, material, and price to find the bag that fits your day.",
                filters: "Filters",
                category: "Style",
                brand: "Brand",
                sortPrice: "Sort Price",
                sortDefault: "Featured",
                sortLowHigh: "Low to High",
                sortHighLow: "High to Low",
                showing: "{{count}} products",
                noProducts: "No bags found",
                adjustFilters: "Try a different style or reset the filters.",
                resetFilters: "Reset Filters",
                search: "Search products...",
                all: "All",
                kicker: "Kago Bags collection"
            },
            product: {
                addToCart: "Add to Cart",
                added: "Added",
                sale: "Offer",
                description: "Description",
                backToCatalog: "Back to Shop",
                clickToZoom: "Zoom",
                promo: "Offer",
                loading: "Loading product...",
                addToWishlist: "Add to wishlist",
                qualityChecked: "Quality checked before dispatch",
                deliveryMorocco: "Delivery available across Morocco",
                exchange7days: "Exchange support within 7 days",
                details: "Product Details"
            },
            cart: {
                title: "Shopping Bag",
                empty: "Your bag is empty",
                browse: "Shop Collection",
                total: "Total",
                confirmOrder: "Order on WhatsApp",
                clear: "Clear Cart",
                emptyHint: "Save your favorite Kago Bags pieces here before sending the order."
            },
            promo: {
                specialOffers: "Limited Offers",
                exclusive: "Client-ready",
                deals: "Bag Deals",
                desc: "Seasonal prices on selected Kago Bags pieces while stock lasts.",
                saleBadge: "Offer",
                empty: "No active offers right now.",
                emptyDesc: "Check back soon for new edits."
            },
            home: {
                newCollection: "New collection",
                curated: "Curated finishes",
                delivery: "Delivery across Morocco",
                warranty: "Warranty on every piece",
                shopBy: "Shop by silhouette",
                loadingCollection: "Loading collection...",
                materialFirst: "Material first",
                storyTitle: "Quiet pieces that carry the whole day.",
                storyBody: "Kago Bags focuses on shape, texture, and practical details: easy closures, polished hardware, comfortable straps, and colors that move cleanly between work, travel, and evening plans."
            },
            about: {
                kicker: "Kago Bags studio",
                title: "Designed around the way you move.",
                subtitle: "Calm silhouettes, useful capacity, and finishes that make daily outfits feel complete.",
                povTitle: "Our Point Of View",
                description: "Kago Bags curates polished bags for daily movement: structured totes, compact crossbodies, refined clutches, and travel-ready accessories selected for texture, function, and quiet elegance.",
                para2: "Every piece is selected for practical carry, clean construction, and easy styling. We focus on bags that look polished in photos and still work hard in real life.",
                value1Title: "Material Led",
                value1Body: "Canvas, raffia, satin, and pebbled textures chosen for depth and daily resilience.",
                value2Title: "Easy Ordering",
                value2Body: "Add pieces to the cart and send a WhatsApp order for availability and delivery details.",
                value3Title: "Client Ready",
                value3Body: "Clean product pages, local imagery, and editable admin content for a real handoff."
            },
            location: {
                visit: "Visit",
                ourStore: "Our Store",
                subtitle: "Book a bag viewing, confirm availability, or arrange delivery across Morocco.",
                address: "Address",
                phone: "Phone",
                email: "Email",
                hours: "Hours"
            },
            blog: {
                journal: "Journal",
                subtitle: "Styling notes, care tips, and practical guides for choosing your next bag.",
                readMore: "Read article",
                noPosts: "No posts yet. Check back soon.",
                loading: "Loading post...",
                backToBlog: "Back to Blog"
            }
        }
    },
    fr: {
        translation: {
            common: {
                loading: "Chargement",
                error: "Erreur"
            },
            nav: {
                home: "Accueil",
                catalog: "Boutique",
                promotion: "Offres",
                blog: "Journal",
                about: "A propos",
                location: "Visiter",
                cart: "Panier"
            },
            hero: {
                welcome: "Kago Bags",
                subtitle: "Sacs premium pour le travail, le weekend et les soirees. Selection au Maroc avec commande rapide sur WhatsApp.",
                shopNow: "Voir les sacs",
                viewPromos: "Voir les offres"
            },
            catalog: {
                featured: "Sacs en vedette",
                fullCatalog: "Boutique",
                explore: "Filtrez par style, matiere et prix pour trouver le sac adapte a votre journee.",
                filters: "Filtres",
                category: "Style",
                brand: "Marque",
                sortPrice: "Trier par prix",
                sortDefault: "Selection",
                sortLowHigh: "Prix croissant",
                sortHighLow: "Prix decroissant",
                showing: "{{count}} produits",
                noProducts: "Aucun sac trouve",
                adjustFilters: "Essayez un autre style ou reinitialisez les filtres.",
                resetFilters: "Reinitialiser",
                search: "Rechercher...",
                all: "Tout",
                kicker: "Collection Kago Bags"
            },
            product: {
                addToCart: "Ajouter au panier",
                added: "Ajoute",
                sale: "Offre",
                description: "Description",
                backToCatalog: "Retour boutique",
                clickToZoom: "Zoom",
                promo: "Offre",
                loading: "Chargement du produit...",
                addToWishlist: "Ajouter aux favoris",
                qualityChecked: "Controle qualite avant expedition",
                deliveryMorocco: "Livraison disponible partout au Maroc",
                exchange7days: "Echange possible sous 7 jours",
                details: "Details du produit"
            },
            cart: {
                title: "Panier",
                empty: "Votre panier est vide",
                browse: "Voir la collection",
                total: "Total",
                confirmOrder: "Commander sur WhatsApp",
                clear: "Vider le panier",
                emptyHint: "Enregistrez vos pieces Kago Bags preferees ici avant d'envoyer la commande."
            },
            promo: {
                specialOffers: "Offres limitees",
                exclusive: "Offres",
                deals: "Kago Bags",
                desc: "Prix de saison sur une selection de sacs Kago Bags, selon stock disponible.",
                saleBadge: "Offre",
                empty: "Aucune offre active pour le moment.",
                emptyDesc: "Revenez bientot pour une nouvelle selection."
            },
            home: {
                newCollection: "Nouvelle collection",
                curated: "Finitions soignees",
                delivery: "Livraison partout au Maroc",
                warranty: "Garantie sur chaque piece",
                shopBy: "Achetez par forme",
                loadingCollection: "Chargement de la collection...",
                materialFirst: "La matiere d'abord",
                storyTitle: "Des pieces sobres pour toute la journee.",
                storyBody: "Kago Bags mise sur la forme, la texture et les details pratiques : fermetures faciles, finitions soignees, bretelles confortables et des couleurs qui passent du travail au voyage et aux soirees."
            },
            about: {
                kicker: "Studio Kago Bags",
                title: "Concu autour de vos mouvements.",
                subtitle: "Des silhouettes sobres, une capacite utile et des finitions qui completent les tenues du quotidien.",
                povTitle: "Notre vision",
                description: "Kago Bags selectionne des sacs raffines pour le quotidien : cabas structures, sacs bandouliere compacts, pochettes elegantes et accessoires de voyage choisis pour la texture, la fonction et l'elegance discrete.",
                para2: "Chaque piece est choisie pour un port pratique, une construction soignee et un style facile. Nous privilegions des sacs qui rendent bien en photo et restent efficaces au quotidien.",
                value1Title: "La matiere avant tout",
                value1Body: "Toile, raphia, satin et textures grainees choisis pour la profondeur et la resistance quotidienne.",
                value2Title: "Commande facile",
                value2Body: "Ajoutez des pieces au panier et envoyez une commande WhatsApp pour la disponibilite et la livraison.",
                value3Title: "Pret pour le client",
                value3Body: "Pages produits soignees, images locales et contenu admin modifiable pour une vraie prise en main."
            },
            location: {
                visit: "Visitez",
                ourStore: "Notre boutique",
                subtitle: "Reservez une presentation, confirmez la disponibilite ou organisez une livraison partout au Maroc.",
                address: "Adresse",
                phone: "Telephone",
                email: "Email",
                hours: "Horaires"
            },
            blog: {
                journal: "Journal",
                subtitle: "Notes de style, conseils d'entretien et guides pratiques pour choisir votre prochain sac.",
                readMore: "Lire l'article",
                noPosts: "Aucun article pour le moment. Revenez bientot.",
                loading: "Chargement de l'article...",
                backToBlog: "Retour au journal"
            }
        }
    },
    ar: {
        translation: {
            common: {
                loading: "جاري التحميل",
                error: "خطأ"
            },
            nav: {
                home: "الرئيسية",
                catalog: "المتجر",
                promotion: "العروض",
                blog: "المجلة",
                about: "من نحن",
                location: "زيارتنا",
                cart: "السلة"
            },
            hero: {
                welcome: "Kago Bags",
                subtitle: "حقائب فاخرة لأيام العمل وعطلة نهاية الأسبوع والسهرات. مختارة في المغرب مع طلب سريع عبر واتساب.",
                shopNow: "تسوّق الحقائب",
                viewPromos: "شاهد العروض"
            },
            catalog: {
                featured: "حقائب مميزة",
                fullCatalog: "تسوّق المجموعة",
                explore: "صفِّ حسب الشكل والخامة والسعر لتجد الحقيبة المناسبة ليومك.",
                filters: "التصفية",
                category: "النمط",
                brand: "العلامة",
                sortPrice: "ترتيب حسب السعر",
                sortDefault: "المميزة",
                sortLowHigh: "من الأرخص إلى الأغلى",
                sortHighLow: "من الأغلى إلى الأرخص",
                showing: "{{count}} منتج",
                noProducts: "لا توجد حقائب",
                adjustFilters: "جرّب نمطاً آخر أو أعد ضبط التصفية.",
                resetFilters: "إعادة الضبط",
                search: "ابحث عن المنتجات...",
                all: "الكل",
                kicker: "تشكيلة Kago Bags"
            },
            product: {
                addToCart: "أضف إلى السلة",
                added: "أُضيف",
                sale: "عرض",
                description: "الوصف",
                backToCatalog: "العودة إلى المتجر",
                clickToZoom: "تكبير",
                promo: "عرض",
                loading: "جاري تحميل المنتج...",
                addToWishlist: "أضف إلى المفضلة",
                qualityChecked: "فحص الجودة قبل الشحن",
                deliveryMorocco: "توصيل متاح لكل المغرب",
                exchange7days: "إمكانية الاستبدال خلال 7 أيام",
                details: "تفاصيل المنتج"
            },
            cart: {
                title: "سلة التسوّق",
                empty: "سلتك فارغة",
                browse: "تصفّح المجموعة",
                total: "المجموع",
                confirmOrder: "اطلب عبر واتساب",
                clear: "إفراغ السلة",
                emptyHint: "احفظ قطع Kago Bags المفضّلة لديك هنا قبل إرسال الطلب."
            },
            promo: {
                specialOffers: "عروض محدودة",
                exclusive: "عروض",
                deals: "حقائب Kago",
                desc: "أسعار موسمية على مجموعة مختارة من حقائب Kago Bags حسب توفّر المخزون.",
                saleBadge: "عرض",
                empty: "لا توجد عروض حالياً.",
                emptyDesc: "عد قريباً لمجموعة جديدة."
            },
            home: {
                newCollection: "تشكيلة جديدة",
                curated: "تشطيبات مُنتقاة",
                delivery: "توصيل لكل المغرب",
                warranty: "ضمان على كل قطعة",
                shopBy: "تسوّق حسب الشكل",
                loadingCollection: "جاري تحميل المجموعة...",
                materialFirst: "الخامة أولاً",
                storyTitle: "قطع أنيقة ترافقك طوال اليوم.",
                storyBody: "تركّز Kago Bags على الشكل والملمس والتفاصيل العملية: إغلاق سهل، إكسسوارات أنيقة، أحزمة مريحة، وألوان تنتقل بسلاسة بين العمل والسفر والسهرات."
            },
            about: {
                kicker: "استوديو Kago Bags",
                title: "مصمّمة على مقاس حركتك.",
                subtitle: "تصاميم هادئة، سعة عملية، وتشطيبات تُكمّل إطلالاتك اليومية.",
                povTitle: "رؤيتنا",
                description: "تنتقي Kago Bags حقائب أنيقة للاستعمال اليومي: حقائب توت مهيكلة، حقائب كروسبودي صغيرة، حقائب سهرة راقية، وإكسسوارات سفر مختارة للملمس والوظيفة والأناقة الهادئة.",
                para2: "كل قطعة مختارة لسهولة الحمل، وجودة الصناعة، وسهولة التنسيق. نركّز على حقائب تبدو أنيقة في الصور وتبقى عملية في الحياة اليومية.",
                value1Title: "الخامة أولاً",
                value1Body: "قماش، رافيا، ساتان، وملمس محبّب مختار للعمق والمتانة اليومية.",
                value2Title: "طلب سهل",
                value2Body: "أضف القطع إلى السلة وأرسل طلباً عبر واتساب لمعرفة التوفّر وتفاصيل التوصيل.",
                value3Title: "جاهزة للعميل",
                value3Body: "صفحات منتجات أنيقة، صور محلية، ومحتوى قابل للتعديل من لوحة التحكم."
            },
            location: {
                visit: "زوروا",
                ourStore: "متجرنا",
                subtitle: "احجز معاينة حقيبة، أكّد التوفّر، أو رتّب التوصيل لكل المغرب.",
                address: "العنوان",
                phone: "الهاتف",
                email: "البريد الإلكتروني",
                hours: "أوقات العمل"
            },
            blog: {
                journal: "المجلة",
                subtitle: "نصائح تنسيق، إرشادات العناية، وأدلة عملية لاختيار حقيبتك القادمة.",
                readMore: "اقرأ المقال",
                noPosts: "لا توجد مقالات بعد. عد قريباً.",
                loading: "جاري تحميل المقال...",
                backToBlog: "العودة إلى المجلة"
            }
        }
    }
};

// Right-to-left languages; used to flip document direction.
const RTL_LANGS = ['ar'];

function applyDirection(lng) {
    if (typeof document === 'undefined') return;
    const base = (lng || 'fr').split('-')[0];
    const isRtl = RTL_LANGS.includes(base);
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = base;
}

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'fr',
        supportedLngs: ['fr', 'en', 'ar'],
        detection: {
            // localStorage first so a visitor's explicit language choice sticks across visits,
            // then fall back to the browser language for first-time visitors.
            order: ['localStorage', 'navigator', 'htmlTag'],
            caches: ['localStorage']
        },
        interpolation: {
            escapeValue: false
        }
    })
    .then(() => applyDirection(i18n.language));

// Keep <html dir/lang> in sync whenever the language changes (RTL for Arabic).
i18n.on('languageChanged', applyDirection);

export default i18n;
