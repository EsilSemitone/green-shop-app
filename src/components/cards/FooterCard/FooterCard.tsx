import { IFooterCardProps } from './FooterCard-props';
import styles from './FooterCard.module.css';
import cn from 'classnames';

export function FooterCard({ img, title, className }: IFooterCardProps) {
    return (
        <div className={cn(styles.footer_cart, className)}>
            <img src={img} alt="Изображение карточки" />
            <div className={styles.footer_cart__title}>{title}</div>
        </div>
    );
}
