export const ROUTES = {
    shop: {
        layout: '/',
        products: '/',
        product: '/product/:uuid',
        productDynamic: (uuid: string) => `/product/${uuid}`,
        cart: '/cart',
        blogs: '/blog',
        blog: '/blog/:id',
        restorePassword: '/restore',
    },
    account: {
        layout: '/account',
        me: '/account/me',
        address: '/account/address',
        orders: '/account/orders',
        order: '/account/orders/:uuid',
        orderDynamic: (uuid: string) => `/account/orders/${uuid}`,
        favorites: '/account/favorites',
    },
    error: '*',
};
