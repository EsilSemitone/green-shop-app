import { HTMLAttributes } from 'react';

export interface ILikeButtonProps extends HTMLAttributes<HTMLButtonElement> {
    isLiked: boolean;
    likesCount: number;
}
