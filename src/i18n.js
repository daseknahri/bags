import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
    en: {
        translation: {
            common: {
                loading: "Loading",
                error: "Error"
            },
            nav: {
                home: "Home",
                catalog: "Catalog",
                promotion: "Promotion",
                blog: "Blog",
                about: "About",
                location: "Location",
                cart: "Cart"
            },
            hero: {
                welcome: "Welcome to",
                subtitle: "Laptop Catalogue – Clear, Simple & Always Updated. Discover premium technology designed for your lifestyle.",
                shopNow: "Shop Now",
                viewPromos: "View Promotions"
            },
            catalog: {
                featured: "Featured Products",
                fullCatalog: "Full Catalog",
                explore: "Explore our complete range of premium technology.",
                filters: "Filters",
                category: "Category",
                brand: "Brand",
                sortPrice: "Sort Price",
                sortDefault: "Default",
                sortLowHigh: "Low to High",
                sortHighLow: "High to Low",
                showing: "Showing {{count}} products",
                noProducts: "No products found",
                adjustFilters: "Try adjusting your filters.",
                resetFilters: "Reset Filters",
                search: "Search products...",
                all: "All"
            },
            product: {
                addToCart: "Add to Cart",
                added: "Added!",
                sale: "Sale",
                description: "Description",
                backToCatalog: "Back to Catalog",
                clickToZoom: "Click to zoom",
                promo: "PROMO"
            },
            cart: {
                title: "My Cart",
                empty: "Your cart is empty",
                browse: "Browse Catalog",
                total: "Total",
                confirmOrder: "Confirm Order on WhatsApp",
                clear: "Clear Cart"
            },
            promo: {
                specialOffers: "Special Offers",
                exclusive: "Exclusive",
                deals: "Deals",
                desc: "Discover limited-time discounts on premium electronics. Upgrade your tech for less.",
                saleBadge: "Sale",
                empty: "No active promotions right now.",
                emptyDesc: "Check back later for new exclusive deals!"
            },
            footer: {
                quickLinks: "Quick Links",
                contact: "Contact Us",
                followUs: "Follow Us",
                rights: "All rights reserved."
            }
        }
    },
    fr: {
        translation: {
            common: {
                loading: "Chargement",
                error: "Erreur",
            },
            nav: {
                home: "Accueil",
                catalog: "Catalogue",
                promotion: "Promotions",
                blog: "Blog",
                about: "À Propos",
                location: "Localisation",
                cart: "Panier"
            },
            hero: {
                welcome: "Bienvenue chez",
                subtitle: "Catalogue PC – Clair, Simple & Toujours à Jour. Découvrez la technologie premium conçue pour vous.",
                shopNow: "Acheter Maintenant",
                viewPromos: "Voir les Promotions"
            },
            catalog: {
                featured: "Produits Vedettes",
                fullCatalog: "Catalogue Complet",
                explore: "Explorez notre gamme complète de technologies haut de gamme.",
                filters: "Filtres",
                category: "Catégorie",
                brand: "Marque",
                sortPrice: "Trier par Prix",
                sortDefault: "Par Défaut",
                sortLowHigh: "Prix croissant",
                sortHighLow: "Prix décroissant",
                showing: "{{count}} produits affichés",
                noProducts: "Aucun produit trouvé",
                adjustFilters: "Essayez d'ajuster vos filtres.",
                resetFilters: "Réinitialiser les filtres",
                search: "Rechercher des produits...",
                all: "Tout"
            },
            product: {
                addToCart: "Ajouter au panier",
                added: "Ajouté !",
                sale: "Promo",
                description: "Description",
                backToCatalog: "Retour au catalogue",
                clickToZoom: "Cliquez pour zoomer",
                promo: "PROMO"
            },
            cart: {
                title: "Mon Panier",
                empty: "Votre panier est vide",
                browse: "Voir le Catalogue",
                total: "Total",
                confirmOrder: "Confirmer la commande sur WhatsApp",
                clear: "Vider le panier"
            },
            promo: {
                specialOffers: "Offres Spéciales",
                exclusive: "Offres",
                deals: "Exclusives",
                desc: "Découvrez des réductions à durée limitée sur l'électronique haut de gamme. Améliorez votre technologie pour moins cher.",
                saleBadge: "Promo",
                empty: "Aucune promotion active pour l'instant.",
                emptyDesc: "Revenez plus tard pour de nouvelles offres exclusives !"
            },
            footer: {
                quickLinks: "Liens Rapides",
                contact: "Contactez-nous",
                followUs: "Suivez-nous",
                rights: "Tous droits réservés."
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'fr', // Fallback to French if language not recognized
        detection: {
            order: ['navigator', 'htmlTag', 'localStorage'],
            caches: ['localStorage'],
        },
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
