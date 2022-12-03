import React from 'react'
import FeaturedProduct from './FeaturedProduct'

interface IProps {
    className?: string;
}

export default function FeaturedProductsBlock({ className = "" }: IProps) {
    return (
        <div className={`mt-2 mb-4 ${className}`} >
            <div className="font-semibold text-2xl text-center my-6 md:text-start md:my-0">Рекомендуем к покупке</div>
            <div className="flex mt-4 justify-center md:justify-start">
                <FeaturedProduct />
            </div>
        </div>
    )
}
