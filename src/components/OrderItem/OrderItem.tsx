import { memo } from 'react';
import { IOrderItemProps } from './OrderItem-props';
import styles from './OrderItem.module.css';
import cn from 'classnames';

export const OrderItem = memo(({ className, product, ...props }: IOrderItemProps) => {
    return (
        <div {...props} className={cn(styles.order_item, className)}>
            <div className={styles.order_item__head}>
                <img
                    className={styles.order_item__image}
                    src={product.image || 'image-not-found.png'}
                    alt="Изображение продукта"
                />
                <div className={styles.order_item__description}>
                    <div className={styles.product_name}>{product.name}</div>
                    <div className={styles.product_id}>
                        ID продукта: <span>{product.product_variant_id}</span>
                    </div>
                </div>
            </div>
            <div className={styles.order_item__body}>
                <div className={styles.order_item__quantity}>
                    <div className={styles.product_count}>{`(x ${product.quantity})`}</div>
                </div>
                <div className={styles.order_item__price}>${product.price}</div>
            </div>
        </div>
    );
});
