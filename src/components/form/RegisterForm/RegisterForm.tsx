import { IRegisterFormProps } from './RegisterForm-props';
import styles from './RegisterForm.module.css';
import cn from 'classnames';
import { Button } from '../../common/Button/Button';
import { Input } from '../../common/Input/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IRegisterForm } from './interfaces/register-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema } from './common/register.schema';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { registerUser } from '../../../store/user-slice/async-actions/register';
import { syncCart } from '../../../store/cart-slice/async-actions/sync-cart';
import { removeItem } from '../../../store/localstorage/localstorage';
import { LOCALSTORAGE_KEYS } from '../../../store/localstorage/localstorage-keys';
import { PasswordInput } from '../../input/PasswordInput/PasswordInput';
import { getAllFavorites } from '../../../store/favorites/async-actions/get-all-favorites';
import { getProfile } from '../../../store/user-slice/async-actions/get-profile';
import { Alert } from 'antd';
import { useEffect } from 'react';
import { appActions } from '../../../store/app-slice/app.slice';
import { MESSAGE_TYPE } from '../../../store/app-slice/enums/message-type';
import { userActions } from '../../../store/user-slice/user.slice';

export function RegisterForm({ className, onClose, ...props }: IRegisterFormProps) {
    const dispatch = useDispatch<AppDispatch>();
    const errorMessage = useSelector((s: RootState) => s.user.errorMessage);
    const cartItems = useSelector((s: RootState) => s.cart.items);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IRegisterForm>({
        defaultValues: {},
        resolver: zodResolver(RegisterSchema),
    });

    const submit: SubmitHandler<IRegisterForm> = async (data) => {
        const action = await dispatch(registerUser(data));
        if (registerUser.fulfilled.match(action)) {
            dispatch(syncCart(cartItems));
            removeItem(LOCALSTORAGE_KEYS.GUEST_CART);
            dispatch(getProfile());
            dispatch(getAllFavorites());
            if (onClose) {
                onClose();
            }
        }
        reset();
    };

    useEffect(() => {
        if (errorMessage) {
            dispatch(appActions.setMessage({ type: MESSAGE_TYPE.ERROR, content: errorMessage }));
            dispatch(userActions.clearError());
        }
    }, [errorMessage]);

    return (
        <div className={styles.login_form__container}>
            <div className={styles.title}>Введите свой адрес электронной почты и пароль для регистрации.</div>
            <form {...props} className={cn(styles.login_form, className)} onSubmit={handleSubmit(submit)}>
                {errors.name && <Alert showIcon message={errors.name.message} type="error" />}
                <Input
                    {...register('name')}
                    className={cn(styles.login_form__input)}
                    type="text"
                    id="name"
                    placeholder="Ваше имя"
                ></Input>
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
                {errors.confirm_password && <Alert showIcon message={errors.confirm_password.message} type="error" />}
                <PasswordInput
                    register={register}
                    registerName={'confirm_password'}
                    id={'confirm_password'}
                    placeholder={'Повторите ваш пароль'}
                ></PasswordInput>
                <Button className={styles.submit_button}>Register</Button>
            </form>
        </div>
    );
}
