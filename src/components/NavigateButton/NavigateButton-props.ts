import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface INavigateButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
}
