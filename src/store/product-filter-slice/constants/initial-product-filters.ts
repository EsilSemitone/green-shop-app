import { IProductFilterState } from '../interfaces/product-filter-state.interface';

export const INITIAL_STATE: IProductFilterState = {
    category: null,
    priceFrom: null,
    priceTo: null,
    size: null,
    limit: null,
    offset: null,
};
