import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useGetOrderByIdQuery } from '../../../services/orderService'
import Input from '../../inputs/Input'
import Select from '../../inputs/Select'
import ImageLoader from '../../image/ImageLoader'
import { IErrorResponse, IReturnProduct, OrderReturnCreateRequest } from '../../../types/api'

interface IProps {
    offers: Pick<IReturnProduct, "id" | "reason">[];
    onChange: (obj: OrderReturnCreateRequest) => void;
}

export default function ProductsToReturn({ onChange, offers }: IProps) {
    const router = useRouter()

    const { isError, error, isLoading, data } = useGetOrderByIdQuery({ orderId: Number(router.query.orderId as string) })

    const onToggleReturnOffer = (id: string) => {
        let newState = offers

        if (newState.find(c => c.id === id) !== undefined) {
            newState = newState.filter(c => c.id !== id) ?? []
        } else {
            newState = [...newState, { id, reason: "Неизвестно" }]
        }

        onChange({
            offers: newState.length !== 0 ? newState : undefined
        })
    }

    const onSelectReturnReason = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange({ offers: offers.map(c => c.id !== e.target.id ? c : { ...c, reason: e.target.value }) })
    }

    return (
        <div className="rounded-md bg-white shadow-sm">
            <div className="p-5 border-b-[1px] flex justify-between items-center">
                <h2 className="font-semibold">Продукты доступные к возврату</h2>
            </div>
            {isError &&
                <div className="flex flex-col items-center py-5">
                    <div className="text-2xl font-bold text-red-600">Что-то пошло не так</div>
                    {(error && "status" in error) &&
                        <div className="text-gray-500">{(error.data as IErrorResponse)?.message}</div>
                    }
                    <button className="text-blue-500 underline text-sm mt-4" onClick={() => router.back()}>Вернуться назад</button>
                </div>
            }
            {isLoading &&
                <div className="flex justify-center bg-white border-gray-100 border-2 p-5 shadow-md z-10 rounded-md ">
                    <svg className="animate-spin" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 3.99999V8.99999H4.582M4.582 8.99999C5.24585 7.35812 6.43568 5.9829 7.96503 5.08985C9.49438 4.1968 11.2768 3.8364 13.033 4.06513C14.7891 4.29386 16.4198 5.09878 17.6694 6.35377C18.919 7.60875 19.7168 9.24285 19.938 11M4.582 8.99999H9M20 20V15H19.419M19.419 15C18.7542 16.6409 17.564 18.015 16.0348 18.9073C14.5056 19.7995 12.7237 20.1595 10.9681 19.9309C9.21246 19.7022 7.5822 18.8979 6.33253 17.6437C5.08287 16.3896 4.28435 14.7564 4.062 13M19.419 15H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            }
            {!isLoading && data?.data &&
                <div className="divide-y-[1px] overflow-y-auto">
                    {data.data.fulfillments.map(fulfillment =>
                        fulfillment.offers.map((offer) =>
                            <div key={offer.id} className="">
                                <label className="flex items-center px-5 py-2 space-x-4 hover:bg-gray-50">
                                    <input type="checkbox" readOnly name="" id={offer.id} className="rounded" checked={offers.some(c => c.id === offer.id) === true} onClick={() => onToggleReturnOffer(offer.id)} />
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
                                    <div className="flex-1 flex items-center py-1 space-x-4">
                                        <div className="flex-1 text-sm py-1">
                                            <Link href={`/offers/${offer.id}`} className="hover:underline">{offer.product} • {offer.variant}</Link>
                                            <div className="text-gray-500">{offer.deliveryProfile.title}</div>
                                        </div>
                                        <div className="ml-2">{offer.price}₽</div>
                                    </div>
                                </label>
                                {offers.some(c => c.id === offer.id) &&
                                    <div className="px-5 pb-5 pt-1">
                                        <label htmlFor={offer.id} className="text-sm text-gray-500">Причина возврата</label>
                                        <Select
                                            id={offer.id}
                                            name={offer.id}
                                            onChange={onSelectReturnReason}
                                            options={{
                                                "Неизвестно": { value: "Неизвестно", disabled: false },
                                                "Размер слишком маленький": { value: "Размер слишком маленький", disabled: false },
                                                "Размер слишком большой": { value: "Размер слишком большой", disabled: false },
                                                "Покупатель передумал": { value: "Покупатель передумал", disabled: false },
                                                "Товар не соответствует описанию": { value: "Товар не соответствует описанию", disabled: false },
                                                "Получен неправильный товар": { value: "Получен неправильный товар", disabled: false },
                                                "Повреждение или брак": { value: "Повреждение или брак", disabled: false },
                                            }}
                                        />
                                    </div>
                                }
                            </div>
                        )
                    )}

                </div>
            }
        </div>
    )
}
