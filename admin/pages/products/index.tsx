/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import SearchInput from '../../components/inputs/SearchInput'
import MainLayout from '../../components/layouts/Main'


function Index() {
    const router = useRouter()

    return (
        <MainLayout>
            <div className="px-6 my-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-medium">Продукты</h1>
                    <div className="">
                        <Link href="/products/new" className="block bg-green-700 px-4 py-2 text-white font-medium rounded-md">Создать</Link>
                    </div>
                </div>
                <div className="mt-4 px-4 bg-white rounded-md">
                    <div className="flex space-x-2 border-b-[1px]">
                        <Link href="#" className="relative p-3 before:absolute hover:before:absolute hover:before:bg-gray-500 before:left-0 before:bottom-0 before:rounded-lg before:bg-green-700 before:w-full before:h-[3px]">Все</Link>
                        <Link href="#" className="relative p-3 text-gray-400 hover:before:absolute hover:before:bg-gray-500 before:left-0 before:bottom-0 before:rounded-lg before:bg-green-700 before:w-full before:h-[3px]">Неактивные</Link>
                    </div>
                    <div className="py-4 space-y-4">
                        <div className="">
                            <SearchInput placeholder="Поиск" onChange={() => { }} />
                        </div>
                        <div className="relative block overflow-x-auto">
                            <table className="table-auto block max-w-0 md:table md:w-full md:max-w-none">
                                <thead>
                                    <tr className="border-b-[1px] text-sm">
                                        <th className="font-medium text-gray-500 text-start px-3 py-2 min-w-[80px] w-20"></th>
                                        <th className="font-medium text-gray-500 text-start px-3 py-2">Продукт</th>
                                        <th className="font-medium text-gray-500 text-start px-3 py-2">Статус</th>
                                        <th className="font-medium text-gray-500 text-start px-3 py-2">Наличие</th>
                                        <th className="font-medium text-gray-500 text-start px-3 py-2">Производитель</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b-[1px] hover:bg-gray-100 cursor-pointer" onClick={() => router.push("/products/example1")}>
                                        <td className="px-3 py-2">
                                            <Image width={80} height={48} src={`/assets/images/air-force0.jpg`} className="" alt="" />
                                        </td>
                                        <td className="font-medium px-3 py-2">1906R "White Gold"</td>
                                        <td className="px-3 py-2">
                                            <span className="bg-green-600 px-2 py-1 rounded-xl text-white text-sm">Active</span>
                                        </td>
                                        <td className="px-3 py-2">200 офферов</td>
                                        <td className="px-3 py-2">Air Force</td>
                                    </tr>
                                    <tr className="border-b-[1px] hover:bg-gray-100 cursor-pointer" onClick={() => router.push("/products/example2")}>
                                        <td className="px-3 py-2">
                                            <Image width={80} height={48} src={`/assets/images/air-force1.jpg`} className="" alt="" />
                                        </td>
                                        <td className="font-medium px-3 py-2">1906R "White Gold"</td>
                                        <td className="px-3 py-2">
                                            <span className="bg-green-600 px-2 py-1 rounded-xl text-white text-sm">Active</span>
                                        </td>
                                        <td className="px-3 py-2">205 офферов</td>
                                        <td className="px-3 py-2">Air Force</td>
                                    </tr>
                                    <tr className="border-b-[1px] hover:bg-gray-100 cursor-pointer" onClick={() => router.push("/products/example3")}>
                                        <td className="px-3 py-2">
                                            <Image width={80} height={48} src={`/assets/images/air-force0.jpg`} className="" alt="" />
                                        </td>
                                        <td className="font-medium px-3 py-2">574 YURT "Salehe Bembury - Universal Communication Workwear White"</td>
                                        <td className="px-3 py-2">
                                            <span className="bg-gray-400 px-2 py-1 rounded-xl text-white text-sm">Draft</span>
                                        </td>
                                        <td className="px-3 py-2">20 офферов</td>
                                        <td className="px-3 py-2">Air Force</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-center mt-4 space-x-1">
                            <Link href="#" className="p-2 font-bold border-[1px] rounded-md">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 19L3 12M3 12L10 5M3 12H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                            <div className="min-w-[40px] text-center p-2 font-medium rounded-md">1</div>
                            <Link href="#" className="p-2 font-bold border-[1px] rounded-md">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 5L21 12M21 12L14 19M21 12H3" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Index