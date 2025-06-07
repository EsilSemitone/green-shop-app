import { ExtendedOrder } from 'contracts';
import { HTMLAttributes } from 'react';

export interface IModalProps extends HTMLAttributes<HTMLElement> {
    isOpen: boolean;
    onClose: () => void;
    order: ExtendedOrder | null;
}
