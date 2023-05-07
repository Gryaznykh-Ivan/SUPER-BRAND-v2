import Head from 'next/head'
import React from 'react'
import Breadcrumb from '../../components/Breadcrumbs'
import FeaturedProducts from '../../components/collections/FeaturedProducts'
import Hero from '../../components/collections/Hero'
import RecentlyViewed from '../../components/collections/RecentlyViewed'
import Authorization from '../../components/forms/Authorization'
import MainLayout from '../../components/layouts/Main'
import Pagination from '../../components/Pagination'
import ProductCard from '../../components/products/ProductCard'
import ProductFilterSort from '../../components/products/ProductFilterSort'
import ProductSlider from '../../components/sliders/CollectionSlider'

export default function Login() {
    return (
        <MainLayout>
            <Head>
                <title>Авторизация/регистрация</title>
                <meta name="description" content="Тут будет meta-description" />
            </Head>
            <div className="flex justify-center py-20">
                <Authorization />
            </div>
        </MainLayout>
    )
}
