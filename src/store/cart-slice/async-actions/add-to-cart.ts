import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { ApiService } from '../../../helpers/api.service';
import { cartActions } from '../cart-slice';

export const addToCart = createAsyncThunk(
    'cart/add',
    async ({ product_variant_id, quantity }: { product_variant_id: string; quantity: number }, { getState, dispatch }) => {
        const state: RootState = getState();
        const isAuth = state.user.jwt;

        if (isAuth) {
            const items = state.cart.items;
            const item = items.find((i) => i.product_variant_id === product_variant_id);

            if (!item) {
                await ApiService.createCartItem({ product_variant_id, quantity });
            } else {
                await ApiService.updateCartItem(item.uuid, item.quantity + quantity);
            }
        }

        dispatch(cartActions.addToCartLocal({ product_variant_id, quantity }));
    },
);
