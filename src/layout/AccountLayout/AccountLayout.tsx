import { NavLink, Outlet } from 'react-router';
import styles from './AccountLayout.module.css';
import cn from 'classnames';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { ROUTES } from '../../common/constants/routes';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getProfile } from '../../store/user-slice/async-actions/get-profile';
import { AppDispatch } from '../../store/store';

export function AccountLayout() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getProfile());
    }, []);

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
                            <img src="/icons/account-icon.svg" alt="Иконка профиля" />
                            <div>Настройки аккаунта</div>
                        </NavLink>
                        <NavLink
                            className={({ isActive }) => cn(styles.content_navigate__item, { [styles.active]: isActive })}
                            to={ROUTES.account.address}
                        >
                            <img src="/icons/location-icon.svg" alt="Иконка местоположения" />
                            <div>Адреса</div>
                        </NavLink>
                    </div>
                    <div className={styles.content_navigate__footer}>
                        <NavLink className={styles.content_navigate__item} to={'/'}>
                            <img src="/icons/exit-account-icon.svg" alt="Иконка выхода из аккаунта" />
                            <div className={styles.logout_text}>Logout</div>
                        </NavLink>
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
