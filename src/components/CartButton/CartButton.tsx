import { ICartButtonProps } from './CartButton-props';
import styles from './CartButton.module.css';
import cn from 'classnames';

export function CartButton({ className, children, ...props }: ICartButtonProps) {

    return (
        <button {...props} className={cn(styles['button'], className)}>
            {children}
        </button>
    );
}
