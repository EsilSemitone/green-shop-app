import { IModalProps } from './AuthModal-props';
import styles from './AuthModal.module.css';
import { Modal } from '../Modal/Modal';
import cn from 'classnames';
import { LoginForm } from '../LoginForm/LoginForm';
import { useState } from 'react';
import { RegisterForm } from '../RegisterForm/RegisterForm';
import { ForgotPasswordForm } from '../ForgotPasswordForm/ForgotPasswordForm';

export type Form = 'login' | 'register' | 'forgot-password';

export function AuthModal({ className, isOpen, onClose, ...props }: IModalProps) {
    const [form, setForm] = useState<Form>('login');

    return (
        <Modal {...props} className={cn(styles['auth-modal'], className)} isOpen={isOpen} onClose={onClose}>
            <div className={styles['auth-container']}>
                <div className={styles['auth-header']}>
                    <button
                        onClick={() => {
                            setForm('login');
                        }}
                        className={cn(styles['toggle-form--button'], { [styles['active-button']]: form === 'login' })}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => {
                            setForm('register');
                        }}
                        className={cn(styles['toggle-form--button'], { [styles['active-button']]: form === 'register' })}
                    >
                        Register
                    </button>
                </div>
                {form != 'forgot-password' && (
                    <>
                        {form === 'login' && <LoginForm setForm={setForm}></LoginForm>}
                        {form === 'register' && <RegisterForm></RegisterForm>}
                    </>
                )}
                {form === 'forgot-password' && <ForgotPasswordForm></ForgotPasswordForm>}
            </div>
        </Modal>
    );
}
