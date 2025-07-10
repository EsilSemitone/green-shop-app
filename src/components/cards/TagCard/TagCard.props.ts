import { Tag } from 'contracts-green-shop';
import { HTMLAttributes } from 'react';

export interface ITagCartProps extends HTMLAttributes<HTMLElement> {
    tag: Tag;
}
