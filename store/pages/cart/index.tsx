import Head from 'next/head'
import React from 'react'
import Breadcrumb from '../../components/Breadcrumbs'
import FeaturedProducts from '../../components/collections/FeaturedProducts'
import RecentlyViewed from '../../components/collections/RecentlyViewed'
import Hero from '../../components/collections/Hero'
import MainLayout from '../../components/layouts/Main'
import Pagination from '../../components/Pagination'
import ProductCard from '../../components/products/ProductCard'
import ProductFilterSort from '../../components/products/ProductFilterSort'

export default function Cart() {
    return (
        <MainLayout>
            <Head>
                <title>Корзина</title>
                <meta name="description" content="Тут будет meta-description" />
            </Head>
            <div className="">
                
            </div>
        </MainLayout>
    )
}
