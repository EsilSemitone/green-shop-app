import { createBrowserRouter, Navigate } from 'react-router';
import { ROUTES } from './common/constants/routes';
import { AuthGuard } from './components/guard/AuthGuard/AuthGuard';
import { AccountLayout } from './layout/AccountLayout/AccountLayout';
import { AccountAddress } from './pages/AccountAddress/AccountAddress';
import { AccountMe } from './pages/AccountMe/AccountMe';
import { Cart } from './pages/Cart/Cart';
import { Favorites } from './pages/Favorites/Favorites';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { Order } from './pages/Order/Order';
import { Orders } from './pages/Orders/Orders';
import { Product } from './pages/Product/Product';
import { ResetPassword } from './pages/ResetPassword/ResetPassword';
import { Shop } from './pages/Shop/Shop';
import { Layout } from './layout/Layout/Layout';

export const ROUTER = createBrowserRouter([
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
        element: (
            <AuthGuard>
                <AccountLayout></AccountLayout>
            </AuthGuard>
        ),
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
                element: <Orders></Orders>,
            },
            {
                path: ROUTES.account.order,
                element: <Order></Order>,
            },
            {
                path: ROUTES.account.favorites,
                element: <Favorites></Favorites>,
            },
        ],
    },
]);
