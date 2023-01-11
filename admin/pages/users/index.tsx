/* eslint-disable react-hooks/exhaustive-deps */
import Link from 'next/link'
import { toast } from 'react-toastify';
import React, { useEffect, useMemo, useState } from 'react'
import SearchInput from '../../components/inputs/SearchInput'
import MainLayout from '../../components/layouts/Main'
import { useRouter } from 'next/router'
import { useLazyGetUsersBySearchQuery } from '../../services/userService'
import { IErrorResponse } from '../../types/api';



function Index() {
    const router = useRouter()

    const itemPerPage = 20

    const [getUsersBySearch, { isError, isFetching, data, error }] = useLazyGetUsersBySearchQuery();
    const [query, setQuery] = useState({
        q: "",
        limit: itemPerPage,
        skip: 0
    })

    useEffect(() => {
        getUsersBySearch(query)
    }, [query])

    const onSearch = (q: string) => {
        setQuery({ q, limit: itemPerPage, skip: 0 })
    }

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
                    <h1 className="text-xl font-medium">Пользователи</h1>
                    <div className="">
                        <Link href="/users/new" className="block bg-green-700 px-4 py-2 text-white font-medium rounded-md">Создать</Link>
                    </div>
                </div>
                <div className="mt-4 px-4 bg-white rounded-md">
                    <div className="flex space-x-2 border-b-[1px]">
                        <Link href="#" className="relative p-3 before:absolute hover:before:absolute hover:before:bg-gray-500 before:left-0 before:bottom-0 before:rounded-lg before:bg-green-700 before:w-full before:h-[3px]">Все</Link>
                    </div>
                    <div className="py-4 space-y-4">
                        <div className="">
                            <SearchInput placeholder="Поиск" onChange={onSearch} />
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
                                <div className="animate-pulse space-y-2">
                                    <div className="bg-gray-300 rounded-lg h-8"></div>
                                    <div className="bg-gray-300 rounded-lg h-8"></div>
                                    <div className="bg-gray-300 rounded-lg h-8"></div>
                                </div>
                            }
                            {!isFetching && data?.data &&
                                <table className="table-auto block max-w-0 xl:table sm:w-full xl:max-w-none">
                                    <thead>
                                        <tr className="border-b-[1px] text-sm">
                                            <th className="font-medium text-gray-500 text-start px-3 py-2">Имя</th>
                                            <th className="font-medium text-gray-500 text-start px-3 py-2">Телефон</th>
                                            <th className="font-medium text-gray-500 text-start px-3 py-2">Email</th>
                                            <th className="font-medium text-gray-500 text-start px-3 py-2">Местоположение</th>
                                            <th className="font-medium text-gray-500 text-start px-3 py-2">Количество заказов</th>
                                            <th className="font-medium text-gray-500 text-start px-3 py-2">Количество офферов</th>
                                            <th className="font-medium text-gray-500 text-start px-3 py-2">Комментарий</th>
                                            <th className="font-medium text-gray-500 text-start px-3 py-2">Дата создания</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.data.map(user => (
                                            <tr
                                                key={user.id}
                                                className="border-b-[1px] hover:bg-gray-100 cursor-pointer"
                                                onClick={() => router.push(`/users/${user.id}`)}
                                            >
                                                <td className="px-3 py-2 font-medium">{user.fullName}</td>
                                                <td className="px-3 py-2">{user.phone}</td>
                                                <td className="px-3 py-2">{user.email}</td>
                                                <td className="px-3 py-2">{user.location}</td>
                                                <td className="px-3 py-2">{user.ordersCount}</td>
                                                <td className="px-3 py-2">{user.offersCount}</td>
                                                <td className="px-3 py-2 max-w-[100px] text-sm">{user.comment}</td>
                                                <td className="px-3 py-2">{new Date(user.createdAt).toLocaleString("ru-RU", { dateStyle: "short", timeStyle: "short" })}</td>
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