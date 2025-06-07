import { OrderItem } from 'contracts';

export interface IExtendedOrderItem extends OrderItem {
    image: string | null;
    name: string;
}
