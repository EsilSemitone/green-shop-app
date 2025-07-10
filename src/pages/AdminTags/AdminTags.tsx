import { Tag } from 'contracts-green-shop';
import { useTags } from '../../common/hooks/use-tags';
import { TagCard } from '../../components/cards/TagCard/TagCard';
import { TagForm } from '../../components/form/TagForm/TagForm';
import { Loader } from '../../components/Loader/Loader';
import styles from './AdminTags.module.css';
import { useCallback } from 'react';

export default function AdminTags() {
    const { tags, setTags, isLoad } = useTags();

    const onCreate = useCallback((tag: Tag) => {
        setTags((prev) => {
            if (!prev) {
                return [tag];
            }
            return [tag, ...prev];
        });
    }, []);

    return (
        <div className={styles.tags_page}>
            <h1>Теги</h1>
            <div className={styles.container}>
                <div className={styles.left}>
                    <h3>Добавить новый</h3>
                    <TagForm onCreate={onCreate}></TagForm>
                </div>
                <div className={styles.right}>
                    <h3>Все теги</h3>
                    <div className={styles.tags_container}>
                        {isLoad && <Loader></Loader>}
                        {!isLoad && !tags && <p>Произошла ошибка при получении тегов</p>}
                        {tags
                            ? tags.map((t) => {
                                  return <TagCard key={t.uuid} tag={t}></TagCard>;
                              })
                            : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
