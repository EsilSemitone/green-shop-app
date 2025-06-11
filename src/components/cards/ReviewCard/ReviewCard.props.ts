import { ExtendedReviewComment } from 'contracts-green-shop';
import { ExtendedReview } from 'contracts-green-shop/review/extended-review.schema.ts';
import { HTMLAttributes } from 'react';

export interface IReviewCardProps extends HTMLAttributes<HTMLElement> {
    review: ExtendedReview;
    userId: string | undefined;
    deleteReview: (...args: any[]) => void;
    addReviewComment: (reviewId: string, comment: ExtendedReviewComment) => void;
    deleteReviewComment: (commentId: string) => void;
}
