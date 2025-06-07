import { Form } from 'react-router';
import { IReviewCommentFormProps } from './ReviewCommentForm.props';
import { Input } from '../../common/Input/Input';
import styles from './ReviewCommentForm.module.css';
import { Button } from '../../common/Button/Button';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReviewCommentFormSchema } from './common/review-form-schema';
import { ApiService } from '../../../common/helpers/api.service';
import { IReviewCommentForm } from './interfaces/review-form.interface';
import { AxiosError } from 'axios';
import { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';

export function ReviewCommentForm({ addReviewComment, review_id, authorReviewName }: IReviewCommentFormProps) {
    const userName = useSelector((s: RootState) => s.user.profile?.name);
    const userImage = useSelector((s: RootState) => s.user.profile?.photo_image);

    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IReviewCommentForm>({
        defaultValues: {},
        resolver: zodResolver(ReviewCommentFormSchema),
    });

    const submit: SubmitHandler<IReviewCommentForm> = async (data) => {
        try {
            const res = await ApiService.createReviewComment(review_id, data.content);

            addReviewComment(review_id, { ...res, name: userName || 'user', image: userImage || null, liked_by_me: false });
            reset();
        } catch (e) {
            if (e instanceof AxiosError) {
                setError(e.response?.data.error);
            }
        }
    };

    return (
        <Form className={styles.form} onSubmit={handleSubmit(submit)}>
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
            <Input
                {...register('content')}
                className={styles.input}
                defaultValue={`${authorReviewName},`}
                type="text"
                placeholder="Ответить..."
            ></Input>
            <Button>Ответить</Button>
        </Form>
    );
}
