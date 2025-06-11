import { PRODUCT_CATEGORY, SIZE } from 'contracts-green-shop';

export interface IProductFilterState {
    category: PRODUCT_CATEGORY | null;
    size: SIZE | null;
    priceFrom: number | null;
    priceTo: number | null;
    limit: number | null;
    offset: number | null;
}
