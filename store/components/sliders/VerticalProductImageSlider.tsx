import React, { useState } from 'react'
import Image from 'next/image'
import { FreeMode, Navigation, Thumbs, Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperOptions } from 'swiper/types';
import { IImage } from '../../types/api';

import 'swiper/css';

interface IProps {
    images: IImage[];
}

export default function VerticalProductImageSlider({ images }: IProps) {
    const [swiper, setSwiper] = useState<SwiperType>(null);
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType>(null);

    const onScrollToSlide = (index: number) => {
        window.scrollTo({
            behavior: "smooth",
            top: swiper.slides[index].offsetTop
        })
    }

    return (
        <div className="flex">
            <div className="w-14">
                <div className="sticky top-28">
                    <Swiper
                        className=""
                        direction="vertical"
                        slidesPerView="auto"
                        spaceBetween={10}
                        onSwiper={setThumbsSwiper}
                        modules={[Thumbs]}
                    >
                        {images.map((image, index) =>
                            <SwiperSlide
                                key={image.id}
                                className="relative w-full aspect-5/3 cursor-pointer"
                                onClick={() => onScrollToSlide(index)}
                            >
                                <Image
                                    fill
                                    src={image.src}
                                    alt={image.alt}
                                />
                            </SwiperSlide>
                        )}
                    </Swiper>
                </div>
            </div>
            <Swiper
                className="flex-1 h-full"
                direction="vertical"
                slidesPerView="auto"
                thumbs={{ swiper: thumbsSwiper }}
                onSwiper={setSwiper}
                modules={[Thumbs]}
            >
                {images.map(image =>
                    <SwiperSlide
                        key={image.id}
                        className="relative w-full aspect-5/3"
                    >
                        <Image
                            fill
                            src={image.src}
                            alt={image.alt}
                        />
                    </SwiperSlide>
                )}
            </Swiper>

        </div >
    )
}
