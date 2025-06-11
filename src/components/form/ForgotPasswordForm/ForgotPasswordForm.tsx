import { IForgotPasswordFormProps } from './ForgotPasswordForm-props';
import styles from './ForgotPasswordForm.module.css';
import cn from 'classnames';
import { Button } from '../../common/Button/Button';
import { useState } from 'react';
import { Input } from '../../common/Input/Input';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { restorePassword } from '../../../store/user-slice/async-actions/restore-password';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IForgotPasswordForm } from './interfaces/forgot-password-form.interface';
import { zodResolver } from '@hookform/resolvers/zod';
import { ForgotPasswordSchema } from './constants/forgot-password.schema';

export function ForgotPasswordForm({ className, ...props }: IForgotPasswordFormProps) {
    const [email, setEmail] = useState<string>();
    const dispatch = useDispatch<AppDispatch>();

    const { register, handleSubmit } = useForm<IForgotPasswordForm>({
        defaultValues: {},
        resolver: zodResolver(ForgotPasswordSchema),
    });
    const submit: SubmitHandler<IForgotPasswordForm> = async (data) => {
        setEmail(data.email);
        dispatch(restorePassword(data));
    };

    return (
        <div className={styles.login_form__container}>
            {email && <div className={styles['title']}>{`Письмо отправлено на почту ${email}`}</div>}
            {!email && (
                <>
                    <div className={styles.title}>Введите почту для сброса пароля.</div>
                    <form {...props} className={cn(styles.login_form, className)} onSubmit={handleSubmit(submit)}>
                        <Input
                            {...register('email')}
                            className={cn(styles.login_form__input)}
                            type="email"
                            id="email"
                            placeholder="Enter your email address"
                        ></Input>
                        <Button className={styles.submit_button}>Отправить</Button>
                    </form>
                </>
            )}
        </div>
    );
}
