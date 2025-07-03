import { ProductVariant } from 'contracts-green-shop';
import { HTMLAttributes } from 'react';

export interface IProductVariantCardProps extends HTMLAttributes<HTMLElement> {
    product_variant: ProductVariant & { tags: string[] };
    onDelete: (uuid: string) => void;
}
