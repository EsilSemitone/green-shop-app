import { ISimilarProductsProps } from './SimilarProducts-props';
import styles from './SimilarProducts.module.css';
import cn from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import {  Pagination } from 'swiper/modules';
import "./Swiper.css"
import 'swiper/css';
import 'swiper/css/pagination';
import { ProductCard } from '../ProductCard/ProductCard';
import { useNavigate } from 'react-router';


export function SimilarProducts({ className, similarProducts, ...props }: ISimilarProductsProps) {

    const navigate = useNavigate()
    
    return (
        <Swiper
        className={cn(styles['swiper'], className)}
        style={{padding: "0 0 3em 0"}}
        modules={[Pagination]}
        spaceBetween={10}
        slidesPerView={5}
        pagination={{ clickable: true }}
        breakpoints={{
        1024: { slidesPerView: 5 },
        768: { slidesPerView: 4 },
        480: { slidesPerView: 2 },
        0: { slidesPerView: 1 },
        }}
    >
        {similarProducts.map(p  => (
        <SwiperSlide key={p.uuid}>
            <ProductCard onClick={() => navigate(`/product/${p.uuid}`)} key={p.uuid} title={p.title} price={p.price} image={p.image}></ProductCard>
        </SwiperSlide>
        ))}
    </Swiper>
    );
}
