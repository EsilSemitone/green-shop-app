import { useParams } from 'react-router';
import styles from './Order.module.css';
import { useOrderDetails } from '../../common/hooks/use-order-details';
import { OrderComponent } from '../../components/OrderComponent/OrderComponent';
import { getTotal } from './helpers/get-total';

export default function Order() {
    const { uuid } = useParams();
    const { orderDetails } = useOrderDetails(uuid);

    return (
        <>
            {!orderDetails && <div>Продукт не найден</div>}
            {orderDetails && (
                <div className={styles.order}>
                    <div className={styles.order_details}>
                        <h1>Детали заказа</h1>
                        <div className={styles.details_container}>
                            <div className={styles.order_header_details__item}>
                                <div className={styles.item__title}>ID Заказа</div>
                                <div className={styles.item__value}>{orderDetails.uuid}</div>
                            </div>
                            <div className={styles.order_header_details__item}>
                                <div className={styles.item__title}>Дата</div>
                                <div className={styles.item__value}>{new Date(orderDetails.created_at).toLocaleDateString()}</div>
                            </div>
                            <div className={styles.order_header_details__item}>
                                <div className={styles.item__title}>Всего</div>
                                <div className={styles.item__value}>{`${getTotal(
                                    orderDetails.items,
                                    orderDetails.shipping_price,
                                )}₽`}</div>
                            </div>
                            <div className={styles.order_header_details__item}>
                                <div className={styles.item__title}>Метод оплаты</div>
                                <div className={styles.item__value}>{orderDetails.payment_method}</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.order_items}>
                        <OrderComponent className={styles.order_list} products={orderDetails.items}></OrderComponent>
                    </div>
                </div>
            )}
        </>
    );
}
