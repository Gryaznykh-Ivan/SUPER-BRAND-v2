import Link from 'next/link'
import React from 'react'
import CollectionImage from '../../components/collections/blocks/CollectionImage'
import GeneralInfo from '../../components/collections/blocks/GeneralInfo'
import Products from '../../components/collections/blocks/Products'
import SeoTags from '../../components/collections/blocks/SeoTags'
import Status from '../../components/collections/blocks/Status'
import MainLayout from '../../components/layouts/Main'

export default function New() {
    return (
        <MainLayout>
            <div className="px-6 my-4 max-w-5xl mx-auto">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/collections" className="p-2 font-bold border-[1px] border-gray-400 rounded-md">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 19L3 12M3 12L10 5M3 12H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                        <h1 className="text-xl font-medium">Создание коллекции</h1>
                    </div>
                    <div className="flex justify-end">

                    </div>
                </div>
                <div className="my-4 flex flex-col space-y-4 pb-4 border-b-[1px] lg:flex-row lg:space-x-4 lg:space-y-0">
                    <div className="flex-1 space-y-4">
                        <GeneralInfo />
                        <Products />
                        <SeoTags />
                    </div>
                    <div className="space-y-4 lg:w-80">
                        <Status />
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className=""></div>
                    <div className="flex justify-end">
                        <button className="bg-green-700 px-4 py-2 text-white font-medium rounded-md">Создать</button>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
