import { HTMLAttributes } from 'react';

export interface IProductCardProps extends HTMLAttributes<HTMLElement> {
    title: string,
    price: number,
    image: string
}
