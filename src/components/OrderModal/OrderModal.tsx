
import { IModalProps } from './OrderModal-props';
import styles from './OrderModal.module.css';
import { Modal } from '../Modal/Modal';
import { PAYMENT_METHOD } from 'contracts/enums/payment-method.ts';
import { CartComponent } from '../CartComponent/CartComponent';
import { OrderComponent } from '../OrderComponent/OrderComponent';
import { Button } from '../Button/Button';

export function OrderModal({ isOpen, onClose, ...props }: IModalProps) {

    const delivery = 16

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

    const order = {
        orderId: "fj3c934m90c043r",
        createdAt: new Date().toISOString(),
        paymentMethod: PAYMENT_METHOD.YOOKASSA,
        products: [
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
    }


    return <Modal isOpen={isOpen} onClose={onClose}>
        <div className={styles["order-header"]}>
            <div className={styles["order-header--top"]}>
                <img src="/icons/create-order-icon.svg" alt="Изображение с благодарностью за заказ" />
                Your order has been received
            </div>
            <div className={styles["order-header-details"]}>
                <div className={styles["order-header-details--item"]}>
                    <div className={styles["item--title"]}>Order Number</div>
                    <div className={styles["item--value"]}>{order.orderId}</div>
                </div>
                <div className={styles["order-header-details--item"]}>
                    <div className={styles["item--title"]}>Date</div>
                    <div className={styles["item--value"]}>{new Date(order.createdAt).toLocaleDateString()}</div>
                </div>
                <div className={styles["order-header-details--item"]}>
                    <div className={styles["item--title"]}>Total</div>
                    <div className={styles["item--value"]}>{getTotal(order.products)}</div>
                </div>
                <div className={styles["order-header-details--item"]}>
                    <div className={styles["item--title"]}>Payment Method</div>
                    <div className={styles["item--value"]}>{order.paymentMethod}</div>
                </div>
            </div>
            <div className={styles["cart-container"]}>
                <OrderComponent products={order.products}></OrderComponent>
            </div>
        </div>
        <div className={styles['total-container']}>
                <div className={styles['total-container--inner']}>
                    <div className={styles['total-item']}>
                        <div className={styles['total-item--left']}>Delivery</div>
                        <div className={styles['total-item--right']}>{`$${delivery}`}</div>
                    </div>
                    <div className={styles['total-result-item']}>
                        <div className={styles['total-result-left-item']}>Total</div>
                        <div className={styles['total-result-right-item']}>{`$${getTotal(order.products) + delivery}`}</div>
                    </div>
                </div>
        </div>
        <div className={styles['exit-button']}>
            <Button onClick={() => {onClose()}}>Выход</Button>
        </div>
    </Modal>
}
