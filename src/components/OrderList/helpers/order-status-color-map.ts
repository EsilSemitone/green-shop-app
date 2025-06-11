import { ORDER_STATUS } from 'contracts-green-shop/enums/order-status';
import { OrderStatusColor } from '../types/order-status-color';

export const orderStatusColorMap = new Map<ORDER_STATUS, OrderStatusColor>([
    [ORDER_STATUS.CREATED, 'geekblue'],
    [ORDER_STATUS.PAID, 'green'],
    [ORDER_STATUS.CANCELED, 'volcano'],
]);
