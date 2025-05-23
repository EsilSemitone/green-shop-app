import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiService } from '../../../helpers/api.service';
import { ICartItems } from '../interfaces/cart-item';
import { AxiosError } from 'axios';

export const syncCart = createAsyncThunk('cart/sync', async (items: ICartItems) => {
    try {
        const data = await ApiService.syncCart(items);
        return data;
    } catch (e) {
        if (e instanceof AxiosError) {
            throw new Error(e.response?.data.error);
        }
        throw new Error('Неизвестная ошибка');
    }
});
