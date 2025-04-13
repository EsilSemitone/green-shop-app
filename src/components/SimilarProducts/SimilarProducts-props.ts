import { BaseHTMLAttributes } from 'react';

export interface ISimilarProductsProps extends BaseHTMLAttributes<HTMLElement> {
    similarProducts: {uuid: string ,title: string, price: number, image: string}[]
}
