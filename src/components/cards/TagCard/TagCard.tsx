import { memo } from 'react';
import styles from './TagCard.module.css';
import { ITagCartProps } from './TagCard.props';

export const TagCard = memo(({ tag, ...props }: ITagCartProps) => {
    return (
        <div {...props} className={styles.tag_cart}>
            <div className={styles.tag_name}>{tag.name}</div>
            <p>
                id: <span>{tag.uuid}</span>
            </p>
        </div>
    );
});
