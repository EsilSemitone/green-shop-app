import { memo, useEffect, useState } from 'react';
import { Button } from '../../common/Button/Button';
import { Modal } from '../../common/Modal/Modal';
import { OrderComponent } from '../../OrderComponent/OrderComponent';
import { IModalProps } from './OrderModal-props';
import styles from './OrderModal.module.css';
import { getTotal } from './helpers/get-total';
import { getCurrentOrderItems } from './helpers/getCurrentOrderItems';
import { IExtendedOrderItem } from '../../../common/interfaces/extended-order-item.interface';

export const OrderModal = memo(({ isOpen, onClose, order, ...props }: IModalProps) => {
    const [items, setItems] = useState<IExtendedOrderItem[] | null>(null);

    useEffect(() => {
        if (!order) {
            return;
        }
        const provideImageForOrderItems = async () => {
            const currentItems = await getCurrentOrderItems(order.items);
            setItems(currentItems);
        };
        provideImageForOrderItems();
    }, [order]);

    if (!order) {
        return null;
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={styles.order_header}>
                <div className={styles.order_header__top}>
                    <img src="/icons/create-order-icon.svg" alt="Изображение с благодарностью за заказ" />
                    Ваш заказ оформлен.
                </div>
                <div className={styles.order_header_details}>
                    <div className={styles.order_header_details__item}>
                        <div className={styles.item__title}>ID Заказа</div>
                        <div className={styles.item__value}>{order.uuid}</div>
                    </div>
                    <div className={styles.order_header_details__item}>
                        <div className={styles.item__title}>Дата</div>
                        <div className={styles.item__value}>{new Date(order.created_at).toLocaleDateString()}</div>
                    </div>
                    <div className={styles.order_header_details__item}>
                        <div className={styles.item__title}>Всего</div>
                        <div className={styles.item__value}>{`${getTotal(order.items, order.shipping_price)}₽`}</div>
                    </div>
                    <div className={styles.order_header_details__item}>
                        <div className={styles.item__title}>Метод оплаты</div>
                        <div className={styles.item__value}>{order.payment_method}</div>
                    </div>
                </div>
                {items && (
                    <div className={styles.order_container}>
                        <OrderComponent products={items}></OrderComponent>
                    </div>
                )}
            </div>
            <div className={styles.total_container}>
                <div className={styles.total_container__inner}>
                    <div className={styles.total_item}>
                        <div className={styles.total_item__left}>Доставка</div>
                        <div className={styles.total_item__right}>{`${order.shipping_price}₽`}</div>
                    </div>
                    <div className={styles.total_result_item}>
                        <div className={styles.total_result_left_item}>Всего</div>
                        <div className={styles.total_result_right_item}>{`${getTotal(order.items, order.shipping_price)}₽`}</div>
                    </div>
                </div>
            </div>
            <div className={styles.exit_button}>
                <Button onClick={onClose}>Выход</Button>
            </div>
        </Modal>
    );
});
