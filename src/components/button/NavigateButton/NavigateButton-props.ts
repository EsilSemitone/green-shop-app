import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface INavigateButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isActive?: boolean;
    children: ReactNode;
}
