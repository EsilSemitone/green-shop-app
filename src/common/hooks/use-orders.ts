import { Order } from 'contracts';
import { useEffect, useState } from 'react';
import { ApiService } from '../helpers/api.service';

export const useOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const provideOrders = async () => {
            const { orders: currentOrders } = await ApiService.geMytOrders();
            setOrders(currentOrders);
        };
        provideOrders();
    }, []);

    return { orders };
};
