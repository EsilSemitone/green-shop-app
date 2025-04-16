import { NavLink, Outlet } from 'react-router';
import styles from './AccountLayout.module.css';
import cn from 'classnames';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';

export function AccountLayout() {
    return (
        <div className={cn(styles['layout'])}>
            <Header></Header>
            <div className={styles['content']}>
                <div className={styles['content-navigate']}>
                    <div className={styles['content-navigate--header']}>My Account</div>
                    <div className={styles['content-navigate--body']}>
                        <NavLink
                            className={({ isActive }) => cn(styles['content-navigate--item'], { [styles.active]: isActive })}
                            to={'/account/me'}
                        >
                            <img src="/icons/account-icon.svg" alt="Иконка профиля" />
                            <div>Account Details</div>
                        </NavLink>
                        <NavLink
                            className={({ isActive }) => cn(styles['content-navigate--item'], { [styles.active]: isActive })}
                            to={'/account/address'}
                        >
                            <img src="/icons/location-icon.svg" alt="Иконка местоположения" />
                            <div>Address</div>
                        </NavLink>
                    </div>
                    <div className={styles['content-navigate--footer']}>
                        <NavLink className={styles['content-navigate--item']} to={'/'}>
                            <img src="/icons/exit-account-icon.svg" alt="Иконка выхода из аккаунта" />
                            <div className={styles['logout-text']}>Logout</div>
                        </NavLink>
                    </div>
                </div>
                <div className={styles['outlet']}>
                    <Outlet></Outlet>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}
