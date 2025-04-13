
import { SIZE } from 'contracts/enums/size.ts';
import styles from './Product.module.css';
import cn from 'classnames';
import { useState } from 'react';
import { NavigateButton } from '../../components/NavigateButton/NavigateButton';
import { sizeMap } from './helpers/size-map';
import { Button } from '../../components/Button/Button';

export function Product() {

    const [activeImage, setActiveImage] = useState(0)

    // const cart = [
    //     {uuid: "1", count: 1},
    //     {uuid: "2", count: 2},
    // ]

    const productPage = {
        product: {
            uuid: "1",
            name: "Barberton Daisy",
            price: 119,
            images: ["/test-image.png", "/test-image2.png", "/test-image.png", "/test-image2.png", "/test-image.png", "/test-image2.png",],
            shortDescription: "The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. ",
            description: `The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla augue nec est tristique auctor. Donec non est at libero vulputate rutrum. Morbi ornare lectus quis justo gravida semper. Nulla tellus mi, vulputate adipiscing cursus eu, suscipit id nulla.

Pellentesque aliquet, sem eget laoreet ultrices, ipsum metus feugiat sem, quis fermentum turpis eros eget velit. Donec ac tempus ante. Fusce ultricies massa massa. Fusce aliquam, purus eget sagittis vulputate, sapien libero hendrerit est, sed commodo augue nisi non neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor, lorem et placerat vestibulum, metus nisi posuere nisl, in accumsan elit odio quis mi. Cras neque metus, consequat et blandit et, luctus a nunc. Etiam gravida vehicula tellus, in imperdiet ligula euismod eget. The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. `,
            size: SIZE.SMALL,
            categories: ["Potter Plants"],
            rating: 4.11,
            tags: ["Home", "Garden", "Plants"]
        },
        sizes: [SIZE.SMALL, SIZE.MEDIUM, SIZE.LARGE],
        review: [
            {
                user: {
                    uuid: "123124",
                    name: "Alex"
                },
                review: {
                    title: "Все хорошо",
                    description: "Мне понравилось очень круто вообще",
                    rating: 4,
                    createdAt: "2025-04-13T05:23:36.129Z"
                }
            },
        ]

    }

    const getStarsRating = () => {
        const res = []
        const stars = Math.floor(productPage.product.rating)

        for (let i = 1; i < 6; i++) {
            if (i <= stars) {
                res.push(<img key={i} src="/icons/star-icon.svg" alt="Иконка звезды"/>)
            } else {
                res.push(<img key={i} src="/icons/star-gray-icon.svg" alt="Серая конка звезды"/>)
            }
        }
        return res
    }

    return (
    <div className={cn(styles['product-container'])}>
        <div className={styles['product-top']}>
            <div className={styles['product-top--images']}>
                <div className={styles['small-images--container']}>
                    <div className={styles['small-images--list']}>
                        {productPage.product.images.map((image, index) => {
                            return <div key={image + index} onClick={() => {
                                setActiveImage(index)
                            }} className={cn(styles['small-image'], 
                                {[styles["active-small-image"]]: activeImage === index})}>
                                    <img src={image} alt="Изображение продукта" />
                                </div>
                        })}        
                    </div>
                </div>
                <div className={styles['big-image']}>
                    <img src={productPage.product.images[activeImage]} alt="Большое изображение продукта" />
                </div>
            </div>
            <div className={styles['product-detail']}>
                <div className={styles['product-detail--header']}>
                    <h2>{productPage.product.name}</h2>
                    <div className={styles['price-and-rating']}>
                        <div className={styles['price']}>{`$${productPage.product.price}`}</div>
                        <div className={styles['rating-block']}>
                            <div className={styles['rating-starts']}>
                                {getStarsRating()}
                            </div>
                            <div className={styles['count-reviews']}>{`${productPage.review.length} Customer Review`}</div>
                        </div>
                    </div>
                </div>
                <div className={styles['product-detail--description']}>
                    <div className={styles['product-detail--description__title']}>Short Description:</div>
                    <div className={styles['product-detail--description__description']}>{productPage.product.shortDescription}</div>
                </div>
                <div className={styles['product-detail--size']}>
                    <div className={styles['product-detail--description']}>Size:</div>
                    <div className={styles['size-buttons']}>
                        {productPage.sizes.map(size => {
                            return <NavigateButton className={cn(styles["size-button"], {[styles["active-size-button"]]: size === productPage.product.size})} key={size}>{sizeMap.get(size)}</NavigateButton>
                        })}
                    </div>
                </div>
                <div className={styles['product-detail--interaction']}>
                    <div className={styles['count-buttons']}>
                        <NavigateButton className={styles['count-cart-button']}>{"-"}</NavigateButton>
                        <span>{1}</span>
                        <NavigateButton className={styles['count-cart-button']}>{"+"}</NavigateButton>
                    </div>
                    <div className={styles['other-buttons']}>
                        <Button>Buy NOW</Button>
                        <Button className={styles['invert-button']}>Add to cart</Button>
                        <NavigateButton className={styles['heart-button']}>
                            <img src="/icons/heart-icon-green.svg" alt="Иконка сердца" />
                        </NavigateButton>
                    </div>
                </div>
                <div className={styles['product-detail--footer']}>
                    <div>Categories: <span>{productPage.product.categories}</span></div>
                    <div>Tags: <span>{productPage.product.tags.join(', ')}</span></div>
                </div>
            </div>
        </div>
        <div className={styles['product-bottom']}>
            <div className={styles['product-bottom--navigate']}>
                <div className={styles['product-bottom--navigate-item']}>Product Description</div>
            </div>
            <p>{productPage.product.description}</p>
        </div>

        <div></div>
    </div>
    );
}
