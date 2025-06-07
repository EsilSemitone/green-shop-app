import { ExtendedReviewComment } from 'contracts';
import { HTMLAttributes } from 'react';

export interface ICommentCardProps extends HTMLAttributes<HTMLElement> {
    reviewId: string;
    comment: ExtendedReviewComment;
    userId: string | undefined;
    deleteReviewComment: (commentId: string) => void;
}
