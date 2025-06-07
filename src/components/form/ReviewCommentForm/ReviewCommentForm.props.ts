import { ExtendedReviewComment } from 'contracts';
import { HTMLAttributes } from 'react';

export interface IReviewCommentFormProps extends HTMLAttributes<HTMLElement> {
    addReviewComment: (reviewId: string, comment: ExtendedReviewComment) => void;
    review_id: string;
    authorReviewName: string;
}
