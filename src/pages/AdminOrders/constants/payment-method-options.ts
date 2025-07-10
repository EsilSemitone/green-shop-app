import { PAYMENT_METHOD } from 'contracts-green-shop';
import { COMMON_OPTIONS } from '../../../common/constants/common-options';

export const PAYMENT_METHOD_OPTIONS = [
    COMMON_OPTIONS.all,
    { value: PAYMENT_METHOD.CASH, label: 'Наличными' },
    { value: PAYMENT_METHOD.YOOKASSA, label: 'Оплата Юкассой' },
];
