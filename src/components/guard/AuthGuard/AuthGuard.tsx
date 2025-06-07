import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { HTMLAttributes } from 'react';
import { Navigate } from 'react-router';
import { ROUTES } from '../../../common/constants/routes';

export function AuthGuard({ children }: HTMLAttributes<HTMLElement>) {
    const jwt = useSelector((s: RootState) => s.user.jwt);

    if (!jwt) {
        console.log(jwt);
        return <Navigate to={ROUTES.shop.products}></Navigate>;
    }

    return children;
}
