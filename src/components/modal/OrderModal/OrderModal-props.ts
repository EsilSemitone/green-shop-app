import { HTMLAttributes } from 'react';

export interface IModalProps extends HTMLAttributes<HTMLElement> {
    isOpen: boolean,
    onClose: () => void
}
