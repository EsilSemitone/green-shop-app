import { IProductFilterState } from '../../../store/product-filter-slice/interfaces/product-filter-state.interface';

export const upgradeFilterFromQuery = (filter: IProductFilterState): Record<string, string> => {
    const res: Record<string, string> = {};

    for (const i of Object.keys(filter) as (keyof IProductFilterState)[]) {
        if (filter[i] !== null) {
            res[i] = String(filter[i]);
        }
    }
    return res;
};
