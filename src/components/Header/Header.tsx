import { Link, NavLink, useNavigate } from 'react-router';
import styles from './Header.module.css';
import './headers.css';
import cn from 'classnames';
import { Button } from '../common/Button/Button';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { logoutUser } from '../../store/user-slice/async-actions/logout';
import { cartActions } from '../../store/cart-slice/cart-slice';
import { useDebounce } from 'use-debounce';
import { ApiService } from '../../common/helpers/api.service';
import { IProduct } from '../../common/interfaces/product.interface';
import { AuthModal } from '../modal/AuthModal/AuthModal';
import { getAmountItems } from './helpers/get-amount-items';
import { ROUTES } from '../../common/constants/routes';
import { SearchInput } from '../input/SearchInput/SearchInput';
import { Badge } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import { ORDER_BY_PRODUCT_VARIANTS_ENUM } from 'contracts-green-shop';

export function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const isAuthorized = useSelector((s: RootState) => s.user.jwt);
    const items = useSelector((s: RootState) => s.cart.items);

    const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [searchString, setSearchString] = useState('');
    const [searchResult, setSearchResult] = useState<IProduct[]>([]);
    const [searchValue] = useDebounce(searchString, 300);

    useEffect(() => {
        if (searchValue) {
            const provideSearchResult = async () => {
                try {
                    const { products } = await ApiService.getProducts(
                        `limit=10&offset=0&orderBy=${ORDER_BY_PRODUCT_VARIANTS_ENUM.FIRST_NEW}&search=${searchValue}`,
                    );
                    setSearchResult(products);
                } catch {
                    setSearchResult([]);
                }
            };
            provideSearchResult();
        } else {
            setSearchResult([]);
        }
    }, [searchValue]);

    const navigateToCart = useCallback(() => {
        navigate(ROUTES.shop.cart);
    }, [navigate]);

    const handleProductClick = (uuid: string) => {
        setSearchResult([]);
        setSearchString('');
        navigate(ROUTES.shop.productDynamic(uuid));
    };

    const handlerLogout = () => {
        dispatch(logoutUser());
        dispatch(cartActions.clearCart());
        navigate('/');
    };
    const handleLogin = () => {
        setModalIsOpen(true);
    };

    return (
        <header
            className={cn(styles.header, {
                [styles.header_no_scroll]: isBurgerMenuOpen,
            })}
        >
            <img src="/logo.svg" alt="Лого магазина" />
            <div className={styles.header_navigate}>
                <NavLink
                    className={({ isActive }) => cn(styles.navigate_item, { [styles.active]: isActive })}
                    to={ROUTES.shop.layout}
                >
                    Магазин
                </NavLink>
                <NavLink
                    className={({ isActive }) => cn(styles.navigate_item, { [styles.active]: isActive })}
                    to={ROUTES.shop.cart}
                >
                    Корзина
                </NavLink>
            </div>
            <div className={styles.header_right}>
                <div className={styles.search_wrapper}>
                    <SearchInput
                        placeholder={'Поиск'}
                        value={searchString}
                        onChange={(e) => {
                            setSearchString(e.target.value);
                        }}
                    ></SearchInput>
                    <div
                        className={cn(styles.search_results, {
                            [styles.search_results__open]: searchResult.length > 0,
                        })}
                    >
                        {searchResult.map((product) => (
                            <div
                                key={product.product_variant_id}
                                onClick={() => handleProductClick(product.uuid)}
                                className={styles.search_item}
                            >
                                <img src={product.image ?? '/image-not-found.png'} alt="изображение продукта" />
                                <div>{product.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.cart} onClick={navigateToCart}>
                    <Badge className="green_badge" count={getAmountItems(items)}>
                        <img src="/icons/cart-icon.svg" alt="Иконка корзины" />
                    </Badge>
                </div>

                {isAuthorized && (
                    <Link className={styles.account} to={ROUTES.account.me}>
                        <img src="/icons/account.svg" alt="Иконка пользователя" />
                    </Link>
                )}
                <Button className={styles.auth_button} onClick={isAuthorized ? handlerLogout : handleLogin}>
                    <img src="/icons/login-icon.svg" alt="Иконка входа" />
                    {isAuthorized ? 'Выйти' : 'Войти'}
                </Button>
            </div>
            <MenuOutlined onClick={() => setIsBurgerMenuOpen(true)} className={styles.burger_menu__icon} />

            {isBurgerMenuOpen && (
                <BurgerMenu
                    onClose={() => setIsBurgerMenuOpen(false)}
                    isAuthorized={!!isAuthorized}
                    handlerLogout={handlerLogout}
                    handleLogin={handleLogin}
                ></BurgerMenu>
            )}

            <AuthModal
                isOpen={modalIsOpen}
                onClose={() => {
                    setModalIsOpen(false);
                }}
            ></AuthModal>
        </header>
    );
}
