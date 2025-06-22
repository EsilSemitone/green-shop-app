import { HTMLAttributes } from 'react';
import { ISliderResultValue } from './interfaces/slider-result-value.interface';

export interface ISliderProps extends HTMLAttributes<HTMLElement> {
    min: number;
    max: number;
    defaultValueSlider?: number[];
    onChangeSlider: (value: ISliderResultValue) => void | Promise<void>;
}
