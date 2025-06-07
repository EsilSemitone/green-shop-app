import { HTMLAttributes } from 'react';

export interface IProductReviewsProps extends HTMLAttributes<HTMLElement> {
    productId: string | undefined;
    variantId: string | undefined;
}
