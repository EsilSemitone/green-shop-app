import { ORDER_BY_ORDERS_ENUM } from 'contracts-green-shop';

export const ORDER_BY_OPTIONS = [
    { value: ORDER_BY_ORDERS_ENUM.FIRST_NEW, label: 'Сначала новые' },
    { value: ORDER_BY_ORDERS_ENUM.FIRST_OLD, label: 'Сначала старые' },
    { value: ORDER_BY_ORDERS_ENUM.FIRST_CHEAP, label: 'Сначала дешевые' },
    { value: ORDER_BY_ORDERS_ENUM.FIRST_EXPENSIVE, label: 'Сначала дорогие' },
];
