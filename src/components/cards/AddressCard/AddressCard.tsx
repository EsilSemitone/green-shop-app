import { useDispatch } from 'react-redux';
import styles from './AddressCard.module.css';
import { IAddressCartProps } from './AddressCardProps';
import { AppDispatch } from '../../../store/store';
import { deleteAddress } from '../../../store/address-slice/async-actions/delete-address';
import { memo } from 'react';

export const AddressCart = memo(({ address }: IAddressCartProps) => {
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className={styles.address_cart}>
            <div className={styles.address_cart_content}>
                <p>
                    <b>Адрес: </b>
                    {`${address.city}, ${address.street_address}`}
                </p>
                <p>
                    <b>Номер телефона: </b>
                    {`${address.phone_number || 'отсутствует'}`}
                </p>
            </div>
            <button
                onClick={() => {
                    dispatch(deleteAddress(address.uuid));
                }}
                className={styles.address_cart__delete_button}
            >
                <img src="/icons/basket-icon.svg" alt="иконка корзины" />
            </button>
        </div>
    );
});
