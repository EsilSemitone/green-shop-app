import { EnrichedCartElement } from '../types/enriched-cart-element';

export const getTotal = (products: EnrichedCartElement[], shipping?: number) => {
    const totalProducts = Number(
        products.reduce((acc, value) => {
            return acc + Number(value.price) * value.quantity;
        }, 0),
    );

    return ((shipping || 0) + totalProducts).toFixed(2)
};
