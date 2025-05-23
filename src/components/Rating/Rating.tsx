import cn from 'classnames';
import styles from './Rating.module.css';
import { memo } from 'react';
import { IRatingProps } from './Rating.props';

export const Rating = memo(({ className, rating }: IRatingProps) => {
    const getStarsRating = () => {
        const res = [];
        const stars = Math.floor(rating || 5);

        for (let i = 1; i < 6; i++) {
            if (i <= stars) {
                res.push(<img key={i} src="/icons/star-icon.svg" alt="Иконка звезды" />);
            } else {
                res.push(<img key={i} src="/icons/star-gray-icon.svg" alt="Серая конка звезды" />);
            }
        }
        return res;
    };
    return <div className={cn(styles.rating, className)}>{getStarsRating()}</div>;
});
