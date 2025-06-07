import { useDispatch } from 'react-redux';
import { ICartItemProps } from './CartCard-props';
import styles from './CartCard.module.css';
import cn from 'classnames';
import { addToCart } from '../../../store/cart-slice/async-actions/add-to-cart';
import { AppDispatch } from '../../../store/store';
import { CartButton } from '../../button/CartButton/CartButton';
import { removeToCart as removeItem } from '../../../store/cart-slice/async-actions/remove-to-cart';
import { deleteToCart as deleteItem } from '../../../store/cart-slice/async-actions/delete-to-cart';
import { memo, useCallback } from 'react';

export const CartItem = memo(({ className, product, ...props }: ICartItemProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const add = useCallback(() => {
        console.log(product.product_variant_id);
        dispatch(addToCart({ product_variant_id: product.product_variant_id, quantity: 1 }));
    }, [dispatch, product.product_variant_id]);

    const removeToCart = useCallback(() => {
        dispatch(removeItem({ product_variant_id: product.product_variant_id }));
    }, [dispatch, product.product_variant_id]);

    const deleteToCart = useCallback(() => {
        dispatch(deleteItem({ product_variant_id: product.product_variant_id }));
    }, [dispatch, product.product_variant_id]);

    return (
        <div {...props} className={cn(styles.cart_item, className)}>
            <div className={cn(styles.cart_item__head, styles.cart_item__block)}>
                <img
                    className={styles.cart_item__image}
                    src={product.image || '/image-not-found.png'}
                    alt="Изображение продукта"
                />
                <div className={styles.cart_item__description}>
                    <div className={styles.product_name}>{product.name}</div>
                    <div className={styles.product_id}>
                        Product ID: <span>{product.product_variant_id}</span>
                    </div>
                </div>
            </div>
            <div className={cn(styles.cart_item__price, styles.cart_item__block)}>{product.price.toFixed(2)}₽</div>
            <div className={cn(styles.cart_item__quantity, styles.cart_item__block)}>
                <CartButton onClick={removeToCart}>{'-'}</CartButton>
                <div className={styles.product_count}>{product.quantity}</div>
                <CartButton onClick={add}>{'+'}</CartButton>
            </div>
            <div className={cn(styles.cart_item__total, styles.cart_item__block)}>
                <div className={styles.cart_item__total_sum}>{`${Number(product.price * product.quantity).toFixed(2)}₽`}</div>
                <button onClick={deleteToCart} className={styles.cart_item__delete}>
                    <img src="/icons/basket-icon.svg" alt="Иконка корзины" />
                </button>
            </div>
        </div>
    );
});
