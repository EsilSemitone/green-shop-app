import { CheckOutlined, EditOutlined, StopOutlined } from '@ant-design/icons';
import styles from './EditField.module.css';
import { IEditFieldProps } from './EditField.props';
import cn from 'classnames';
import { useRef, useState } from 'react';
import { Input } from '../common/Input/Input';

export function EditField({
    value,
    fieldProps,
    fieldStyles,
    inputProps,
    onSave,
    fieldName,
    className,
    ...props
}: IEditFieldProps) {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [currenValue, setCurrentValue] = useState<string>(value);

    const save = async () => {
        const isSave = await onSave({ [fieldName]: currenValue });

        if (isSave) {
            setIsEdit(false);
            oldFiled.current = currenValue;
        }
    };

    const oldFiled = useRef(value);
    return (
        <div {...props} className={cn(styles.edit_field, className)}>
            {!isEdit && (
                <>
                    <div className={cn(styles.filed, fieldStyles)} {...fieldProps}>
                        {currenValue}
                    </div>
                    <EditOutlined
                        onClick={() => {
                            setIsEdit(true);
                            oldFiled.current = currenValue;
                        }}
                    />
                </>
            )}
            {isEdit && (
                <div className={styles.edit}>
                    <Input
                        autoFocus
                        onChange={(e) => {
                            setCurrentValue(e.target.value);
                        }}
                        {...inputProps}
                        value={currenValue}
                    />
                    <div className={styles.edit_props}>
                        <CheckOutlined onClick={save} />
                        <StopOutlined
                            onClick={() => {
                                setIsEdit(false);
                                setCurrentValue(oldFiled.current);
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
