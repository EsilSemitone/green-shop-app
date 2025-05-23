import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '../../common/Button/Button';
import { Input } from '../../common/Input/Input';
import styles from './AddressForm.module.css';
import cn from 'classnames';
import { CreateAddressRequestDto, CreateAddressRequestSchema } from 'contracts/address/create-address.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { createAddress } from '../../../store/address-slice/async-actions/create-address';
import { IAddressFormProps } from './AddressForm.props';

export function AddressForm({ className }: IAddressFormProps) {
    const errorMessage = useSelector((s: RootState) => s.address.errorMessage);
    const dispatch = useDispatch<AppDispatch>();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CreateAddressRequestDto>({
        defaultValues: {},
        resolver: zodResolver(CreateAddressRequestSchema),
    });

    const submit: SubmitHandler<CreateAddressRequestDto> = async (data) => {
        const resultAction = await dispatch(createAddress(data));

        if (createAddress.fulfilled.match(resultAction)) {
            reset();
        }
    };

    return (
        <form className={cn(styles.account_form, className)} onSubmit={handleSubmit(submit)}>
            <div className={styles.form_module}>
                <h2>Адреса доставки</h2>
                <div>Здесь вы можете добавить адреса на которые мы доставим вам ваши заказы.</div>
                <div>
                    {Object.entries(errors).map(([key, b]) => (
                        <p key={`${b.type}${key}`} className={styles['error']}>
                            {b.message}
                        </p>
                    ))}
                    {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                </div>
                <div className={styles.form_item}>
                    <label className={styles.form_item__title} htmlFor="city">
                        Город
                    </label>
                    <Input
                        {...register('city')}
                        className={cn(styles.login_form__input)}
                        type="text"
                        id="city"
                        placeholder="Введите ваш город"
                    ></Input>
                </div>
                <div className={styles.form_item}>
                    <label className={styles.form_item__title} htmlFor="city">
                        Улица
                    </label>
                    <Input
                        {...register('street_address')}
                        className={cn(styles.login_form__input)}
                        type="text"
                        id="street"
                        placeholder="Введите вашу улицу"
                    ></Input>
                </div>
                <div className={styles.form_item}>
                    <label className={styles.form_item__title} htmlFor="phone-number">
                        Номер телефона
                    </label>
                    <Input
                        {...register('phone_number')}
                        className={cn(styles.login_form__input)}
                        type="text"
                        id="hone-number"
                        placeholder="Введите ваш номер телефона"
                    ></Input>
                </div>
            </div>
            <Button className={styles.submit_button}>Сохранить адрес</Button>
        </form>
    );
}
