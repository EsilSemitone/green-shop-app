import { OrderItem } from 'contracts-green-shop';
import { ApiService } from '../../../../common/helpers/api.service';
import { IExtendedOrderItem } from '../../../../common/interfaces/extended-order-item.interface';

export const getCurrentOrderItems = async (orderItems: OrderItem[]): Promise<IExtendedOrderItem[]> => {
    const res = await Promise.all(
        orderItems.map(async (i) => {
            const product_variant = await ApiService.getProductVariantByUuid(i.product_variant_id);
            return { ...i, image: product_variant.image, name: product_variant.name };
        }),
    );
    return res;
};
