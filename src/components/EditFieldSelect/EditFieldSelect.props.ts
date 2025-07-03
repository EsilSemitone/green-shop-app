import { DefaultOptionType } from 'antd/es/select';
import { HTMLAttributes } from 'react';

export interface IEditFieldSelectProps extends HTMLAttributes<HTMLElement> {
    value: string;
    fieldProps?: HTMLAttributes<HTMLElement>;
    fieldStyles?: string;
    onSave: (updateData: Record<any, any>) => Promise<boolean>;
    fieldName: string;
    options: DefaultOptionType[];
    middleware?: (...args: any[]) => any;
}
