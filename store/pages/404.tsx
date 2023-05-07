import FeaturedProducts from '@/components/collections/FeaturedProducts'
import RecentlyViewed from '@/components/collections/RecentlyViewed'
import MainLayout from '@/components/layouts/Main'
import Head from 'next/head'
import React from 'react'

export default function Custom404() {
    return (
        <MainLayout>
            <Head>
                <title>404 - страница не найдена</title>
                <meta name="description" content="404 - страница не найдена" />
            </Head>
            <div className="container">
                <div className="px-8 pt-20 pb-40 space-y-10">
                    <div className="text-center text-md">страница не найдена</div>
                    <div className="text-center leading-[68px] text-[68px]">404</div>
                    <div className="text-center text-base">К сожалению, страницу или продукт, который вы ищете, не удается найти прямо сейчас, попробуйте воспользоваться поиском.</div>
                </div>
                <div className="space-y-8 py-8">
                    <FeaturedProducts />
                    <RecentlyViewed />
                </div>
            </div>
        </MainLayout>
    )
}
