import { GetAllProductsRequestQueryDto, ProductSchema } from 'contracts-green-shop';
import { useEffect, useState } from 'react';
import { ApiService } from '../helpers/api.service';
import { TypeOf } from 'zod';

type Product = TypeOf<typeof ProductSchema>;

export const useAdminProducts = (initQuery?: GetAllProductsRequestQueryDto) => {
    const [products, setProducts] = useState<Product[] | null>(null);
    const [page, setPage] = useState<number | null>(null);
    const [totalPage, setTotalPage] = useState<number | null>(null);

    const [isLoad, setIsLoad] = useState<boolean>(true);
    const [query, setQuery] = useState<GetAllProductsRequestQueryDto | null>(initQuery || null);

    useEffect(() => {
        if (!query || Object.keys(query).length === 0) {
            return;
        }
        const provideUsers = async () => {
            setIsLoad(true);
            const products = await ApiService.getAdminProducts(query);
            setProducts(products.products);
            setPage(products.page);
            setTotalPage(products.totalPage);
            setIsLoad(false);
        };
        provideUsers();
    }, [query]);

    return { products, isLoad, setQuery, page, totalPage };
};
