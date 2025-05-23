import { HTMLAttributes } from 'react';

export interface IPaginationProps extends HTMLAttributes<HTMLElement> {
    page: number;
    totalPage: number;
    goToPage: (p: number) => void;
}
