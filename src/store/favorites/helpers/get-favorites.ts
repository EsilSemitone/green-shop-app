import { getItem } from '../../localstorage/localstorage';
import { LOCALSTORAGE_KEYS } from '../../localstorage/localstorage-keys';
import { IFavoriteProductItem } from '../interfaces/favorite-product-item';

export function getFavorites(): IFavoriteProductItem[] {
    const favorites = getItem(LOCALSTORAGE_KEYS.FAVORITES);

    if (!favorites) {
        return [];
    }

    return JSON.parse(favorites);
}
