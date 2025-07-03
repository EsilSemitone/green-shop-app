import { GetAllUsersRequestQueryDto, ORDER_BY_USERS_ENUM } from 'contracts-green-shop';
import { USERS_PAGE_LIMIT } from './users-page-limit';

export const DEFAULT_QUERY: GetAllUsersRequestQueryDto = {
    orderBy: ORDER_BY_USERS_ENUM.FIRST_NEW,
    limit: USERS_PAGE_LIMIT,
    offset: 0,
};
