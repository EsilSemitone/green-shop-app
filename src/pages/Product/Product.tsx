import styles from './Product.module.css';
import cn from 'classnames';
import { useCallback, useState } from 'react';
import { NavigateButton } from '../../components/button/NavigateButton/NavigateButton';
import { sizeMap } from './helpers/size-map';
import { SimilarProducts } from '../../components/SimilarProducts/SimilarProducts';
import { CartButton } from '../../components/button/CartButton/CartButton';
import { useParams } from 'react-router';
import { categoryInvertMap } from '../Shop/helpers/category-map';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { addToCart as addCartItem } from '../../store/cart-slice/async-actions/add-to-cart';
import { Rating } from '../../components/Rating/Rating';
import { isOnFavorites } from '../../common/helpers/is-on-favorites';
import { removeToFavorites } from '../../store/favorites/async-actions/remove-to-favorites';
import { addToFavorites } from '../../store/favorites/async-actions/add-to-favorites';
import { useProduct } from '../../common/hooks/use-product';
import { ProductReviews } from '../../components/ProductReviews/ProductReviews';
import { Flex, Spin, Tabs } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Image } from 'antd';

export default function Product() {
    const dispatch = useDispatch<AppDispatch>();

    const { uuid } = useParams();
    const { productData, variant, setActiveImageIndex, setVariantIndex, activeImageIndex, variantIndex } = useProduct(uuid || '');
    const favorites = useSelector((s: RootState) => s.favorites.favorites);
    const [countProduct, setCountProduct] = useState(1);

    const addToCart = useCallback(() => {
        if (!variant) {
            return;
        }
        dispatch(
            addCartItem({
                product_variant_id: variant.uuid,
                quantity: countProduct,
            }),
        );
        setCountProduct(1);
    }, [countProduct, dispatch, variant]);

    const toggleFavorites = useCallback(() => {
        if (!variant || !productData) {
            return;
        }

        const { uuid: product_variant_id, price } = variant;
        const { uuid, images, name } = productData;

        if (isOnFavorites(product_variant_id, favorites)) {
            dispatch(removeToFavorites(variant.uuid));

            return;
        }
        dispatch(addToFavorites({ uuid, product_variant_id, price, image: images[0] || null, name }));
    }, [dispatch, favorites, productData, variant]);

    const setActiveImageFn = useCallback((index: number) => {
        return () => setActiveImageIndex(index);
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

    const getProductTags = useCallback(() => {
        return productData ? productData.variants.map((v) => v.tags_id).flat(1) : [];
    }, [productData]);

    const getTabItems = useCallback(() => {
        return [
            {
                key: '1',
                label: 'Описание',
                children: (
                    <div className={styles.product_bottom}>
                        <p>{productData?.description}</p>
                    </div>
                ),
            },
            {
                key: '2',
                label: `Комментарии`,
                children: <ProductReviews productId={uuid} variantId={variant?.uuid}></ProductReviews>,
            },
        ];
    }, [uuid, variant?.uuid]);

    return (
        <>
            {!productData && (
                <Flex align="center" gap="middle" style={{ height: '100%', padding: '50px' }}>
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: 'green' }} spin />} />
                </Flex>
            )}
            {productData && (
                <div className={cn(styles.product_container)}>
                    <div className={styles.product_top}>
                        <div className={styles.product_top__images}>
                            <div className={styles.small_images__container}>
                                <div className={styles.small_images__list}>
                                    {productData.images.map((image, index) => {
                                        return (
                                            <div
                                                key={image + index}
                                                onClick={setActiveImageFn(index)}
                                                className={cn(styles.small_image, {
                                                    [styles.active_small_image]: activeImageIndex === index,
                                                })}
                                            >
                                                <img src={image} alt="Изображение продукта" />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className={styles.big_image}>
                                <Image
                                    className={styles.image}
                                    src={productData.images[activeImageIndex] || '/image-not-found.png'}
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
                                    <NavigateButton onClick={toggleFavorites} className={styles.heart_button}>
                                        <img
                                            src={
                                                isOnFavorites(productData.variants[variantIndex].uuid, favorites)
                                                    ? '/icons/red-heart.svg'
                                                    : '/icons/heart-icon-green.svg'
                                            }
                                            alt="Иконка сердца"
                                        />
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
                    <Tabs className="tabs" defaultActiveKey="1" items={getTabItems()} />
                    <div className={styles.similar_products}>
                        <SimilarProducts className={styles.swiper} tags={getProductTags()}></SimilarProducts>
                    </div>
                </div>
            )}
        </>
    );
}
