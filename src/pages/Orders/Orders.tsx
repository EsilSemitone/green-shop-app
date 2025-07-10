import styles from './Orders.module.css';
import { Link } from 'react-router';
import { ROUTES } from '../../common/constants/routes';
import { useOrders } from '../../common/hooks/use-orders';
import { OrderList } from '../../components/OrderList/OrderList';
import { Flex } from 'antd';
import { Loader } from '../../components/Loader/Loader';

export default function Orders() {
    const { orders } = useOrders();

    return (
        <div className={styles.orders}>
            <h1>Мои заказы</h1>
            {orders === null && (
                <Flex style={{ height: '100%', padding: '50px' }}>
                    <Loader></Loader>
                </Flex>
            )}
            {orders && orders.length === 0 && (
                <p>
                    Похоже у вас пока нет заказов но вы всегда можете их сделать на{' '}
                    <Link to={ROUTES.shop.products}>
                        <span className={styles.green_link}>Главной странице</span>
                    </Link>
                </p>
            )}
            {orders && orders.length > 0 && (
                <div className={styles.orders_container}>
                    <OrderList orders={orders}></OrderList>
                </div>
            )}
        </div>
    );
}
