import { ILoginFormProps } from './LoginForm-props';
import styles from './LoginForm.module.css';
import cn from 'classnames';
import { Button } from '../../common/Button/Button';
import { Input } from '../../common/Input/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginSchemaRequest, LoginSchemaRequestDto } from 'contracts-green-shop/auth/login.schema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { loginUser } from '../../../store/user-slice/async-actions/login';
import { syncCart } from '../../../store/cart-slice/async-actions/sync-cart';
import { LOCALSTORAGE_KEYS } from '../../../store/localstorage/localstorage-keys';
import { removeItem } from '../../../store/localstorage/localstorage';
import { PasswordInput } from '../../input/PasswordInput/PasswordInput';
import { getAllFavorites } from '../../../store/favorites/async-actions/get-all-favorites';
import { getProfile } from '../../../store/user-slice/async-actions/get-profile';
import { Alert } from 'antd';
import { useEffect } from 'react';
import { appActions } from '../../../store/app-slice/app.slice';
import { MESSAGE_TYPE } from '../../../store/app-slice/enums/message-type';

export function LoginForm({ className, setForm, onClose, ...props }: ILoginFormProps) {
    const errorMessage = useSelector((s: RootState) => s.user.errorMessage);
    const dispatch = useDispatch<AppDispatch>();
    const cartItems = useSelector((s: RootState) => s.cart.items);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<LoginSchemaRequestDto>({
        defaultValues: {},
        resolver: zodResolver(LoginSchemaRequest),
    });
    const submit: SubmitHandler<LoginSchemaRequestDto> = async (data) => {
        const resultAction = await dispatch(loginUser(data));

        if (loginUser.fulfilled.match(resultAction)) {
            dispatch(syncCart(cartItems));
            dispatch(getProfile());
            dispatch(getAllFavorites());
            removeItem(LOCALSTORAGE_KEYS.GUEST_CART);
            if (onClose) {
                onClose();
            }
            reset();
        }
    };

    const forgotPasswordHandler = () => {
        if (setForm) {
            setForm('forgot-password');
        }
    };

    useEffect(() => {
        if (errorMessage) {
            dispatch(appActions.setMessage({ type: MESSAGE_TYPE.ERROR, content: errorMessage }));
        }
    }, [errorMessage]);

    return (
        <div className={styles.login_form__container}>
            <div className={styles.title}>Введите вашу почту и пароль.</div>
            <form {...props} className={cn(styles.login_form, className)} onSubmit={handleSubmit(submit)}>
                {errors.email && <Alert showIcon message={errors.email.message} type="error" />}
                <Input
                    {...register('email')}
                    className={cn(styles.login_form__input)}
                    type="email"
                    id="email"
                    placeholder="Введите вашу почту"
                ></Input>
                {errors.password && <Alert showIcon message={errors.password.message} type="error" />}
                <PasswordInput
                    register={register}
                    registerName={'password'}
                    id={'password'}
                    placeholder={'Пароль'}
                ></PasswordInput>
                <div onClick={forgotPasswordHandler} className={styles.forgot_password}>
                    Забыли пароль?
                </div>
                <Button className={styles.submit_button}>Войти</Button>
            </form>
        </div>
    );
}
