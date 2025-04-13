
import styles from './Shop.module.css';
import cn from 'classnames';
import {  useState } from 'react';
import { IFilterItemEvent } from './interfaces/category.interface';
import { categoryMap } from './helpers/category-map';
import { IFilter } from './interfaces/filter.interface';
import { parseCategoryName } from './helpers/parse-category';
import Slider from 'rc-slider';
import { sizeMap } from './helpers/size-map';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { useNavigate } from 'react-router';
import { ProductCardButton } from '../../components/ProductCardButton/ProductCardButton';
import { NavigateButton } from '../../components/NavigateButton/NavigateButton';
import { BlogBlock } from '../../components/BlogBlock/BlogBlock';

export function Shop() {

    const [filter, setFilter] = useState<IFilter>({
        price: {
            min: 1,
            max: 5
        }
    })

    const navigate = useNavigate()

    const setCategory = (e: IFilterItemEvent ) => {
        const value =  e.target.textContent

        if (!value) {
            console.error("Ошибка получения значения e.target.textContent")
            return;
        }

        const category = categoryMap.get(parseCategoryName(value))

        if (!category) {
            console.error("Ошибка получения значения в categoryMap")
            return;
        }
        console.log(category)

        setFilter((f)=> {
            return {...f, category}
        })
    }

    const setSize = (e: IFilterItemEvent ) => {
        const value =  e.target.textContent

        if (!value) {
            console.error("Ошибка получения значения e.target.textContent")
            return;
        }

        const size = sizeMap.get(parseCategoryName(value))

        if (!size) {
            console.error("Ошибка получения значения в sizeMap")
            return;
        }

        setFilter((f)=> {
            return {...f, size}
        })
    }

    const sliderChange = (value: number | number[]) => {
        if (typeof value === "number") {
            console.error("Тип слайдера number а ожидался number[]");
            return;
        }

        setFilter(f => {
            return {...f, price: {
                min: value[0],
                max: value[1]
            }}
        })
    }

    const categories = [
        { name: 'House Plants', count: 1 },
        { name: 'Potter Plants', count: 112 },
        { name: 'Seeds', count: 13 },
        { name: 'Big Plants', count: 234 },
        { name: 'Succulents', count: 56 },
        { name: 'Trerrariums', count: 87 },
        { name: 'Gardening', count: 12 },
        { name: 'Accessories', count: 43 },
    ];

    const size = [
        { name: 'Small', count: 1 },
        { name: 'Medium', count: 112 },
        { name: 'Large', count: 13 },
    ];

    const products: {uuid: string, title: string, price: number, image: string}[] = [
        {uuid: "1", title: "Barberton Daisy", price: 119.00, image: "/test-image.png"},
        {uuid: "2", title: "Barberton Daisy", price: 345.00, image: "/test-image.png"},
        {uuid: "3", title: "Barberton Daisy", price: 45.00, image: "/test-image.png"},
        {uuid: "4", title: "Barberton Daisy", price: 119.00, image: "/test-image.png"},
        {uuid: "5", title: "Barberton Daisy", price: 345.00, image: "/test-image.png"},
        {uuid: "6", title: "Barberton Daisy", price: 45.00, image: "/test-image.png"},
        {uuid: "7", title: "Barberton Daisy", price: 119.00, image: "/test-image.png"},
        {uuid: "8", title: "Barberton Daisy", price: 345.00, image: "/test-image.png"},

    ]

    const defaultPriceValue = [0, 5]
    const pages = 5

    return (
        <div className={cn(styles['shop'])}>
            <div className={styles['shop-top-panel']}>
                <div className={styles['info-block']}>
                    <span className={styles['info-block--title']}>Welcome to GreenShop</span>
                    <h1>
                        Let’s Make a Better <span className={styles['green']}>Planet</span>
                    </h1>
                    <p>
                        We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create an
                        unique Urban Jungle. Order your favorite plants!
                    </p>
                </div>
                <img src="/shop/banner-image.png" alt="Изображение растения" />
            </div>

            <div className={styles['content']}>
                <div className={styles['filter-menu']}>
                    <div className={styles['filter-menu--item']}>
                        <div className={styles['filter-menu--title']}>Categories</div>
                        <div className={cn(styles['categories-list'], styles["category-inner--block"])}>
                            {categories.map((category) => {
                                return (
                                    <div
                                        key={category.name}
                                        onClick={setCategory}
                                        className={ cn(styles['categories-item'])}
                                    >
                                        {category.name}
                                        <span>{`(${category.count})`}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className={styles['filter-menu--item']}>
                        <div className={styles['filter-menu--title']}>Price Range</div>
                        <div className={cn(styles['price-container'], styles["category-inner--block"])}>
                                <Slider onChange={sliderChange} className={cn(styles['slider'])} range={{count: 2}} min={1} max={10} step={1} defaultValue={defaultPriceValue}/>
                                <div className={cn(styles['price-info'])}>
                                    Price: <span className={cn(styles['price-info--range'], styles['green'])}>{`$${filter.price?.min || 0} - $${filter.price?.max || 0}`}</span>
                                </div>
                        </div>

                    </div>
                    <div className={styles['filter-menu--item']}>
                        <div className={styles['filter-menu--title']}>Categories</div>
                        <div className={cn(styles['categories-list'], styles["category-inner--block"])}>
                            {size.map((s) => {
                                return (
                                    <div
                                        onClick={setSize}
                                        key={s.name}
                                        className={ cn(styles['categories-item'])}
                                    >
                                        {s.name}
                                        <span>{`(${s.count})`}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className={styles['products']}>
                    <div className={styles['products-container']}>
                        {products.map(p => {
                            return <ProductCard onClick={() => navigate(`/product/${p.uuid}`)} key={p.uuid} title={p.title} price={p.price} image={p.image}></ProductCard>
                        })}
                    </div>
                    <div className={styles['navigate-container']}>
                    <div className={styles['navigate-container--inner']}>
                        { (() => {
                            const res = []
                            for (let i = 1; i < pages + 1; i++ ) {
                                res.push(<NavigateButton className={styles['navigate-button']}>{i}</NavigateButton>) 
                            }
                            res.push(<NavigateButton className={styles['navigate-button']}>{">"}</NavigateButton>)
                            return res
                        })()
                        }
                    </div>
                </div>
                </div>
            </div>
            <BlogBlock></BlogBlock>
        </div>
    );
}
