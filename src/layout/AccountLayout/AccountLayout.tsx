import { NavLink, Outlet, useNavigate } from 'react-router';
import styles from './AccountLayout.module.css';
import cn from 'classnames';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { ROUTES } from '../../common/constants/routes';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { logoutUser } from '../../store/user-slice/async-actions/logout';
import { cartActions } from '../../store/cart-slice/cart-slice';

export function AccountLayout() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handlerLogout = () => {
        dispatch(logoutUser());
        dispatch(cartActions.clearCart());
        navigate('/');
    };
    return (
        <div className={styles.layout}>
            <Header></Header>
            <div className={styles.content}>
                <div className={styles.content_navigate}>
                    <div className={styles.content_navigate__header}>Мой аккаунт</div>
                    <div className={styles.content_navigate__body}>
                        <NavLink
                            className={({ isActive }) => cn(styles.content_navigate__item, { [styles.active]: isActive })}
                            to={ROUTES.account.me}
                        >
                            <img className={styles.icon} src="/icons/account-icon.svg" alt="Иконка профиля" />
                            <div>Настройки аккаунта</div>
                        </NavLink>
                        <NavLink
                            className={({ isActive }) => cn(styles.content_navigate__item, { [styles.active]: isActive })}
                            to={ROUTES.account.address}
                        >
                            <img className={styles.icon} src="/icons/location-icon.svg" alt="Иконка местоположения" />
                            <div>Адреса</div>
                        </NavLink>
                        <NavLink
                            className={({ isActive }) => cn(styles.content_navigate__item, { [styles.active]: isActive })}
                            to={ROUTES.account.orders}
                        >
                            <img className={styles.icon} src="/icons/cart-icon.svg" alt="Иконка корзины" />
                            <div>Заказы</div>
                        </NavLink>
                        <NavLink
                            className={({ isActive }) => cn(styles.content_navigate__item, { [styles.active]: isActive })}
                            to={ROUTES.account.favorites}
                        >
                            <img className={styles.icon} src="/icons/heart-icon.svg" alt="Иконка корзины" />
                            <div>Избранное</div>
                        </NavLink>
                    </div>
                    <div onClick={handlerLogout} className={styles.content_navigate__footer}>
                        <img src="/icons/exit-account-icon.svg" alt="Иконка выхода из аккаунта" />
                        <div className={styles.logout_text}>Logout</div>
                    </div>
                </div>
                <div className={styles.outlet}>
                    <Outlet></Outlet>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}
