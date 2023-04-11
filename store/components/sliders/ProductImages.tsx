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

export default function ProductImages({ images }: IProps) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <div className="">
            <Swiper
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
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
                    loop={true}
                    spaceBetween={20}
                    slidesPerView={5}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
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
