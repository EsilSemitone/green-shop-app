import { NavLink, Outlet, useNavigate } from 'react-router';
import { ROUTES } from '../../common/constants/routes';
import styles from './AdminLayout.module.css';
import cn from 'classnames';
import { Collapse, CollapseProps } from 'antd';
import { Button } from '../../components/common/Button/Button';
import { useCallback } from 'react';

export default function AdminLayout() {
    const navigate = useNavigate();

    const exitButtonHandle = useCallback(() => {
        navigate(ROUTES.shop.products);
    }, []);

    const userItem: CollapseProps['items'] = [
        {
            key: '1',
            label: (
                <div className={styles.menu_navigate_item}>
                    <img className={styles.icon} src="/icons/account-icon.svg" alt="Иконка профиля" />
                    Пользователи
                </div>
            ),
            children: (
                <div>
                    <NavLink
                        className={({ isActive }) => cn(styles.menu_item, { [styles.active]: isActive })}
                        to={ROUTES.admin.userStats}
                    >
                        <div>Статистика</div>
                    </NavLink>
                    <NavLink
                        className={({ isActive }) => cn(styles.menu_item, { [styles.active]: isActive })}
                        to={ROUTES.admin.users}
                    >
                        <div>Пользователи</div>
                    </NavLink>
                </div>
            ),
            showArrow: false,
        },
        {
            key: '2',
            label: (
                <div className={styles.menu_navigate_item}>
                    <img className={styles.icon} src="/icons/cart-icon.svg" alt="Иконка корзины" />
                    Продукты
                </div>
            ),
            children: (
                <div>
                    <NavLink
                        className={({ isActive }) => cn(styles.menu_item, { [styles.active]: isActive })}
                        to={ROUTES.admin.products}
                    >
                        <div>Продукты</div>
                    </NavLink>
                    <NavLink
                        className={({ isActive }) => cn(styles.menu_item, { [styles.active]: isActive })}
                        to={ROUTES.admin.createProduct}
                    >
                        <div>Добавить продукт</div>
                    </NavLink>
                </div>
            ),
            showArrow: false,
        },
    ];

    return (
        <div className={styles.layout}>
            <header className={styles.layout_header}>
                <h1 className={styles.header_title}>Панель администратора</h1>
                <Button onClick={exitButtonHandle} className={styles.exit_button}>
                    Выйти
                </Button>
            </header>
            <div className={styles.content}>
                <div className={styles.menu}>
                    <Collapse defaultActiveKey={['1', '2']} ghost items={userItem} />
                </div>
                <div className={styles.outlet}>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
}
