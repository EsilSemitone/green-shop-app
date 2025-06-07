import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ApiService } from '../../../common/helpers/api.service';

export const getProfile = createAsyncThunk('user/getProfile', async () => {
    try {
        const data = ApiService.getProfile();
        return data;
    } catch (e) {
        if (e instanceof AxiosError) {
            throw new Error(e.response?.data.error);
        }
        throw new Error('Неизвестная ошибка');
    }
});
