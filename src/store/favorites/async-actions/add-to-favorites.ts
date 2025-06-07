import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiService } from '../../../common/helpers/api.service';
import { AxiosError } from 'axios';
import { IFavoriteProductItem } from '../interfaces/favorite-product-item';
import { appActions } from '../../app-slice/app.slice';
import { MESSAGE_TYPE } from '../../app-slice/enums/message-type';

export const addToFavorites = createAsyncThunk('favorites/add', async (product: IFavoriteProductItem, { dispatch }) => {
    try {
        const data = await ApiService.addToFavorites(product.product_variant_id);
        dispatch(appActions.setMessage({ type: MESSAGE_TYPE.SUCCESS, content: 'Товар добавлен в избранное' }));
        return { data, product };
    } catch (e) {
        dispatch(appActions.setMessage({ type: MESSAGE_TYPE.ERROR, content: 'Товар не добавлен в избранное' }));

        if (e instanceof AxiosError) {
            throw new Error(e.response?.data.error);
        }
        throw new Error('Неизвестная ошибка');
    }
});
