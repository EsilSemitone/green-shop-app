import { IForgotPasswordFormProps } from './ForgotPasswordForm-props';
import styles from './ForgotPasswordForm.module.css';
import cn from 'classnames';
import { Button } from '../Button/Button';
import { FormEvent } from 'react';
import { Input } from '../Input/Input';

export function ForgotPasswordForm({ className, ...props }: IForgotPasswordFormProps) {
    const submit = async (e: FormEvent) => {
        console.log(e);
    };

    return (
        <div className={styles['login-form--container']}>
            <div className={styles['title']}>Введите почту для сброса пароля.</div>
            <form {...props} className={cn(styles['login-form'], className)} onSubmit={submit}>
                <Input
                    className={cn(styles['login-form--input'])}
                    type="text"
                    id="email"
                    placeholder="Enter your email address"
                ></Input>
                <Button className={styles['submit-button']}>Отправить</Button>
            </form>
        </div>
    );
}
