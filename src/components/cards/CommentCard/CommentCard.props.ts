import { ExtendedReviewComment } from 'contracts-green-shop';
import { HTMLAttributes } from 'react';

export interface ICommentCardProps extends HTMLAttributes<HTMLElement> {
    reviewId: string;
    comment: ExtendedReviewComment;
    userId: string | undefined;
    deleteReviewComment: (commentId: string) => void;
}
