import { createRoot } from 'react-dom/client';
import 'rc-slider/assets/index.css';
import './index.css';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import { Layout } from './layout/Layout/Layout';
import { Shop } from './pages/Shop/Shop';
import { Product } from './pages/Product/Product';
import { Cart } from './pages/Cart/Cart';
import { AccountLayout } from './layout/AccountLayout/AccountLayout';
import { AccountMe } from './pages/AccountMe/AccountMe';
import { AccountAddress } from './pages/AccountAddress/AccountAddress';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout></Layout>,
        children: [
            {
                path: '/',
                element: <Shop></Shop>,
            },
            {
                path: '/product',
                element: <Navigate to={'/'}></Navigate>,
            },
            {
                path: '/product/:id',
                element: <Product></Product>,
            },
            {
                path: '/cart',
                element: <Cart></Cart>,
            },
            {
                path: '/blog',
                element: <>blog</>,
            },
            {
                path: '/blog/:id',
                element: <>blog id</>,
            },
        ],
    },
    {
        path: '/account',
        element: <AccountLayout></AccountLayout>,
        children: [
            {
                path: '/account',
                element: <Navigate to={'/account/me'}></Navigate>,
            },
            {
                path: '/account/me',
                element: <AccountMe></AccountMe>,
            },
            {
                path: '/account/address',
                element: <AccountAddress></AccountAddress>,
            },
            {
                path: '/account/orders',
                element: <>orders</>,
            },
            {
                path: '/account/wishlist',
                element: <>wishlist</>,
            },
        ],
    },
    {
        path: '*',
        element: <>Error</>,
    },
]);

createRoot(document.getElementById('root')!).render(<RouterProvider router={router}></RouterProvider>);
