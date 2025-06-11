import styles from './OrderList.module.css';
import './OrderList.css';
import { memo } from 'react';
import { IOrderListProps } from './OrderList.props';
import { Table, Tag } from 'antd';
import Column from 'antd/es/table/Column';
import { ORDER_STATUS } from 'contracts-green-shop';
import { Link } from 'react-router';
import { ROUTES } from '../../common/constants/routes';
import { orderStatusColorMap } from './helpers/order-status-color-map';
import { ORDER_STATUS_COLOR } from './constants/order-status.color';

export const OrderList = memo(({ orders }: IOrderListProps) => {
    const renderStatus = (status: ORDER_STATUS) => {
        const color = orderStatusColorMap.get(status) ?? ORDER_STATUS_COLOR.green;

        return (
            <Tag color={color} key={status}>
                {status}
            </Tag>
        );
    };

    return (
        <Table className={styles.order_list} dataSource={orders} pagination={false} scroll={{ y: 600, x: 700 }}>
            <Column
                title="Id"
                dataIndex="uuid"
                key="id"
                render={(uuid: string) => {
                    return (
                        <Link className={styles.link} to={ROUTES.account.orderDynamic(uuid)}>
                            {uuid}
                        </Link>
                    );
                }}
            />
            <Column title="Статус" dataIndex="status" key="status" render={renderStatus} />
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
                title="Доставка"
                dataIndex="shipping_price"
                key="shipping_price"
                render={(shipping_price: string) => {
                    return <div>{`${shipping_price}₽`}</div>;
                }}
            />
            <Column
                title="Всего"
                dataIndex="total_price"
                key="total_price"
                render={(total_price: string) => {
                    return <div>{`${total_price}₽`}</div>;
                }}
            />
            <Column
                title="Детали заказа"
                dataIndex="uuid"
                key="order_details"
                render={(uuid: string) => {
                    return (
                        <Link to={ROUTES.account.orderDynamic(uuid)}>
                            <img className={styles.arrow_icon} src="/icons/arrow-icon.svg" alt="Иконка стрелки" />
                        </Link>
                    );
                }}
            />
        </Table>
    );
});
