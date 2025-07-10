import { Form } from 'react-router';
import { IReviewCommentFormProps } from './ReviewCommentForm.props';
import { Input } from '../../common/Input/Input';
import styles from './ReviewCommentForm.module.css';
import { Button } from '../../common/Button/Button';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReviewCommentFormSchema } from './common/review-form-schema';
import { ApiService } from '../../../common/helpers/api.service';
import { IReviewCommentForm } from './interfaces/review-form.interface';
import { AxiosError } from 'axios';
import { RootState } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'antd';
import { appActions } from '../../../store/app-slice/app.slice';
import { MESSAGE_TYPE } from '../../../store/app-slice/enums/message-type';

export function ReviewCommentForm({ addReviewComment, review_id, authorReviewName }: IReviewCommentFormProps) {
    const dispatch = useDispatch();
    const userName = useSelector((s: RootState) => s.user.profile?.name);
    const userImage = useSelector((s: RootState) => s.user.profile?.photo_image);

    const [error, setError] = useState<string | null | undefined>(null);

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

    useEffect(() => {
        if (error) {
            dispatch(appActions.setMessage({ type: MESSAGE_TYPE.ERROR, content: error }));
            setError(null);
        }
    }, [error]);

    return (
        <Form className={styles.form} onSubmit={handleSubmit(submit)}>
            {errors?.content && <Alert showIcon message={errors.content?.message} type="error" />}
            <Input
                {...register('content')}
                className={styles.input}
                defaultValue={`${authorReviewName},`}
                type="text"
                placeholder="Ответить..."
                autoFocus={true}
            ></Input>
            <Button>Ответить</Button>
        </Form>
    );
}
