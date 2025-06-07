import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ApiService } from '../../../common/helpers/api.service';

export const logoutUser = createAsyncThunk('user/logout', async () => {
    try {
        const data = await ApiService.logout();
        return data;
    } catch (e) {
        if (e instanceof AxiosError) {
            throw new Error(e.response?.data.error);
        }
        if (e instanceof Error) {
            throw new Error(e.message);
        }
        throw new Error('Неизвестная ошибка');
    }
});
