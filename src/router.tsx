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
import { AdminGuard } from './components/guard/AuthGuard/AdminGuard';

const AccountLayout = lazy(() => import('./layout/AccountLayout/AccountLayout'));
const AccountMe = lazy(() => import('./pages/AccountMe/AccountMe'));
const AccountAddress = lazy(() => import('./pages/AccountAddress/AccountAddress'));
const Order = lazy(() => import('./pages/Order/Order'));
const Orders = lazy(() => import('./pages/Orders/Orders'));
const Cart = lazy(() => import('./pages/Cart/Cart'));
const Product = lazy(() => import('./pages/Product/Product'));
const AdminLayout = lazy(() => import('./layout/AdminLayout/AdminLayout'));
const Users = lazy(() => import('./pages/Users/Users'));
const User = lazy(() => import('./pages/User/User'));
const UsersStats = lazy(() => import('./pages/UsersStats/UsersStats'));
const AdminProducts = lazy(() => import('./pages/AdminProducts/AdminProducts'));
const AdminProduct = lazy(() => import('./pages/AdminProduct/AdminProduct'));
const CreateProduct = lazy(() => import('./pages/CreateProduct/CreateProduct'));

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
                path: ROUTES.shop.restorePassword,
                element: <ResetPassword></ResetPassword>,
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
    {
        path: ROUTES.admin.layout,
        element: (
            <Suspense
                fallback={
                    <Flex align="center" gap="middle" style={{ height: '100%', padding: '50px' }}>
                        <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: 'green' }} spin />} />
                    </Flex>
                }
            >
                <AdminGuard>
                    <AdminLayout></AdminLayout>
                </AdminGuard>
                ,
            </Suspense>
        ),

        children: [
            {
                path: ROUTES.admin.layout,
                element: <Navigate to={ROUTES.admin.userStats}></Navigate>,
            },
            {
                path: ROUTES.admin.users,
                element: (
                    <Suspense
                        fallback={
                            <Flex align="center" gap="middle" style={{ height: '100%', padding: '50px' }}>
                                <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: 'green' }} spin />} />
                            </Flex>
                        }
                    >
                        <Users></Users>
                    </Suspense>
                ),
            },
            {
                path: ROUTES.admin.user,
                element: (
                    <Suspense
                        fallback={
                            <Flex align="center" gap="middle" style={{ height: '100%', padding: '50px' }}>
                                <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: 'green' }} spin />} />
                            </Flex>
                        }
                    >
                        <User></User>
                    </Suspense>
                ),
            },
            {
                path: ROUTES.admin.userStats,
                element: (
                    <Suspense
                        fallback={
                            <Flex align="center" gap="middle" style={{ height: '100%', padding: '50px' }}>
                                <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: 'green' }} spin />} />
                            </Flex>
                        }
                    >
                        <UsersStats></UsersStats>
                    </Suspense>
                ),
            },
            {
                path: ROUTES.admin.products,
                element: (
                    <Suspense
                        fallback={
                            <Flex align="center" gap="middle" style={{ height: '100%', padding: '50px' }}>
                                <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: 'green' }} spin />} />
                            </Flex>
                        }
                    >
                        <AdminProducts></AdminProducts>
                    </Suspense>
                ),
            },
            {
                path: ROUTES.admin.product,
                element: (
                    <Suspense
                        fallback={
                            <Flex align="center" gap="middle" style={{ height: '100%', padding: '50px' }}>
                                <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: 'green' }} spin />} />
                            </Flex>
                        }
                    >
                        <AdminProduct></AdminProduct>
                    </Suspense>
                ),
            },
            {
                path: ROUTES.admin.createProduct,
                element: (
                    <Suspense
                        fallback={
                            <Flex align="center" gap="middle" style={{ height: '100%', padding: '50px' }}>
                                <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: 'green' }} spin />} />
                            </Flex>
                        }
                    >
                        <CreateProduct></CreateProduct>
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: ROUTES.error,
        element: <NotFoundPage></NotFoundPage>,
    },
]);
