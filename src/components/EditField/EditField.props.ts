import { HTMLAttributes, InputHTMLAttributes } from 'react';

export interface IEditFieldProps extends HTMLAttributes<HTMLElement> {
    value: string;
    fieldProps?: HTMLAttributes<HTMLElement>;
    fieldStyles?: string;
    inputProps?: InputHTMLAttributes<HTMLInputElement>;
    onSave: (updateData: Record<any, any>) => Promise<boolean>;
    fieldName: string;
}
