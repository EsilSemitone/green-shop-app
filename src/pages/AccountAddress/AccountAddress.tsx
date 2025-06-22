import styles from './AccountAddress.module.css';
import cn from 'classnames';
import { useEffect } from 'react';
import { AddressForm } from '../../components/form/AddressForm/AddressForm';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { getAllAddress } from '../../store/address-slice/async-actions/get-all-address';
import { AddressCart } from '../../components/cards/AddressCard/AddressCard';

export default function AccountAddress() {
    const { addresses } = useSelector((s: RootState) => s.address);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getAllAddress());
    }, [dispatch]);

    return (
        <div className={cn(styles.account_me__container)}>
            <AddressForm className={styles.container_item}></AddressForm>
            <div className={cn(styles.container_item, styles.addresses)}>
                <h2>Ваши адреса</h2>
                <div className={styles.addresses_container}>
                    {addresses.length > 0 &&
                        addresses.map((a) => {
                            return <AddressCart key={a.uuid} address={a}></AddressCart>;
                        })}
                    {addresses.length === 0 && <div>Вы пока не указали ни один адрес</div>}
                </div>
            </div>
        </div>
    );
}
