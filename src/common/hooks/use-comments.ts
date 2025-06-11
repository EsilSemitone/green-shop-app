import { useEffect, useState } from 'react';
import { ApiService } from '../helpers/api.service';
import { ExtendedReviewComment, ORDER_BY_REVIEWS } from 'contracts-green-shop';
import { ExtendedReview } from 'contracts-green-shop/review/extended-review.schema';

type UseReviewsQuery = {
    limit: number;
    offset: number;
    orderBy: ORDER_BY_REVIEWS;
    variantId?: string;
};

const normalizeQueryParams = (query: UseReviewsQuery): Record<string, string> => {
    const res: Record<string, string> = {};

    for (const [key, value] of Object.entries(query)) {
        res[key] = String(value);
    }

    return res;
};

export const useReviews = (product_id: string, query: UseReviewsQuery) => {
    const [reviews, setReviews] = useState<ExtendedReview[]>([]);
    const [queryParams, setQueryParams] = useState<Record<string, string>>(normalizeQueryParams(query));
    const [page, setPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(1);

    useEffect(() => {
        const provideProductReviews = async (product_id: string) => {
            const { reviews, page, totalPage } = await ApiService.getProductReviews(product_id, queryParams);
            setReviews(reviews);
            setPage(page);
            setTotalPage(totalPage);
        };

        provideProductReviews(product_id);
    }, [queryParams, product_id]);

    const addReview = (review: ExtendedReview) => {
        setReviews((prev) => {
            return [review, ...prev];
        });
    };

    const deleteReview = (uuid: string) => {
        setReviews((prev) => {
            return prev.filter((r) => r.uuid !== uuid);
        });
    };

    const addReviewComment = (reviewId: string, comment: ExtendedReviewComment) => {
        setReviews((prev) => {
            return prev.map((r) => {
                if (r.uuid === reviewId) {
                    return { ...r, comments: [comment, ...r.comments] };
                } else {
                    return r;
                }
            });
        });
    };

    const deleteReviewComment = (commentId: string) => {
        setReviews((prev) => {
            return prev.map((r) => {
                return { ...r, comments: r.comments.filter((c) => c.uuid !== commentId) };
            });
        });
    };

    return {
        reviews,
        setQueryParams,
        page,
        totalPage,
        addReview,
        deleteReview,
        addReviewComment,
        deleteReviewComment,
    };
};
