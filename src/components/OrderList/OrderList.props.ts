import { Order } from 'contracts';
import { HTMLAttributes } from 'react';

export interface IOrderListProps extends HTMLAttributes<HTMLElement> {
    orders: Order[];
}
