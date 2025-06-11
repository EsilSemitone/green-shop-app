import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INITIAL_STATE } from './constants/initial-state';
import { createAddress } from './async-actions/create-address';
import { CreateAddressResponseDto, GetAllAddressesResponseDto } from 'contracts-green-shop';
import { getAllAddress } from './async-actions/get-all-address';
import { deleteAddress } from './async-actions/delete-address';

export const addressSlice = createSlice({
    name: 'address',
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createAddress.fulfilled, (state, { payload }: PayloadAction<CreateAddressResponseDto>) => {
            state.addresses.push(payload);
        });
        builder.addCase(createAddress.rejected, (state, error) => {
            state.errorMessage = error.error.message ?? null;
        });
        builder.addCase(getAllAddress.fulfilled, (state, { payload }: PayloadAction<GetAllAddressesResponseDto>) => {
            state.addresses = payload.addresses;
        });
        builder.addCase(deleteAddress.fulfilled, (state, { payload }: PayloadAction<string>) => {
            state.addresses = state.addresses.filter((a) => a.uuid !== payload);
        });
    },
});

export const addressActions = addressSlice.actions;
export const addressReducer = addressSlice.reducer;
