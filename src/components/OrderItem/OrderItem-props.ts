import { HTMLAttributes } from 'react';

export interface IOrderItemProps extends HTMLAttributes<HTMLElement> {
    product: {
        uuid: string,
        name: string,
        price: number,
        images: string[],
        count: number,
    }
}
