import { ProductCardButton } from '../ProductCardButton/ProductCardButton';
import { IProductCardProps } from './ProductCard-props';
import styles from './ProductCard.module.css';
import cn from 'classnames';

export function ProductCard({ className, title, price, image, ...props }: IProductCardProps) {

    const addToCart = () => {
        //
    }

    const addToSweat = () => {
        //
    }

    return (
        <div {...props} className={cn(styles['product-cart'], className)}>
            <div className={cn(styles['image-block'])}>
                <img src={image} alt="Изображение продукта" />
                <div className={cn(styles['cart-buttons'])}>    
                    <ProductCardButton className={styles["image-button"]} onClick={addToCart}>
                        <img src="/icons/cart-icon.svg" alt="Иконка корзины" />
                    </ProductCardButton>
                    <ProductCardButton className={styles["image-button"]} onClick={addToSweat}>
                        <img src="/icons/heart-icon.svg" alt="Иконка сердца" />
                    </ProductCardButton>
                </div>
            </div>
            <div className={cn(styles['product-cart--info'])}>
                <span className={cn(styles['product-cart--title'])}>{title}</span>
                <span className={cn(styles['product-cart--price'])}>{`$${price}`}</span>
            </div>

        </div>
    );
}
