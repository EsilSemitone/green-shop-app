import { FooterCard } from '../FooterCard/FooterCard';
import { IHeaderProps } from './Footer-props';
import styles from './Footer.module.css';
import cn from 'classnames';

export function Footer({ className, ...props }: IHeaderProps) {
    return (
        <div {...props} className={cn(styles['footer'], className)}>
            <div className={styles['footer-top']}>
                <FooterCard
                    className={styles['']}
                    img={'/footer/image-1.svg'}
                    title={'Garden Care'}
                    description={'We are an online plant shop offering a wide range of cheap and trendy plants.'}
                ></FooterCard>
                <FooterCard
                    className={styles['']}
                    img={'/footer/image-2.svg'}
                    title={'Plant Renovation'}
                    description={'We are an online plant shop offering a wide range of cheap and trendy plants.'}
                ></FooterCard>
                <FooterCard
                    className={styles['']}
                    img={'/footer/image-3.svg'}
                    title={'Watering Graden'}
                    description={'We are an online plant shop offering a wide range of cheap and trendy plants.'}
                ></FooterCard>
            </div>
            <div className={styles['footer-bottom']}>
                <div className={styles['footer-bottom--item']}>
                    <img src="/footer/location-icon.svg" alt="" />
                    70 West Buckingham Ave. Farmingdale, NY 11735
                </div>
                <div className={styles['footer-bottom--item']}>
                    <img src="/footer/mail-icon.svg" alt="" />
                    contact@greenshop.com
                </div>
                <div className={styles['footer-bottom--item']}>
                    <img src="/footer/phone-icon.svg" alt="" />
                    +88 01911 717 490
                </div>
            </div>
            <div className={styles['footer-right']}>© 2021 GreenShop. All Rights Reserved.</div>
        </div>
    );
}
