import { Radio as AntRadio, RadioGroupProps } from 'antd';
import './Radio.css';
import cn from 'classnames';
import { AbstractCheckboxGroupProps } from 'antd/es/checkbox/Group';

export function Radio({
    name,
    defaultValue,
    onChange,
    options,
    className,
    ...props
}: AbstractCheckboxGroupProps & RadioGroupProps) {
    return (
        <AntRadio.Group
            {...props}
            className={cn('my-custom-radio-group', className)}
            name={name}
            defaultValue={defaultValue}
            onChange={onChange}
            options={options}
        />
    );
}
