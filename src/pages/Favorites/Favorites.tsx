import { useFavorites } from '../../common/hooks/use-favorites';
import { ProductCard } from '../../components/cards/ProductCard/ProductCard';
import styles from './Favorites.module.css';

export function Favorites() {
    const { favorites, isOnFavorites } = useFavorites();
    return (
        <div className={styles.favorites}>
            <h1>Избранное</h1>
            <div className={styles.favorites_container}>
                {favorites.map((f) => (
                    <ProductCard
                        title={f.name}
                        price={f.price}
                        image={f.image}
                        product_variant_id={f.product_variant_id}
                        uuid={f.uuid}
                        isOnFavorites={isOnFavorites(f.product_variant_id)}
                    ></ProductCard>
                ))}
            </div>
        </div>
    );
}
