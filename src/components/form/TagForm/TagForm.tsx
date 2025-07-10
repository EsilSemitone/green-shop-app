import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './TagForm.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateTagRequestDto, CreateTagRequestSchema } from 'contracts-green-shop';
import { Input } from '../../common/Input/Input';
import { Alert } from 'antd';
import { Button } from '../../common/Button/Button';
import { memo } from 'react';
import { ITagFormProps } from './TagForm.props';
import { ApiService } from '../../../common/helpers/api.service';
import { useDispatch } from 'react-redux';
import { appActions } from '../../../store/app-slice/app.slice';
import { MESSAGE_TYPE } from '../../../store/app-slice/enums/message-type';
import { AxiosError } from 'axios';

export const TagForm = memo(({ onCreate }: ITagFormProps) => {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(CreateTagRequestSchema),
    });

    const submit: SubmitHandler<CreateTagRequestDto> = async (result) => {
        if (result.name === '') {
            dispatch(
                appActions.setMessage({ type: MESSAGE_TYPE.ERROR, content: 'Название долюно содержать хотя бы один символ' }),
            );
            return;
        }

        try {
            const newTag = await ApiService.createTag(result);
            if (onCreate) {
                onCreate(newTag);
            }
            dispatch(appActions.setMessage({ type: MESSAGE_TYPE.SUCCESS, content: 'Тег успешно создан' }));
            reset();
        } catch (e) {
            if (e instanceof AxiosError) {
                dispatch(appActions.setMessage({ type: MESSAGE_TYPE.ERROR, content: e.response?.data?.error ?? e.message }));
            }
        }
    };

    return (
        <div className={styles.tag_form__container}>
            <form className={styles.tag_form} onSubmit={handleSubmit(submit)}>
                <label htmlFor="name">Название</label>
                {errors?.name && <Alert showIcon message={errors.name.message} type="error" />}
                <Input {...register('name')} placeholder="Название"></Input>
                <Button>Создать</Button>
            </form>
        </div>
    );
});
