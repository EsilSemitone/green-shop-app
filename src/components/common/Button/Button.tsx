import { memo } from 'react';
import { IButtonProps } from './Button-props';
import styles from './Button.module.css';
import cn from 'classnames';

export const Button = memo(({ className, children, ...props }: IButtonProps) => {
    return (
        <button {...props} className={cn(className, styles['button'])}>
            {children}
        </button>
    );
});
