import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

interface IProps {
    title: string;
    type: string;
    vendor: string;
    price: string;
    compareAtPrice?: string;
}

export default function ProductCard({ title, vendor, type, price, compareAtPrice }: IProps) {
    return (
        <Link href="#">
            <div className="relative aspect-5/3">
                <Image
                    fill
                    src="/image.png"
                    alt="TEST"
                />
            </div>
            <div className="mt-5 text-md text-center space-y-1">
                <div className="font-semibold tracking-widest text-black uppercase">Nike</div>
                <div className="text-text-gray">Кроссовки</div>
                <div className="text-text-gray line-clamp-3">Air Jordan 1 Retro High Primer</div>
                <div className="flex justify-center gap-3">
                    <div className={ `${ compareAtPrice !== undefined ? "text-main-red" : "" }` }>{price}</div>
                    {compareAtPrice !== undefined &&
                        <div className="line-through text-text-gray">{compareAtPrice}</div>
                    }
                </div>
            </div>
        </Link>
    )
}
