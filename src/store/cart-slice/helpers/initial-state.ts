import { ICartState } from '../interfaces/cart-state';
import { getGuestCart } from './get-guest-cart';

export const INITIAL_STATE: ICartState = {
    items: getGuestCart(),
};
