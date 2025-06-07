import { OrderItem } from '../OrderItem/OrderItem';
import { IOrderComponentProps } from './OrderComponent-props';
import styles from './OrderComponent.module.css';
import cn from 'classnames';

export function OrderComponent({ className, products, ...props }: IOrderComponentProps) {
    return (
        <div {...props} className={cn(styles.cart, className)}>
            <div className={styles.cart_header}>
                <div className={styles.cart_header__item}>Продукты</div>
                <div className={styles.cart_header__item}>Количество</div>
                <div className={styles.cart_header__item}>Всего</div>
            </div>
            <div className={styles.cart_container}>
                {products.map((p) => {
                    return <OrderItem key={p.uuid} product={p}></OrderItem>;
                })}
            </div>
        </div>
    );
}
