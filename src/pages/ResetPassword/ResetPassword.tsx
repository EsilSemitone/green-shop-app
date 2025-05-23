import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '../../components/common/Button/Button';
import styles from './ResetPassword.module.css';
import cn from 'classnames';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetPasswordForm, ResetPasswordSchema } from './helpers/reset-password.schema';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { useNavigate, useSearchParams } from 'react-router';
import { useState } from 'react';
import { resetPassword } from '../../store/user-slice/async-actions/reset-password';
import { PasswordInput } from '../../components/input/PasswordInput/PasswordInput';

export function ResetPassword() {
    const errorMessage = useSelector((s: RootState) => s.user.errorMessage);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [isSuccess, setIsSuccess] = useState(false);
    const [params] = useSearchParams();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ResetPasswordForm>({
        resolver: zodResolver(ResetPasswordSchema),
    });

    const submit: SubmitHandler<ResetPasswordForm> = async (data) => {
        const code = params.get('code');
        if (!code) {
            return;
        }
        const action = await dispatch(resetPassword({ password: data.password, restore_code: code }));

        if (resetPassword.fulfilled.match(action)) {
            if (!errorMessage) {
                setIsSuccess(true);
            }
        }

        reset();
    };

    return (
        <div className={cn(styles['reset-password--container'])}>
            {isSuccess && (
                <>
                    <h1 className={styles['title']}>Пароль успешно сброшен</h1>
                    <Button
                        onClick={() => {
                            navigate('/');
                        }}
                        className={styles['submit-button']}
                    >
                        На главную
                    </Button>
                </>
            )}
            {!isSuccess && (
                <>
                    <div>
                        {errors &&
                            Object.values(errors).map((error) => {
                                return <p className={styles['error']}>{error.message}</p>;
                            })}
                        {errorMessage && <p className={styles['error']}>{errorMessage}</p>}
                    </div>
                    <form className={cn(styles['reset-password-form'])} onSubmit={handleSubmit(submit)}>
                        <h1 className={styles['title']}>Введите новый пароль</h1>
                        <PasswordInput
                            register={register}
                            registerName={'password'}
                            id={'password'}
                            placeholder="New password"
                        ></PasswordInput>
                        <PasswordInput
                            register={register}
                            registerName={'confirm_password'}
                            id={'confirm_password'}
                            placeholder="Confirm password"
                        ></PasswordInput>
                        <Button className={styles['submit-button']}>Сохранить</Button>
                    </form>
                </>
            )}
        </div>
    );
}
