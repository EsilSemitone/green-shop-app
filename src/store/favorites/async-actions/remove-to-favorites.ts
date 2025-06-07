import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiService } from '../../../common/helpers/api.service';
import { AxiosError } from 'axios';

export const removeToFavorites = createAsyncThunk('favorites/remove', async (product_variant_id: string) => {
    try {
        const data = await ApiService.removeToFavorites(product_variant_id);
        return { data, product_variant_id };
    } catch (e) {
        if (e instanceof AxiosError) {
            throw new Error(e.response?.data.error);
        }
        throw new Error('Неизвестная ошибка');
    }
});
