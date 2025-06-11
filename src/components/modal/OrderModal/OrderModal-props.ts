import { ExtendedOrder } from 'contracts-green-shop';
import { HTMLAttributes } from 'react';

export interface IModalProps extends HTMLAttributes<HTMLElement> {
    isOpen: boolean;
    onClose: () => void;
    order: ExtendedOrder | null;
}
