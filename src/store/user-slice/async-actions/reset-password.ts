import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ResetPasswordRequestDto } from "contracts";
import { ApiService } from "../../../helpers/api.service";

export const resetPassword = createAsyncThunk('user/reset', async (resetData: ResetPasswordRequestDto) => {
    try {
        const data = await ApiService.resetPassword(resetData);
        return data;
    } catch (e) {
        if (e instanceof AxiosError) {
            console.log(e.message);
            throw new Error(e.response?.data.error);
        }
        if (e instanceof Error) {
            throw new Error(e.message);
        }
        throw new Error('Неизвестная ошибка');
    }
});
