import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiService } from '../../../common/helpers/api.service';
import { AxiosError } from 'axios';

export const getAllFavorites = createAsyncThunk('favorites/getAll', async () => {
    try {
        const data = ApiService.getAllFavorites();
        return data;
    } catch (e) {
        if (e instanceof AxiosError) {
            throw new Error(e.response?.data.error);
        }
        throw new Error('Неизвестная ошибка');
    }
});
