import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INITIAL_STATE } from './constants/initial-state';
import { getAllFavorites } from './async-actions/get-all-favorites';
import { AddToFavoritesResponseDto, GetAllFavoritesResponseDto } from 'contracts';
import { removeToFavorites } from './async-actions/remove-to-favorites';
import { addToFavorites } from './async-actions/add-to-favorites';
import { IFavoriteProductItem } from './interfaces/favorite-product-item';

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getAllFavorites.fulfilled, (state, action: PayloadAction<GetAllFavoritesResponseDto>) => {
            state.favorites = action.payload.payload;
        });

        builder.addCase(
            removeToFavorites.fulfilled,
            (state, action: PayloadAction<{ data: AddToFavoritesResponseDto; product_variant_id: string }>) => {
                if (action.payload.data.isSuccess) {
                    state.favorites = state.favorites.filter((pr) => pr.product_variant_id !== action.payload.product_variant_id);
                }
            },
        );

        builder.addCase(
            addToFavorites.fulfilled,
            (state, action: PayloadAction<{ data: AddToFavoritesResponseDto; product: IFavoriteProductItem }>) => {
                if (action.payload.data.isSuccess) {
                    state.favorites.push(action.payload.product);
                }
            },
        );
    },
});

export const favoritesActions = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
