import { memo } from 'react';
import { IPreviewPostProps } from './PreviewPost-props';
import styles from './PreviewPost.module.css';
import cn from 'classnames';
import { Link } from 'react-router';

export const PreviewPost = memo(({ uuid, image, title, description, className }: IPreviewPostProps) => {
    return (
        <div className={cn(styles.post, className)}>
            <img src={image} alt="Изображение карточки" />
            <div className={styles.post_content}>
                <div className={styles.title}>{title}</div>
                <div className={styles.description}>{description}</div>
                <Link className={styles.link} to={`/blog/${uuid}`}>
                    Читать...
                    <img src="/icons/arrow-icon.svg" alt="Стрелочка вправо" />
                </Link>
            </div>
        </div>
    );
});
