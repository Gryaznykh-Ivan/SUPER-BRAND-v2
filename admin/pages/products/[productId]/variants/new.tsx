import Link from 'next/link'
import React from 'react'
import MainLayout from '../../../../components/layouts/Main'
import Media from '../../../../components/media/blocks/Media'
import GeneralInfo from '../../../../components/variants/blocks/GeneralInfo'
import VariantList from '../../../../components/variants/blocks/VariantList'
import withAuth from '../../../../hoc/withAuth'

function New() {
    return (
        <MainLayout>
            <div className="px-6 my-4 max-w-5xl mx-auto">
                <div className="flex items-center space-x-4">
                    <Link href="/products" className="p-2 font-bold border-[1px] border-gray-400 rounded-md">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 19L3 12M3 12L10 5M3 12H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                    <h1 className="text-xl font-medium">Создание варианта</h1>
                </div>
                <div className="my-4 flex flex-col space-y-4 pb-4 border-b-[1px] lg:flex-row lg:space-x-4 lg:space-y-0">
                    <div className="space-y-4 lg:w-80">
                        <VariantList />
                    </div>
                    <div className="flex-1 space-y-4">
                        <GeneralInfo />
                        <Media />
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className=""></div>
                    <div className="flex justify-end">
                        <button className="bg-green-700 px-4 py-2 text-white font-medium rounded-md">Создать вариант</button>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default withAuth(New)
