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
        <Link href="#" className="group">
            <div className="relative aspect-5/3">
                <Image
                    fill
                    src="/image.png"
                    alt="TEST"
                />
                <div className="absolute top-0 right-0 p-2 transition-opacity opacity-0 group-hover:opacity-100">
                    <svg className="fill-black" width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.7915 1.86735C21.1992 1.27504 20.496 0.805261 19.722 0.484851C18.9481 0.164441 18.1186 -0.000314097 17.2809 4.49544e-07C16.4432 0.000314996 15.6139 0.165693 14.8402 0.486684C14.0665 0.807675 13.3636 1.27799 12.7717 1.87074L11.9991 2.65274L11.233 1.87243L11.228 1.86745C10.636 1.27542 9.93311 0.805797 9.15959 0.485391C8.38607 0.164986 7.55701 7.58822e-05 6.71975 7.58822e-05C5.8825 7.58822e-05 5.05344 0.164986 4.27992 0.485391C3.5064 0.805797 2.80356 1.27542 2.21153 1.86745L1.86735 2.21163C0.671706 3.40728 0 5.02893 0 6.71983C0 8.41073 0.671706 10.0324 1.86735 11.228L10.9512 20.3118L11.977 21.3865L12.0015 21.362L12.028 21.3886L12.9891 20.3745L22.1357 11.2279C23.3295 10.0313 24 8.40999 24 6.71968C24 5.02937 23.3295 3.40808 22.1357 2.21148L21.7915 1.86735ZM21.0084 10.1008L12.0015 19.108L2.99433 10.1008C2.0976 9.20411 1.59383 7.98788 1.59383 6.71971C1.59383 5.45153 2.0976 4.2353 2.99433 3.33856L3.33856 2.99438C4.23486 2.09809 5.45036 1.59435 6.71791 1.59388C7.98546 1.5934 9.20134 2.09623 10.0983 2.99184L11.9957 4.92379L13.9021 2.99438C14.3461 2.55036 14.8732 2.19814 15.4534 1.95784C16.0335 1.71753 16.6553 1.59385 17.2832 1.59385C17.9112 1.59385 18.533 1.71753 19.1131 1.95784C19.6933 2.19814 20.2204 2.55036 20.6644 2.99438L21.0086 3.33851C21.904 4.23599 22.4068 5.45198 22.4068 6.71972C22.4067 7.98746 21.9038 9.20343 21.0084 10.1008V10.1008Z" fill="inherit" />
                    </svg>
                </div>
            </div>
            <div className="mt-5 text-md text-center space-y-1">
                <div className="font-semibold tracking-widest text-black uppercase">Nike</div>
                <div className="text-text-gray">Кроссовки</div>
                <div className="text-text-gray line-clamp-3">Air Jordan 1 Retro High Primer</div>
                <div className="flex justify-center gap-3">
                    <div className={`${compareAtPrice !== undefined ? "text-main-red" : ""}`}>{price}</div>
                    {compareAtPrice !== undefined &&
                        <div className="line-through text-text-gray">{compareAtPrice}</div>
                    }
                </div>
            </div>
        </Link>
    )
}
