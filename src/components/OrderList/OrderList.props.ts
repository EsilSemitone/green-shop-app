import { Order } from 'contracts-green-shop';
import { HTMLAttributes } from 'react';

export interface IOrderListProps extends HTMLAttributes<HTMLElement> {
    orders: Order[];
}
