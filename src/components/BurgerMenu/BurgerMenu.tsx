import { CloseOutlined } from '@ant-design/icons';
import styles from './BurgerMenu.module.css';
import { Link } from 'react-router';
import { ROUTES } from '../../common/constants/routes';
import { IBurgerMenuProps } from './BurgerMenuProps';
import { MouseEvent, useEffect } from 'react';
import { Button } from '../common/Button/Button';

export function BurgerMenu({ onClose, isAuthorized, handleLogin, handlerLogout }: IBurgerMenuProps) {
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const handleAuth = (fn: () => void) => {
        return () => {
            fn();
            onClose();
        };
    };

    const handleInteractive = (e: MouseEvent<HTMLElement>) => {
        const target = e.target;

        if (target instanceof HTMLElement && target.innerText) {
            onClose();
        }
    };

    return (
        <div className={styles.burger_menu}>
            <div className={styles.burger_menu__header}>
                <CloseOutlined onClick={onClose} aria-label="Закрыть меню" />
            </div>

            <div className={styles.burger_menu__logo}>
                <img src="/logo.svg" alt="Лого магазина" />
            </div>

            <div onClick={handleInteractive} className={styles.burger_menu__content}>
                <Link className={styles.navigate_item} to={ROUTES.shop.layout}>
                    Магазин
                </Link>
                <Link className={styles.navigate_item} to={ROUTES.shop.cart}>
                    Корзина
                </Link>
                <Link className={styles.navigate_item} to={ROUTES.shop.blogs}>
                    Блог
                </Link>
                {isAuthorized && (
                    <Link className={styles.navigate_item} to={ROUTES.account.me}>
                        Аккаунт
                    </Link>
                )}
                <Button onClick={isAuthorized ? handleAuth(handlerLogout) : handleAuth(handleLogin)}>
                    <img src="/icons/login-icon.svg" alt="Иконка входа" />
                    {isAuthorized ? 'Выйти' : 'Войти'}
                </Button>
            </div>
        </div>
    );
}
