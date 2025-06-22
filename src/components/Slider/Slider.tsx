import { Slider } from 'antd';
import { memo, useEffect, useMemo, useState } from 'react';
import { ISliderProps } from './Slider.props';
import './Slider.css';
import { useDebounce } from 'use-debounce';
import { ISliderResultValue } from './interfaces/slider-result-value.interface';

export const CustomSlider = memo(({ min, max, defaultValueSlider, onChangeSlider }: ISliderProps) => {
    const [sliderValue, setSliderValue] = useState<ISliderResultValue>({
        from: min,
        to: max,
    });
    const [sliderDebounceValue] = useDebounce(sliderValue, 300);

    const sliderChange = (value: number | number[]) => {
        if (typeof value === 'number') {
            return;
        }

        setSliderValue({ from: value[0], to: value[1] });
    };

    useEffect(() => {
        onChangeSlider(sliderDebounceValue);
    }, [onChangeSlider, sliderDebounceValue]);

    const priceRange = useMemo(() => [sliderValue.from, sliderValue.to], [sliderValue]);

    return (
        <Slider
            range
            className="green_slider"
            min={min}
            max={max}
            value={priceRange}
            defaultValue={defaultValueSlider}
            disabled={false}
            onChange={sliderChange}
        />
    );
});
