import './Swiper.css';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import 'swiper/css';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import 'swiper/css/pagination';
import styles from './SimilarProducts.module.css';
import cn from 'classnames';
import { ISimilarProductsProps } from './SimilarProducts-props';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { ProductCard } from '../cards/ProductCard/ProductCard';
import { memo, useCallback, useEffect, useState } from 'react';
import { GetSimilarProductVariantsResponseDto } from 'contracts-green-shop';
import { ApiService } from '../../common/helpers/api.service';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { isOnFavorites } from '../../common/helpers/is-on-favorites';

export const SimilarProducts = memo(({ className, tags, ...props }: ISimilarProductsProps) => {
    const favorites = useSelector((s: RootState) => s.favorites.favorites);
    const [similarProducts, setSimilarProducts] = useState<GetSimilarProductVariantsResponseDto>();

    const provideSimilarProducts = useCallback(async () => {
        const data = await ApiService.getSimilarProductVariants(tags);
        setSimilarProducts(data);
    }, [tags]);

    useEffect(() => {
        provideSimilarProducts();
    }, [provideSimilarProducts]);

    return (
        <>
            {!similarProducts && <div></div>}
            {similarProducts && (
                <div {...props} className={styles.similar_products}>
                    <div className={styles.similar_products__title}>Похожие продукты</div>
                    <Swiper
                        className={cn('swiper', className)}
                        // style={{ padding: '0 0 3em 0' }}
                        modules={[Pagination]}
                        spaceBetween={10}
                        // slidesPerView={5}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            1500: { slidesPerView: 5, spaceBetween: 2 },
                            1480: { slidesPerView: 4 },
                            800: { slidesPerView: 3 },
                            500: { slidesPerView: 2 },
                            400: { slidesPerView: 1 },
                        }}
                    >
                        {similarProducts.map((p) => (
                            <SwiperSlide key={p.product_variant_id}>
                                <ProductCard
                                    uuid={p.uuid}
                                    product_variant_id={p.product_variant_id}
                                    key={p.product_variant_id}
                                    title={p.name}
                                    price={Number(p.price)}
                                    image={p.image}
                                    isOnFavorites={isOnFavorites(p.product_variant_id, favorites)}
                                ></ProductCard>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </>
    );
});
