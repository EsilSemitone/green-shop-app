import { CheckOutlined, EditOutlined, StopOutlined } from '@ant-design/icons';
import styles from './EditFieldSelect.module.css';
import { IEditFieldSelectProps } from './EditFieldSelect.props';
import cn from 'classnames';
import { useRef, useState } from 'react';
import { Select } from 'antd';

export function EditFieldSelect({
    value,
    fieldProps,
    fieldStyles,
    onSave,
    fieldName,
    options,
    middleware
}: IEditFieldSelectProps) {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [currenValue, setCurrentValue] = useState<any>(value);
    const [labelValue, setLabelValue] = useState<any>(value);

    const save = async () => {
        const isSave = await onSave({ [fieldName]: currenValue });

        if (isSave) {
            setIsEdit(false);
            oldFiled.current = labelValue;
        }
    };

    const oldFiled = useRef(value);
    return (
        <div className={styles.edit_field}>
            {!isEdit && (
                <>
                    <div className={cn(styles.filed, fieldStyles)} {...fieldProps}>
                        {labelValue}
                    </div>
                    <EditOutlined
                        onClick={() => {
                            setIsEdit(true);
                            oldFiled.current = labelValue;
                        }}
                    />
                </>
            )}
            {isEdit && (
                <>
                    <Select
                        onChange={(value) => {
                            setCurrentValue(value);
                            setLabelValue(middleware ? middleware(value) : value);
                        }}
                        options={options}
                        defaultValue={
                            currenValue ? currenValue : options.find((o) => o.label === value)?.value || options[0].value
                        }
                    ></Select>
                    <CheckOutlined onClick={save} />
                    <StopOutlined
                        onClick={() => {
                            setIsEdit(false);
                            setLabelValue(oldFiled.current);
                            setCurrentValue(value);
                        }}
                    />
                </>
            )}
        </div>
    );
}
