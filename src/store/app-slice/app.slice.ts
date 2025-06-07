import { createSlice } from '@reduxjs/toolkit';
import { INITIAL_STATE } from './constants/initial-state';
import { IMessage } from './interfaces/message';

export const appSlice = createSlice({
    name: 'app',
    initialState: INITIAL_STATE,
    reducers: {
        setMessage: (s, { payload }: { payload: IMessage | null }) => {
            s.message = payload;
        },
    },
});

export const appActions = appSlice.actions;
export const appReducer = appSlice.reducer;
