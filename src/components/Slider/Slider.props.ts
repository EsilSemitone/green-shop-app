import { HTMLAttributes } from 'react';

export interface ISliderProps extends HTMLAttributes<HTMLElement> {
    min: number;
    max: number;
    value: [number, number];
    defaultValueSlider?: number[];
    onChangeSlider: (value: number | number[]) => void | Promise<void>;
}
