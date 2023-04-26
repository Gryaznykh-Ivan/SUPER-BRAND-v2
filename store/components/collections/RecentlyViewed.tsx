import React from 'react'
import CollectionSlider from '../sliders/CollectionSlider'

export default function RecentlyViewed() {
    return (
        <div className="container">
            <div className="px-4 md:px-10 text-lg tracking-widest mb-5">Недавно просмотренные</div>
            <CollectionSlider
                products={[{
                    handle: "2",
                    title: "Air Jordan 1 Retro High Primer",
                    vendor: "NIKE",
                    type: "Кроссовки",
                    image: null,
                    price: "37000",
                    compareAtPrice: "37000"
                }]}
            />
        </div>
    )
}
