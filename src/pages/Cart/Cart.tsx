import styles from './Cart.module.css';
import { Link } from 'react-router';
import { Button } from '../../components/common/Button/Button';
import { CartComponent } from '../../components/CartComponent/CartComponent';
import { SimilarProducts } from '../../components/SimilarProducts/SimilarProducts';
import { useEffect, useState } from 'react';
import { PAYMENT_METHOD } from 'contracts-green-shop/enums/payment-method.ts';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { getCurrentProducts } from './helpers/getCurrentProducts';
import { EnrichedCartElement } from './types/enriched-cart-element';
import { getTotal } from './helpers/get-total';
import { getAllAddress } from '../../store/address-slice/async-actions/get-all-address';
import { AuthModal } from '../../components/modal/AuthModal/AuthModal';
import { OrderModal } from '../../components/modal/OrderModal/OrderModal';
import { extractTagsFromProducts } from './helpers/extract-tags-from-products';
import { ROUTES } from '../../common/constants/routes';
import { RadioChangeEvent } from 'antd';
import { Radio } from '../../components/Radio/Radio';
import { ApiService } from '../../common/helpers/api.service';
import { ExtendedOrder, PaymentMethod } from 'contracts-green-shop';
import { cartActions } from '../../store/cart-slice/cart-slice';

export function Cart() {
    const dispatch = useDispatch<AppDispatch>();

    const cartItems = useSelector((s: RootState) => s.cart.items);
    const isAuthorized = useSelector((s: RootState) => s.user.jwt);
    const addresses = useSelector((s: RootState) => s.address.addresses);

    const [products, setProducts] = useState<EnrichedCartElement[]>([]);
    const [address, setAddress] = useState<string | null>(null);
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
    const [activePayment, setActivePayment] = useState<PAYMENT_METHOD>();

    const [orderModalIsOpen, setOrderModalIsOpen] = useState(false);
    const [authModalIsOpen, setAuthModalIsOpen] = useState(false);

    const [order, setOrder] = useState<ExtendedOrder | null>(null);

    useEffect(() => {
        const provideProducts = async () => {
            const currentProducts = await getCurrentProducts(cartItems);
            setProducts(currentProducts);
        };

        const provideAddresses = async () => {
            await dispatch(getAllAddress());
        };

        const providePaymentMethods = async () => {
            const paymentMethods = await ApiService.getPaymentMethods();
            setPaymentMethods(paymentMethods.methods);
            setActivePayment(paymentMethods.methods[0].name as PAYMENT_METHOD);
        };
        provideAddresses();
        provideProducts();
        providePaymentMethods();
    }, []);

    useEffect(() => {
        if (addresses.length > 0) {
            setAddress(addresses[0].uuid);
        }
    }, [addresses]);

    useEffect(() => {
        const res: EnrichedCartElement[] = [];

        cartItems.forEach((element) => {
            const product = products.find((p) => p.product_variant_id === element.product_variant_id);

            if (product) {
                res.push({ ...product, quantity: element.quantity });
            }
        });

        setProducts(res);
    }, [cartItems]);

    const selectAddress = (e: RadioChangeEvent) => {
        setAddress(e.target.value);
    };

    const selectPayment = (e: RadioChangeEvent) => {
        setActivePayment(e.target.value);
    };

    const openAuthModal = () => {
        setAuthModalIsOpen(true);
    };

    const closeAuthModal = () => {
        setAuthModalIsOpen(false);
    };

    const createOrder = async () => {
        if (!address || !activePayment) {
            console.log('Не выбран адрес или способ оплаты');
            return;
        }
        const create = async (address_id: string, payment_method: PAYMENT_METHOD) => {
            try {
                const { isSuccess, payload } = await ApiService.createOrder({ payment_method, address_id });

                if (!isSuccess || !payload.data) {
                    console.error('Не удалось создать заказ');
                    return;
                }

                setOrder(payload.data);
                dispatch(cartActions.clearCart());

                if (payload.payment_link) {
                    window.open(payload.payment_link, '_blank', 'noopener,noreferrer');
                }
            } catch (e) {
                console.error(e);
            }
        };

        create(address, activePayment);
        setOrderModalIsOpen(true);
    };

    const closeOrderModal = () => {
        setOrderModalIsOpen(false);
    };

    return (
        <div className={styles.cart}>
            <div className={styles.cart_container}>
                <CartComponent className={styles.cart_component} products={products}></CartComponent>
                <div className={styles.total}>
                    <div className={styles.total_title}>Итого</div>
                    <div className={styles.total_container}>
                        <div className={styles.total_item}>
                            <div className={styles.total_item__left}>Цена</div>
                            <div className={styles.total_item__right}>{`${getTotal(products)}₽`}</div>
                        </div>
                        <div className={styles.total_item}>
                            <div className={styles.total_item__left}>Доставка</div>
                            <div className={styles.total_item__right}>{`${
                                paymentMethods.find((m) => m.name === activePayment)?.price
                            }₽`}</div>
                        </div>
                        <div className={styles.total_result_item}>
                            <div className={styles.total_result_left_item}>Общая сумма</div>
                            <div className={styles.total_result_right_item}>{`${getTotal(
                                products,
                                Number(paymentMethods.find((m) => m.name === activePayment)?.price || 0),
                            )}₽`}</div>
                        </div>
                    </div>
                    {!isAuthorized && (
                        <p className={styles.warning_info}>
                            Для оформления заказа необходимо{' '}
                            <span onClick={openAuthModal} className={styles.link}>
                                авторизоваться
                            </span>
                        </p>
                    )}
                    {isAuthorized && (
                        <>
                            <Button onClick={createOrder}>Сделать заказ</Button>
                            <div className={styles.select}>
                                <div>Адрес</div>
                                {addresses.length === 0 && (
                                    <div className={styles.select_address__nullable_title}>
                                        У вас не указан адрес, вы можете сделать это в{' '}
                                        <Link className={styles.link} to={ROUTES.account.address}>
                                            личном кабинете.
                                        </Link>
                                    </div>
                                )}
                                {addresses.length > 0 && (
                                    <Radio
                                        name="addressGroup"
                                        defaultValue={addresses[0].uuid}
                                        onChange={selectAddress}
                                        options={addresses.map((a) => {
                                            return {
                                                value: a.uuid,
                                                label: (
                                                    <div>
                                                        <b>{a.city}</b>
                                                        {` ${a.street_address} ${a.phone_number}`}
                                                    </div>
                                                ),
                                            };
                                        })}
                                    ></Radio>
                                )}
                            </div>

                            <div className={styles.select}>
                                <div>Метод оплаты</div>
                                <Radio
                                    name="paymentGroup"
                                    value={activePayment}
                                    onChange={selectPayment}
                                    options={paymentMethods.map((m) => {
                                        return { value: m.name, label: m.description };
                                    })}
                                ></Radio>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <OrderModal isOpen={orderModalIsOpen} onClose={closeOrderModal} order={order}></OrderModal>
            <AuthModal isOpen={authModalIsOpen} onClose={closeAuthModal}></AuthModal>

            <SimilarProducts className={styles.swiper} tags={extractTagsFromProducts(products)}></SimilarProducts>
        </div>
    );
}
