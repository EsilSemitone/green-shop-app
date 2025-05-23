import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INITIAL_STATE } from './constants/initial-product-filters';
import { IProductFilterState } from './interfaces/product-filter-state.interface';

export const productFilterSlice = createSlice({
    name: 'product-filter',
    initialState: INITIAL_STATE,
    reducers: {
        setProductFilter: (s, action: PayloadAction<Partial<IProductFilterState>>) => {
            return { ...s, ...action.payload };
        },
    },
});

export const productFilterActions = productFilterSlice.actions;
export const productFilterReducer = productFilterSlice.reducer;
