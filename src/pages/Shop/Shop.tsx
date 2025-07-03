import cn from 'classnames';
import styles from './Shop.module.css';
import { useCallback, useEffect, useState } from 'react';
import { IFilterItemEvent } from './interfaces/category.interface';
import { categoryInvertMap } from './helpers/category-map';
import { sizeInvertMap } from './helpers/size-map';
import { ProductCard } from '../../components/cards/ProductCard/ProductCard';
import { BlogBlock } from '../../components/BlogBlock/BlogBlock';
import { ApiService } from '../../common/helpers/api.service';
import { useQueryParams } from '../../common/hooks/use-query-params';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { IProductFilterState } from '../../store/product-filter-slice/interfaces/product-filter-state.interface';
import { PRODUCT_FILTER_QUERY } from './constants/product-filter-query-params';
import {
    GetProductFilterResponseDto,
    GetProductVariantsByCriteriaResponseDto,
    ORDER_BY_PRODUCT_VARIANTS,
    ORDER_BY_PRODUCT_VARIANTS_ENUM,
    PRODUCT_CATEGORY,
    SIZE,
} from 'contracts-green-shop';
import { productFilterActions } from '../../store/product-filter-slice/product-filter-slice';
import { Button } from '../../components/common/Button/Button';
import { upgradeFilterFromQuery } from './helpers/upgrade-filter-from-query';
import { PAGE_PRODUCTS } from './constants/page-products';
import { isProductCategory } from 'contracts-green-shop/enums/product-category.ts';
import { isSize } from 'contracts-green-shop/enums/size.ts';
import { BASE_PRICE_RANGE } from './constants/base-price-range';
import { Pagination } from '../../components/Pagination/Pagination';
import { isOnFavorites } from '../../common/helpers/is-on-favorites';
import { CustomSlider } from '../../components/Slider/Slider';
import { Select, Skeleton } from 'antd';
import { useDebounce } from 'use-debounce';

