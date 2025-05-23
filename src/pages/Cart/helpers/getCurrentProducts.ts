import { ApiService } from '../../../helpers/api.service';
import { ICartItems } from '../../../store/cart-slice/interfaces/cart-item';
import { EnrichedCartElement } from '../types/enriched-cart-element';

export const getCurrentProducts = async (cartItems: ICartItems): Promise<EnrichedCartElement[]> => {
    const res = await Promise.all(
        cartItems.map(async (i) => {
            const otherData = await ApiService.getProductVariantByUuid(i.product_variant_id);
            return { ...otherData, ...i };
        }),
    );
    return res;
};
