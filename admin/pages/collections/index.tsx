import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import SearchInput from '../../components/inputs/SearchInput'
import MainLayout from '../../components/layouts/Main'
import withAuth from '../../hoc/withAuth'

function Index() {
    const router = useRouter()

    return (
        <MainLayout>
            <div className="px-6 my-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-medium">Коллекции</h1>
                    <div className="">
                        <Link href="/collections/new" className="block bg-green-700 px-4 py-2 text-white font-medium rounded-md">Создать</Link>
                    </div>
                </div>
                <div className="mt-4 px-4 bg-white rounded-md">
                    <div className="flex space-x-2 border-b-[1px]">
                        <Link href="#" className="relative p-3 before:absolute hover:before:absolute hover:before:bg-gray-500 before:left-0 before:bottom-0 before:rounded-lg before:bg-green-700 before:w-full before:h-[3px]">Все</Link>
                    </div>
                    <div className="py-4 space-y-4">
                        <div className="">
                            <SearchInput placeholder="Поиск" onChange={() => { }} />
                        </div>
                        <div className="relative block overflow-x-auto">
                            <table className="table-auto block max-w-0 sm:table sm:w-full sm:max-w-none">
                                <thead>
                                    <tr className="border-b-[1px] text-sm">
                                        <th className="font-medium text-gray-500 text-start px-3 py-2">Название</th>
                                        <th className="font-medium text-gray-500 text-start px-3 py-2">Дата создания</th>
                                        <th className="font-medium text-gray-500 text-start px-3 py-2">Количество</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b-[1px] hover:bg-gray-100 cursor-pointer" onClick={ () => router.push("/collections/example") }>
                                        <td className="px-3 py-2 font-medium">Nike</td>
                                        <td className="px-3 py-2">27.11.2022 14:32</td>
                                        <td className="px-3 py-2">1456</td>
                                    </tr>
                                    <tr className="border-b-[1px] hover:bg-gray-100 cursor-pointer" onClick={ () => router.push("/collections/example") }>
                                        <td className="px-3 py-2 font-medium">Air Jordan 1</td>
                                        <td className="px-3 py-2">27.11.2022 14:32</td>
                                        <td className="px-3 py-2">522</td>
                                    </tr>
                                    <tr className="border-b-[1px] hover:bg-gray-100 cursor-pointer" onClick={ () => router.push("/collections/example") }>
                                        <td className="px-3 py-2 font-medium">500</td>
                                        <td className="px-3 py-2">27.11.2022 14:32</td>
                                        <td className="px-3 py-2">321</td>
                                    </tr>
                                    <tr className="border-b-[1px] hover:bg-gray-100 cursor-pointer" onClick={ () => router.push("/collections/example") }>
                                        <td className="px-3 py-2 font-medium">Новое поступление</td>
                                        <td className="px-3 py-2">27.11.2022 14:32</td>
                                        <td className="px-3 py-2">344</td>
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

export default withAuth(Index)