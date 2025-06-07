import { HTMLAttributes } from 'react';
import { IExtendedOrderItem } from '../../common/interfaces/extended-order-item.interface';

export interface IOrderItemProps extends HTMLAttributes<HTMLElement> {
    product: IExtendedOrderItem;
}
