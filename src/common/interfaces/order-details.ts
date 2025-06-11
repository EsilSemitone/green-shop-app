import { Order } from 'contracts-green-shop';
import { IExtendedOrderItem } from './extended-order-item.interface';

export interface OrderDetails extends Order {
    items: IExtendedOrderItem[];
}
