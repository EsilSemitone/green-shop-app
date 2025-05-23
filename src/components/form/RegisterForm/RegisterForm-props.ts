import { HTMLAttributes } from 'react';

export interface IRegisterFormProps extends HTMLAttributes<HTMLElement> {
    onClose?: () => void;
}
