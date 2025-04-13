import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface IProductCardButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
}
