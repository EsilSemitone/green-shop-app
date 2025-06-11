import { GetProductVariantByUuidResponseDto } from 'contracts-green-shop';
import { ICartItem } from '../../../store/cart-slice/interfaces/cart-item';

export type EnrichedCartElement = GetProductVariantByUuidResponseDto & ICartItem;
