import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INITIAL_STATE } from './constants/initial-state';
import { RegisterSchemaResponseDto } from 'contracts-green-shop/auth/register.schema.ts';
import { GetMeResponseDto, LoginSchemaResponseDto, UpdateUserResponseDto } from 'contracts-green-shop';
import { registerUser } from './async-actions/register';
import { loginUser } from './async-actions/login';
import { logoutUser } from './async-actions/logout';
import { resetPassword } from './async-actions/reset-password';
import { getProfile } from './async-actions/get-profile';
import { updateUser } from './async-actions/update-user';

export const userSlice = createSlice({
    name: 'user',
    initialState: INITIAL_STATE,
    reducers: {
        clearError: (s) => {
            s.errorMessage = null;
        },
        setAccessToken: (s, { payload }: { payload: string }) => {
            s.jwt = payload;
        },
        logout: (s) => {
            s.profile = null;
            s.jwt = null;
            s.errorMessage = null;
        },
    },
    extraReducers(builder) {
        builder.addCase(registerUser.fulfilled, (state, action: PayloadAction<RegisterSchemaResponseDto>) => {
            state.jwt = action.payload.accessToken;
            state.errorMessage = null;
        });
        builder.addCase(registerUser.rejected, (state, error) => {
            state.errorMessage = error.error.message ?? null;
        });
        builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginSchemaResponseDto>) => {
            state.jwt = action.payload.accessToken;
            state.errorMessage = null;
        });
        builder.addCase(loginUser.rejected, (state, error) => {
            state.errorMessage = error.error.message ?? null;
        });
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.profile = null;
            state.errorMessage = null;
            state.jwt = null;
        });
        builder.addCase(logoutUser.rejected, (state) => {
            state.jwt = null;
        });
        builder.addCase(resetPassword.fulfilled, (state) => {
            state.errorMessage = null;
        });
        builder.addCase(resetPassword.rejected, (state, error) => {
            state.errorMessage = error.error.message ?? null;
        });
        builder.addCase(getProfile.fulfilled, (state, action: PayloadAction<GetMeResponseDto>) => {
            state.profile = action.payload;
        });
        builder.addCase(getProfile.rejected, (state, error) => {
            state.errorMessage = error.error.message ?? null;
        });
        builder.addCase(updateUser.fulfilled, (state, action: PayloadAction<UpdateUserResponseDto>) => {
            state.profile = action.payload;
        });
        builder.addCase(updateUser.rejected, (state, error) => {
            state.errorMessage = error.error.message ?? null;
        });
    },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
