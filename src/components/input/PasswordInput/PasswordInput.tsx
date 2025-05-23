import { Input } from '../../common/Input/Input';
import { IPasswordInputProps } from './PasswordInput-props';
import styles from './PasswordInput.module.css';
import cn from 'classnames';
import { useState } from 'react';

export function PasswordInput({ register, registerName, id, placeholder, ...props }: IPasswordInputProps) {
    const [isHidePassword, setIsHidePassword] = useState(true);

    const togglePasswordInput = () => {
        setIsHidePassword((isHide) => !isHide);
    };
    return (
        <div {...props} className={styles['password-input--container']}>
            <Input
                {...(() => {
                    if (register && registerName) {
                        return register(registerName);
                    }
                    return [];
                })()}
                className={cn(styles['input'])}
                type={isHidePassword ? 'password' : 'text'}
                id={id}
                placeholder={placeholder}
            ></Input>
            <label className={styles['eye']} htmlFor={id}>
                <img
                    onClick={() => {
                        togglePasswordInput();
                    }}
                    src={isHidePassword ? '/icons/close-eye-icon.svg' : '/icons/open-eye-icon.svg'}
                    alt="Иконка глаза"
                />
            </label>
        </div>
    );
}
