import Head from 'next/head'
import React from 'react'
import Breadcrumb from '../../components/Breadcrumbs'
import FeaturedProducts from '../../components/collections/FeaturedProducts'
import Hero from '../../components/collections/Hero'
import RecentlyViewed from '../../components/collections/RecentlyViewed'
import MainLayout from '../../components/layouts/Main'
import Pagination from '../../components/Pagination'
import ProductCard from '../../components/products/ProductCard'
import ProductFilterSort from '../../components/products/ProductFilterSort'
import ProductSlider from '../../components/sliders/CollectionSlider'

export default function Index() {
    return (
        <MainLayout>
            <Head>
                <title>Избранное</title>
                <meta name="description" content="Тут будет meta-description" />
            </Head>
            <div className="container px-4 md:px-10 py-10">
                <h1 className="text-center text-xl mb-10">Избранное</h1>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    <ProductCard
                        title="Air Jordan 1 Retro High Primer"
                        vendor="NIKE"
                        type="Кроссовки"
                        price="от 37 000 ₽"
                        compareAtPrice="57 000 ₽"
                    />
                    <ProductCard
                        title="Air Jordan 1 Retro High Primer"
                        vendor="NIKE"
                        type="Кроссовки"
                        price="от 37 000 ₽"
                    />
                    <ProductCard
                        title="Air Jordan 1 Retro High Primer"
                        vendor="NIKE"
                        type="Кроссовки"
                        price="от 37 000 ₽"
                    />
                    <ProductCard
                        title="Air Jordan 1 Retro High Primer"
                        vendor="NIKE"
                        type="Кроссовки"
                        price="от 37 000 ₽"
                    />
                    <ProductCard
                        title="Air Jordan 1 Retro High Primer"
                        vendor="NIKE"
                        type="Кроссовки"
                        price="от 37 000 ₽"
                    />
                </div>
            </div>
        </MainLayout>
    )
}
