/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import MainLayout from '../../../../components/layouts/Main'
import Media from '../../../../components/media/blocks/Media'
import GeneralInfo from '../../../../components/variants/blocks/GeneralInfo'
import VariantList from '../../../../components/variants/blocks/VariantList'

export default function Variant() {
    const router = useRouter()

    return (
        <MainLayout>
            <div className="px-6 my-4 max-w-5xl mx-auto">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/products" className="p-2 font-bold border-[1px] border-gray-400 rounded-md">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 19L3 12M3 12L10 5M3 12H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                        <h1 className="text-xl font-medium">US 5</h1>
                    </div>
                    <div className="flex justify-end">
                        <Link href="http://google.com" target={'_blank'} className="flex space-x-2 hover:bg-gray-300 p-2 text-gray-700 font-medium rounded-md">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2.45801 12C3.73201 7.943 7.52301 5 12 5C16.478 5 20.268 7.943 21.542 12C20.268 16.057 16.478 19 12 19C7.52301 19 3.73201 16.057 2.45801 12Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="">Офферы</div>
                        </Link>
                    </div>
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
                        <button className="bg-green-700 px-4 py-2 text-white font-medium rounded-md">Сохранить</button>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
