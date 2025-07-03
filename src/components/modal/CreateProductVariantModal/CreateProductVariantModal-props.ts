import { HTMLAttributes } from 'react';

export interface ICreateProductVariantModalProps extends HTMLAttributes<HTMLElement> {
    productId: string;
    isOpen: boolean;
    onClose: () => void;
}
