import { memo } from 'react';
import { ICartButtonProps } from './CartButton-props';
import styles from './CartButton.module.css';
import cn from 'classnames';

export const CartButton = memo(({ className, children, ...props }: ICartButtonProps) => {
    return (
        <button {...props} className={cn(styles['button'], className)}>
            {children}
        </button>
    );
});
