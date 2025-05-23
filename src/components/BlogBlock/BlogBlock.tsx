import { IBlogBlockProps } from './BlogBlock-props';
import styles from './BlogBlock.module.css';
import cn from 'classnames';
import { PreviewPost } from '../cards/PreviewPost/PreviewPost';

export function BlogBlock({ className, ...props }: IBlogBlockProps) {
    const posts = [
        {
            uuid: '1',
            title: 'Советы по уходу за кактусами и суккулентами',
            description: 'Кактусы — суккуленты, растения, за которыми легко ухаживать, для любого дома или патио.',
            image: '/test-post.png',
        },
        {
            uuid: '2',
            title: 'Советы по уходу за кактусами и суккулентами',
            description: 'Кактусы — суккуленты, растения, за которыми легко ухаживать, для любого дома или патио.',
            image: '/test-post.png',
        },
        {
            uuid: '3',
            title: 'Советы по уходу за кактусами и суккулентами',
            description: 'Кактусы — суккуленты, растения, за которыми легко ухаживать, для любого дома или патио.',
            image: '/test-post.png',
        },
        {
            uuid: '4',
            title: 'Советы по уходу за кактусами и суккулентами',
            description: 'Кактусы — суккуленты, растения, за которыми легко ухаживать, для любого дома или патио.',
            image: '/test-post.png',
        },
    ];

    return (
        <div {...props} className={cn(styles.blog_block, className)}>
            <div className={styles.title}>Наш блог</div>
            <div className={styles.short_description}>
                Мы интернет-магазин растений, предлагающий широкий ассортимент недорогих и модных растений.{' '}
            </div>
            <div className={styles.posts_container}>
                {posts.map((p) => (
                    <PreviewPost
                        key={p.uuid}
                        uuid={p.uuid}
                        title={p.title}
                        description={p.description}
                        image={p.image}
                    ></PreviewPost>
                ))}
            </div>
        </div>
    );
}
