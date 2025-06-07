import { memo, useCallback, useState } from 'react';
import { IReviewCardProps } from './ReviewCard.props';
import styles from './ReviewCard.module.css';
import { Avatar } from 'antd';
import { Rating } from '../../Rating/Rating';
import { CommentCard } from '../CommentCard/CommentCard';
import { ApiService } from '../../../common/helpers/api.service';
import { ReviewCommentForm } from '../../form/ReviewCommentForm/ReviewCommentForm';
import { LikeButton } from '../../button/LikeButton/LikeButton';
import { LIKE_TYPE } from 'contracts/enums/like-type.ts';

export const ReviewCart = memo(({ review, userId, deleteReview, addReviewComment, deleteReviewComment }: IReviewCardProps) => {
    const [isLiked, setIsLiked] = useState(review.liked_by_me);
    const [likesCount, setLikesCount] = useState(review.likes_count);
    const [isOpenCommentForm, setIsOpenCommentForm] = useState<boolean>(false);
    console.log(userId, review.user_id);
    const deleteReviewFn = async () => {
        try {
            await ApiService.deleteReview(review.uuid);
            deleteReview(review.uuid);
        } catch {
            return;
        }
    };

    const like = useCallback(async () => {
        if (!userId) {
            return;
        }
        try {
            if (isLiked) {
                await ApiService.dislike(review.uuid, LIKE_TYPE.REVIEW);
                setIsLiked(false);
                setLikesCount((prev) => prev - 1);
                return;
            }
            if (!isLiked) {
                await ApiService.like(review.uuid, LIKE_TYPE.REVIEW);
                setIsLiked(true);
                setLikesCount((prev) => prev + 1);
                return;
            }
        } catch {
            return;
        }
    }, [isLiked, review.uuid]);

    return (
        <div className={styles.review_cart}>
            <div className={styles.review_cart__header}>
                <Avatar src={review.image} style={{ backgroundColor: '#46a358', verticalAlign: 'middle' }} size="large">
                    {review.image ? '' : review.name.charAt(0).toUpperCase()}
                </Avatar>
                <span className={styles.name}>{review.name}</span>
                {review.verified && <span className={styles.verified}>Реальный покупатель</span>}
                {!review.verified && <span className={styles.not_verified}>Не проверенный пользователь</span>}
                <Rating rating={review.rating}></Rating>

                {userId === review.user_id && (
                    <button onClick={deleteReviewFn} className={styles.delete_button}>
                        <img src="/icons/basket-icon.svg" alt="Иконка корзины" />
                    </button>
                )}
            </div>
            <div className={styles.review_cart__body}>
                <div className={styles.review_cart__title}>{review.title}</div>
                <div className={styles.review_cart__description}>{review.description}</div>
                <LikeButton onClick={like} isLiked={isLiked} likesCount={likesCount}></LikeButton>
                <div className={styles.comments_block}>
                    <p>Ответы:</p>
                    {!isOpenCommentForm && (
                        <button
                            onClick={() => {
                                setIsOpenCommentForm(true);
                            }}
                            className={styles.button}
                        >
                            Ответить
                        </button>
                    )}
                    {isOpenCommentForm && (
                        <ReviewCommentForm
                            addReviewComment={addReviewComment}
                            review_id={review.uuid}
                            authorReviewName={review.name}
                        ></ReviewCommentForm>
                    )}

                    <div className={styles.comments}>
                        {review.comments.map((c) => (
                            <CommentCard
                                key={c.uuid}
                                userId={userId}
                                reviewId={review.uuid}
                                comment={c}
                                deleteReviewComment={deleteReviewComment}
                            ></CommentCard>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
});
