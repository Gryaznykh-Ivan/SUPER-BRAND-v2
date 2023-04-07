/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useMemo, useState } from 'react'
import { CollectionCreateRequest, CollectionUpdateRequest, ICollectionProduct, IErrorResponse, IOfferSearch, IOrderProduct, IProduct, IService } from '../../../types/api';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useConfirmPaymentMutation } from '../../../services/orderService';
import { Service } from '../../../types/store';
import ServiceType from '../cards/ServiceType';


interface IProps {
    orderId: number | null;
    offers: IOrderProduct[];
    services: IService[];
    priceDiffrence: number;
}

export default function Payment({ orderId, offers, services, priceDiffrence }: IProps) {
    const [confirmPayment, { isSuccess, isError, error }] = useConfirmPaymentMutation()

    useEffect(() => {
        if (isSuccess) {
            toast.success("Счет закрыт")
        }

        if (isError) {
            if (error && "status" in error) {
                toast.error((error.data as IErrorResponse)?.message)
            } else {
                toast.error("Произошла неизвесная ошибка")
            }
        }
    }, [isSuccess, isError])

    const payment = useMemo(() => {
        const subtotal = offers.reduce((a, c) => a + Number(c.price), 0)
        let total = subtotal + services.reduce((a, c) => {
            switch (c.type) {
                case Service.DISCOUNT_AMOUNT:
                    a = a - Number(c.amount)
                    break;
                case Service.DISCOUNT_PERCENT:
                    a = a - Number(subtotal * (Number(c.amount) / 100))
                    break;
                case Service.SHIPPING:
                    a = a - Number(c.amount)
                    break;
            }

            return a
        }, 0)

        total = total > 0 ? total : 0

        return { subtotal, total }
    }, [offers, services])

    const onConfirmPayment = () => {
        if (orderId !== null) {
            confirmPayment({ orderId })
        }
    }

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
                            <div className="">
                                {
                                    Number(service.amount) === 0
                                        ? "Бесплатно" : service.type === Service.DISCOUNT_PERCENT
                                            ? `${payment.subtotal * (Number(service.amount) / 100)}₽` : `${service.amount}₽`
                                }
                            </div>
                        </div>
                    </div>
                )}
                <div className="flex justify-between text-lg font-semibold">
                    <div className="">Итог</div>
                    <div className="">{payment.total}₽</div>
                </div>
            </div>
            {orderId !== null && priceDiffrence !== 0 &&
                <>
                    <div className="p-5 border-t-[1px]">
                        <div className="flex justify-between">
                            <div className="">
                                <div className="text-sm text-gray-500">{priceDiffrence > 0 ? "Покупатель должен оплатить:" : "Магазин должн закрыть задолжность:"}</div>
                                <div className="">{Math.abs(priceDiffrence)}₽</div>
                            </div>
                            <button className="border-gray-400 border-[1px] px-4 py-2 font-medium rounded-md text-sm" onClick={onConfirmPayment}>Закрыть счет</button>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}
