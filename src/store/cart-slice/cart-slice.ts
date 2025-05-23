import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INITIAL_STATE } from './helpers/initial-state';
import { syncCart } from './async-actions/sync-cart';
import { SyncCartResponseDto } from 'contracts';

const cartSlice = createSlice({
    name: 'cart',
    initialState: INITIAL_STATE,
    reducers: {
        addToCartLocal: (s, { payload }: PayloadAction<{ product_variant_id: string; quantity: number }>) => {
            const item = s.items.find((i) => i.product_variant_id === payload.product_variant_id);
            if (item) {
                item.quantity += payload.quantity;
            } else {
                s.items.push({
                    uuid: 'unknown',
                    product_variant_id: payload.product_variant_id,
                    quantity: payload.quantity,
                });
            }
        },
        removeToCart: (s, { payload }: PayloadAction<{ product_variant_id: string }>) => {
            const item = s.items.find((i) => i.product_variant_id == payload.product_variant_id);
            if (item) {
                if (item.quantity <= 1) {
                    const index = s.items.findIndex((i) => i.product_variant_id == payload.product_variant_id);
                    s.items.splice(index, 1);
                } else {
                    item.quantity -= 1;
                }
            }
        },
        deleteToCart: (s, { payload }: PayloadAction<{ product_variant_id: string }>) => {
            const items = s.items.filter((i) => i.product_variant_id !== payload.product_variant_id);
            return { ...s, items };
        },
        clearCart: (s) => {
            s.items = [];
        },
    },
    extraReducers(builder) {
        builder.addCase(syncCart.fulfilled, (state, action: PayloadAction<SyncCartResponseDto>) => {
            state.items = action.payload;
        });
        // builder.addCase(addToCart.fulfilled, (state, action: PayloadAction<any>) => {
        //     console.log(action.payload);
        // });
    },
});

export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
