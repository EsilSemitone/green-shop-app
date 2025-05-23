import { GetProductVariantByUuidResponseDto } from 'contracts';
import { ICartItem } from '../../../store/cart-slice/interfaces/cart-item';

export type EnrichedCartElement = GetProductVariantByUuidResponseDto & ICartItem;
