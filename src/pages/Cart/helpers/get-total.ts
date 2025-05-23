import { EnrichedCartElement } from '../types/enriched-cart-element';

export const getTotal = (products: EnrichedCartElement[]) => {
    return Number(
        products
            .reduce((acc, value) => {
                return acc + Number(value.price) * value.quantity;
            }, 0)
            .toFixed(2),
    );
};
