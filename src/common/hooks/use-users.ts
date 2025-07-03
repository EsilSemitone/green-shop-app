import { GetAllUsersRequestQueryDto, GetAllUsersResponseDto } from 'contracts-green-shop';
import { useEffect, useState } from 'react';
import { ApiService } from '../helpers/api.service';

export type User = GetAllUsersResponseDto['users'][0];

export const useUsers = (initQuery?: GetAllUsersRequestQueryDto) => {
    const [users, setUsers] = useState<User[] | null>(null);
    const [page, setPage] = useState<number | null>(null);
    const [totalPage, setTotalPage] = useState<number | null>(null);

    const [isLoad, setIsLoad] = useState<boolean>(true);
    const [query, setQuery] = useState<GetAllUsersRequestQueryDto | null>(initQuery || null);

    useEffect(() => {
        if (!query || Object.keys(query).length === 0) {
            return;
        }
        const provideUsers = async () => {
            setIsLoad(true);
            const users = await ApiService.getUsers(query);
            setUsers(users.users);
            setPage(users.page);
            setTotalPage(users.totalPage);
            setIsLoad(false);
        };
        provideUsers();
    }, [query]);

    return { users, isLoad, setQuery, page, totalPage };
};
