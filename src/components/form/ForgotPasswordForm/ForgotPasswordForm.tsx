import { IForgotPasswordFormProps } from './ForgotPasswordForm-props';
import styles from './ForgotPasswordForm.module.css';
import cn from 'classnames';
import { Button } from '../../common/Button/Button';
import { FormEvent, useState } from 'react';
import { Input } from '../../common/Input/Input';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { restorePassword } from '../../../store/user-slice/async-actions/restore-password';

export function ForgotPasswordForm({ className, ...props }: IForgotPasswordFormProps) {
    const [email, setEmail] = useState<string>();
    const dispatch = useDispatch<AppDispatch>();
    const submit = async (e: FormEvent) => {
        e.preventDefault();
        const email = e.target.email.value;
        setEmail(email);
        dispatch(restorePassword({ email }));
    };

    return (
        <div className={styles['login-form--container']}>
            {email && <div className={styles['title']}>{`Письмо отправлено на почту ${email}`}</div>}
            {!email && (
                <>
                    <div className={styles['title']}>Введите почту для сброса пароля.</div>
                    <form {...props} className={cn(styles['login-form'], className)} onSubmit={submit}>
                        <Input
                            className={cn(styles['login-form--input'])}
                            type="email"
                            id="email"
                            placeholder="Enter your email address"
                        ></Input>
                        <Button className={styles['submit-button']}>Отправить</Button>
                    </form>
                </>
            )}
        </div>
    );
}
