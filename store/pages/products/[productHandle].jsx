import Head from 'next/head'
import React from 'react'
import MainLayout from '../../components/layouts/Main'
import Breadcrumb from '../../components/Breadcrumbs'

export default function Product() {
    return (
        <MainLayout>
            <Head>
                <title>Коллекция</title>
                <meta name="description" content="Тут будет meta-description" />
            </Head>
            <div className="">
                <div className="container px-4 md:px-10 py-8 space-y-8">
                    <Breadcrumb className="hidden md:flex md:gap-2" crumbs={[{ title: "nike", link: "/collections/nike", active: true }]} />

                </div>
            </div>
        </MainLayout>
    )
}
