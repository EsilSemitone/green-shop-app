import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { LoginSchemaRequestDto } from 'contracts-green-shop';
import { ApiService } from '../../../common/helpers/api.service';

export const loginUser = createAsyncThunk('user/login', async (loginData: LoginSchemaRequestDto) => {
    try {
        const data = await ApiService.login(loginData);
        return data;
    } catch (e) {
        if (e instanceof AxiosError) {
            throw new Error(e.response?.data?.error || e.message);
        }
        throw new Error('Неизвестная ошибка');
    }
});
