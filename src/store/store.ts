import { configureStore } from '@reduxjs/toolkit';
import { saveItem } from './localstorage/localstorage';
import { userReducer } from './user-slice/user.slice';
import { setupApi } from '../common/helpers/api';
import { productFilterReducer } from './product-filter-slice/product-filter-slice';
import { LOCALSTORAGE_KEYS } from './localstorage/localstorage-keys';
import { cartReducer } from './cart-slice/cart-slice';
import { addressReducer } from './address-slice/address.slice';
import { favoritesReducer } from './favorites/favorites.slice';
import { appReducer } from './app-slice/app.slice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        productFilter: productFilterReducer,
        cart: cartReducer,
        address: addressReducer,
        favorites: favoritesReducer,
        app: appReducer,
    },
});

setupApi(store);
store.subscribe(() => {
    const state = store.getState();
    saveItem(LOCALSTORAGE_KEYS.JWT, state.user.jwt);
    saveItem(LOCALSTORAGE_KEYS.GUEST_CART, JSON.stringify(state.cart.items));
    saveItem(LOCALSTORAGE_KEYS.FAVORITES, JSON.stringify(state.favorites.favorites));
    saveItem(LOCALSTORAGE_KEYS.PROFILE, JSON.stringify(state.user.profile));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
