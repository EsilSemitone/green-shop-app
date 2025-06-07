import { memo, useCallback, useState } from 'react';
import styles from './CommentCard.module.css';
import { Avatar } from 'antd';
import { ICommentCardProps } from './CommentCard.props';
import { ApiService } from '../../../common/helpers/api.service';
import { LIKE_TYPE } from 'contracts/enums/like-type.ts';
import { LikeButton } from '../../button/LikeButton/LikeButton';

export const CommentCard = memo(({ comment, userId, deleteReviewComment, reviewId }: ICommentCardProps) => {
    const [isLiked, setIsLiked] = useState(comment.liked_by_me);
    const [likesCount, setLikesCount] = useState(comment.likes_count);

    const like = useCallback(async () => {
        try {
            if (isLiked) {
                await ApiService.dislike(comment.uuid, LIKE_TYPE.REVIEW_COMMENT);
                setIsLiked(false);
                setLikesCount((prev) => prev - 1);
                return;
            }
            if (!isLiked) {
                await ApiService.like(comment.uuid, LIKE_TYPE.REVIEW_COMMENT);
                setIsLiked(true);
                setLikesCount((prev) => prev + 1);
                return;
            }
        } catch {
            return;
        }
    }, [isLiked, comment.uuid]);

    const deleteReviewCommentFn = async () => {
        try {
            await ApiService.deleteReviewComment(reviewId, comment.uuid);
            deleteReviewComment(comment.uuid);
        } catch {
            return;
        }
    };

    return (
        <div className={styles.comment_cart}>
            <div className={styles.comment_cart__header}>
                <Avatar src={comment.image} style={{ backgroundColor: '#46a358', verticalAlign: 'middle' }} size="large">
                    {comment.image ? '' : comment.name.charAt(0).toUpperCase()}
                </Avatar>
                <span className={styles.name}>{comment.name}</span>
                <LikeButton onClick={like} isLiked={isLiked} likesCount={likesCount}></LikeButton>
                {userId === comment.user_id && (
                    <button onClick={deleteReviewCommentFn} className={styles.delete_button}>
                        <img src="/icons/basket-icon.svg" alt="Иконка корзины" />
                    </button>
                )}
            </div>
            <div className={styles.content}>{comment.content}</div>
        </div>
    );  
});
