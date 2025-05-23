import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { UpdateUserRequestDto } from 'contracts';
import { ApiService } from '../../../helpers/api.service';

export const updateUser = createAsyncThunk('user/update', async (updateData: UpdateUserRequestDto) => {
    try {
        const data = ApiService.updateUser(updateData);
        return data;
    } catch (e) {
        if (e instanceof AxiosError) {
            throw new Error(e.response?.data.error);
        }
        throw new Error('Неизвестная ошибка');
    }
});
