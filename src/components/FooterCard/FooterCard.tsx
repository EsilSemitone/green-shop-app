import { IFooterCardProps } from './FooterCard-props';
import styles from './FooterCard.module.css';
import cn from 'classnames';

export function FooterCard({ img, title, description, className }: IFooterCardProps) {
    return (
        <div className={cn(styles['footer-cart'], className)}>
            <img src={img} alt="Изображение карточки" />
            <div className={styles['footer-cart--title']}>{title}</div>
            <div className={styles['footer-cart--description']}>{description}</div>
        </div>
    );
}
