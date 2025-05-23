import styles from './Product.module.css';
import cn from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { NavigateButton } from '../../components/button/NavigateButton/NavigateButton';
import { sizeMap } from './helpers/size-map';
import { SimilarProducts } from '../../components/SimilarProducts/SimilarProducts';
import { CartButton } from '../../components/button/CartButton/CartButton';
import { GetProductVariantsByProductResponseDto } from 'contracts';
import { ApiService } from '../../helpers/api.service';
import { useParams } from 'react-router';
import { categoryInvertMap } from '../Shop/helpers/category-map';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { addToCart as addCartItem } from '../../store/cart-slice/async-actions/add-to-cart';
import { Rating } from '../../components/Rating/Rating';

export function Product() {
    const dispatch = useDispatch<AppDispatch>();
    const { uuid } = useParams();

    const [activeImage, setActiveImage] = useState(0);
    const [productData, setProductData] = useState<GetProductVariantsByProductResponseDto>();
    const [variantIndex, setVariantIndex] = useState(0);
    const [countProduct, setCountProduct] = useState(1);

    useEffect(() => {
        const getProductData = async () => {
            const data = await ApiService.getProductVariantsByProduct(uuid!);
            setProductData(data);
        };
        getProductData();
    }, [uuid]);

    const addToCart = useCallback(() => {
        if (!productData) {
            return;
        }
        dispatch(
            addCartItem({
                product_variant_id: productData.variants[variantIndex].uuid,
                quantity: countProduct,
            }),
        );
        setCountProduct(1);
    }, [countProduct, dispatch, productData, variantIndex]);

    const setActiveImageFn = useCallback((index: number) => {
        return () => setActiveImage(index);
    }, []);

    const setVariantIndexFn = useCallback((index: number) => {
        return () => {
            setVariantIndex(index);
        };
    }, []);

    const decrementCountProduct = useCallback(() => {
        setCountProduct((prev) => (prev > 1 ? prev - 1 : prev));
    }, []);

    const incrementCountProduct = useCallback(() => {
        setCountProduct((prev) => prev + 1);
    }, []);

    return (
        <>
            {!productData && <div>Загрузка...</div>}
            {productData && (
                <div className={cn(styles.product_container)}>
                    <div className={styles.product_top}>
                        <div className={styles.product_top__images}>
                            <div className={styles.small_images__container}>
                                <div className={styles.small_images__list}>
                                    {productData.images.map((image, index) => {
                                        return (
                                            <div
                                                key={image}
                                                onClick={setActiveImageFn(index)}
                                                className={cn(styles.small_image, {
                                                    [styles.active_small_image]: activeImage === index,
                                                })}
                                            >
                                                <img src={image} alt="Изображение продукта" />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className={styles.big_image}>
                                <img
                                    src={productData.images[activeImage] || '/image-not-found.png'}
                                    alt="Большое изображение продукта"
                                />
                            </div>
                        </div>
                        <div className={styles.product_detail}>
                            <div className={styles.product_detail__header}>
                                <h2>{productData?.name}</h2>
                                <div className={styles.price_and_rating}>
                                    <div className={styles.price}>{`${productData.variants[variantIndex].price} ₽`}</div>
                                    <div className={styles.rating_block}>
                                        <Rating rating={productData?.variants[variantIndex].rating}></Rating>
                                        <div className={styles.count_reviews}>{`${1} Отзывов`}</div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.product_detail__description}>
                                <div className={styles.product_detail_description__title}>Краткое описание:</div>
                                <div className={styles.product_detail_description__description}>
                                    {productData?.short_description}
                                </div>
                            </div>
                            <div className={styles.product_detail__size}>
                                <div className={styles.product_detail__description}>Размер:</div>
                                <div className={styles.size_buttons}>
                                    {productData.variants.map(({ size }, index) => {
                                        return (
                                            <NavigateButton
                                                onClick={setVariantIndexFn(index)}
                                                className={cn(styles.size_button, {
                                                    [styles.active_size_button]: index === variantIndex,
                                                })}
                                                key={size}
                                            >
                                                {sizeMap.get(size)}
                                            </NavigateButton>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className={styles.product_detail__interaction}>
                                <div className={styles.count_buttons}>
                                    <CartButton onClick={decrementCountProduct}>{'-'}</CartButton>
                                    <span>{countProduct}</span>
                                    <CartButton onClick={incrementCountProduct}>{'+'}</CartButton>
                                </div>
                                <div className={styles.other_buttons}>
                                    <NavigateButton onClick={addToCart} className={styles.invert_button}>
                                        Добавить в корзину
                                    </NavigateButton>
                                    <NavigateButton className={styles.heart_button}>
                                        <img src="/icons/heart-icon-green.svg" alt="Иконка сердца" />
                                    </NavigateButton>
                                </div>
                            </div>
                            <div className={styles.product_detail__footer}>
                                <div>
                                    Категория: <span>{categoryInvertMap.get(productData?.category)}</span>
                                </div>
                                <div>
                                    Tags: <span>{productData?.variants[variantIndex].tags.join(', ')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.product_bottom}>
                        <div className={styles.product_bottom__navigate}>
                            <div className={styles.product_bottom__navigate_item}>Описание продукта</div>
                        </div>
                        <p>{productData?.description}</p>
                    </div>

                    <div className={styles.similar_products}>
                        <SimilarProducts
                            className={styles.swiper}
                            tags={productData?.variants.map((v) => v.tags_id).flat(1)}
                        ></SimilarProducts>
                    </div>
                </div>
            )}
        </>
    );
}
