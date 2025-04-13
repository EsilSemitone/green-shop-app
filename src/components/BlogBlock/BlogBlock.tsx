import { IBlogBlockProps } from './BlogBlock-props';
import styles from './BlogBlock.module.css';
import cn from 'classnames';
import { PreviewPost } from '../PreviewPost/PreviewPost';

export function BlogBlock({ className, ...props }: IBlogBlockProps) {

    const posts = [
        {uuid: "1", title: "Cactus & Succulent Care Tips", description: "Cacti are succulents are easy care plants for any home or patio.", image: "/test-post.png"},
        {uuid: "2", title: "Cactus & Succulent Care Tips", description: "Cacti are succulents are easy care plants for any home or patio.", image: "/test-post.png"},
        {uuid: "3", title: "Cactus & Succulent Care Tips", description: "Cacti are succulents are easy care plants for any home or patio.", image: "/test-post.png"},
        {uuid: "4", title: "Cactus & Succulent Care Tips", description: "Cacti are succulents are easy care plants for any home or patio.", image: "/test-post.png"},
    ]

    return (
        <div {...props} className={cn(styles['blog-block'], className)}>
            <div className={styles['title']}>Our Blog Posts</div>
            <div className={styles['short-description']}>We are an online plant shop offering a wide range of cheap and trendy plants. </div>
            <div className={styles['posts-container']}>
                {posts.map(p => 
                <PreviewPost 
                    key={p.uuid} 
                    uuid={p.uuid} 
                    title={p.title} 
                    description={p.description} 
                    image={p.image}>
                </PreviewPost>)}
            </div>
        </div>
    );
}
