import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { IRegisterForm } from '../../../components/form/RegisterForm/interfaces/register-form';
import { ApiService } from '../../../helpers/api.service';

export const registerUser = createAsyncThunk('user/register', async (registerData: IRegisterForm) => {
    try {
        const data = await ApiService.register(registerData);
        return data;
    } catch (e) {
        if (e instanceof AxiosError) {
            throw new Error(e.response?.data.error);
        }
        throw new Error('Неизвестная ошибка');
    }
});
