import styles from './Cart.module.css';
import cn from 'classnames';

export function Cart() {

    return (
    <div className={cn(styles['cart-container'])}>
        <div className={styles['cart']}>cart</div>
        <div className={styles['total']}>total</div>
    </div>
    );
}
