import { Order } from 'contracts';
import { IExtendedOrderItem } from './extended-order-item.interface';

export interface OrderDetails extends Order {
    items: IExtendedOrderItem[];
}
