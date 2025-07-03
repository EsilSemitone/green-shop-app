import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { HTMLAttributes } from 'react';
import { Navigate } from 'react-router';
import { ROUTES } from '../../../common/constants/routes';
import { ROLES } from 'contracts-green-shop';

export function AdminGuard({ children }: HTMLAttributes<HTMLElement>) {
    const user = useSelector((s: RootState) => s.user.profile);

    if (user?.role !== ROLES.ADMIN) {
        return <Navigate to={ROUTES.shop.products}></Navigate>;
    }

    return children;
}
