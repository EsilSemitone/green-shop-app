import { HTMLAttributes } from 'react';
import { EnrichedCartElement } from '../../pages/Cart/types/enriched-cart-element';

export interface ICartComponentProps extends HTMLAttributes<HTMLElement> {
    products: EnrichedCartElement[];
}
