import { ORDER_STATUS } from 'contracts-green-shop';
import { orderStatusMap } from '../../../common/helpers/order/order-status.map';

export const STATUS_OPTIONS = [
    { value: 'all', label: 'Все' },
    { value: ORDER_STATUS.CANCELED, label: orderStatusMap.get(ORDER_STATUS.CANCELED) },
    { value: ORDER_STATUS.CREATED, label: orderStatusMap.get(ORDER_STATUS.CREATED) },
    { value: ORDER_STATUS.PAID, label: orderStatusMap.get(ORDER_STATUS.PAID) },
];
