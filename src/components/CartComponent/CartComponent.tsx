import { CartItem } from '../cards/CartCard/CartCard';
import { ICartComponentProps } from './CartComponent-props';
import styles from './CartComponent.module.css';
import cn from 'classnames';

export function CartComponent({ className, products, ...props }: ICartComponentProps) {
    return (
        <div {...props} className={cn(styles.cart, className)}>
            <div className={styles.cart_header}>
                <div className={styles.cart_header__item}>Продукты</div>
                <div className={styles.cart_header__item}>Цена</div>
                <div className={styles.cart_header__item}>Количество</div>
                <div className={styles.cart_header__item}>Итоговая цена</div>
            </div>
            <div className={styles.cart_container}>
                {products.map((p) => {
                    return <CartItem key={p.product_variant_id} product={p}></CartItem>;
                })}
            </div>
        </div>
    );
}
