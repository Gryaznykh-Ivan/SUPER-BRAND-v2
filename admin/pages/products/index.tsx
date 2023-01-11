/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import ImageLoader from '../../components/image/ImageLoader'
import SearchInput from '../../components/inputs/SearchInput'
import MainLayout from '../../components/layouts/Main'
import { useLazyGetProductsBySearchQuery } from '../../services/productService'
import { useLazyGetUsersBySearchQuery } from '../../services/userService'
import { IErrorResponse } from '../../types/api'


function Index() {
    const router = useRouter()
    const itemPerPage = 20

    const [getProductBySearch, { isError, isFetching, data, error }] = useLazyGetProductsBySearchQuery();
    const [query, setQuery] = useState({
        q: "",
        limit: itemPerPage,
        skip: 0
    })

    useEffect(() => {
        getProductBySearch(query)
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
                                <table className="table-auto block max-w-0 md:table md:w-full md:max-w-none">
                                    <thead>
                                        <tr className="border-b-[1px] text-sm">
                                            <th className="font-medium text-gray-500 text-start px-3 py-2 min-w-[80px] w-20"></th>
                                            <th className="font-medium text-gray-500 text-start px-3 py-2">Продукт</th>
                                            <th className="font-medium text-gray-500 text-start px-3 py-2 w-40">Статус</th>
                                            <th className="font-medium text-gray-500 text-start px-3 py-2 w-40">Наличие</th>
                                            <th className="font-medium text-gray-500 text-start px-3 py-2 w-40">Производитель</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.data.map(product => (
                                            <tr
                                                key={product.id}
                                                className="border-b-[1px] hover:bg-gray-100 cursor-pointer"
                                                onClick={() => router.push(`/products/${product.id}`)}
                                            >
                                                <td className="py-2">
                                                    <div className="relative w-20 aspect-5/3">
                                                        {product.image !== null ?
                                                            <Image
                                                                loader={ImageLoader}
                                                                fill
                                                                sizes="(min-width: 80em) 30vw, 47vw"
                                                                src={product.image.src}
                                                                alt={product.image.alt}
                                                            />
                                                            :
                                                            <div className="absolute inset-0 flex items-center justify-center">
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M11.9999 9V11M11.9999 15H12.0099M5.07192 19H18.9279C20.4679 19 21.4299 17.333 20.6599 16L13.7319 4C12.9619 2.667 11.0379 2.667 10.2679 4L3.33992 16C2.56992 17.333 3.53192 19 5.07192 19Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                            </div>
                                                        }
                                                    </div>
                                                </td>
                                                <td className="font-medium px-3 py-2">{product.title}</td>
                                                <td className="px-3 py-2">
                                                    <span className={`${product.available ? "bg-green-600" : "bg-gray-400"} px-2 py-1 rounded-xl text-white text-sm`}>{product.available ? "Active" : "Draft"}</span>
                                                </td>
                                                <td className="px-3 py-2">{product.offersCount} офферов</td>
                                                <td className="px-3 py-2">{product.vendor}</td>
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