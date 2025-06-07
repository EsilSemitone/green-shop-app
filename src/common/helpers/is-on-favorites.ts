import { IFavoriteProductItem } from '../../store/favorites/interfaces/favorite-product-item';

export const isOnFavorites = (uuid: string, favorites: IFavoriteProductItem[]): boolean => {
    return Boolean(favorites.find((f) => f.product_variant_id === uuid));
};
