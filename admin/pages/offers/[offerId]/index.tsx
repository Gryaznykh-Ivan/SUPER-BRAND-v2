import Link from 'next/link'
import React, { useState } from 'react'
import MainLayout from '../../../components/layouts/Main'
import Comment from '../../../components/offers/blocks/Comment'
import DeliveryProfile from '../../../components/offers/blocks/DeliveryProfile'
import PickVariant from '../../../components/offers/blocks/PickVariant'
import Prices from '../../../components/offers/blocks/Prices'
import Provider from '../../../components/offers/blocks/Provider'
import Status from '../../../components/offers/blocks/Status'



function New() {
    return (
        <MainLayout>
            <div className="px-6 my-4 max-w-5xl mx-auto flex flex-col">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/offers" className="p-2 font-bold border-[1px] border-gray-400 rounded-md">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 19L3 12M3 12L10 5M3 12H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                        <h1 className="text-xl font-medium">Оффер <span className="bg-red-500 text-white px-2 py-1 rounded-md text-sm">ПРОДАНО</span></h1>
                    </div>
                    <div className="flex justify-end">
                        <Link href="http://google.com" target="_blank" className="hover:bg-gray-300 p-2 text-gray-700 font-medium rounded-md">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 8H19M5 8C4.46957 8 3.96086 7.78929 3.58579 7.41421C3.21071 7.03914 3 6.53043 3 6C3 5.46957 3.21071 4.96086 3.58579 4.58579C3.96086 4.21071 4.46957 4 5 4H19C19.5304 4 20.0391 4.21071 20.4142 4.58579C20.7893 4.96086 21 5.46957 21 6C21 6.53043 20.7893 7.03914 20.4142 7.41421C20.0391 7.78929 19.5304 8 19 8M5 8V18C5 18.5304 5.21071 19.0391 5.58579 19.4142C5.96086 19.7893 6.46957 20 7 20H17C17.5304 20 18.0391 19.7893 18.4142 19.4142C18.7893 19.0391 19 18.5304 19 18V8M10 12H14" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                    </div>
                </div>
                <div className=" my-4 flex flex-col space-y-4 pb-4 border-b-[1px] lg:flex-row lg:space-x-4 lg:space-y-0">
                    <div className="flex-1 space-y-4">
                        <PickVariant />
                        <Prices />
                        <Comment />
                    </div>
                    <div className="space-y-4 lg:w-80">
                        <Status />
                        <DeliveryProfile />
                        <Provider />
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className=""></div>
                    <div className="flex justify-end">
                        <button className="bg-green-700 px-4 py-2 text-white font-medium rounded-md">Сохранить</button>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default New
