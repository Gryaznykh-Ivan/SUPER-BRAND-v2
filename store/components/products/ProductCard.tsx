import { IImage } from '@/types/api';
import blurHashToDataURL from '@/utils/blurhash';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import ImageLoader from '../image/ImageLoader';

interface IProps {
    handle: string;
    title: string;
    type: string;
    vendor: string;
    image: IImage | null;
    price: string | null;
    compareAtPrice: string | null;
}

export default function ProductCard({ handle, title, vendor, type, image, price, compareAtPrice }: IProps) {

    const convertToCurrencyFormat = (price: string) => {
        const num = parseInt(price);
        const formattedNum = num.toLocaleString('ru-RU');

        return `${formattedNum} ₽`;
    }


    return (
        <Link href={ `/products/${ handle }` } className="group block">
            <div className="relative aspect-5/3">
                {image !== null ?
                    <Image
                        loader={ImageLoader}
                        fill
                        placeholder="blur"
                        blurDataURL={blurHashToDataURL(image.blurhash, 5, 3)}
                        src={image.src}
                        alt={image.alt}
                        sizes="800px"
                    />
                    :
                    <Image
                        fill
                        src="/placeholder.jpg"
                        alt="placeholder"
                        sizes="800px"
                    />
                }
                <div className="absolute top-0 right-2 transition-opacity opacity-0 group-hover:opacity-100" onClick={e => e.preventDefault()}>
                    <svg className="fill-transparent stroke-black hover:fill-main-red hover:stroke-transparent" width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.9755 2.74612C20.4326 2.19227 19.788 1.75298 19.0785 1.45337C18.3691 1.15377 17.6087 0.999706 16.8408 1C16.073 1.00029 15.3127 1.15494 14.6035 1.45509C13.8942 1.75524 13.2499 2.19502 12.7074 2.74929L11.9992 3.48052L11.2969 2.75087L11.2923 2.74621C10.7496 2.19262 10.1054 1.75348 9.39629 1.45388C8.68723 1.15428 7.92726 1.00007 7.15978 1.00007C6.39229 1.00007 5.63232 1.15428 4.92326 1.45388C4.2142 1.75348 3.56993 2.19262 3.02724 2.74621L2.71174 3.06805C1.61573 4.18608 1 5.70244 1 7.28357C1 8.86469 1.61573 10.3811 2.71174 11.4991L11.0386 19.9931L11.9789 20.9981L12.0013 20.9752L12.0257 21L12.9067 20.0518L21.291 11.4989C22.3854 10.38 23 8.864 23 7.28343C23 5.70286 22.3854 4.18682 21.291 3.06791L20.9755 2.74612Z" fill="inherit" stroke="inherit" />
                    </svg>
                </div>
            </div>
            <div className="mt-5 text-md text-center space-y-1 px-2">
                <div className="font-semibold tracking-widest text-black uppercase">{vendor}</div>
                {/* <div className="text-text-gray">{ type }</div> */}
                <div className="text-text-gray line-clamp-3">{title}</div>
                <div className="flex justify-center gap-3">
                    <div className={`${compareAtPrice !== null ? "text-main-red" : ""}`}>{price !== null ? convertToCurrencyFormat(price) : "Продано"}</div>
                    {compareAtPrice !== null &&
                        <div className="line-through text-text-gray">{convertToCurrencyFormat(compareAtPrice)}</div>
                    }
                </div>
            </div>
        </Link>
    )
}
