import { memo } from 'react';
import { INavigateButtonProps } from './NavigateButton-props';
import styles from './NavigateButton.module.css';
import cn from 'classnames';

export const NavigateButton = memo(({ className, children, isActive = false, ...props }: INavigateButtonProps) => {
    return (
        <button {...props} className={cn(styles['button'], { [styles['active']]: isActive }, className)}>
            {children}
        </button>
    );
});
