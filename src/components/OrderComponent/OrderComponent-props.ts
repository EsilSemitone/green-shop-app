import { HTMLAttributes } from 'react';

export interface IOrderComponentProps extends HTMLAttributes<HTMLElement> {
    products: {
        uuid: string,
        name: string,
        price: number,
        images: string[],
        count: number,
    }[]
}
