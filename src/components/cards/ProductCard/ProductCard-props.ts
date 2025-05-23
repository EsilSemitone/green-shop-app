import { HTMLAttributes } from 'react';

export interface IProductCardProps extends HTMLAttributes<HTMLElement> {
    title: string;
    price: number;
    image: string | null;
    product_variant_id: string;
    uuid: string;
}
