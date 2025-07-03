import { Order } from 'contracts-green-shop';
import { useEffect, useState } from 'react';
import { ApiService } from '../helpers/api.service';

export const useOrders = () => {
    const [orders, setOrders] = useState<Order[] | null>(null);

    useEffect(() => {
        const provideOrders = async () => {
            const { orders: currentOrders } = await ApiService.geMytOrders();
            setOrders(currentOrders);
        };
        provideOrders();
    }, []);

    return { orders };
};
