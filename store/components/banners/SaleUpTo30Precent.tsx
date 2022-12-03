import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ShineHoverButton from '../buttons/ShineHoverButton'

export default function SaleUpTo30Precent() {
    return (
        <div className="relative w-full aspect-[1903/732]">
            <Image fill sizes="100vw" src={`/assets/images/sale-up-to-30-precent.jpg`} alt="" />
            <div className="flex flex-col items-center p-4 md:absolute md:justify-center inset-0">
                <div className="text-2xl font-bold drop-shadow-xl">SALE UP TO 30%</div>
                <div className="text-xs font-semibold drop-shadow-md mt-2">СЕЗОН ОСЕННИХ СКИДОК НА LA ROSIPIER</div>
                <Link href="#" className="mt-4">
                    <ShineHoverButton className="text-white bg-black">К коллекции</ShineHoverButton>
                </Link>
            </div>
        </div>
    )
}
