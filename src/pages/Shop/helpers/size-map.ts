import { SIZE } from 'contracts/enums/size.ts';

export const sizeMap = new Map<string, SIZE>([
    ['Небольшой', SIZE.SMALL],
    ['Средний', SIZE.MEDIUM],
    ['Большой', SIZE.LARGE],
]);

export const sizeInvertMap = new Map<SIZE, string>([
    [SIZE.SMALL, 'Небольшой'],
    [SIZE.MEDIUM, 'Средний'],
    [SIZE.LARGE, 'Большой'],
]);
