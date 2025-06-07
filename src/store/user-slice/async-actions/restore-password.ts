import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { RestorePasswordRequestDto } from 'contracts';
import { ApiService } from '../../../common/helpers/api.service';

export const restorePassword = createAsyncThunk('user/restore', async ({ email }: RestorePasswordRequestDto) => {
    try {
        const data = await ApiService.restorePassword(email);
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
