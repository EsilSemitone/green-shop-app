import { Dispatch, HTMLAttributes, SetStateAction } from 'react';
import { Form } from '../../modal/AuthModal/types/form-type';

export interface ILoginFormProps extends HTMLAttributes<HTMLElement> {
    setForm?: Dispatch<SetStateAction<Form>>;
    onClose?: () => void;
}
