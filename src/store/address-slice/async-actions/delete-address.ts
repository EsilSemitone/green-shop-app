import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiService } from '../../../common/helpers/api.service';
import { AxiosError } from 'axios';

export const deleteAddress = createAsyncThunk('address/delete', async (addressId: string) => {
    try {
        await ApiService.deleteAddress(addressId);
        return addressId;
    } catch (e) {
        if (e instanceof AxiosError) {
            throw new Error(e.response?.data.error);
        }
        throw new Error('Неизвестная ошибка');
    }
});
