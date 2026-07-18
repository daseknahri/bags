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
                all: "All"
            },
            product: {
                addToCart: "Add to Cart",
                added: "Added",
                sale: "Offer",
                description: "Description",
                backToCatalog: "Back to Shop",
                clickToZoom: "Zoom",
                promo: "Offer"
            },
            cart: {
                title: "Shopping Bag",
                empty: "Your bag is empty",
                browse: "Shop Collection",
                total: "Total",
                confirmOrder: "Order on WhatsApp",
                clear: "Clear Cart"
            },
            promo: {
                specialOffers: "Limited Offers",
                exclusive: "Client-ready",
                deals: "Bag Deals",
                desc: "Seasonal prices on selected Kago Bags pieces while stock lasts.",
                saleBadge: "Offer",
                empty: "No active offers right now.",
                emptyDesc: "Check back soon for new edits."
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
                all: "Tout"
            },
            product: {
                addToCart: "Ajouter au panier",
                added: "Ajoute",
                sale: "Offre",
                description: "Description",
                backToCatalog: "Retour boutique",
                clickToZoom: "Zoom",
                promo: "Offre"
            },
            cart: {
                title: "Panier",
                empty: "Votre panier est vide",
                browse: "Voir la collection",
                total: "Total",
                confirmOrder: "Commander sur WhatsApp",
                clear: "Vider le panier"
            },
            promo: {
                specialOffers: "Offres limitees",
                exclusive: "Offres",
                deals: "Kago Bags",
                desc: "Prix de saison sur une selection de sacs Kago Bags, selon stock disponible.",
                saleBadge: "Offre",
                empty: "Aucune offre active pour le moment.",
                emptyDesc: "Revenez bientot pour une nouvelle selection."
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'fr',
        detection: {
            order: ['navigator', 'htmlTag', 'localStorage'],
            caches: ['localStorage']
        },
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
