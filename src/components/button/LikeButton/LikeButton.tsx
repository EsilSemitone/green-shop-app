import { memo } from 'react';
import styles from './LikeButton.module.css';
import { ILikeButtonProps } from './LikeButton.props';

export const LikeButton = memo(({ isLiked, likesCount, ...props }: ILikeButtonProps) => {
    return (
        <button {...props} className={styles.like_button}>
            <div>{likesCount}</div>
            <img src={isLiked ? '/icons/red-heart.svg' : '/icons/heart-icon.svg'} alt="Иконка сердца" />
        </button>
    );
});
