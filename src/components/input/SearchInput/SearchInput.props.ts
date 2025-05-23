import { ChangeEventHandler, InputHTMLAttributes } from 'react';

export interface ISearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
    visible?: boolean;
    placeholder: string;
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
}
