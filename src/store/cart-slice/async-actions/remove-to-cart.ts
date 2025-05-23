import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { ApiService } from '../../../helpers/api.service';
import { cartActions } from '../cart-slice';

export const removeToCart = createAsyncThunk(
    'cart/remove',
    async ({ product_variant_id }: { product_variant_id: string }, { getState, dispatch }) => {
        const state: RootState = getState();
        const isAuth = state.user.jwt;

        if (isAuth) {
            const items = state.cart.items;
            const item = items.find((i) => i.product_variant_id === product_variant_id);

            if (item) {
                if (item.quantity <= 1) {
                    await ApiService.deleteCartItem(item.uuid);
                } else {
                    await ApiService.updateCartItem(item.uuid, item.quantity - 1);
                }
            }
        }

        dispatch(cartActions.removeToCart({ product_variant_id }));
    },
);
