import styles from './NotFoundPage.module.css';

export function NotFoundPage() {
    return (
        <div className={styles.error_wrapper}>
            <div className={styles.error_container}>
                <img src="/plant.png" alt="Изображение растения" />
                <p>Упс... страница не найдена...</p>
            </div>
        </div>
    );
}
