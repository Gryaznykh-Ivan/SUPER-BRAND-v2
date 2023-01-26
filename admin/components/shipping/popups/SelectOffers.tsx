/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Modal from '../../portals/Modal'
import SearchInput from '../../inputs/SearchInput';
import JSXAccordion from '../../accordions/JSXAccordion';
import { IDeliveryProfile, IErrorResponse, IOffer, IOfferSearch } from '../../../types/api';
import { useLazyGetOffersBySearchQuery } from '../../../services/offerService';
import ImageLoader from '../../image/ImageLoader';

interface IProps {
    deliveryProfileId: string;
    title: string;
    connectOffers: Pick<IDeliveryProfile, "id">[] | undefined;
    onAddOffer: (item: IOfferSearch) => void;
    onClose: () => void;
}

export default function SelectOffers({ title, deliveryProfileId, connectOffers, onAddOffer, onClose }: IProps) {
    const itemPerPage = 20

    const [getOffers, { isError, error, isFetching, data }] = useLazyGetOffersBySearchQuery()

    const [state, setState] = useState<IOfferSearch[]>([])
    const [query, setQuery] = useState({
        q: "",
        limit: itemPerPage,
        skip: 0,
        notDeliveryProfileId: deliveryProfileId
    })

    useEffect(() => {
        const newResult = data?.data ?? []

        if (query.skip === 0) {
            setState(newResult)
        } else {
            setState(prev => [...prev, ...newResult])
        }
    }, [data])

    useEffect(() => {
        getOffers(query)
    }, [query])

    const onSearch = (q: string) => {
        setQuery(prev => ({ ...prev, q, limit: itemPerPage, skip: 0 }))
    }

    const onNextPage = () => {
        if (data?.data.length !== itemPerPage) return

        setQuery(prev => ({ ...prev, skip: prev.skip + prev.limit }))
    }

    return (
        <Modal>
            <div className="fixed inset-0 bg-black bg-opacity-20 z-30 flex items-center justify-center" onClick={onClose}>
                <div className="w-full max-w-lg bg-white rounded-md" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center justify-between p-5 border-b-[1px]">
                        <h2 className="font-medium">{title}</h2>
                        <button className="p-2" onClick={onClose}>
                            <svg className="rotate-45" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 4V12M12 12V20M12 12H20M12 12H4" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <div className="relative max-h-[60vh] overflow-y-auto">
                        <div className="p-5 border-b-[1px] space-y-4">
                            <div className="flex flex-col">
                                <SearchInput placeholder="Поиск офферов" onChange={onSearch} />
                            </div>
                        </div>
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
                        <div className="divide-y-[1px] max-h-96 overflow-y-auto">
                            {state.map(offer =>
                                <label key={offer.id} className="flex items-center px-5 py-2 space-x-4 hover:bg-gray-100">
                                    <div className="">
                                        <input type="checkbox" readOnly id={offer.id} name="" className="rounded" checked={connectOffers?.find(c => c.id === offer.id) !== undefined} onClick={() => onAddOffer(offer)} />
                                    </div>
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
                                    <div className="flex-1 flex items-center py-1 space-x-4 hover:bg-gray-100">
                                        <div className="flex-1 text-sm py-1">
                                            <div className="">{offer.product} • {offer.variant}</div>
                                            <div className="text-gray-500">{offer.user}</div>
                                        </div>
                                        <div className="ml-2">{offer.price}₽</div>
                                    </div>
                                </label>
                            )}
                            <button className={`w-full py-3 text-blue-600 ${data?.data.length !== itemPerPage && "hidden"}`} onClick={onNextPage}>Загрузить еще</button>
                        </div>
                    </div>
                    <div className="p-5 border-t-[1px]">
                        <div className="flex justify-end space-x-4">
                            <button className="border-gray-500 border-[1px] text-gray-800 px-4 py-2 font-medium rounded-md" onClick={onClose}>Отмена</button>
                            <button className="bg-green-700 px-4 py-2 text-white font-medium rounded-md" onClick={onClose}>Готово</button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
