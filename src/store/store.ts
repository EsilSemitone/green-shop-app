import { configureStore } from '@reduxjs/toolkit';
import { saveItem } from './localstorage/localstorage';
import { userReducer } from './user-slice/user.slice';
import { setupApi } from '../helpers/api';
import { productFilterReducer } from './product-filter-slice/product-filter-slice';
import { LOCALSTORAGE_KEYS } from './localstorage/localstorage-keys';
import { cartReducer } from './cart-slice/cart-slice';
import { addressReducer } from './address-slice/address.slice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        productFilter: productFilterReducer,
        cart: cartReducer,
        address: addressReducer,
    },
});

setupApi(store);
store.subscribe(() => {
    const state = store.getState();
    saveItem(LOCALSTORAGE_KEYS.JWT, state.user.jwt);
    saveItem(LOCALSTORAGE_KEYS.GUEST_CART, JSON.stringify(state.cart.items));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
