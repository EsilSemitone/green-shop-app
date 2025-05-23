import { getItem } from '../../localstorage/localstorage';
import { LOCALSTORAGE_KEYS } from '../../localstorage/localstorage-keys';
import { ICartItems } from '../interfaces/cart-item';

export function getGuestCart(): ICartItems {
    const guestCart = getItem(LOCALSTORAGE_KEYS.GUEST_CART);

    if (!guestCart) {
        return [];
    }

    return JSON.parse(guestCart);
}
