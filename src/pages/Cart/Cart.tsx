import { Link } from 'react-router';
import { Button } from '../../components/Button/Button';
import { CartComponent } from '../../components/CartComponent/CartComponent';
import { SimilarProducts } from '../../components/SimilarProducts/SimilarProducts';
import styles from './Cart.module.css';
import cn from 'classnames';
import { MouseEvent, useState } from 'react';
import { PAYMENT_METHOD } from 'contracts/enums/payment-method.ts';
import { OrderModal } from '../../components/OrderModal/OrderModal';

export function Cart() {

    const getTotal = (products: {
        uuid: string;
        name: string;
        price: number;
        images: string[];
        count: number;
    }[]) => {
        return products.reduce((acc, value) => {
            return acc + (value.price * value.count)
        }, 0)
    }

    const delivery = 16

    const products = [
        {
            uuid: "1",
            name: "Barberton Daisy",
            price: 119,
            images: ["/test-image.png", "/test-image2.png", "/test-image.png", "/test-image2.png", "/test-image.png", "/test-image2.png",],
            count: 12,
        },
        {
            uuid: "2",
            name: "Barberton Daisy",
            price: 119,
            images: ["/test-image.png", "/test-image2.png", "/test-image.png", "/test-image2.png", "/test-image.png", "/test-image2.png",],
            count: 12,
        },
        {
            uuid: "3",
            name: "Barberton Daisy",
            price: 119,
            images: ["/test-image.png", "/test-image2.png", "/test-image.png", "/test-image2.png", "/test-image.png", "/test-image2.png",],
            count: 12,
        },
        {
            uuid: "4",
            name: "Barberton Daisy",
            price: 119,
            images: ["/test-image.png", "/test-image2.png", "/test-image.png", "/test-image2.png", "/test-image.png", "/test-image2.png",],
            count: 12,
        },
        {
            uuid: "5",
            name: "Barberton Daisy",
            price: 119,
            images: ["/test-image.png", "/test-image2.png", "/test-image.png", "/test-image2.png", "/test-image.png", "/test-image2.png",],
            count: 12,
        },
        {
            uuid: "6",
            name: "Barberton Daisy",
            price: 119,
            images: ["/test-image.png", "/test-image2.png", "/test-image.png", "/test-image2.png", "/test-image.png", "/test-image2.png",],
            count: 12,
        },
        {
            uuid: "7",
            name: "Barberton Daisy",
            price: 119,
            images: ["/test-image.png", "/test-image2.png", "/test-image.png", "/test-image2.png", "/test-image.png", "/test-image2.png",],
            count: 12,
        },
        {
            uuid: "8",
            name: "Barberton Daisy",
            price: 119,
            images: ["/test-image.png", "/test-image2.png", "/test-image.png", "/test-image2.png", "/test-image.png", "/test-image2.png",],
            count: 12,
        },
    ]

    const similarProducts = [
        {uuid: "1" ,title: "Beach Spider Lily", price: 234, image: "/test-image.png"},
        {uuid: "2" ,title: "Beach Spider Lily", price: 234, image: "/test-image.png"},
        {uuid: "3" ,title: "Beach Spider Lily", price: 234, image: "/test-image.png"},
        {uuid: "4" ,title: "Beach Spider Lily", price: 234, image: "/test-image.png"},
        {uuid: "5" ,title: "Beach Spider Lily", price: 234, image: "/test-image.png"},
        {uuid: "6" ,title: "Beach Spider Lily", price: 234, image: "/test-image.png"},
        {uuid: "7" ,title: "Beach Spider Lily", price: 234, image: "/test-image.png"},
        {uuid: "8" ,title: "Beach Spider Lily", price: 234, image: "/test-image.png"},
    ] 
    const addressArray = [
        {uuid: "1", name: "г. Москва ул Московская 2345"},
        {uuid: "2", name: "г. Питер ул Московская 2345"},
        {uuid: "3", name: "г. Екатеринбург ул Московская 2345"},
    ]

    interface InputEvent extends MouseEvent {
        target: InputEventTarget
    }

    interface InputEventTarget extends EventTarget {
        id?: string
    }

    const [address, setAddress] = useState<string | undefined>(addressArray[0].uuid)
    const [payment, setPayment] = useState<PAYMENT_METHOD>(PAYMENT_METHOD.YOOKASSA)
    const [modalIsOpen, setModalIsOpen] = useState(false)


    const selectAddress = (e: InputEvent) => {
        setAddress(e.target?.id)
    }

    const selectPayment = (e: InputEvent) => {
        setPayment(e.target?.id as PAYMENT_METHOD)
    }


    return (
    <div className={cn(styles['cart'])}>
        <div className={cn(styles['cart-container'])}>
            <CartComponent  className={cn(styles['cart-component'])} products={products}></CartComponent>
            <div className={styles['total']}>
                <div className={styles['total-title']}>Cart Totals</div>
                <div className={styles['total-container']}>
                    <div className={styles['total-item']}>
                        <div className={styles['total-item--left']}>Subtotal</div>
                        <div className={styles['total-item--right']}>{`$${getTotal(products)}`}</div>
                    </div>
                    <div className={styles['total-item']}>
                        <div className={styles['total-item--left']}>Delivery</div>
                        <div className={styles['total-item--right']}>{`$${delivery}`}</div>
                    </div>
                    <div className={styles['total-result-item']}>
                        <div className={styles['total-result-left-item']}>Total</div>
                        <div className={styles['total-result-right-item']}>{`$${getTotal(products) + delivery}`}</div>
                    </div>
                </div>
                <Button onClick={() => {setModalIsOpen(true)}}>Place Order</Button>
                <div className={styles['select']}>
                    {addressArray.map((a) => {
                        return <>
                            <input onClick={selectAddress} className={styles['radio-input']} type="radio" name="address" id={a.uuid} />
                            <label className={cn(styles['select-item'], {[styles["active-select-item"]]:  a.uuid === address})} htmlFor={a.uuid}>
                                <div className={styles['icon-select']}>
                                    <div className={styles['icon-select--inner']}></div>
                                </div>
                                <div className={styles['select-text']}>{a.name}</div>
                            </label>
                        </>
                    })}
                </div>
                <div className={styles['select']}>
                    <input onClick={selectPayment} className={styles['radio-input']} type="radio" name="address" id={PAYMENT_METHOD.YOOKASSA} />
                    <label className={cn(styles['select-item'], {[styles["active-select-item"]]:  payment === PAYMENT_METHOD.YOOKASSA})} htmlFor={PAYMENT_METHOD.YOOKASSA}>
                        <div className={styles['icon-select']}>
                            <div className={styles['icon-select--inner']}></div>
                        </div>
                        <div className={styles['select-text']}>Оплата ЮКасса</div>
                    </label>
                    <input onClick={selectPayment} className={styles['radio-input']} type="radio" name="address" id={PAYMENT_METHOD.CASH} />
                    <label className={cn(styles['select-item'], {[styles["active-select-item"]]:  payment === PAYMENT_METHOD.CASH})} htmlFor={PAYMENT_METHOD.CASH}>
                        <div className={styles['icon-select']}>
                            <div className={styles['icon-select--inner']}></div>
                        </div>
                        <div className={styles['select-text']}>Оплата при получении</div>
                    </label>
                </div>
                <div className={styles['select-address--nullable-title']}>У вас не указан адрес, вы можете сделать это в <Link className={styles["link"]} to={'/account/address'}>личном кабинете.</Link></div>
                <OrderModal isOpen={modalIsOpen} onClose={() => {setModalIsOpen(false)}}>
                </OrderModal>
            </div>
        </div>
        <div className={styles["similar-products"]}>
            <div className={styles['similar-products--title']}>Releted Products</div>
            <SimilarProducts  className={styles["swiper"]} similarProducts={similarProducts}></SimilarProducts>
        </div>
    </div>
    );
}
