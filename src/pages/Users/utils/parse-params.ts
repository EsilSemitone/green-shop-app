import { isOrderByUsers } from 'contracts-green-shop';
import { USERS_PAGE_LIMIT } from '../constants/users-page-limit';

export const parseParams = <T extends object = Record<string, any>>(queryParams: Record<string, any>): T => {
    const currentQueryParams = {
        ...(queryParams['orderBy'] && isOrderByUsers(queryParams['orderBy'])
            ? { orderBy: queryParams['orderBy'] }
            : { orderBy: 'first_new' }),
        ...{ limit: String(USERS_PAGE_LIMIT) },
        ...(queryParams['offset'] ? { offset: String(Number(queryParams['offset'])) } : { offset: String(0) }),
        ...(queryParams['search'] && queryParams['search'] !== '' ? { search: queryParams['search'] } : {}),
        ...(queryParams['isAdmin'] ? { isAdmin: queryParams['isAdmin'] } : {}),
    };

    return currentQueryParams as T;
};
