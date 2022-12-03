import React from 'react'

import ProductCard from '../products/ProductCard'
import Slider from '../slider/Slider'

export default function RecentlyViewed() {
    return (
        <div className="my-12">
            <h2 className="my-6 text-2xl font-semibold text-center">Недавно просмотренные</h2>
            <Slider
                className="my-10"
                breakpoints={({
                    768: {
                        slidesPerView: 4,
                        slidesPerGroup: 4,
                    }
                })}
            >
                <ProductCard isSale={true} />
                <ProductCard isSale={false} />
            </Slider>
        </div>
    )
}
