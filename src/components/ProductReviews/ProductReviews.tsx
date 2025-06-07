import { useSelector } from 'react-redux';
import styles from './ProductReviews.module.css';
import { IProductReviewsProps } from './ProductReviews.props';
import { RootState } from '../../store/store';
import { useReviews } from '../../common/hooks/use-comments';
import { REVIEW_PAGE_LIMIT } from '../../common/constants/review-page-limit.ts';
import { ORDER_BY_REVIEWS, ORDER_BY_REVIEWS_ENUM } from 'contracts/enums/order-by-my-reviews.ts';
import { useCallback } from 'react';
import { ReviewForm } from '../form/ReviewForm/ReviewForm.tsx';
import { Select } from 'antd';
import { ReviewCart } from '../cards/ReviewCard/ReviewCard.tsx';
import cn from 'classnames';

export function ProductReviews({ productId, variantId }: IProductReviewsProps) {
    const isAuthorized = useSelector((s: RootState) => s.user.jwt);
    const userId = useSelector((s: RootState) => s.user.profile?.uuid);
    console.log('ProductReviews userId ' + userId);

    const { reviews, setQueryParams, page, totalPage, addReview, deleteReview, addReviewComment, deleteReviewComment } =
        useReviews(productId!, {
            limit: REVIEW_PAGE_LIMIT,
            offset: 0,
            orderBy: ORDER_BY_REVIEWS_ENUM.FIRST_NEW,
        });

    const reviewPaginate = useCallback(() => {
        setQueryParams((prev) => {
            return { ...prev, limit: prev.limit + REVIEW_PAGE_LIMIT };
        });
    }, []);

    const onChangeReviewSelect = (value: ORDER_BY_REVIEWS) => {
        setQueryParams((prev) => {
            return { ...prev, orderBy: value };
        });
    };

    return (
        <div className={styles.review_container}>
            {isAuthorized && (
                <ReviewForm addReview={addReview} product_id={productId || ''} product_variant_id={variantId || ''}></ReviewForm>
            )}
            <div>
                <div className={styles.reviews_title}>Отзывы</div>
                <Select
                    className={cn(styles.review_select, 'select')}
                    defaultValue={ORDER_BY_REVIEWS_ENUM.FIRST_NEW}
                    style={{ width: 120 }}
                    onChange={onChangeReviewSelect}
                    options={[
                        { value: ORDER_BY_REVIEWS_ENUM.FIRST_NEW, label: 'Сначала новые' },
                        { value: ORDER_BY_REVIEWS_ENUM.FIRST_OLD, label: 'Сначала старые' },
                        { value: ORDER_BY_REVIEWS_ENUM.FIRST_POPULAR, label: 'Сначала популярные' },
                    ]}
                />
            </div>
            <div>
                {reviews.length === 0 && <p>Пока нет отзывов.</p>}
                {reviews.length > 0 && (
                    <div>
                        {reviews.map((r) => (
                            <ReviewCart
                                key={r.uuid}
                                userId={userId}
                                review={r}
                                deleteReview={deleteReview}
                                addReviewComment={addReviewComment}
                                deleteReviewComment={deleteReviewComment}
                            ></ReviewCart>
                        ))}
                    </div>
                )}
            </div>
            {page < totalPage && (
                <button onClick={reviewPaginate} className={styles.review_button}>
                    Загрузить еще
                </button>
            )}
        </div>
    );
}
