import { EnrichedCartElement } from '../types/enriched-cart-element';

export const extractTagsFromProducts = (products: EnrichedCartElement[]): string[] => {
    const tags = products.map((p) => p.tags_id).flat(1);
    return Array.from(new Set(tags));
};
