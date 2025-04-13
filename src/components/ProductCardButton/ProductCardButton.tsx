import { IProductCardButtonProps } from './ProductCardButton-props';
import styles from './ProductCardButton.module.css';
import cn from 'classnames';

export function ProductCardButton({ className, children, ...props }: IProductCardButtonProps) {

    return (
        <button {...props} className={cn(styles['button'], className)}>
            {children}
        </button>
    );
}
