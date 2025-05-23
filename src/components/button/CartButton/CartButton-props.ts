import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ICartButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
}
