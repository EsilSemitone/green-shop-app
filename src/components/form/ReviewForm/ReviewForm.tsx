import { Form } from 'react-router';
import { IReviewFormProps } from './ReviewForm.props';
import { Input } from '../../common/Input/Input';
import { Alert, Rate } from 'antd';
import styles from './ReviewForm.module.css';
import { Button } from '../../common/Button/Button';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReviewFormSchema } from './common/review-form-schema';
import { ApiService } from '../../../common/helpers/api.service';
import { IReviewForm } from './interfaces/review-form.interface';
import { AxiosError } from 'axios';
import { RootState } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { appActions } from '../../../store/app-slice/app.slice';
import { MESSAGE_TYPE } from '../../../store/app-slice/enums/message-type';

export function ReviewForm({ addReview, product_id, product_variant_id }: IReviewFormProps) {
    const dispatch = useDispatch();
    const userName = useSelector((s: RootState) => s.user.profile?.name);
    const userImage = useSelector((s: RootState) => s.user.profile?.photo_image);

    const [rate, setRate] = useState<number>(0);
    const [error, setError] = useState<string | null | undefined>(null);

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

    useEffect(() => {
        if (error) {
            dispatch(appActions.setMessage({ type: MESSAGE_TYPE.ERROR, content: error }));
            setError(null);
        }
    }, [error]);

    return (
        <Form className={styles.form} onSubmit={handleSubmit(submit)}>
            <div className={styles.title}>Ваш отзыв</div>
            <Rate
                value={rate}
                onChange={(val) => {
                    setRate(val);
                }}
            />
            {errors?.title && <Alert showIcon message={errors.title?.message} type="error" />}
            <Input {...register('title')} type="text" placeholder="Ваше общее впечатление"></Input>
            {errors?.description && <Alert showIcon message={errors.description?.message} type="error" />}
            <Input {...register('description')} className={styles.review_description} type="text" placeholder="Ваш отзыв"></Input>
            <Button>Сохранить</Button>
        </Form>
    );
}
