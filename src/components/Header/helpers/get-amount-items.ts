import { ICartItems } from '../../../store/cart-slice/interfaces/cart-item';

export const getAmountItems = (items: ICartItems) => {
    return items.reduce((acc, value) => {
        return acc + value.quantity;
    }, 0);
};
