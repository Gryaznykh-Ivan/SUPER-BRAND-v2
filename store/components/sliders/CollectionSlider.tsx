import React, { useRef, useState } from 'react'
import { Navigation, Pagination, Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperOptions } from 'swiper/types';
import { IProduct } from '../../types/api';
import ProductCard from '../products/ProductCard';

import 'swiper/css';

interface IProps {
    className?: string;
    products: IProduct[];
}

export default function CollectionSlider({ className, products }: IProps) {
    const [swiper, setSwiper] = useState<SwiperType>();
    const [pagination, setPagination] = useState({
        hidden: true,
        slidesLength: 0,
        snapIndex: 0
    })

    const onPrevSlide = () => {
        if (!swiper) return
        if (pagination.snapIndex <= 1) return

        swiper.slidePrev()
    }

    const onNextSlide = () => {
        if (!swiper) return
        if (pagination.snapIndex >= pagination.slidesLength) return

        swiper.slideNext()
    }

    const onSwiper = (swiper: SwiperType) => {
        setPagination(prev => ({
            ...prev,
            hidden: swiper.pagination.bullets.length !== 1,
            slidesLength: swiper.pagination.bullets.length,
            snapIndex: swiper.snapIndex + 1
        }))
        setSwiper(prev => swiper)
    }

    const onSlideChange = (swiper: SwiperType) => {
        setPagination(prev => ({
            ...prev,
            snapIndex: swiper.snapIndex + 1
        }))
    }

    const onPaginationUpdate = (swiper: SwiperType) => {
        setPagination(prev => ({
            ...prev,
            hidden: swiper.pagination.bullets.length !== 1,
            slidesLength: swiper.pagination.bullets.length,
            snapIndex: swiper.snapIndex + 1
        }))
    }

    return (
        <div className="">
            <Swiper
                className={`${className} relative group/swiper`}
                onSwiper={onSwiper}
                onSlideChange={onSlideChange}
                onPaginationUpdate={onPaginationUpdate}
                modules={[Navigation, Pagination]}
                centerInsufficientSlides={true}
                slidesPerView={2}
                slidesPerGroup={2}
                breakpoints={{
                    1024: {
                        slidesPerView: 4,
                        slidesPerGroup: 4,
                    },
                    768: {
                        slidesPerView: 3,
                        slidesPerGroup: 3,
                    },
                }}
                navigation={{
                    prevEl: '.prev',
                    nextEl: '.next',
                }}
                pagination={{

                }}
            >
                {products.map(product =>
                    <SwiperSlide key={product.id}>
                        <ProductCard
                            title={product.title}
                            type={product.type}
                            vendor={product.vendor}
                            price={product.price}
                            compareAtPrice={product.compareAtPrice}
                        />
                    </SwiperSlide>
                )}
                <button className="prev hidden md:flex items-center justify-center absolute top-1/3 left-0 z-10 w-10 h-10 bg-gray-200 rounded-full disabled:invisible opacity-0 group-hover/swiper:opacity-100 transition-all duration-300">
                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.66992 1.69993L1.95326 4.41659C1.63242 4.73743 1.63242 5.26243 1.95326 5.58326L4.66992 8.29993" stroke="black" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <button className="next hidden md:flex items-center justify-center absolute top-1/3 right-0 z-10 w-10 h-10 bg-gray-200 rounded-full disabled:invisible opacity-0 group-hover/swiper:opacity-100 transition-all duration-300">
                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.71289 8.29995L4.42956 5.58328C4.75039 5.26245 4.75039 4.73745 4.42956 4.41662L1.71289 1.69995" stroke="black" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </Swiper >
            {pagination.hidden &&
                <div className="flex justify-center items-center mt-5 h-10">
                    <button className={`px-4 ${pagination.snapIndex === 1 ? "stroke-line-divider" : "stroke-black"}`} onClick={onPrevSlide}>
                        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 8.75L1 5L5 1.25" stroke="inherit" stroke-linecap="square" />
                        </svg>
                    </button>
                    <div className="px-3 text-sm tracking-widest">{pagination.snapIndex}/{pagination.slidesLength}</div>
                    <button className={`px-4 ${pagination.snapIndex === pagination.slidesLength ? "stroke-line-divider" : "stroke-black"}`} onClick={onNextSlide}>
                        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1.25L5 5L1 8.75" stroke="inherit" stroke-linecap="square" />
                        </svg>
                    </button>
                </div>
            }
        </div>
    )
}
