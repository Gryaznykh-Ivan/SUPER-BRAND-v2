import React from 'react'
import CollectionSlider from '../sliders/CollectionSlider'

export default function RecentlyViewed() {
    return (
        <div className="container">
            <div className="px-4 md:px-10 text-lg tracking-widest mb-5">Недавно просмотренные</div>
            <CollectionSlider
                products={[{
                    id: "1",
                    title: "Air Jordan 1 Retro High Primer",
                    vendor: "NIKE",
                    type: "Кроссовки",
                    price: "от 37 000 ₽",
                }, {
                    id: "2",
                    title: "Air Jordan 1 Retro High Primer",
                    vendor: "NIKE",
                    type: "Кроссовки",
                    price: "от 37 000 ₽",
                }]}
            />
        </div>
    )
}
