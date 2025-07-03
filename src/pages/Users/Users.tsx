import { Avatar, Checkbox, CheckboxProps, Select, Spin, Table } from 'antd';
import styles from './Users.module.css';
import Column from 'antd/es/table/Column';
import { Link } from 'react-router';
import { ROUTES } from '../../common/constants/routes';
import { useUsers } from '../../common/hooks/use-users';
import { useQueryParams } from '../../common/hooks/use-query-params';
import { ChangeEvent, useEffect, useState } from 'react';
import { GetAllUsersRequestQueryDto, isOrderByUsers, ORDER_BY_USERS, ORDER_BY_USERS_ENUM } from 'contracts-green-shop';
import { USERS_PAGE_LIMIT } from './constants/users-page-limit';
import { LoadingOutlined } from '@ant-design/icons';
import { DEFAULT_QUERY } from './constants/default-query';
import { SearchInput } from '../../components/input/SearchInput/SearchInput';
import { useDebounce } from 'use-debounce';

export default function Users() {
    const { searchParams, setParam, setManyParams, getAll, getParam, deleteParam } = useQueryParams();
    const { users, isLoad, setQuery, page, totalPage } = useUsers();

    const [searchString, setSearchString] = useState('');
    const [searchValue] = useDebounce(searchString, 300);

    useEffect(() => {
        const queryParams = getAll();

        const currentQueryParams = {
            ...(queryParams['orderBy'] && isOrderByUsers(queryParams['orderBy'])
                ? { orderBy: queryParams['orderBy'] }
                : { orderBy: 'first_new' }),
            ...{ limit: String(USERS_PAGE_LIMIT) },
            ...(queryParams['offset'] ? { offset: String(Number(queryParams['offset'])) } : { offset: String(0) }),
            ...(queryParams['search'] && queryParams['search'] !== '' ? { search: queryParams['search'] } : {}),
            ...(queryParams['isAdmin'] ? { isAdmin: queryParams['isAdmin'] } : {}),
        };
        setManyParams(currentQueryParams);
    }, []);

    useEffect(() => {
        setQuery(getAll<GetAllUsersRequestQueryDto>());
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

    const handleChangeOrderBy = (value: ORDER_BY_USERS) => {
        setParam('orderBy', value);
    };

    const onChangeIsAdmin: CheckboxProps['onChange'] = (e) => {
        setParam('isAdmin', String(e.target.checked));
    };

    return (
        <div className={styles.users}>
            <h1>Пользователи</h1>
            {users && typeof page === 'number' && typeof totalPage === 'number' && (
                <div className={styles.content}>
                    <div className={styles.content_options}>
                        <div className={styles.content_options__left}>
                            <Select
                                defaultValue={DEFAULT_QUERY.orderBy}
                                onChange={handleChangeOrderBy}
                                options={[
                                    { value: ORDER_BY_USERS_ENUM.FIRST_NEW, label: 'Сначало новые' },
                                    { value: ORDER_BY_USERS_ENUM.FIRST_OLD, label: 'Сначало старые' },
                                ]}
                            />
                            <Checkbox onChange={onChangeIsAdmin}>Только администраторы</Checkbox>
                        </div>

                        <SearchInput
                            visible={true}
                            placeholder={'Поиск'}
                            value={searchString}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                setSearchString(event.target.value);
                            }}
                        ></SearchInput>
                    </div>
                    <Table
                        className={styles.users_list}
                        dataSource={users}
                        pagination={{
                            current: page,
                            pageSize: USERS_PAGE_LIMIT,
                            total: totalPage * USERS_PAGE_LIMIT,
                            onChange: (pageNumber) => {
                                setParam('offset', String((pageNumber - 1) * USERS_PAGE_LIMIT));
                            },
                            showSizeChanger: false,
                        }}
                        scroll={{ x: '500px' }}
                    >
                        <Column
                            title="Фото"
                            dataIndex="photo_image"
                            key="photo_image"
                            render={(photo_image: string) => {
                                return <Avatar icon={<img src={photo_image || '/image-not-found.png'}></img>}></Avatar>;
                            }}
                        />
                        <Column
                            title="Id"
                            dataIndex="uuid"
                            key="id"
                            render={(uuid: string) => {
                                return (
                                    <Link className={styles.link} to={ROUTES.admin.userDynamic(uuid)}>
                                        {uuid}
                                    </Link>
                                );
                            }}
                        />
                        <Column
                            title="Имя"
                            dataIndex="name"
                            key="name"
                            render={(name: string) => {
                                return <div>{name}</div>;
                            }}
                        />
                        <Column
                            title="Почта"
                            dataIndex="email"
                            key="email"
                            render={(name: string) => {
                                return <div>{name}</div>;
                            }}
                        />
                        <Column
                            title="Детали"
                            dataIndex="uuid"
                            key="details"
                            render={(uuid: string) => {
                                return (
                                    <Link to={ROUTES.admin.userDynamic(uuid)}>
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
