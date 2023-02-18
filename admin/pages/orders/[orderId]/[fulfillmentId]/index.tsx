import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'


import { useRouter } from 'next/router'
import MainLayout from '../../../../components/layouts/Main'
import Fulfillment from '../../../../components/orders/blocks/Fulfillment'
import TrackingInformation from '../../../../components/orders/blocks/TrackingInformation'
import FulfillmentStatus from '../../../../components/orders/blocks/FulfillmentStatus'



function Index() {
    const router = useRouter()

    const mustBeSaved = useMemo(() => {
        return true
    }, [])


    return (
        <MainLayout>
            <div className="px-6 my-4 max-w-5xl mx-auto">
                <div className="flex items-center space-x-4">
                    <Link href={`/orders/${router.query.orderId}`} className="p-2 font-bold border-[1px] border-gray-400 rounded-md">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 19L3 12M3 12L10 5M3 12H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                    <h1 className="flex-1 text-xl font-medium">Исполнение</h1>
                    <div className="flex items-center">

                    </div>
                </div>
                <div className="my-4 flex flex-col space-y-4 pb-4 border-b-[1px] lg:flex-row lg:space-x-4 lg:space-y-0">
                    <div className="flex-1 space-y-4">
                        <Fulfillment />
                        <TrackingInformation />
                    </div>
                    <div className="space-y-4 lg:w-80">
                        <FulfillmentStatus />
                    </div>
                </div>
                <div className={`flex justify-between rounded-md ${mustBeSaved && "sticky left-10 right-0 bottom-4 bg-gray-800 p-4 transition-colors duration-200"}`}>
                    <div className="">
                        <button className="border-red-600 border-[1px] text-red-600 px-4 py-2 font-medium rounded-md hover:bg-red-700 hover:text-white">Удалить</button>
                    </div>
                    <div className="flex justify-end">
                        <button className={`${mustBeSaved ? "bg-green-600" : "bg-gray-300"} px-4 py-2 text-white font-medium rounded-md`} disabled={!mustBeSaved}>Сохранить</button>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Index
