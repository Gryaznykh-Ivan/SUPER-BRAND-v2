/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import RouterSearchInput from '../../components/inputs/RouterSearchInput'
import SearchInput from '../../components/inputs/SearchInput'
import MainLayout from '../../components/layouts/Main'
import NavLink from '../../components/navigation/NavLink'
import Status from '../../components/offers/cards/Status'
import useDidMount from '../../hooks/useDidMount'
import { useLazyGetOffersBySearchQuery } from '../../services/offerService'
import { IErrorResponse } from '../../types/api'


function Index() {
    const router = useRouter()
    const didMount = useDidMount()
    const itemPerPage = 20

    const [getOfferBySearch, { isError, isFetching, data, error }] = useLazyGetOffersBySearchQuery();
    const [query, setQuery] = useState({
        q: "",
        limit: itemPerPage,
        skip: 0,
        status: router.query.status as string ?? undefined
    })

    useEffect(() => {
        setQuery(prev => ({ ...prev, limit: itemPerPage, skip: 0, status: router.query.status as string ?? undefined, q: router.query.q as string ?? undefined }))
    }, [router.query.status, router.query.q])

    useEffect(() => {
        if (didMount === true) {
            getOfferBySearch(query)
        }
    }, [query])

    const onNextPage = () => {
        if (data?.data.length !== itemPerPage) return

        setQuery(prev => ({ ...prev, skip: prev.skip + prev.limit }))
    }

    const onPrevPage = () => {
        if (query.skip === 0) return

        setQuery(prev => ({ ...prev, skip: prev.skip - prev.limit }))
    }
    return (
        <MainLayout>
            <div className="px-6 my-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-medium">Офферы</h1>
                    <div className="">
                        <Link href="/offers/new" className="block bg-green-700 px-4 py-2 text-white font-medium rounded-md">Создать</Link>
                    </div>
                </div>
                <div className="mt-4 px-4 bg-white rounded-md">
                    <div className="flex space-x-2 border-b-[1px]">
                        <NavLink href="/offers" query={{ status: undefined }} className={({ isActive }) => `relative p-3 ${isActive ? "before:absolute" : "text-gray-400"} hover:before:absolute hover:before:bg-gray-500 before:left-0 before:bottom-0 before:rounded-lg before:bg-green-700 before:w-full before:h-[3px]`}>Все</NavLink>
                        <NavLink href="/offers" query={{ status: "OFFERED" }} className={({ isActive }) => `relative p-3 ${isActive ? "before:absolute" : "text-gray-400"} hover:before:absolute hover:before:bg-gray-500 before:left-0 before:bottom-0 before:rounded-lg before:bg-green-700 before:w-full before:h-[3px]`}>Предложенные</NavLink>
                        <NavLink href="/offers" query={{ status: "ACCEPTED" }} className={({ isActive }) => `relative p-3 ${isActive ? "before:absolute" : "text-gray-400"} hover:before:absolute hover:before:bg-gray-500 before:left-0 before:bottom-0 before:rounded-lg before:bg-green-700 before:w-full before:h-[3px]`}>Нужно принять</NavLink>
                        <NavLink href="/offers" query={{ status: "ACTIVE" }} className={({ isActive }) => `relative p-3 ${isActive ? "before:absolute" : "text-gray-400"} hover:before:absolute hover:before:bg-gray-500 before:left-0 before:bottom-0 before:rounded-lg before:bg-green-700 before:w-full before:h-[3px]`}>Активные</NavLink>
                        <NavLink href="/offers" query={{ status: "SOLD" }} className={({ isActive }) => `relative p-3 ${isActive ? "before:absolute" : "text-gray-400"} hover:before:absolute hover:before:bg-gray-500 before:left-0 before:bottom-0 before:rounded-lg before:bg-green-700 before:w-full before:h-[3px]`}>Проданные</NavLink>
                    </div>
                    <div className="py-4 space-y-4">
                        <div className="">
                            <RouterSearchInput placeholder="Поиск" />
                        </div>
                        <div className="relative block overflow-x-auto">
                            {isError &&
                                <div className="flex flex-col items-center py-5">
                                    <div className="text-2xl font-bold text-red-600">Что-то пошло не так</div>
                                    {(error && "status" in error) &&
                                        <div className="text-gray-500">{(error.data as IErrorResponse).message}</div>
                                    }
                                </div>
                            }
                            {isFetching &&
                                <div className="flex justify-center absolute bg-white border-gray-100 border-2 inset-x-0 p-5 shadow-md z-10 rounded-md ">
                                    <svg className="animate-spin" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 3.99999V8.99999H4.582M4.582 8.99999C5.24585 7.35812 6.43568 5.9829 7.96503 5.08985C9.49438 4.1968 11.2768 3.8364 13.033 4.06513C14.7891 4.29386 16.4198 5.09878 17.6694 6.35377C18.919 7.60875 19.7168 9.24285 19.938 11M4.582 8.99999H9M20 20V15H19.419M19.419 15C18.7542 16.6409 17.564 18.015 16.0348 18.9073C14.5056 19.7995 12.7237 20.1595 10.9681 19.9309C9.21246 19.7022 7.5822 18.8979 6.33253 17.6437C5.08287 16.3896 4.28435 14.7564 4.062 13M19.419 15H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            }
                            {data?.data &&

                                <table className="table-auto block max-w-0 lg:table lg:w-full lg:max-w-none">
                                    <thead>
                                        <tr className="border-b-[1px] text-sm">
                                            <th className="font-medium text-gray-500 text-start px-3 py-2">Продукт</th>
                                            <th className="font-medium text-gray-500 text-start px-3 py-2">Вариант</th>
                                            <th className="font-medium text-gray-500 text-start px-3 py-2">Поставщик</th>
                                            <th className="font-medium text-gray-500 text-start px-3 py-2">Цена поставщика</th>
                                            <th className="font-medium text-gray-500 text-start px-3 py-2">Цена на сайте</th>
                                            <th className="font-medium text-gray-500 text-start px-3 py-2">Статус</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.data.map(offer => (
                                            <tr
                                                key={offer.id}
                                                className="border-b-[1px] hover:bg-gray-100 cursor-pointer"
                                                onClick={() => router.push(`/offers/${offer.id}`)}
                                            >
                                                <td className="px-3 py-2">{offer.product}</td>
                                                <td className="px-3 py-2">{offer.variant}</td>
                                                <td className="px-3 py-2">{offer.user}</td>
                                                <td className="px-3 py-2">{offer.offerPrice}₽</td>
                                                <td className="px-3 py-2">{offer.price}₽</td>
                                                <td className="px-3 py-2"><Status status={offer.status} /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            }
                        </div>
                        <div className="flex justify-center mt-4 space-x-1">
                            <button className={`p-2 font-bold border-[1px] rounded-md ${query.skip === 0 && "bg-gray-100 cursor-not-allowed"}`} onClick={onPrevPage} disabled={query.skip === 0}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 19L3 12M3 12L10 5M3 12H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <button className={`p-2 font-bold border-[1px] rounded-md ${data?.data.length !== itemPerPage && "bg-gray-100 cursor-not-allowed"}`} onClick={onNextPage} disabled={data?.data.length !== itemPerPage}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 5L21 12M21 12L14 19M21 12H3" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Index