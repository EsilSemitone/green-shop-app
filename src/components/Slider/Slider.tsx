import { Slider } from 'antd';
import { memo } from 'react';
import { ISliderProps } from './Slider.props';
import './Slider.css';

export const CustomSlider = memo(({ min, max, value, defaultValueSlider, onChangeSlider }: ISliderProps) => {
    console.log('render');
    return (
        <Slider
            range
            className="green_slider"
            min={min}
            max={max}
            value={value}
            defaultValue={defaultValueSlider}
            disabled={false}
            onChange={onChangeSlider}
        />
    );
});
