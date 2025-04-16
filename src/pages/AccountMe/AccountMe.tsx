import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import styles from './AccountMe.module.css';
import cn from 'classnames';
import { FormEvent, useState } from 'react';

export function AccountMe() {
    const [isHidePassword, setIsHidePassword] = useState(true);

    const submit = async (e: FormEvent) => {
        console.log(e);
    };

    const togglePasswordInput = () => {
        setIsHidePassword((isHide) => !isHide);
    };

    return (
        <div className={cn(styles['account-me--container'])}>
            <form className={cn(styles['account-form'])} onSubmit={submit}>
                <div className={styles['form-module']}>
                    <div className={styles['title']}>Photo</div>
                    <label className={styles['file-input--label']} htmlFor="file">
                        <img src="/photo.png" alt="Фото профиля" />
                    </label>
                    <input className={styles['file-input']} type="file" id="file" />
                </div>
                <div className={styles['form-module']}>
                    <div className={styles['title']}>Personal Information</div>
                    <div className={styles['form-item']}>
                        <label className={styles['form-item--title']} htmlFor="email">
                            Email address
                        </label>
                        <Input
                            className={cn(styles['login-form--input'])}
                            type="email"
                            id="email"
                            placeholder="Enter your email address"
                        ></Input>
                    </div>
                </div>
                <div className={styles['form-module']}>
                    <div className={styles['title']}>Password change</div>
                    <div className={styles['form-item']}>
                        <label className={styles['form-item--title']} htmlFor="old-password">
                            Current password
                        </label>
                        <Input
                            className={cn(styles['login-form--input'])}
                            type="password"
                            id="old-password"
                            placeholder="Password"
                        ></Input>
                    </div>
                    <div className={styles['form-item']}>
                        <label className={styles['form-item--title']} htmlFor="new-password">
                            New password
                        </label>
                        <Input
                            className={cn(styles['login-form--input'])}
                            type="password"
                            id="new-password"
                            placeholder="Password"
                        ></Input>
                    </div>
                    <div className={cn(styles['password-input--container'], styles['form-item'])}>
                        <label htmlFor="repeat-new-password">
                            Confirm new password
                            <img
                                className={styles['eye']}
                                onClick={() => {
                                    togglePasswordInput();
                                }}
                                src={isHidePassword ? '/icons/close-eye-icon.svg' : '/icons/open-eye-icon.svg'}
                                alt="Иконка глаза"
                            />
                        </label>
                        <Input
                            className={cn(styles['login-form--input'])}
                            type="password"
                            id="repeat-new-password"
                            placeholder="Password"
                        ></Input>
                    </div>
                </div>
                <Button className={styles['submit-button']}>Save Change</Button>
            </form>
        </div>
    );
}
