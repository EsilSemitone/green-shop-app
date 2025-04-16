import { Link, NavLink } from 'react-router';
import { IHeaderProps } from './Header-props';
import styles from './Header.module.css';
import cn from 'classnames';
import { Button } from '../Button/Button';
import { useState } from 'react';
import { OrderModal } from '../OrderModal/OrderModal';
import { AuthModal } from '../AuthModal/AuthModal';

export function Header({ className, ...props }: IHeaderProps) {
    const cartCount = 6;
    const [modalIsOpen, setModalIsOpen] = useState(false)

    return (
        <header {...props} className={cn(styles['header'], className)}>
            <img src="/logo.svg" alt="Лого магазина" />
            <div className={cn(styles['header-navigate'])}>
                <NavLink className={({ isActive }) => cn(styles['navigate-item'], { [styles.active]: isActive })} to={'/'}>
                    Shop
                </NavLink>
                <NavLink className={({ isActive }) => cn(styles['navigate-item'], { [styles.active]: isActive })} to={'/cart'}>
                    Plant Care
                </NavLink>
                <NavLink className={({ isActive }) => cn(styles['navigate-item'], { [styles.active]: isActive })} to={'/blog'}>
                    Blogs
                </NavLink>
            </div>
            <div className={cn(styles['header-left'])}>
                <div className={cn(styles['search-input'])}>
                    <input type="text" placeholder="Поиск" />
                    <img src="/icons/search-icon.svg" alt="Иконка поиска" />
                </div>
                <Link className={styles['cart']} to={'/cart'}>
                    <img src="/icons/cart-icon.svg" alt="Иконка корзины" />
                    <div className={styles['cart-count']}>{cartCount}</div>
                </Link>
                <Button onClick={() => {
                        setModalIsOpen(true)
                    }} >
                    <img src="/icons/login-icon.svg" alt="Иконка входа" />
                    Login
                </Button>
            </div>
            <AuthModal isOpen={modalIsOpen} onClose={() => {setModalIsOpen(false)}}>
            </AuthModal>
        </header>
    );
}
