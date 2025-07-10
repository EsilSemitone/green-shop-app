const API_URL = import.meta.env.VITE_API_URL;

export const API = {
    auth: {
        register: `${API_URL}/api/auth/register`,
        login: `${API_URL}/api/auth/login`,
        logout: `${API_URL}/api/auth/logout`,
        refresh: `${API_URL}/api/auth/refresh`,
        reset: `${API_URL}/api/auth/reset`,
        restore: `${API_URL}/api/auth/restore`,
    },
    product: {
        getProductFilter: `${API_URL}/api/product/filter`,
        getProductVariantsByCriteria: `${API_URL}/api/product/variants`,
        getProductVariantsByProduct: (productId: string) => `${API_URL}/api/product/${productId}/variant`,
        getSimilarProductVariants: `${API_URL}/api/product/variants/similar`,
        getProductVariantByUuid: (uuid: string) => `${API_URL}/api/product/variants/${uuid}`,
        getAdminProducts: `${API_URL}/api/product/all`,
        getProductWithProductVariant: (uuid: string) => `${API_URL}/api/product/${uuid}/variant`,
        updateProduct: (uuid: string) => `${API_URL}/api/product/${uuid}`,
        updateProductVariant: (productId: string, variantId: string) =>
            `${API_URL}/api/product/${productId}/variant/${variantId}`,
        deleteProductVariant: (productId: string, variantId: string) =>
            `${API_URL}/api/product/${productId}/variant/${variantId}`,
        createProductVariant: (productId: string) => `${API_URL}/api/product/${productId}/variant`,
        createProduct: `${API_URL}/api/product`,
    },
    cart: {
        syncCartItems: `${API_URL}/api/cart/sync`,
        createCartItem: `${API_URL}/api/cart/item`,
        updateCartItem: (uuid: string) => `${API_URL}/api/cart/item/${uuid}`,
        deleteCartItem: (uuid: string) => `${API_URL}/api/cart/item/${uuid}`,
    },

    address: {
        getAll: `${API_URL}/api/address/all`,
        create: `${API_URL}/api/address`,
        delete: (addressId: string) => `${API_URL}/api/address/${addressId}`,
    },
    user: {
        me: `${API_URL}/api/user/me`,
        update: `${API_URL}/api/user`,
        getUsers: `${API_URL}/api/user`,
        getUsersStats: `${API_URL}/api/user/stats`,
        getUser: (uuid: string) => `${API_URL}/api/user/${uuid}`,
        updateUserAdmin: (uuid: string) => `${API_URL}/api/user/${uuid}`,
        addAdmin: `${API_URL}/api/user/add-admin`,
        deleteUserAdmin: (uuid: string) => `${API_URL}/api/user/${uuid}`,
    },

    upload: {
        upload: `${API_URL}/api/upload`,
    },

    payment_methods: {
        getAll: `${API_URL}/api/payment-method`,
    },

    order: {
        create: `${API_URL}/api/order`,
        my: `${API_URL}/api/order/my`,
        details: (uuid: string) => `${API_URL}/api/order/${uuid}`,
        all: `${API_URL}/api/order/all`,
        update: (uuid: string) => `${API_URL}/api/order/${uuid}`,
    },

    favorites: {
        getAll: `${API_URL}/api/favorites`,
        add: `${API_URL}/api/favorites`,
        remove: `${API_URL}/api/favorites`,
    },

    reviews: {
        getProductReviews: (productId: string) => `${API_URL}/api/review/product/${productId}`,
        create: `${API_URL}/api/review`,
        delete: (uuid: string) => `${API_URL}/api/review/${uuid}`,
    },

    review_comment: {
        createReviewComment: (reviewId: string) => `${API_URL}/api/review/${reviewId}/comment`,
        deleteReviewComment: (reviewId: string, commentId: string) => `${API_URL}/api/review/${reviewId}/comment/${commentId}`,
    },

    likes: {
        like: (targetId: string, targetType: string) => `${API_URL}/api/like/${targetId}/${targetType}`,
        dislike: (targetId: string, targetType: string) => `${API_URL}/api/like/${targetId}/${targetType}`,
    },

    tags: {
        getAllTags: `${API_URL}/api/tag/`,
        createTag: `${API_URL}/api/tag/`,
    },
};
