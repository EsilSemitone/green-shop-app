import { HTMLAttributes, ReactNode } from 'react';

export interface IModalProps extends HTMLAttributes<HTMLElement> {
    children: ReactNode,
    isOpen: boolean,
    onClose: () => void
}
