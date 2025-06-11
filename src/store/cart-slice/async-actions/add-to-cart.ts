import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { ApiService } from '../../../common/helpers/api.service';
import { cartActions } from '../cart-slice';
import { appActions } from '../../app-slice/app.slice';
import { MESSAGE_TYPE } from '../../app-slice/enums/message-type';

export const addToCart = createAsyncThunk(
    'cart/add',
    async ({ product_variant_id, quantity }: { product_variant_id: string; quantity: number }, { getState, dispatch }) => {
        const state = (getState as () => RootState)();
        const isAuth = state.user.jwt;

        if (isAuth) {
            const items = state.cart.items;
            const item = items.find((i) => i.product_variant_id === product_variant_id);

            if (!item) {
                const newItem = await ApiService.createCartItem({ product_variant_id, quantity });
                dispatch(cartActions.addToCartLocal({ product_variant_id, quantity, uuid: newItem.uuid }));
                dispatch(appActions.setMessage({ type: MESSAGE_TYPE.SUCCESS, content: 'Товар добавлен в корзину' }));
            } else {
                await ApiService.updateCartItem(item.uuid, item.quantity + quantity);
                dispatch(cartActions.addToCartLocal({ product_variant_id, quantity, uuid: item.uuid }));
                dispatch(appActions.setMessage({ type: MESSAGE_TYPE.SUCCESS, content: 'Товар добавлен в корзину' }));
            }
        } else {
            dispatch(cartActions.addToCartLocal({ product_variant_id, quantity, uuid: 'unknown' }));
            dispatch(appActions.setMessage({ type: MESSAGE_TYPE.SUCCESS, content: 'Товар добавлен в корзину' }));
        }
    },
);
