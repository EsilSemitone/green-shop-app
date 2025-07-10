import { SIZE } from 'contracts-green-shop';
import { sizeInvertMap } from '../../../../pages/Shop/helpers/size-map';

export const SIZE_OPTIONS = [
    { value: SIZE.LARGE, label: sizeInvertMap.get(SIZE.LARGE) },
    { value: SIZE.MEDIUM, label: sizeInvertMap.get(SIZE.MEDIUM) },
    { value: SIZE.SMALL, label: sizeInvertMap.get(SIZE.SMALL) },
];
