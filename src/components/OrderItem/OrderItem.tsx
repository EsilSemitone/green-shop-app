import { IOrderItemProps } from './OrderItem-props';
import styles from './OrderItem.module.css';
import cn from 'classnames';

export function OrderItem({ className, product, ...props }: IOrderItemProps) {
    return (
        <div {...props} className={cn(styles['cart-item'], className)}>
            <div className={styles['cart-item--head']}>
                <img className={styles['cart-item--image']} src={product.images[0]} alt="Изображение продукта" />
                <div className={styles['cart-item--description']}>
                    <div className={styles['product-name']}>{product.name}</div>
                    <div className={styles['product-id']}>Product ID: <span>{product.uuid}</span></div>
                </div>
            </div>
            <div className={styles['cart-item--quantity']}>
                <div className={styles['product-count']}>{`(x ${product.count})`}</div>
            </div>
            <div className={styles['cart-item--price']}>
                ${product.price}
            </div>
        </div>
    );
}
