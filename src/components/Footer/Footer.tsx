import { FooterCard } from '../cards/FooterCard/FooterCard';
import { IFooterProps } from './Footer-props';
import styles from './Footer.module.css';
import cn from 'classnames';

export function Footer({ className, ...props }: IFooterProps) {
    return (
        <div {...props} className={cn(styles.footer, className)}>
            <div className={styles.footer_top}>
                <FooterCard img={'/footer/image-1.svg'} title={'Уход за садом'}></FooterCard>
                <FooterCard img={'/footer/image-2.svg'} title={'Уход за растениями'}></FooterCard>
                <FooterCard img={'/footer/image-3.svg'} title={'Уход за садом'}></FooterCard>
            </div>
            <div className={styles.footer_bottom}>
                <div className={styles.footer_bottom__item}>
                    <img src="/footer/location-icon.svg" alt="Иконка локации" />
                    г. Городской ул. Уличная 123
                </div>
                <div className={styles.footer_bottom__item}>
                    <img src="/footer/mail-icon.svg" alt="Иконка письма" />
                    contact@greenshop.com
                </div>
                <div className={styles.footer_bottom__item}>
                    <img src="/footer/phone-icon.svg" alt="Иконка телефона" />
                    +123123123123
                </div>
            </div>
            <div className={styles.footer_right}>© 2025 GreenShop. Все права защищены.</div>
        </div>
    );
}
