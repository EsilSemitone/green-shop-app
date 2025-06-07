import { Form } from 'react-router';
import { IReviewFormProps } from './ReviewForm.props';
import { Input } from '../../common/Input/Input';
import { Rate } from 'antd';
import styles from './ReviewForm.module.css';
import { Button } from '../../common/Button/Button';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReviewFormSchema } from './common/review-form-schema';
import { ApiService } from '../../../common/helpers/api.service';
import { IReviewForm } from './interfaces/review-form.interface';
import { AxiosError } from 'axios';
import { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';

export function ReviewForm({ addReview, product_id, product_variant_id }: IReviewFormProps) {
    const userName = useSelector((s: RootState) => s.user.profile?.name);
    const userImage = useSelector((s: RootState) => s.user.profile?.photo_image);

    const [rate, setRate] = useState<number>(0);
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IReviewForm>({
        defaultValues: {},
        resolver: zodResolver(ReviewFormSchema),
    });

    const submit: SubmitHandler<IReviewForm> = async (data) => {
        if (rate === 0) {
            setError('Необходимо оценить продук от 0 до 5');
            return;
        }
        try {
            const res = await ApiService.createReview({
                product_id,
                product_variant_id,
                rating: rate,
                title: data.title,
                description: data.description,
            });

            addReview({ ...res, name: userName || 'user', comments: [], image: userImage || null, liked_by_me: false });
            setRate(0);
            reset();
        } catch (e) {
            if (e instanceof AxiosError) {
                setError(e.response?.data.error);
            }
        }
    };

    return (
        <Form className={styles.form} onSubmit={handleSubmit(submit)}>
            <div className={styles.title}>Ваш отзыв</div>
            {Object.entries(errors).map(([key, b]) => (
                <div key={`${b.type}${key}`} className={styles.error}>
                    {b.message}
                </div>
            ))}
            {error && (
                <div key={`error`} className={styles.error}>
                    {error}
                </div>
            )}
            <Rate
                value={rate}
                onChange={(val) => {
                    setRate(val);
                }}
            />
            <Input {...register('title')} type="text" placeholder="Ваше общее впечатление"></Input>
            <Input {...register('description')} className={styles.review_description} type="text" placeholder="Ваш отзыв"></Input>
            <Button>Сохранить</Button>
        </Form>
    );
}
