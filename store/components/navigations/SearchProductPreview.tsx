import React from 'react'
import Link from 'next/link'
import ImageLoader from '../../utils/ImageLoader'

interface IProps {
    onClick: () => void;
}

export default function SearchProductPreview({ onClick }: IProps) {
    return (
        <Link href="/products/example" className="flex" onClick={ onClick }>
            <ImageLoader className="relative w-24" src={`/assets/images/air-force0.jpg`} alt={""} />
            <div className="ml-4">
                <div className="text-xxs">NIKE</div>
                <h2 className="text-sm font-semibold">Dunk Low &#34;Off-White - Lot 42&#34;</h2>
                <div className="text-sm">64 000 ₽</div>
            </div>
        </Link>
    )
}
