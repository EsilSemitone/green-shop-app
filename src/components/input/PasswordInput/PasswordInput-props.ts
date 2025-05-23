import { InputHTMLAttributes } from 'react';
import { UseFormRegister } from 'react-hook-form';

export interface IPasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
    register?: UseFormRegister<any>;
    registerName?: string;
}
