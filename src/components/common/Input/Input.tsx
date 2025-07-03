import { IInputProps } from './Input-props';
import styles from './Input.module.css';
import cn from 'classnames';

export function Input({ className, isValid = true, isTextArea = false, textAreaProps, ...props }: IInputProps) {
    if (isTextArea) {
        return <textarea className={cn(className, styles['input'])} {...textAreaProps}></textarea>;
    }
    return <input {...props} className={cn(className, styles['input'], { [styles.invalid]: !isValid })} />;
}
