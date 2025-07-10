import styles from './AdminOrders.module.css';
import { useCallback, useEffect } from 'react';
import { useQueryParams } from '../../common/hooks/use-query-params';
import { useAdminOrders } from '../../common/hooks/use-admin-orders';
import {
    GetAllOrdersRequestQueryDto,
    isOrderByOrders,
    ORDER_BY_ORDERS,
    ORDER_BY_ORDERS_ENUM,
    ORDER_STATUS,
    PAYMENT_METHOD,
} from 'contracts-green-shop';
import { ORDER_PAGE } from './constants/order-page';
import { Loader } from '../../components/Loader/Loader';
import { useDispatch } from 'react-redux';
import { appActions } from '../../store/app-slice/app.slice';
import { MESSAGE_TYPE } from '../../store/app-slice/enums/message-type';
import { Select, Table, Tag } from 'antd';
import Column from 'antd/es/table/Column';
import { Link } from 'react-router';
import { ROUTES } from '../../common/constants/routes';
import { orderStatusColorMap } from '../../components/OrderList/helpers/order-status-color-map';
import { orderStatusMap } from '../../common/helpers/order/order-status.map';
import { ORDER_BY_OPTIONS } from './constants/order-by-options';
import { STATUS_OPTIONS } from './constants/status-options';
import { PAYMENT_METHOD_OPTIONS } from './constants/payment-method-options';
import { COMMON_OPTIONS } from '../../common/constants/common-options';

export default function AdminOrders() {
    const { setParam, deleteParam, setManyParams, getAll, searchParams } = useQueryParams();
    const { isLoad, setQuery, orders, page, totalPage, error } = useAdminOrders();
    const dispatch = useDispatch();

    useEffect(() => {
        const queryParams = getAll();

        const currentParams = {
            orderBy:
                queryParams['orderBy'] && isOrderByOrders(queryParams['orderBy'])
                    ? queryParams['orderBy']
                    : ORDER_BY_ORDERS_ENUM.FIRST_NEW,
            limit: queryParams['limit'] ? queryParams['limit'] : String(ORDER_PAGE),
            offset: queryParams['offset'] ? queryParams['offset'] : '0',
            ...(queryParams['status'] ? { status: queryParams['status'] } : {}),
            ...(queryParams['payment_method'] ? { status: queryParams['payment_method'] } : {}),
        };

        setManyParams(currentParams);
    }, []);

    useEffect(() => {
        setQuery(getAll<GetAllOrdersRequestQueryDto>());
    }, [searchParams]);

    useEffect(() => {
        if (!error) {
            return;
        }

        dispatch(appActions.setMessage({ type: MESSAGE_TYPE.ERROR, content: error }));
    }, [error]);

    const onChangeStatus = useCallback(
        (value: ORDER_STATUS | 'all') => {
            if (value === 'all') {
                deleteParam('status');
                return;
            }
            setParam('status', value);
        },
        [deleteParam, setParam],
    );

    const onChangePaymentMethod = useCallback(
        (value: PAYMENT_METHOD | 'all') => {
            if (value === 'all') {
                deleteParam('payment_method');
                return;
            }
            setParam('payment_method', value);
        },
        [deleteParam, setParam],
    );

    const onChangeOrderBy = useCallback(
        (value: ORDER_BY_ORDERS) => {
            setParam('orderBy', value);
        },
        [setParam],
    );

    const onChangePagination = useCallback(
        (pageNumber: number) => {
            setParam('offset', String((pageNumber - 1) * ORDER_PAGE));
        },
        [setParam],
    );

    return (
        <div>
            {isLoad && <Loader></Loader>}
            {!isLoad && orders && typeof page === 'number' && typeof totalPage === 'number' && (
                <div className={styles.container}>
                    <h1>Заказы</h1>
                    <div className={styles.filter}>
                        <div>
                            <div className={styles.filter_name}>Сортировка</div>
                            <Select
                                style={{ width: '150px' }}
                                onChange={onChangeOrderBy}
                                options={ORDER_BY_OPTIONS}
                                defaultValue={ORDER_BY_OPTIONS[0].value}
                            ></Select>
                        </div>
                        <div>
                            <div className={styles.filter_name}>Статус:</div>
                            <Select
                                style={{ width: '120px' }}
                                onChange={onChangeStatus}
                                options={STATUS_OPTIONS}
                                defaultValue={COMMON_OPTIONS.all.value}
                            ></Select>
                        </div>
                        <div>
                            <div className={styles.filter_name}>Метод оплаты:</div>
                            <Select
                                style={{ width: '120px' }}
                                onChange={onChangePaymentMethod}
                                options={PAYMENT_METHOD_OPTIONS}
                                defaultValue={COMMON_OPTIONS.all.value}
                            ></Select>
                        </div>
                    </div>
                    <Table
                        rowKey="uuid"
                        className={styles.orders_list}
                        dataSource={orders}
                        pagination={{
                            current: page,
                            pageSize: ORDER_PAGE,
                            total: totalPage * ORDER_PAGE,
                            onChange: onChangePagination,
                            showSizeChanger: false,
                        }}
                        scroll={{ x: '500px' }}
                    >
                        <Column
                            title="Id"
                            dataIndex="uuid"
                            key="uuid"
                            render={(uuid: string) => {
                                return (
                                    <Link className={styles.link} to={ROUTES.admin.orderDynamic(uuid)}>
                                        {uuid}
                                    </Link>
                                );
                            }}
                        />
                        <Column
                            title="Статус"
                            dataIndex="status"
                            key="status"
                            render={(status: ORDER_STATUS) => {
                                return (
                                    <Tag color={orderStatusColorMap.get(status)} key={status}>
                                        {orderStatusMap.get(status) || status}
                                    </Tag>
                                );
                            }}
                        />
                        <Column
                            title="Адрес"
                            dataIndex="address"
                            key="address"
                            render={(address: { city: string; street_address: string; phone_number: string | null }) => {
                                return (
                                    <div>{`${address.city}, ${address.street_address}${
                                        address.phone_number ? `, ${address.phone_number}` : ''
                                    }`}</div>
                                );
                            }}
                        />
                        <Column
                            title="Сумма"
                            dataIndex="total_price"
                            key="total_price"
                            render={(total_price: string) => {
                                return <div>{total_price}</div>;
                            }}
                        />
                        <Column
                            title="Детали"
                            dataIndex="uuid"
                            key="details"
                            render={(uuid: string) => {
                                return (
                                    <Link to={ROUTES.admin.orderDynamic(uuid)}>
                                        <img className={styles.arrow_icon} src="/icons/arrow-icon.svg" alt="Иконка стрелки" />
                                    </Link>
                                );
                            }}
                        />
                    </Table>
                </div>
            )}
        </div>
    );
}
