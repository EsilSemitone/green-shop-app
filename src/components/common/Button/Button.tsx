import { memo } from 'react';
import { IButtonProps } from './Button-props';
import styles from './Button.module.css';
import cn from 'classnames';

export const Button = memo(({ className, children, isDelete, ...props }: IButtonProps) => {
    return (
        <button {...props} className={cn(className, styles.button, { [styles.delete]: isDelete })}>
            {children}
        </button>
    );
});
