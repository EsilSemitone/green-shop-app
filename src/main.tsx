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
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ResetPassword } from './pages/ResetPassword/ResetPassword';
import { ROUTES } from './common/constants/routes';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

const router = createBrowserRouter([
    {
        path: ROUTES.shop.layout,
        element: <Layout></Layout>,
        children: [
            {
                path: ROUTES.shop.layout,
                element: <Shop></Shop>,
            },
            {
                path: ROUTES.shop.products,
                element: <Navigate to={ROUTES.shop.layout}></Navigate>,
            },
            {
                path: ROUTES.shop.product,
                element: <Product></Product>,
            },
            {
                path: ROUTES.shop.cart,
                element: <Cart></Cart>,
            },
            {
                path: ROUTES.shop.blogs,
                element: <>blog</>,
            },
            {
                path: ROUTES.shop.blog,
                element: <>blog id</>,
            },
            {
                path: ROUTES.shop.restorePassword,
                element: <ResetPassword></ResetPassword>,
            },
            {
                path: ROUTES.error,
                element: <NotFoundPage></NotFoundPage>,
            },
        ],
    },
    {
        path: ROUTES.account.layout,
        element: <AccountLayout></AccountLayout>,
        children: [
            {
                path: ROUTES.account.layout,
                element: <Navigate to={ROUTES.account.me}></Navigate>,
            },
            {
                path: ROUTES.account.me,
                element: <AccountMe></AccountMe>,
            },
            {
                path: ROUTES.account.address,
                element: <AccountAddress></AccountAddress>,
            },
            {
                path: ROUTES.account.orders,
                element: <>orders</>,
            },
            {
                path: ROUTES.account.wishlist,
                element: <>wishlist</>,
            },
        ],
    },
]);

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
    </Provider>,
);
