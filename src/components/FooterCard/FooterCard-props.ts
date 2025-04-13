import { HTMLAttributes } from 'react';

export interface IFooterCardProps extends HTMLAttributes<HTMLElement> {
    img: string;
    title: string;
    description: string;
}
