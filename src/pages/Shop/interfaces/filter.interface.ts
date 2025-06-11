import { PRODUCT_CATEGORY } from 'contracts-green-shop';
import { SIZE } from 'contracts-green-shop/enums/size.ts';

export interface IFilter {
    category?: PRODUCT_CATEGORY;
    price?: {
        min: number;
        max: number;
    };
    size?: SIZE;
}
