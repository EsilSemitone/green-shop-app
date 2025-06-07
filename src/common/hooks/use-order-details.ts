import { useEffect, useState } from 'react';
import { OrderDetails } from '../interfaces/order-details';
import { ApiService } from '../helpers/api.service';
import { getCurrentOrderItems } from '../helpers/order/getCurrentOrderItems';

export const useOrderDetails = (uuid: string | undefined) => {
    const [order, setOrder] = useState<OrderDetails | null>(null);

    useEffect(() => {
        if (!uuid) {
            return;
        }
        const provideOrder = async () => {
            const rawOrder = await ApiService.geOrderDetails(uuid);
            const currentItems = await getCurrentOrderItems(rawOrder.items);
            setOrder({
                ...rawOrder,
                items: currentItems,
            });
        };

        provideOrder();
    }, [uuid]);

    return { orderDetails: order };
};
