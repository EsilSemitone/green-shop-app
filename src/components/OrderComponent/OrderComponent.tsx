
import { OrderItem } from '../OrderItem/OrderItem';
import { IOrderComponentProps } from './OrderComponent-props';
import styles from './OrderComponent.module.css';
import cn from 'classnames';

export function OrderComponent({ className, products, ...props }: IOrderComponentProps) {
    return (
        <div {...props} className={cn(styles['cart'], className)}>
            <div className={styles['cart-header']}>
                <div className={styles['cart-header--item']}>Products</div>
                <div className={styles['cart-header--item']}>Qty</div>
                <div className={styles['cart-header--item']}>Subtotal</div>
            </div>
            <div className={styles['cart-container']}>
                {products.map(p => {
                    return <OrderItem key={p.uuid} product={p}></OrderItem>
                })}
            </div>
        </div>
    );
}
