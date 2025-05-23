import { IModalProps } from './AuthModal-props';
import styles from './AuthModal.module.css';
import cn from 'classnames';
import { useState } from 'react';
import { Form } from './types/form-type';
import { useDispatch } from 'react-redux';
import { userActions } from '../../../store/user-slice/user.slice';
import { AppDispatch } from '../../../store/store';
import { Modal } from '../../common/Modal/Modal';
import { ForgotPasswordForm } from '../../form/ForgotPasswordForm/ForgotPasswordForm';
import { LoginForm } from '../../form/LoginForm/LoginForm';
import { RegisterForm } from '../../form/RegisterForm/RegisterForm';

export function AuthModal({ className, isOpen, onClose, ...props }: IModalProps) {
    const [form, setForm] = useState<Form>('login');
    const dispatch = useDispatch<AppDispatch>();
    const setFormCustom = (arg: Form) => {
        dispatch(userActions.clearError());
        setForm(arg);
    };

    const setAuthForm = (form: Form) => {
        return () => {
            setFormCustom(form);
        };
    };

    return (
        <Modal {...props} className={cn(styles.auth_modal, className)} isOpen={isOpen} onClose={onClose}>
            <div className={styles.auth_container}>
                <div className={styles.auth_header}>
                    <button
                        onClick={setAuthForm('login')}
                        className={cn(styles.toggle_form__button, { [styles.active_button]: form === 'login' })}
                    >
                        Вход
                    </button>
                    <button
                        onClick={setAuthForm('register')}
                        className={cn(styles.toggle_form__button, { [styles.active_button]: form === 'register' })}
                    >
                        Регистрация
                    </button>
                </div>
                {form != 'forgot-password' && (
                    <>
                        {form === 'login' && <LoginForm onClose={onClose} setForm={setForm}></LoginForm>}
                        {form === 'register' && <RegisterForm onClose={onClose}></RegisterForm>}
                    </>
                )}
                {form === 'forgot-password' && <ForgotPasswordForm></ForgotPasswordForm>}
            </div>
        </Modal>
    );
}
