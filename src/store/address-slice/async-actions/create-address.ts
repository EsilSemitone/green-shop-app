import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiService } from '../../../common/helpers/api.service';
import { CreateAddressRequestDto } from 'contracts';
import { AxiosError } from 'axios';

export const createAddress = createAsyncThunk('address/create', async (createData: CreateAddressRequestDto) => {
    try {
        const res = await ApiService.createAddress(createData);
        return res;
    } catch (e) {
        if (e instanceof AxiosError) {
            throw new Error(e.response?.data.error);
        }
        throw new Error('Неизвестная ошибка');
    }
});
