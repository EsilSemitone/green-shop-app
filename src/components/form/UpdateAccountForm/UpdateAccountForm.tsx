import styles from './UpdateAccountForm.module.css';
import { Input } from '../../common/Input/Input';
import cn from 'classnames';
import { PasswordInput } from '../../input/PasswordInput/PasswordInput';
import { Button } from '../../common/Button/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IUpdateAccountForm } from './interfaces/update-account-form.interface';
import { UpdateAccountSchema } from './helpers/update-account.schema';
import { IUpdateAccountFormProps } from './UpdateAccount.props';
import { AppDispatch } from '../../../store/store';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../store/user-slice/async-actions/update-user';
import { memo } from 'react';

export const UpdateAccountForm = memo(({ name, email, phone_number }: IUpdateAccountFormProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IUpdateAccountForm>({
        defaultValues: {},
        values: {
            name,
            email,
            phone_number,
            password: '',
        },
        resolver: zodResolver(UpdateAccountSchema),
    });

    const submit: SubmitHandler<IUpdateAccountForm> = async ({ name, email, phone_number, password }) => {
        dispatch(updateUser({ name, email, phone_number, password }));
    };

    return (
        <form className={styles.update_account_form} onSubmit={handleSubmit(submit)}>
            <div>
                {Object.entries(errors).map(([key, b]) => (
                    <p key={`${b.type}${key}`} className={styles.error}>
                        {b.message}
                    </p>
                ))}
                {/* {errorMessage && <p className={styles['error']}>{errorMessage}</p>} */}
            </div>
            <div className={styles.form_module}>
                <div className={styles.title}>Личная информация</div>
                <div className={styles.form_item}>
                    <label className={styles.form_item__title} htmlFor="name">
                        Имя
                    </label>
                    <Input
                        {...register('name')}
                        className={styles.login_form__input}
                        type="text"
                        id="name"
                        placeholder="Введите ваше имя"
                    ></Input>
                </div>
                <div className={styles.form_item}>
                    <label className={styles.form_item__title} htmlFor="email">
                        Почта
                    </label>
                    <Input
                        {...register('email')}
                        className={styles.login_form__input}
                        type="email"
                        id="email"
                        placeholder="Введите вашу почту"
                    ></Input>
                </div>
                <div className={styles.form_item}>
                    <label className={styles.form_item__title} htmlFor="phone_number">
                        Номер телефона
                    </label>
                    <Input
                        {...register('phone_number')}
                        className={styles.login_form__input}
                        type="text"
                        id="phone_number"
                        placeholder="Введите ваш номер"
                    ></Input>
                </div>
            </div>
            <div className={styles.form_module}>
                <div className={styles.title}>Смена пароля</div>

                <div className={cn(styles.password_input__container, styles.form_item)}>
                    <div>Новый пароль</div>
                    <PasswordInput
                        register={register}
                        registerName="password"
                        id="password"
                        placeholder={'Новый пароль'}
                    ></PasswordInput>
                </div>
                <div className={cn(styles.password_input__container, styles.form_item)}>
                    <div>Повторите пароль</div>
                    <PasswordInput
                        register={register}
                        registerName="confirm_password"
                        id="confirm_password"
                        placeholder={'Новый пароль'}
                    ></PasswordInput>
                </div>
            </div>
            <Button className={styles.submit_button}>Сохранить</Button>
        </form>
    );
});
