import { HtmlHTMLAttributes } from 'react';

export interface IUpdateAccountFormProps extends HtmlHTMLAttributes<HTMLElement> {
    name: string;
    email: string;
    phone_number: string;
}
