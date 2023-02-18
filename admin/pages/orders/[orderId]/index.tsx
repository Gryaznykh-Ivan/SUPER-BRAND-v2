import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'


import { useRouter } from 'next/router'
import MainLayout from '../../../components/layouts/Main'
import FulfillmentProducts from '../../../components/orders/blocks/FulfillmentProducts'
import PickDelivery from '../../../components/orders/blocks/PickDelivery'
import Customer from '../../../components/orders/blocks/Customer'
import PaymentMethod from '../../../components/orders/blocks/Payment'
import Address from '../../../components/orders/blocks/Address'
import Fulfillment from '../../../components/orders/blocks/Fulfillment'
import Service from '../../../components/orders/blocks/Service'
import Note from '../../../components/orders/blocks/Note'
import Timeline from '../../../components/orders/blocks/Timeline'


function Index() {
    const router = useRouter()

    const mustBeSaved = useMemo(() => {
        return true
    }, [])


    return (
        <MainLayout>
            <div className="px-6 my-4 max-w-5xl mx-auto">
                <div className="flex items-center space-x-4">
                    <Link href="/orders" className="p-2 font-bold border-[1px] border-gray-400 rounded-md">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 19L3 12M3 12L10 5M3 12H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                    <h1 className="flex-1 text-xl font-medium">Заказ №1</h1>
                    <div className="flex items-center">
                        <button className="p-2 font-medium hover:bg-gray-200 rounded-md">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H18C18.5304 20 19.0391 19.7893 19.4142 19.4142C19.7893 19.0391 20 18.5304 20 18V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4H16M12 3V11M12 11L15 8M12 11L9 8M4 13H6.586C6.85119 13.0001 7.10551 13.1055 7.293 13.293L9.707 15.707C9.89449 15.8945 10.1488 15.9999 10.414 16H13.586C13.8512 15.9999 14.1055 15.8945 14.293 15.707L16.707 13.293C16.8945 13.1055 17.1488 13.0001 17.414 13H20" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <Link href="/orders" className="p-2 font-bold hover:bg-gray-200 rounded-md">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2.45801 12C3.73201 7.943 7.52301 5 12 5C16.478 5 20.268 7.943 21.542 12C20.268 16.057 16.478 19 12 19C7.52301 19 3.73201 16.057 2.45801 12Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                    </div>
                </div>
                <div className="my-4 flex flex-col space-y-4 pb-4 lg:flex-row lg:space-x-4 lg:space-y-0 border-b-[1px]">
                    <div className="flex-1 space-y-4">
                        <FulfillmentProducts
                            onChange={() => { }}
                        />
                        <Fulfillment />
                        <Service
                            onChange={() => { }}
                        />
                        <PaymentMethod
                            onChange={() => { }}
                        />
                        <Timeline />
                    </div>
                    <div className="space-y-4 lg:w-80">
                        <Customer
                            userId={null}
                            onChange={() => { }}
                        />
                        <Address
                            addresses={[]}
                            onChange={() => { }}
                        />
                        <Note />
                    </div>
                </div>
                <div className={`flex justify-between rounded-md ${mustBeSaved && "sticky left-10 right-0 bottom-4 bg-gray-800 p-4 transition-colors duration-200"}`}>
                    <div className="">

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
