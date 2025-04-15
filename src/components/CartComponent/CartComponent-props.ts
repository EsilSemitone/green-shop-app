import { HTMLAttributes } from 'react';

export interface ICartComponentProps extends HTMLAttributes<HTMLElement> {
    products: {
        uuid: string,
        name: string,
        price: number,
        images: string[],
        count: number,
    }[]
}
