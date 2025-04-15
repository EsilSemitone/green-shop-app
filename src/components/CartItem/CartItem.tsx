import { CartButton } from '../CartButton/CartButton';
import { ICartItemProps } from './CartItem-props';
import styles from './CartItem.module.css';
import cn from 'classnames';

export function CartItem({ className, product, ...props }: ICartItemProps) {
    return (
        <div {...props} className={cn(styles['cart-item'], className)}>
            <div className={styles['cart-item--head']}>
                <img className={styles['cart-item--image']} src={product.images[0]} alt="Изображение продукта" />
                <div className={styles['cart-item--description']}>
                    <div className={styles['product-name']}>{product.name}</div>
                    <div className={styles['product-id']}>Product ID: <span>{product.uuid}</span></div>
                </div>
            </div>
            <div className={styles['cart-item--price']}>
                ${product.price}
            </div>
            <div className={styles['cart-item--quantity']}>
                <CartButton>{"-"}</CartButton>
                <div className={styles['product-count']}>{product.count}</div>
                <CartButton>{"+"}</CartButton>
            </div>
            <div className={styles['cart-item--total']}>
                <div className={styles['cart-item--total-sum']}>{`$${product.price * product.count}`}</div>
                <div className={styles['cart-item--delete']}>
                    <img src="/icons/basket-icon.svg" alt="Иконка корзины" />
                </div>
            </div>
        </div>
    );
}
