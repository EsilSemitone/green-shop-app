import { IButtonProps } from './Button-props';
import styles from './Button.module.css';
import cn from 'classnames';

export function Button({ className, children, ...props }: IButtonProps) {
    return (
        <button {...props} className={cn(styles['button'], className)}>
            {children}
        </button>
    );
}
