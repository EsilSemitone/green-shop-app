/* eslint-disable react-hooks/rules-of-hooks */
import axios, { Axios } from 'axios';
import { userSlice } from '../store/user-slice/user.slice';
import { Store } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { ApiService } from './api.service';

const api = axios.create({
    withCredentials: true,
});

export function setupApi(store: Store<RootState>) {
    useAuthMiddleware(api, store);
    useRefreshIntersepter(api, store);
}

function useAuthMiddleware(api: Axios, store: Store<RootState>) {
    api.interceptors.request.use((config) => {
        const token = store.getState().user.jwt;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });
}

function useRefreshIntersepter(api, store: Store<RootState>) {
    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                console.log('401 пошел запрос refresh');

                try {
                    const { accessToken } = await ApiService.refresh();
                    store.dispatch(userSlice.actions.setAccessToken(accessToken));
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                    return api(originalRequest);
                } catch (e) {
                    store.dispatch(userSlice.actions.logout());
                }
            }

            return Promise.reject(error);
        },
    );
}

export default api;
