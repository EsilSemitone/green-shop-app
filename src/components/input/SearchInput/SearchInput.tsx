import styles from './SearchInput.module.css';
import { ISearchInputProps } from './SearchInput.props';
import cn from 'classnames';

export function SearchInput({ visible, value, placeholder, onChange, className }: ISearchInputProps) {
    return (
        <div
            className={cn(styles.search_input, className, {
                [styles.open]: visible,
                [styles.hide]: !visible,
            })}
        >
            <input
                className={styles.search_input__input}
                value={value}
                onChange={onChange}
                type="text"
                placeholder={placeholder}
            ></input>
            <img className={styles.search_img} src="/icons/search-icon.svg" alt="Иконка поиска" />
        </div>
    );
}
