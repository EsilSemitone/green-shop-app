import { memo } from 'react';
import { NavigateButton } from '../button/NavigateButton/NavigateButton';
import styles from './Pagination.module.css';
import { IPaginationProps } from './Pagination.props';
import cn from 'classnames';

export const Pagination = memo(({ className, page, totalPage, goToPage }: IPaginationProps) => {
    const getPagination = (page: number, totalPages: number, goToPage: (p: number) => void) => {
        const result: React.ReactNode[] = [];

        const renderPageButton = (p: number) => (
            <NavigateButton
                isActive={p === page}
                key={p}
                onClick={() => goToPage(p)}
                className={`${styles['navigate-button']} ${p === page ? styles.active : ''}`}
            >
                {p}
            </NavigateButton>
        );

        if (page > 1) {
            result.push(
                <NavigateButton key="prev" onClick={() => goToPage(page - 1)} className={styles['navigate-button']}>
                    {'<'}
                </NavigateButton>,
            );
        }

        result.push(renderPageButton(1));

        if (page > 3) {
            result.push(<span key="start-ellipsis"> ... </span>);
        }

        for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
            result.push(renderPageButton(i));
        }

        if (page < totalPages - 2) {
            result.push(<span key="end-ellipsis"> ... </span>);
        }

        if (totalPages > 1) {
            result.push(renderPageButton(totalPages));
        }

        if (page < totalPages) {
            result.push(
                <NavigateButton key="next" onClick={() => goToPage(page + 1)} className={styles['navigate-button']}>
                    {'>'}
                </NavigateButton>,
            );
        }

        return result;
    };

    return <div className={cn(styles.pagination, className)}>{getPagination(page, totalPage, goToPage)}</div>;
});
