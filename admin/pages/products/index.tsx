/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import ImageLoader from '../../components/image/ImageLoader'
import SearchInput from '../../components/inputs/SearchInput'
import MainLayout from '../../components/layouts/Main'
import NavLink from '../../components/navigation/NavLink'
import Status from '../../components/products/cards/Status'
import { useLazyGetProductsBySearchQuery } from '../../services/productService'
import { IErrorResponse } from '../../types/api'


function Index() {
    const router = useRouter()
    const itemPerPage = 20

    const [getProductBySearch, { isError, isFetching, data, error }] = useLazyGetProductsBySearchQuery();
    const [query, setQuery] = useState({
        q: "",
        limit: itemPerPage,
        skip: 0,
        available: router.query.available as string ?? undefined
    })

    useEffect(() => {
        setQuery(prev => ({ ...prev, limit: itemPerPage, skip: 0, available: router.query.available as string ?? undefined }))
    }, [router.query.available])

    useEffect(() => {
        getProductBySearch(query)
    }, [query])

    const onSearch = (q: string) => {
        setQuery(prev => ({ ...prev, q, limit: itemPerPage, skip: 0 }))
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
                    <div className="relative flex h-16 py-3 overflow-x-auto overflow-y-hidden pb-[17px] mb-[-17px]">
                        <div className="absolute whitespace-nowrap space-x-2 pb-2 border-b-[1px] left-0 right-0">
                            <NavLink href="/products" query={{ available: undefined }} className={({ isActive }) => `relative p-3 ${isActive ? "before:absolute" : "text-gray-400"} hover:before:absolute hover:before:bg-gray-500 before:left-0 before:bottom-0 before:rounded-lg before:bg-green-700 before:w-full before:h-[3px]`}>Все</NavLink>
                            <NavLink href="/products" query={{ available: "true" }} className={({ isActive }) => `relative p-3 ${isActive ? "before:absolute" : "text-gray-400"} hover:before:absolute hover:before:bg-gray-500 before:left-0 before:bottom-0 before:rounded-lg before:bg-green-700 before:w-full before:h-[3px]`}>Активные</NavLink>
                            <NavLink href="/products" query={{ available: "false" }} className={({ isActive }) => `relative p-3 ${isActive ? "before:absolute" : "text-gray-400"} hover:before:absolute hover:before:bg-gray-500 before:left-0 before:bottom-0 before:rounded-lg before:bg-green-700 before:w-full before:h-[3px]`}>Неактивные</NavLink>
                        </div>
                    </div>
                    <div className="pb-4 space-y-4 mt-4">
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
                                <div className="flex justify-center absolute bg-white border-gray-100 border-2 inset-x-0 p-5 shadow-md z-10 rounded-md ">
                                    <svg className="animate-spin" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 3.99999V8.99999H4.582M4.582 8.99999C5.24585 7.35812 6.43568 5.9829 7.96503 5.08985C9.49438 4.1968 11.2768 3.8364 13.033 4.06513C14.7891 4.29386 16.4198 5.09878 17.6694 6.35377C18.919 7.60875 19.7168 9.24285 19.938 11M4.582 8.99999H9M20 20V15H19.419M19.419 15C18.7542 16.6409 17.564 18.015 16.0348 18.9073C14.5056 19.7995 12.7237 20.1595 10.9681 19.9309C9.21246 19.7022 7.5822 18.8979 6.33253 17.6437C5.08287 16.3896 4.28435 14.7564 4.062 13M19.419 15H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            }
                            {data?.data &&
                                <table className="table-auto block max-w-0 md:table md:w-full md:max-w-none">
                                    <thead>
                                        <tr className="border-b-[1px] text-sm">
                                            <th className="font-medium text-gray-500 text-start px-3 py-2 min-w-[80px] w-20"></th>
                                            <th className="font-medium text-gray-500 text-start px-3 py-2 min-w-[200px]">Продукт</th>
                                            <th className="font-medium text-gray-500 text-start px-3 py-2 w-32">Статус</th>
                                            <th className="font-medium text-gray-500 text-start px-3 py-2 w-32">Наличие</th>
                                            <th className="font-medium text-gray-500 text-start px-3 py-2 w-32">Производитель</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.data.map(product => (
                                            <tr
                                                key={product.id}
                                                className="border-b-[1px] hover:bg-gray-100 cursor-pointer"
                                                onClick={() => router.push(`/products/${product.id}`)}
                                            >
                                                <td className="py-2 px-1 flex justify-center">
                                                    <div className="relative w-12 aspect-square border-[1px] rounded-md">
                                                        {product.image !== null ?
                                                            <Image
                                                                className="object-contain"
                                                                loader={ImageLoader}
                                                                fill
                                                                sizes="200px"
                                                                src={product.image.src}
                                                                alt={product.image.alt}
                                                            />
                                                            :
                                                            <div className="absolute inset-0 flex items-center justify-center">
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M4 16L8.586 11.414C8.96106 11.0391 9.46967 10.8284 10 10.8284C10.5303 10.8284 11.0389 11.0391 11.414 11.414L16 16M14 14L15.586 12.414C15.9611 12.0391 16.4697 11.8284 17 11.8284C17.5303 11.8284 18.0389 12.0391 18.414 12.414L20 14M14 8H14.01M6 20H18C18.5304 20 19.0391 19.7893 19.4142 19.4142C19.7893 19.0391 20 18.5304 20 18V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                            </div>
                                                        }
                                                    </div>
                                                </td>
                                                <td className="font-medium px-3 py-2">{product.title}</td>
                                                <td className="px-3 py-2">
                                                    <Status available={ product.available } />
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