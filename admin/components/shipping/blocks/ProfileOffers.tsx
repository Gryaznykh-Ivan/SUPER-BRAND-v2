/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react'
import Image from "next/image"
import SearchInput from '../../inputs/SearchInput'
import SelectOffers from '../popups/SelectOffers'
import { useLazyGetOffersBySearchQuery } from '../../../services/offerService'
import { DeliveryProfileUpdateRequest, IDeliveryProfile, IErrorResponse, IOfferSearch } from '../../../types/api'
import { useRouter } from 'next/router'
import ImageLoader from '../../image/ImageLoader'
import Link from 'next/link'


interface IProps {
    deliveryProfileId: string;
    connectOffers: Pick<IDeliveryProfile, "id">[] | undefined;
    disconnectOffers: Pick<IDeliveryProfile, "id">[] | undefined;
    onChange: (obj: DeliveryProfileUpdateRequest) => void;
}



export default function ProfileOffers({ onChange, deliveryProfileId, connectOffers, disconnectOffers }: IProps) {
    const router = useRouter()
    const [popup, setPopup] = useState(false)

    const itemPerPage = 20

    const [getOffers, { isError, error, isFetching, data }] = useLazyGetOffersBySearchQuery()

    const [query, setQuery] = useState({
        q: "",
        limit: itemPerPage,
        skip: 0,
    })

    useEffect(() => {
        getOffers({ deliveryProfileId, ...query })
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

    const onAddOffer = (item: IOfferSearch) => {
        if (connectOffers?.find(c => c.id === item.id) !== undefined) {
            const result = connectOffers?.filter(c => c.id !== item.id) ?? []

            onChange({
                connectOffers: result.length !== 0 ? result : undefined
            })
        } else {
            onChange({
                connectOffers: [...connectOffers ?? [], { id: item.id }]
            })
        }
    }

    const onRemoveOffer = (item: IOfferSearch) => {
        onChange({
            disconnectOffers: [...disconnectOffers ?? [], { id: item.id }]
        })
    }

    const onReturnOffer = (item: IOfferSearch) => {
        const result = disconnectOffers?.filter(c => c.id !== item.id) ?? []

        onChange({
            disconnectOffers: result.length !== 0 ? result : undefined
        })
    }

    const onPopupOpen = () => setPopup(true)
    const onPopupClose = () => setPopup(false)

    return (
        <div className="rounded-md bg-white shadow-sm">
            <div className="flex justify-between items-center p-3 border-b-[1px]">
                <h2 className="font-semibold pl-3">Офферы</h2>
                {deliveryProfileId !== "default" &&
                    <button className="text-gray-800 text-sm p-2 font-medium rounded-md hover:bg-gray-100 flex items-center" onClick={onPopupOpen}>
                        <svg className="stroke-blue-800" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 9V12M12 12V15M12 12H15M12 12H9M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z" stroke="inherit" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="ml-2">Добавить</span>
                    </button>
                }
            </div>
            <div className="flex space-x-4 p-5 border-b-[1px]">
                <SearchInput className="" placeholder="Поиск офферов" onChange={onSearch} />
            </div>
            <div className="divide-y-[1px] max-h-96 overflow-y-auto">
                {isError &&
                    <div className="flex flex-col items-center py-5">
                        <div className="text-2xl font-bold text-red-600">Что-то пошло не так</div>
                        {(error && "status" in error) &&
                            <div className="text-gray-500">{(error.data as IErrorResponse).message}</div>
                        }
                        <button className="text-blue-500 underline text-sm mt-4" onClick={() => router.back()}>Вернуться назад</button>
                    </div>
                }
                {isFetching &&
                    <div className="flex justify-center bg-white border-gray-100 border-2 p-5 shadow-md z-10 rounded-md ">
                        <svg className="animate-spin" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 3.99999V8.99999H4.582M4.582 8.99999C5.24585 7.35812 6.43568 5.9829 7.96503 5.08985C9.49438 4.1968 11.2768 3.8364 13.033 4.06513C14.7891 4.29386 16.4198 5.09878 17.6694 6.35377C18.919 7.60875 19.7168 9.24285 19.938 11M4.582 8.99999H9M20 20V15H19.419M19.419 15C18.7542 16.6409 17.564 18.015 16.0348 18.9073C14.5056 19.7995 12.7237 20.1595 10.9681 19.9309C9.21246 19.7022 7.5822 18.8979 6.33253 17.6437C5.08287 16.3896 4.28435 14.7564 4.062 13M19.419 15H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                }
                {isFetching === false && data?.data.length === 0 &&
                    <div className="flex justify-center bg-white p-5">
                        Ничего не найдено
                    </div>
                }
                {data?.data &&
                    <>
                        {data.data.map(offer =>
                            <div key={offer.id} className="flex items-center pl-5 pr-3 py-1 space-x-4 hover:bg-gray-100 min-h-[50px]">
                                <div className="relative w-12 aspect-square border-[1px] rounded-md">
                                    {offer.image !== null ?
                                        <Image
                                            className="object-contain"
                                            loader={ImageLoader}
                                            fill
                                            sizes="200px"
                                            src={offer.image.src}
                                            alt={offer.image.alt}
                                        />
                                        :
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4 16L8.586 11.414C8.96106 11.0391 9.46967 10.8284 10 10.8284C10.5303 10.8284 11.0389 11.0391 11.414 11.414L16 16M14 14L15.586 12.414C15.9611 12.0391 16.4697 11.8284 17 11.8284C17.5303 11.8284 18.0389 12.0391 18.414 12.414L20 14M14 8H14.01M6 20H18C18.5304 20 19.0391 19.7893 19.4142 19.4142C19.7893 19.0391 20 18.5304 20 18V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    }
                                </div>
                                <div className="flex-1 text-sm py-1">
                                    <Link href={`/offers/${offer.id}`} className="hover:underline">{offer.product} • {offer.variant}</Link>
                                    <div className="text-gray-500">{offer.user}</div>
                                </div>
                                <div className="ml-2">{offer.price}₽</div>
                                {deliveryProfileId !== "default" &&
                                    <>
                                        {disconnectOffers?.find(c => c.id === offer.id) === undefined ? (
                                            <button className="p-2 rounded-md hover:bg-gray-200" onClick={() => onRemoveOffer(offer)}>
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                </svg>
                                            </button>
                                        ) : (
                                            <button className="p-2 rounded-md hover:bg-gray-200" onClick={() => onReturnOffer(offer)}>
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M3 10H13C15.1217 10 17.1566 10.8429 18.6569 12.3431C20.1571 13.8434 21 15.8783 21 18V20M3 10L9 16M3 10L9 4" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>
                                        )}
                                    </>
                                }
                            </div>
                        )}
                    </>
                }
            </div>
            {connectOffers !== undefined && connectOffers.length !== 0 &&
                <div className="flex justify-center items-center h-10 font-medium bg-red-50 border-t-[1px]">Добавлено несохраненных офферов: {connectOffers.length}</div>
            }
            <div className="flex items-center justify-center py-3 w-full space-x-1 border-t-[1px]">
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
            {popup && <SelectOffers title="Выбор офферов" deliveryProfileId={deliveryProfileId} connectOffers={connectOffers} onAddOffer={onAddOffer} onClose={onPopupClose} />}
        </div>
    )
}
