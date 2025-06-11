import { OrderItem } from 'contracts-green-shop';

export interface IExtendedOrderItem extends OrderItem {
    image: string | null;
    name: string;
}
