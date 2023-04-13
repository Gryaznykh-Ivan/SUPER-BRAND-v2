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

export default function HorizontalProductImageSlider({ images }: IProps) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <div className="">
            <Swiper
                spaceBetween={10}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[Thumbs]}
            >
                {images.map(image =>
                    <SwiperSlide key={image.id}>
                        <div className="relative aspect-5/3">
                            <Image
                                fill
                                src={image.src}
                                alt={image.alt}
                            />
                        </div>
                    </SwiperSlide>
                )}
            </Swiper>
            <div className="px-4 md:px-10">
                <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={20}
                    slidesPerView={5}
                    modules={[Thumbs]}
                >
                    {images.map(image =>
                        <SwiperSlide key={image.id}>
                            <div className="relative aspect-5/3">
                                <Image
                                    fill
                                    src={image.src}
                                    alt={image.alt}
                                />
                            </div>
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>
        </div >
    )
}
