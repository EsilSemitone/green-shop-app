import { HtmlHTMLAttributes } from 'react';

export interface IEditImageProps extends HtmlHTMLAttributes<HTMLElement> {
    src: string;
    alt?: string;
    onDelete: (...args: any[]) => void | Promise<void>;
}
