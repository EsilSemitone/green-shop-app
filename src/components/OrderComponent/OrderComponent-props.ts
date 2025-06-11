import { HTMLAttributes } from 'react';
import { IExtendedOrderItem } from '../../common/interfaces/extended-order-item.interface';

export interface IOrderComponentProps extends HTMLAttributes<HTMLElement> {
    products: IExtendedOrderItem[];
}
