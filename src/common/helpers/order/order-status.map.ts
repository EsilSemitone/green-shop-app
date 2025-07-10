import { ORDER_STATUS } from 'contracts-green-shop';

export const orderStatusMap = new Map<ORDER_STATUS, string>([
    [ORDER_STATUS.CANCELED, 'Отменен'],
    [ORDER_STATUS.CREATED, 'Создан'],
    [ORDER_STATUS.PAID, 'Оплачен'],
]);
