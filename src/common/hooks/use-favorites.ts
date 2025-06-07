import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { MouseEvent } from 'react';
import { IFavoriteProductItem } from '../../store/favorites/interfaces/favorite-product-item';
import { removeToFavorites } from '../../store/favorites/async-actions/remove-to-favorites';
import { addToFavorites } from '../../store/favorites/async-actions/add-to-favorites';

export const useFavorites = () => {
    const favorites = useSelector((s: RootState) => s.favorites.favorites);
    const dispatch = useDispatch<AppDispatch>();

    const toggleFavorites = (isOnFavorites: boolean, { uuid, product_variant_id, price, image, name }: IFavoriteProductItem) => {
        return (e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();

            if (isOnFavorites) {
                dispatch(removeToFavorites(product_variant_id));
                return;
            }
            dispatch(addToFavorites({ uuid, product_variant_id, price, image, name }));
        };
    };

    const isOnFavorites = (uuid: string) => {
        return Boolean(favorites.find((f) => f.product_variant_id === uuid));
    };

    return { favorites, toggleFavorites, isOnFavorites };
};
