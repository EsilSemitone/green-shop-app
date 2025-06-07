import { HTMLAttributes } from 'react';
import { IExtendedOrderItem } from '../modal/OrderModal/interfaces/extended-order-item.interface';

export interface IOrderComponentProps extends HTMLAttributes<HTMLElement> {
    products: IExtendedOrderItem[];
}
