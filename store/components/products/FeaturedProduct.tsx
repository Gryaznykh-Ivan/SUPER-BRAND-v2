import React from 'react'
import Link from 'next/link'
import ImageLoader from '../../utils/ImageLoader'

export default function RecommendedProduct() {
    return (
        <Link href="/products/example" className="flex items-center">
            <ImageLoader className="relative w-40 md:w-56" src={`/assets/images/air-force0.jpg`} alt={""} />
            <div className="ml-4">
                <div className="text-xxs">OFF-WHITE</div>
                <h2 className="text-sm font-semibold">Шнурки off-white</h2>
                <div className="text-sm">8 500 ₽</div>
            </div>
        </Link>
    )
}
