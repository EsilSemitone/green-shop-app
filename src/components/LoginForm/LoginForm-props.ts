import { Dispatch, HTMLAttributes, SetStateAction } from 'react';
import { Form } from '../AuthModal/AuthModal';

export interface ILoginFormProps extends HTMLAttributes<HTMLElement> {
    setForm?: Dispatch<SetStateAction<Form>>;
}
