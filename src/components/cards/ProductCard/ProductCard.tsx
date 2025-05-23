import { useDispatch } from 'react-redux';
import { ProductCardButton } from '../../ProductCardButton/ProductCardButton';
import { IProductCardProps } from './ProductCard-props';
import styles from './ProductCard.module.css';
import cn from 'classnames';
import { AppDispatch } from '../../../store/store';
import { memo, MouseEvent } from 'react';
import { useNavigate } from 'react-router';
import { addToCart } from '../../../store/cart-slice/async-actions/add-to-cart';

export const ProductCard = memo(({ className, uuid, product_variant_id, title, price, image, ...props }: IProductCardProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const add = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        dispatch(addToCart({ product_variant_id, quantity: 1 }));
    };

    const addToSweat = () => {
        //
    };

    return (
        <div {...props} onClick={() => navigate(`/product/${uuid}`)} className={cn(styles.product_cart, className)}>
            <div className={styles.image_block}>
                <img className={styles.product_cart__image} src={image || 'image-not-found.png'} alt="Изображение продукта" />
                <div className={styles.cart_buttons}>
                    <ProductCardButton className={styles.image_button} onClick={add}>
                        <img src="/icons/cart-icon.svg" alt="Иконка корзины" />
                    </ProductCardButton>
                    <ProductCardButton className={styles.image_button} onClick={addToSweat}>
                        <img src="/icons/heart-icon.svg" alt="Иконка сердца" />
                    </ProductCardButton>
                </div>
            </div>
            <div className={styles.product_cart__info}>
                <span className={styles.product_cart__title}>{title}</span>
                <span className={styles.product_cart__price}>{`${price}₽`}</span>
            </div>
        </div>
    );
});
