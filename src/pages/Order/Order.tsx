import { useParams } from 'react-router';
import styles from './Order.module.css';
import { useOrderDetails } from '../../common/hooks/use-order-details';
import { OrderComponent } from '../../components/OrderComponent/OrderComponent';
import { getTotal } from './helpers/get-total';
import { orderStatusMap } from '../../common/helpers/order/order-status.map';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { ORDER_STATUS, ROLES, UpdateOrderRequestDto } from 'contracts-green-shop';
import { EditFieldSelect } from '../../components/EditFieldSelect/EditFieldSelect';
import { ApiService } from '../../common/helpers/api.service';
import { appActions } from '../../store/app-slice/app.slice';
import { MESSAGE_TYPE } from '../../store/app-slice/enums/message-type';
import { AxiosError } from 'axios';
import { ORDER_STATUS_OPTIONS } from './constants/order-status-options';

export default function Order() {
    const { uuid } = useParams();
    const { orderDetails } = useOrderDetails(uuid);
    const dispatch = useDispatch();

    const isAdmin = useSelector((s: RootState) => s.user.profile?.role) === ROLES.ADMIN;

    const onSaveField = async (updateData: UpdateOrderRequestDto) => {
        if (!uuid) {
            return false;
        }

        try {
            await ApiService.updateOrder(uuid, updateData);
            dispatch(appActions.setMessage({ type: MESSAGE_TYPE.SUCCESS, content: 'Данные успешно сохранены' }));
            return true;
        } catch (e) {
            if (e instanceof AxiosError) {
                dispatch(appActions.setMessage({ type: MESSAGE_TYPE.ERROR, content: e.response?.data?.error || e.message }));
            }
            return false;
        }
    };

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
                            {isAdmin ? (
                                <div className={styles.order_header_details__item}>
                                    <div className={styles.item__title}>Статус</div>
                                    <EditFieldSelect
                                        value={orderStatusMap.get(orderDetails.status) ?? orderDetails.status}
                                        fieldName={'status'}
                                        options={ORDER_STATUS_OPTIONS}
                                        onSave={onSaveField}
                                        middleware={(arg: ORDER_STATUS) => orderStatusMap.get(arg)}
                                    ></EditFieldSelect>
                                </div>
                            ) : (
                                <div className={styles.order_header_details__item}>
                                    <div className={styles.item__title}>Статус</div>
                                    <div className={styles.item__value}>{orderStatusMap.get(orderDetails.status)}</div>
                                </div>
                            )}
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
