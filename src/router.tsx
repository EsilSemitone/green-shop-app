import { createBrowserRouter, Navigate } from 'react-router';
import { ROUTES } from './common/constants/routes';
import { AuthGuard } from './components/guard/AuthGuard/AuthGuard';
import { Favorites } from './pages/Favorites/Favorites';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { ResetPassword } from './pages/ResetPassword/ResetPassword';
import { Shop } from './pages/Shop/Shop';
import { Layout } from './layout/Layout/Layout';
import { lazy, Suspense } from 'react';
import { Flex, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const AccountLayout = lazy(() => import('./layout/AccountLayout/AccountLayout'));
const AccountMe = lazy(() => import('./pages/AccountMe/AccountMe'));
const AccountAddress = lazy(() => import('./pages/AccountAddress/AccountAddress'));
const Order = lazy(() => import('./pages/Order/Order'));
const Orders = lazy(() => import('./pages/Orders/Orders'));
const Cart = lazy(() => import('./pages/Cart/Cart'));
const Product = lazy(() => import('./pages/Product/Product'));

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
                element: (
                    <Suspense
                        fallback={
                            <Flex align="center" gap="middle" style={{ height: '100%', padding: '50px' }}>
                                <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: 'green' }} spin />} />
                            </Flex>
                        }
                    >
                        <Product></Product>
                    </Suspense>
                ),
            },
            {
                path: ROUTES.shop.cart,
                element: (
                    <Suspense
                        fallback={
                            <Flex align="center" gap="middle" style={{ height: '100%', padding: '50px' }}>
                                <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: 'green' }} spin />} />
                            </Flex>
                        }
                    >
                        <Cart></Cart>
                    </Suspense>
                ),
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
                <Suspense
                    fallback={
                        <Flex align="center" gap="middle" style={{ height: '100%', padding: '50px' }}>
                            <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: 'green' }} spin />} />
                        </Flex>
                    }
                >
                    <AccountLayout></AccountLayout>
                </Suspense>
            </AuthGuard>
        ),
        children: [
            {
                path: ROUTES.account.layout,
                element: <Navigate to={ROUTES.account.me}></Navigate>,
            },
            {
                path: ROUTES.account.me,
                element: (
                    <Suspense
                        fallback={
                            <Flex align="center" gap="middle" style={{ height: '100%', padding: '50px' }}>
                                <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: 'green' }} spin />} />
                            </Flex>
                        }
                    >
                        <AccountMe></AccountMe>
                    </Suspense>
                ),
            },
            {
                path: ROUTES.account.address,
                element: (
                    <Suspense
                        fallback={
                            <Flex align="center" gap="middle" style={{ height: '100%', padding: '50px' }}>
                                <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: 'green' }} spin />} />
                            </Flex>
                        }
                    >
                        <AccountAddress></AccountAddress>
                    </Suspense>
                ),
            },
            {
                path: ROUTES.account.orders,
                element: (
                    <Suspense
                        fallback={
                            <Flex align="center" gap="middle" style={{ height: '100%', padding: '50px' }}>
                                <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: 'green' }} spin />} />
                            </Flex>
                        }
                    >
                        <Orders></Orders>
                    </Suspense>
                ),
            },
            {
                path: ROUTES.account.order,
                element: (
                    <Suspense
                        fallback={
                            <Flex align="center" gap="middle" style={{ height: '100%', padding: '50px' }}>
                                <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: 'green' }} spin />} />
                            </Flex>
                        }
                    >
                        <Order></Order>
                    </Suspense>
                ),
            },
            {
                path: ROUTES.account.favorites,
                element: <Favorites></Favorites>,
            },
        ],
    },
]);
