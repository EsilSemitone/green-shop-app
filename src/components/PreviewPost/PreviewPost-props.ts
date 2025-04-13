import { HTMLAttributes } from 'react';

export interface IPreviewPostProps extends HTMLAttributes<HTMLElement> {
    uuid: string;
    title: string;
    description: string;
    image: string
}
