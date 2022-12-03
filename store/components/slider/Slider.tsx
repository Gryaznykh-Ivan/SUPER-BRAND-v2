import React from 'react'
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperOptions } from 'swiper/types';

import 'swiper/css';
import ArrowLeftIcon from '../icons/ArrowLeft';
import ArrowRightIcon from '../icons/ArrowRight';

interface IProps {
    className: string;
    children: React.ReactNode;
    slidesPerView?: number;
    breakpoints?: {
        [width: number]: SwiperOptions;
    };
}

export default function Slider({ className, breakpoints, slidesPerView=2, children }: IProps) {
    const getChildrenArray = (children: React.ReactNode) => {
        return React.Children.toArray(children);
    }

    return (
        <Swiper
            className={`${className} relative group/swiper`}
            modules={[Navigation]}
            centerInsufficientSlides={true}
            slidesPerView={slidesPerView}
            breakpoints={breakpoints}
            navigation={{
                prevEl: '.prev',
                nextEl: '.next',
            }}
        >
            {getChildrenArray(children).map((slide, index) => <SwiperSlide key={index}>{slide}</SwiperSlide>)}
            <button className="prev hidden md:flex items-center justify-center absolute top-1/3 left-10 z-10 w-16 h-16 bg-gray-200 rounded-full disabled:w-0 disabled:opacity-0 opacity-0 group-hover/swiper:opacity-100 transition-all duration-300"><ArrowLeftIcon /></button>
            <button className="next hidden md:flex items-center justify-center absolute top-1/3 right-10 z-10 w-16 h-16 bg-gray-200 rounded-full disabled:w-0 disabled:opacity-0 opacity-0 group-hover/swiper:opacity-100 transition-all duration-300"><ArrowRightIcon /></button>
        </Swiper >
    )
}
