import { CloseOutlined } from '@ant-design/icons';
import styles from './EditImage.module.css';
import { IEditImageProps } from './EditImage.props';
import cn from 'classnames';

export function EditImage({ src, alt, onDelete, className, ...props }: IEditImageProps) {
    const handleDelete = async () => {
        await onDelete(src);
    };

    return (
        <div {...props} className={cn(styles.edit_image, className)}>
            <img className={styles.image} src={src} alt={alt || ''} />
            <CloseOutlined onClick={handleDelete} className={styles.delete_button} />
        </div>
    );
}
