import { INavigateButtonProps } from './NavigateButton-props';
import styles from './NavigateButton.module.css';
import cn from 'classnames';

export function NavigateButton({ className, children, ...props }: INavigateButtonProps) {

    return (
        <button {...props} className={cn(styles['button'], className)}>
            {children}
        </button>
    );
}
