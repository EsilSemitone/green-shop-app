import { HTMLAttributes } from 'react';
import { EnrichedCartElement } from '../../../pages/Cart/types/enriched-cart-element';

export interface ICartItemProps extends HTMLAttributes<HTMLElement> {
    product: EnrichedCartElement;
}