export function Shop() {
    const dispatch = useDispatch<AppDispatch>();
    const favorites = useSelector((s: RootState) => s.favorites.favorites);
    const filter = useSelector((s: RootState) => s.productFilter);

    const { getParam, getParams, setManyParams } = useQueryParams();
    const [filterOptions, setFilterOptions] = useState<GetProductFilterResponseDto | null>(null);
    const [products, setProducts] = useState<GetProductVariantsByCriteriaResponseDto | null>(null);
    const [productsError, setProductsError] = useState<string | null>(null);

    const [sliderValue, setSliderValue] = useState<[number, number]>([
        filterOptions?.prices.min ?? BASE_PRICE_RANGE.min,
        filterOptions?.prices.max ?? BASE_PRICE_RANGE.max,
    ]);
    const [sliderDebounceValue] = useDebounce(sliderValue, 300);

    useEffect(() => {
        async function init() {
            try {
                const options = await ApiService.getProductFilter();
                setFilterOptions(options);
                const [priceFrom, priceTo, limit, offset] = getParams([
                    PRODUCT_FILTER_QUERY.priceFrom,
                    PRODUCT_FILTER_QUERY.priceTo,
                    PRODUCT_FILTER_QUERY.limit,
                    PRODUCT_FILTER_QUERY.offset,
                ]);

                const filterState: IProductFilterState = {
                    category: getParam<PRODUCT_CATEGORY>(PRODUCT_FILTER_QUERY.category),
                    size: getParam<SIZE>(PRODUCT_FILTER_QUERY.size),
                    priceFrom: priceFrom ? Number.parseFloat(priceFrom) : options.prices.min,
                    priceTo: priceTo ? Number.parseFloat(priceTo) : options.prices.max,
                    limit: limit ? Number(limit) : PAGE_PRODUCTS,
                    offset: offset ? Number(offset) : 0,
                    orderBy:
                        getParam<ORDER_BY_PRODUCT_VARIANTS>(PRODUCT_FILTER_QUERY.orderBy) ??
                        ORDER_BY_PRODUCT_VARIANTS_ENUM.FIRST_NEW,
                };
                dispatch(productFilterActions.setProductFilter(filterState));
            } catch {
                setProductsError(`Произошла ошибка получения продуктов, попробуйте позже`);
            }
        }
        init();
    }, []);

    useEffect(() => {
        const updatedQueries = upgradeFilterFromQuery(filter);
        setManyParams(updatedQueries);

        const provideProducts = async (query: Record<string, string>) => {
            if (Object.entries(query).length === 0) {
                return;
            }
            const q = new URLSearchParams(Object.entries(query)).toString();
            try {
                const result = await ApiService.getProducts(q);
                setProductsError(null);
                setProducts(result);
            } catch {
                setProductsError(`Произошла ошибка получения продуктов, попробуйте позже`);
            }
        };

        provideProducts(updatedQueries);
    }, [filter]);

    const setCategory = (e: IFilterItemEvent) => {
        const category = e.target.id;
        if (!category || !isProductCategory(category)) {
            return;
        }
        dispatch(productFilterActions.setProductFilter({ category, limit: PAGE_PRODUCTS, offset: 0 }));
    };

    const setSize = (e: IFilterItemEvent) => {
        const size = e.target.id;
        if (!size || !isSize(size)) {
            return;
        }
        dispatch(productFilterActions.setProductFilter({ size, limit: PAGE_PRODUCTS, offset: 0 }));
    };

    const onChangeSlider = useCallback((value: number | number[]) => {
        if (typeof value === 'number') {
            return;
        }
        setSliderValue([value[0], value[1]]);
    }, []);

    useEffect(() => {
        dispatch(productFilterActions.setProductFilter({ priceFrom: sliderDebounceValue[0], priceTo: sliderDebounceValue[1] }));
    }, [sliderDebounceValue]);

    const resetFilter = () => {
        const params = {
            category: null,
            size: null,
            priceFrom: filterOptions?.prices.min || BASE_PRICE_RANGE.min,
            priceTo: filterOptions?.prices.max || BASE_PRICE_RANGE.max,
            limit: PAGE_PRODUCTS,
            offset: 0,
            orderBy: ORDER_BY_PRODUCT_VARIANTS_ENUM.FIRST_NEW,
        };
        dispatch(productFilterActions.setProductFilter(params));
        setSliderValue([filterOptions?.prices.min ?? BASE_PRICE_RANGE.min, filterOptions?.prices.max ?? BASE_PRICE_RANGE.max]);
    };

    const goToPage = (p: number) => {
        dispatch(productFilterActions.setProductFilter({ offset: (p - 1) * PAGE_PRODUCTS }));
    };

    const renderPagination = () => {
        if (products?.products.length) {
            return (
                <div className={styles.navigate_container}>
                    <Pagination page={products?.page || 1} totalPage={products?.totalPage || 1} goToPage={goToPage}></Pagination>
                </div>
            );
        }
        return null;
    };

    const onChangeOrderBy = useCallback((value: ORDER_BY_PRODUCT_VARIANTS) => {
        dispatch(productFilterActions.setProductFilter({ orderBy: value }));
    }, []);

    return (
        <div className={styles.shop}>
            <div className={styles.shop_top_panel}>
                <div className={styles.info_block}>
                    <p className={styles.info_block_title}>Добро пожаловать в GreenShop</p>
                    <h1>
                        Давай сделаем <span className={styles.green}>планету</span> лучше
                    </h1>
                    <p>
                        Мы интернет-магазин растений, предлагающий широкий ассортимент недорогих и модных растений. Используйте
                        наши растения для создания уникальных городских джунглей. Закажите свои любимые растения!
                    </p>
                </div>
                <img src="/shop/banner-image.png" alt="Изображение растения" />
            </div>

            <div className={styles.content}>
                <div className={styles.filter_menu}>
                    <div className={styles.filter_menu__item}>
                        <div className={styles.filter_menu__title}>Категория</div>
                        {filterOptions && (
                            <div className={cn(styles.categories_list, styles.category_inner__block)}>
                                {filterOptions.categories.map((category) => {
                                    const currentCategoryName = categoryInvertMap.get(category.category);
                                    if (currentCategoryName) {
                                        return (
                                            <div
                                                id={category.category}
                                                key={currentCategoryName}
                                                onClick={setCategory}
                                                className={cn(styles.categories_item, {
                                                    [styles['active']]: filter.category === category.category,
                                                })}
                                            >
                                                {currentCategoryName}
                                                <span>{`(${category.count})`}</span>
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        )}

                        {!filterOptions && <Skeleton />}
                    </div>
                    <div className={styles.filter_menu__item}>
                        <div className={styles.filter_menu__title}>Цена</div>
                        {filterOptions && (
                            <div className={cn(styles.price_container, styles.category_inner__block)}>
                                <CustomSlider
                                    onChangeSlider={onChangeSlider}
                                    min={filterOptions?.prices.min}
                                    max={filterOptions?.prices.max}
                                    value={sliderValue}
                                ></CustomSlider>

                                <div className={cn(styles.price_info)}>
                                    <span>Цена:</span>
                                    <br />
                                    <span
                                        className={cn(styles.price_info__range, styles.green)}
                                    >{`${filter.priceFrom}₽ - ${filter.priceTo}₽`}</span>
                                </div>
                            </div>
                        )}
                        {!filterOptions && <Skeleton />}
                    </div>
                    <div className={styles.filter_menu__item}>
                        <div className={styles.filter_menu__title}>Размер</div>
                        {filterOptions && (
                            <div className={cn(styles.categories_list, styles.category_inner__block)}>
                                {filterOptions.sizes.map((s) => {
                                    const currentSizeName = sizeInvertMap.get(s.size);

                                    if (currentSizeName) {
                                        return (
                                            <div
                                                id={s.size}
                                                onClick={setSize}
                                                key={currentSizeName}
                                                className={cn(styles.categories_item, {
                                                    [styles.active]: filter.size === s.size,
                                                })}
                                            >
                                                {currentSizeName}
                                                <span>{`(${s.count})`}</span>
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        )}
                        {!filterOptions && <Skeleton />}
                    </div>
                    <div className={styles.filter_menu__item}>
                        <Button onClick={resetFilter}>Сбросить</Button>
                    </div>
                </div>
                <div className={styles.products}>
                    <Select
                        defaultValue={ORDER_BY_PRODUCT_VARIANTS_ENUM.FIRST_NEW}
                        style={{ width: 170 }}
                        onChange={onChangeOrderBy}
                        options={[
                            { value: ORDER_BY_PRODUCT_VARIANTS_ENUM.FIRST_NEW, label: 'Сначало новые' },
                            { value: ORDER_BY_PRODUCT_VARIANTS_ENUM.FIRST_OLD, label: 'Сначало старые' },
                            { value: ORDER_BY_PRODUCT_VARIANTS_ENUM.FIRST_CHEAP, label: 'Сначало дешевые' },
                            { value: ORDER_BY_PRODUCT_VARIANTS_ENUM.FIRST_EXPENSIVE, label: 'Сначало дорогие' },
                        ]}
                    />
                    <div className={styles.products_container}>
                        {productsError && <div>{productsError}</div>}
                        {products && products.products.length === 0 && <div>Пока нет продуктов, ожидаем поступление</div>}
                        {products
                            ? products.products.map((p) => {
                                  return (
                                      <ProductCard
                                          uuid={p.uuid}
                                          key={`${p.product_variant_id}`}
                                          title={p.name}
                                          price={p.price}
                                          image={p.image}
                                          product_variant_id={p.product_variant_id}
                                          isOnFavorites={isOnFavorites(p.product_variant_id, favorites)}
                                      ></ProductCard>
                                  );
                              })
                            : null}
                    </div>
                    {renderPagination()}
                </div>
            </div>
        </div>
    );
}
