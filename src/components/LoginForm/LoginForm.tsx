import { ILoginFormProps } from './LoginForm-props';
import styles from './LoginForm.module.css';
import cn from 'classnames';
import { Button } from '../Button/Button';
import { FormEvent, useState } from 'react';
import { Input } from '../Input/Input';

export function LoginForm({ className, setForm, ...props }: ILoginFormProps) {
    const [isHidePassword, setIsHidePassword] = useState(true);

    const togglePasswordInput = () => {
        setIsHidePassword((isHide) => !isHide);
    };

    const submit = async (e: FormEvent) => {
        console.log(e);
    };

    return (
        <div className={styles['login-form--container']}>
            <div className={styles['title']}>Enter your username and password to login.</div>
            <form {...props} className={cn(styles['login-form'], className)} onSubmit={submit}>
                <Input className={cn(styles['login-form--input'])} type="email" id="email" placeholder="Enter your email address"></Input>
                <div className={styles['password-input--container']}>
                    <Input
                        className={cn(styles['login-form--input'])}
                        type="password"
                        id="password"
                        placeholder="Password"
                    ></Input>
                    <label className={styles['eye']} htmlFor="password">
                        <img
                            onClick={() => {
                                togglePasswordInput();
                            }}
                            src={isHidePassword ? '/icons/close-eye-icon.svg' : '/icons/open-eye-icon.svg'}
                            alt="Иконка глаза"
                        />
                    </label>
                </div>
                <div
                    onClick={() => {
                        if (setForm) {
                            setForm('forgot-password');
                        }
                    }}
                    className={styles['forgot-password']}
                >
                    Forgot Password?
                </div>
                <Button className={styles['submit-button']}>Login</Button>
            </form>
        </div>
    );
}
