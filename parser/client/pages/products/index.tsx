/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import SearchInput from '../../components/inputs/SearchInput'
import MainLayout from '../../components/layouts/Main'
import NavLink from '../../components/navigation/NavLink'
import ProductStatus from '../../components/products/ProductStatus'
import { useAppSelector } from '../../hooks/store'
import { useLazyGetProductsBySearchQuery, useUpdateProductsMutation } from '../../services/productService'
import { IErrorResponse } from '../../types/api'

export default function Index() {
    const router = useRouter()
    const itemPerPage = 40

    const [selected, setSelected] = useState<string[]>([])
    const [query, setQuery] = useState({
        q: "",
        limit: itemPerPage,
        skip: 0,
        status: router.query.status as string ?? undefined
    })

    const [getProductBySearch, { isError: isGetProductError, isFetching: isGetProductFetching, data: getProductData, error: getProductError }] = useLazyGetProductsBySearchQuery();
    const [updateProducts, { isSuccess: isUpdateProductsSuccess ,isError: isUpdateProductsError, error: updateProductsError }] = useUpdateProductsMutation();

    useEffect(() => {
        if (isUpdateProductsSuccess) {
            toast.success("Продукты добавлены в очередь")
        }

        if (isUpdateProductsError) {
            if (updateProductsError && "status" in updateProductsError) {
                toast.error((updateProductsError.data as IErrorResponse).message)
            } else {
                toast.error("Произошла неизвесная ошибка")
            }
        }
    }, [isUpdateProductsSuccess, isUpdateProductsError])

    useEffect(() => {
        setQuery(prev => ({ ...prev, limit: itemPerPage, skip: 0, status: router.query.status as string ?? undefined }))
    }, [router.query.status])

    useEffect(() => {
        getProductBySearch(query)
    }, [query])

    const onSearch = (q: string) => {
        setQuery(prev => ({ ...prev, q, limit: itemPerPage, skip: 0 }))
    }

    const onNextPage = () => {
        if (getProductData?.data.length !== itemPerPage) return

        setQuery(prev => ({ ...prev, skip: prev.skip + prev.limit }))
    }

    const onPrevPage = () => {
        if (query.skip === 0) return

        setQuery(prev => ({ ...prev, skip: prev.skip - prev.limit }))
    }

    const getDurationSinceLastUpdate = (updatedAt: string) => {
        const lastUpdate = new Date(updatedAt);
        const diffMs = new Date().getTime() - lastUpdate.getTime();
        const diffDays = Math.floor(diffMs / 86400000);
        const diffHours = Math.floor((diffMs % 86400000) / 3600000);
        const diffMinutes = Math.floor((diffMs % 3600000) / 60000);

        return (`${diffDays > 0 ? diffDays + "д" : ""} ${diffHours > 0 ? diffHours + "ч" : ""} ${diffMinutes}м назад`).trim()
    }

    const onSelect = (id: string) => {
        const isExist = selected.some(c => c === id)

        if (isExist === true) {
            setSelected(prev => ([...prev.filter(c => c !== id)]))
        } else {
            setSelected(prev => ([...prev, id]))
        }
    }

    const onUpdateProducts = async () => {
        const result = await updateProducts({ ids: selected }).unwrap()
        if (result.success === true) {
            setSelected([])
        }
    }

    return (
        <MainLayout>
            <Head>
                <title>Товары</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="px-6 my-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-medium py-2">Продукты</h1>
                    <div className="">
                        <button className={`block ${ selected.length !== 0 ? "bg-green-700" : "bg-gray-300" } px-4 py-2 text-white font-medium rounded-md`} disabled={ selected.length === 0 } onClick={ onUpdateProducts }>В очередь</button>
                    </div>
                </div>
                <div className="mt-4 px-4 bg-white rounded-md">
                    <div className="relative flex h-16 py-3 overflow-x-auto overflow-y-hidden pb-[17px] mb-[-17px]">
                        <div className="absolute whitespace-nowrap space-x-2 pb-2 border-b-[1px] left-0 right-0">
                            <NavLink href="/products" query={{ status: undefined }} className={({ isActive }) => `relative p-3 ${isActive ? "before:absolute" : "text-gray-400"} hover:before:absolute hover:before:bg-gray-500 before:left-0 before:bottom-0 before:rounded-lg before:bg-green-700 before:w-full before:h-[3px]`}>Все</NavLink>
                            <NavLink href="/products" query={{ status: "WAITING_STOCKX_DATA" }} className={({ isActive }) => `relative p-3 ${isActive ? "before:absolute" : "text-gray-400"} hover:before:absolute hover:before:bg-gray-500 before:left-0 before:bottom-0 before:rounded-lg before:bg-green-700 before:w-full before:h-[3px]`}>В очереди</NavLink>
                            <NavLink href="/products" query={{ status: "WAITING_SHOP_UPDATE" }} className={({ isActive }) => `relative p-3 ${isActive ? "before:absolute" : "text-gray-400"} hover:before:absolute hover:before:bg-gray-500 before:left-0 before:bottom-0 before:rounded-lg before:bg-green-700 before:w-full before:h-[3px]`}>Ожидают загрузки</NavLink>
                            <NavLink href="/products" query={{ status: "ERROR" }} className={({ isActive }) => `relative p-3 ${isActive ? "before:absolute" : "text-gray-400"} hover:before:absolute hover:before:bg-gray-500 before:left-0 before:bottom-0 before:rounded-lg before:bg-green-700 before:w-full before:h-[3px]`}>Ошибки</NavLink>
                            <NavLink href="/products" query={{ status: "DONE" }} className={({ isActive }) => `relative p-3 ${isActive ? "before:absolute" : "text-gray-400"} hover:before:absolute hover:before:bg-gray-500 before:left-0 before:bottom-0 before:rounded-lg before:bg-green-700 before:w-full before:h-[3px]`}>Готово</NavLink>
                        </div>
                    </div>
                    <div className="pb-4 space-y-4 mt-4">
                        <div className="">
                            <SearchInput placeholder="Поиск" onChange={onSearch} />
                        </div>
                        <div className="relative block overflow-x-auto">
                            {isGetProductError &&
                                <div className="flex flex-col items-center py-5">
                                    <div className="text-2xl font-bold text-red-600">Что-то пошло не так</div>
                                    {(getProductError && "status" in getProductError) &&
                                        <div className="text-gray-500">{(getProductError.data as IErrorResponse).message}</div>
                                    }
                                </div>
                            }
                            {isGetProductFetching &&
                                <div className="flex justify-center absolute bg-white border-gray-100 border-2 inset-x-0 p-5 shadow-md z-10 rounded-md ">
                                    <svg className="animate-spin" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 3.99999V8.99999H4.582M4.582 8.99999C5.24585 7.35812 6.43568 5.9829 7.96503 5.08985C9.49438 4.1968 11.2768 3.8364 13.033 4.06513C14.7891 4.29386 16.4198 5.09878 17.6694 6.35377C18.919 7.60875 19.7168 9.24285 19.938 11M4.582 8.99999H9M20 20V15H19.419M19.419 15C18.7542 16.6409 17.564 18.015 16.0348 18.9073C14.5056 19.7995 12.7237 20.1595 10.9681 19.9309C9.21246 19.7022 7.5822 18.8979 6.33253 17.6437C5.08287 16.3896 4.28435 14.7564 4.062 13M19.419 15H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            }
                            {getProductData?.data &&
                                <table className="table-auto block max-w-0 md:table md:w-full md:max-w-none">
                                    <thead>
                                        <tr className="border-b-[1px] text-sm">
                                            <th className="font-medium text-gray-500 text-start px-3 py-2 w-10"></th>
                                            <th className="font-medium text-gray-500 text-start px-3 py-2 min-w-[200px]">Продукт</th>
                                            <th className="font-medium text-gray-500 text-start px-3 py-2 w-32">Статус</th>
                                            <th className="font-medium text-gray-500 text-start px-3 py-2 w-32">Фактор</th>
                                            <th className="font-medium text-gray-500 text-start px-3 py-2 w-32">Количество</th>
                                            <th className="font-medium text-gray-500 text-start px-3 py-2 w-40">Обновлено</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getProductData.data.map(product => (
                                            <tr
                                                key={product.id}
                                                className="border-b-[1px] hover:bg-gray-100"
                                                onClick={() => onSelect(product.id)}
                                            >
                                                <td className="px-3 py-2">
                                                    <input type="checkbox" className="rounded" checked={selected.some(c => c === product.id)} />
                                                </td>
                                                <td className="font-medium px-3 py-2">{product.title}</td>
                                                <td className="px-3 py-2"><ProductStatus status={product.status} /></td>
                                                <td className="px-3 py-2">{product.pfactor}</td>
                                                <td className="px-3 py-2">{product.pamount}</td>
                                                <td className="px-3 py-2">{getDurationSinceLastUpdate(product.updatedAt)}</td>
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
                            <button className={`p-2 font-bold border-[1px] rounded-md ${getProductData?.data.length !== itemPerPage && "bg-gray-100 cursor-not-allowed"}`} onClick={onNextPage} disabled={getProductData?.data.length !== itemPerPage}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 5L21 12M21 12L14 19M21 12H3" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout >
    )
}
