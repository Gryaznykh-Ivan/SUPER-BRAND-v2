/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useMemo, useState } from 'react'
import { CollectionCreateRequest, CollectionUpdateRequest, ICollectionProduct, IErrorResponse, IOfferSearch, IOrderProduct, IProduct, IService } from '../../../types/api';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ServiceType from '../cards/ServiceType';


interface IProps {
    offers: IOrderProduct[];
    services: IService[];
}

export default function Payment({ offers, services }: IProps) {
    const router = useRouter()

    const payment = useMemo(() => {
        const subtotal = offers.reduce((a, c) => a + Number(c.price), 0)
        const total = subtotal + services.reduce((a, c) => a + Number(c.price), 0)

        return { subtotal, total }
    }, [offers, services])

    return (
        <div className="rounded-md bg-white shadow-sm">
            <div className="p-5 border-b-[1px] flex justify-between items-center">
                <h2 className="font-semibold">Оплата</h2>
            </div>
            <div className="p-5">
                <div className="grid grid-cols-4 gap-4 text-gray-600 text-sm">
                    <div className="">Подытог</div>
                    <div className="col-span-3 flex justify-between">
                        <div className=""></div>
                        <div className="">{payment.subtotal}₽</div>
                    </div>
                </div>
                {services.map(service =>
                    <div key={service.id} className="grid grid-cols-4 gap-4 text-gray-600 text-sm">
                        <ServiceType type={service.type} />
                        <div className="col-span-3 flex justify-between">
                            <div className="text-sm text-gray-500">{service.description}</div>
                            <div className="">{Number(service.price) === 0 ? "Бесплатно" : `${service.price}₽`}</div>
                        </div>
                    </div>
                )}
                <div className="flex justify-between text-lg font-semibold">
                    <div className="">Итог</div>
                    <div className="">{payment.total}₽</div>
                </div>
                {/* <div className="p-5 border-b-[1px]">
                    <div className="flex justify-between text-sm text-red-600">
                        <div className="">Выдолжны закрыть задолжность</div>
                        <div className="">500 руб.</div>
                    </div>
                </div>
                <div className="p-3 flex justify-end space-x-2">
                    <button className="border-gray-400 border-[1px] px-4 py-2 font-medium rounded-md text-sm">Закрыть счет</button>
                </div> */}
            </div>
        </div>
    )
}
