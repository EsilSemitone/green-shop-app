import { CartItem } from '../CartItem/CartItem';
import { ICartComponentProps } from './CartComponent-props';
import styles from './CartComponent.module.css';
import cn from 'classnames';

export function CartComponent({ className, products, ...props }: ICartComponentProps) {
    return (
        <div {...props} className={cn(styles['cart'], className)}>
            <div className={styles['cart-header']}>
                <div className={styles['cart-header--item']}>Products</div>
                <div className={styles['cart-header--item']}>Price</div>
                <div className={styles['cart-header--item']}>Quantity</div>
                <div className={styles['cart-header--item']}>Total</div>
            </div>
            <div className={styles['cart-container']}>
                {products.map(p => {
                    return <CartItem key={p.uuid} product={p}></CartItem>
                })}
            </div>
        </div>
    );
}
