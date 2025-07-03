import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useAdminProducts } from '../../common/hooks/use-admin-products';
import { useQueryParams } from '../../common/hooks/use-query-params';
import styles from './AdminProducts.module.css';
import { useDebounce } from 'use-debounce';
import { PRODUCTS_PAGE_LIMIT } from './constants/product-page-limit';
import { GetAllProductsRequestQueryDto, PRODUCT_CATEGORY } from 'contracts-green-shop';
import { SearchInput } from '../../components/input/SearchInput/SearchInput';
import { Avatar, Spin, Table } from 'antd';
import Column from 'antd/es/table/Column';
import { ROUTES } from '../../common/constants/routes';
import { Link } from 'react-router';
import { categoryInvertMap } from '../Shop/helpers/category-map';
import { LoadingOutlined } from '@ant-design/icons';

export default function AdminProducts() {
    const { searchParams, setParam, setManyParams, getAll, getParam, deleteParam } = useQueryParams();
    const { products, isLoad, setQuery, page, totalPage } = useAdminProducts();

    const [searchString, setSearchString] = useState('');
    const [searchValue] = useDebounce(searchString, 300);

    useEffect(() => {
        const queryParams = getAll();

        const currentQueryParams = {
            ...{ limit: String(PRODUCTS_PAGE_LIMIT) },
            ...(queryParams['offset'] ? { offset: String(Number(queryParams['offset'])) } : { offset: String(0) }),
            ...(queryParams['search'] && queryParams['search'] !== '' ? { search: queryParams['search'] } : {}),
        };
        setManyParams(currentQueryParams);
    }, []);

    useEffect(() => {
        setQuery(getAll<GetAllProductsRequestQueryDto>());
    }, [searchParams]);

    useEffect(() => {
        if (searchValue === '') {
            const oldParam = getParam('search');
            if (oldParam) {
                deleteParam('search');
            }
        } else {
            setParam('search', searchValue);
        }
    }, [searchValue]);

    const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setSearchString(event.target.value);
    }, []);

    const paginateTableHandle = (pageNumber: number) => {
        setParam('offset', String((pageNumber - 1) * PRODUCTS_PAGE_LIMIT));
    };

    return (
        <div className={styles.page}>
            <h1>Продукты</h1>
            {products && typeof page === 'number' && typeof totalPage === 'number' && (
                <div className={styles.content}>
                    <div className={styles.content_options}>
                        <SearchInput
                            visible={true}
                            placeholder={'Поиск'}
                            value={searchString}
                            onChange={handleSearchChange}
                        ></SearchInput>
                    </div>
                    <Table
                        className={styles.products_list}
                        dataSource={products}
                        pagination={{
                            current: page,
                            pageSize: PRODUCTS_PAGE_LIMIT,
                            total: totalPage * PRODUCTS_PAGE_LIMIT,
                            onChange: paginateTableHandle,
                            showSizeChanger: false,
                        }}
                        scroll={{ x: '500px' }}
                    >
                        <Column
                            title="Фото"
                            dataIndex="images"
                            key="images"
                            render={(images: string[]) => {
                                return <Avatar icon={<img src={images[0] || '/image-not-found.png'}></img>}></Avatar>;
                            }}
                        />
                        <Column
                            title="Id"
                            dataIndex="uuid"
                            key="id"
                            render={(uuid: string) => {
                                return (
                                    <Link className={styles.link} to={ROUTES.admin.productDynamic(uuid)}>
                                        {uuid}
                                    </Link>
                                );
                            }}
                        />
                        <Column
                            title="Название"
                            dataIndex="name"
                            key="name"
                            render={(name: string) => {
                                return <div>{name}</div>;
                            }}
                        />
                        <Column
                            title="Категория"
                            dataIndex="category"
                            key="category"
                            render={(category: PRODUCT_CATEGORY) => {
                                return <div>{categoryInvertMap.get(category) || category}</div>;
                            }}
                        />
                        <Column
                            title="Детали"
                            dataIndex="uuid"
                            key="details"
                            render={(uuid: string) => {
                                return (
                                    <Link to={ROUTES.admin.productDynamic(uuid)}>
                                        <img className={styles.arrow_icon} src="/icons/arrow-icon.svg" alt="Иконка стрелки" />
                                    </Link>
                                );
                            }}
                        />
                    </Table>
                </div>
            )}
            {isLoad && <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: 'green' }} spin />} />}
        </div>
    );
}
