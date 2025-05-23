import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { ApiService } from '../../../helpers/api.service';
import { cartActions } from '../cart-slice';

export const deleteToCart = createAsyncThunk(
    'cart/remove',
    async ({ product_variant_id }: { product_variant_id: string }, { getState, dispatch }) => {
        const state: RootState = getState();
        const isAuth = state.user.jwt;

        if (isAuth) {
            const items = state.cart.items;
            const item = items.find((i) => i.product_variant_id === product_variant_id);

            if (item) {
                await ApiService.deleteCartItem(item.uuid);
            }
        }

        dispatch(cartActions.deleteToCart({ product_variant_id }));
    },
);
