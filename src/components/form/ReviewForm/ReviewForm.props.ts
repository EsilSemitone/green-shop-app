import { ExtendedReview } from 'contracts-green-shop/review/extended-review.schema';
import { HTMLAttributes } from 'react';

export interface IReviewFormProps extends HTMLAttributes<HTMLElement> {
    addReview: (review: ExtendedReview) => void;
    product_id: string;
    product_variant_id: string;
}
