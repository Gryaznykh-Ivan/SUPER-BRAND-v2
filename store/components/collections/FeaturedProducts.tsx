import React from 'react'
import CollectionSlider from '../sliders/CollectionSlider'

export default function RecentlyViewed() {
    return (
        <div className="container">
            <div className="px-4 md:px-10 text-lg tracking-widest mb-5">Вам может понравиться</div>
            <CollectionSlider
                products={[{
                    id: "1",
                    title: "Air Jordan 1 Retro High Primer",
                    vendor: "NIKE",
                    type: "Кроссовки",
                    price: "от 37 000 ₽",
                    compareAtPrice: "от 37 000 ₽"
                }, {
                    id: "2",
                    title: "Air Jordan 1 Retro High Primer",
                    vendor: "NIKE",
                    type: "Кроссовки",
                    price: "от 37 000 ₽",
                }, {
                    id: "3",
                    title: "Air Jordan 1 Retro High Primer",
                    vendor: "NIKE",
                    type: "Кроссовки",
                    price: "от 37 000 ₽",
                }, {
                    id: "4",
                    title: "Air Jordan 1 Retro High Primer",
                    vendor: "NIKE",
                    type: "Кроссовки",
                    price: "от 37 000 ₽",
                }, {
                    id: "5",
                    title: "Air Jordan 1 Retro High Primer",
                    vendor: "NIKE",
                    type: "Кроссовки",
                    price: "от 37 000 ₽",
                }, {
                    id: "6",
                    title: "Air Jordan 1 Retro High Primer",
                    vendor: "NIKE",
                    type: "Кроссовки",
                    price: "от 37 000 ₽",
                }]}
            />
        </div>
    )
}
