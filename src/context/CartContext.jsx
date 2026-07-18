import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existing = state.find(i => i.id === action.item.id);
            if (existing) {
                return state.map(i => i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i);
            }
            return [...state, { ...action.item, qty: 1 }];
        }
        case 'REMOVE_ITEM':
            return state.filter(i => i.id !== action.id);
        case 'UPDATE_QTY':
            if (action.qty < 1) return state.filter(i => i.id !== action.id);
            return state.map(i => i.id === action.id ? { ...i, qty: action.qty } : i);
        case 'CLEAR':
            return [];
        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, [], () => {
        try { return JSON.parse(localStorage.getItem('puafeli_cart')) || []; }
        catch { return []; }
    });

    // Persist to localStorage on every change
    useEffect(() => {
        localStorage.setItem('puafeli_cart', JSON.stringify(cart));
    }, [cart]);

    const addItem = (product) => {
        dispatch({
            type: 'ADD_ITEM',
            item: {
                id: product.id,
                title: product.title,
                price: product.discountPrice || product.price,
                image: Array.isArray(product.images) ? product.images[0] : product.images?.split?.(' ')?.[0],
            }
        });
    };
    const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', id });
    const updateQty = (id, qty) => dispatch({ type: 'UPDATE_QTY', id, qty });
    const clearCart = () => dispatch({ type: 'CLEAR' });

    const totalItems = cart.reduce((s, i) => s + i.qty, 0);
    const totalPrice = cart.reduce((s, i) => {
        const n = parseFloat(i.price?.replace(/[^\d.]/g, '')) || 0;
        return s + n * i.qty;
    }, 0);

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, updateQty, clearCart, totalItems, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
