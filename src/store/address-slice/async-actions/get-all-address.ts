import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiService } from '../../../helpers/api.service';
import { AxiosError } from 'axios';

export const getAllAddress = createAsyncThunk('address/get-all', async () => {
    try {
        const res = await ApiService.getAddresses();
        return res;
    } catch (e) {
        if (e instanceof AxiosError) {
            throw new Error(e.response?.data.error);
        }
        throw new Error('Неизвестная ошибка');
    }
});
