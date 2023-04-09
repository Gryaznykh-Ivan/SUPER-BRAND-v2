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
import ProductSlider from '../../components/sliders/ProductSlider'

export default function Collection() {
    return (
        <MainLayout>
            <Head>
                <title>Коллекция</title>
                <meta name="description" content="Тут будет meta-description" />
            </Head>
            <div className="">
                <Hero
                    title="air jordan"
                    description="Компания Nike издавна славится высоким качеством и большим ассортиментом своей обуви. Здесь вы найдёте всё: от классических Air Jordan, Air Force и Dunk до свежих релизов с Off-White. Коллекция кроссовок Nike - это идеальный выбор для тех, кто ищет высококачественную и стильную обувь для спорта и повседневной носки."
                />
                <div className="container px-4 md:px-10 py-8 space-y-8">
                    <Breadcrumb className="hidden md:flex md:gap-2" crumbs={[{ title: "nike", link: "/collections/nike", active: true }]} />
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
                    <Pagination />
                </div>
                <ProductFilterSort />
                <FeaturedProducts />
                <RecentlyViewed />
            </div>
        </MainLayout>
    )
}
