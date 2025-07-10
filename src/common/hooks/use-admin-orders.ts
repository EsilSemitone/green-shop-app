import { GetAllOrdersRequestQueryDto, Order } from 'contracts-green-shop';
import { useEffect, useState } from 'react';
import { ApiService } from '../helpers/api.service';
import { AxiosError } from 'axios';

export const useAdminOrders = () => {
    const [isLoad, setIsLoad] = useState<boolean>(true);
    const [query, setQuery] = useState<GetAllOrdersRequestQueryDto | null>();
    const [orders, setOrders] = useState<Order[] | null>();
    const [page, setPage] = useState<number | null>();
    const [totalPage, setTotalPage] = useState<number | null>();
    const [error, setError] = useState<null>();

    useEffect(() => {
        if (!query || Object.keys(query).length === 0) {
            return;
        }
        const provideOrders = async () => {
            try {
                const result = await ApiService.getAdminOrders(query);
                setOrders(result.orders);
                setPage(result.page);
                setTotalPage(result.totalPage);
                setIsLoad(false);
                setError(null);
            } catch (e) {
                if (e instanceof AxiosError) {
                    setError(e.response?.data?.error || e.message);
                }
                setIsLoad(false);
            }
        };

        provideOrders();
    }, [query]);

    return { isLoad, setQuery, orders, page, totalPage, error };
};
