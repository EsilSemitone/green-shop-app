import { ExtendedReviewComment } from 'contracts-green-shop';
import { HTMLAttributes } from 'react';

export interface IReviewCommentFormProps extends HTMLAttributes<HTMLElement> {
    addReviewComment: (reviewId: string, comment: ExtendedReviewComment) => void;
    review_id: string;
    authorReviewName: string;
}
