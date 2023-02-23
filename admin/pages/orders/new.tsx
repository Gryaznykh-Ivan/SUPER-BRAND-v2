/* eslint-disable react-hooks/exhaustive-deps */
import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'

import MainLayout from '../../components/layouts/Main'

import { useRouter } from 'next/router'
import OrderProducts from '../../components/orders/blocks/OrderProducts'
import Customer from '../../components/orders/blocks/Customer'
import Address from '../../components/orders/blocks/Address'
import Service from '../../components/orders/blocks/Service'
import Note from '../../components/orders/blocks/Note'
import { IErrorResponse, IOfferSearch, IService, OrderCreateRequest } from '../../types/api'
import { toast } from 'react-toastify'
import { useCreateOrderMutation } from '../../services/orderService'
import { IOrderState } from '../../types/store'
import ServiceType from '../../components/orders/cards/ServiceType'
import Payment from '../../components/orders/blocks/Payment'

function New() {
    const router = useRouter()

    const [createOrder, { isSuccess: isCreateOrderSuccess, isError: isCreateOrderError, error: createOrderError, data }] = useCreateOrderMutation()

    const [state, setState] = useState<IOrderState>({
        offers: [],
        services: []
    })

    const [changes, setChanges] = useState<OrderCreateRequest>({})
    const onCollectChanges = (obj: OrderCreateRequest) => {
        setChanges(prev => ({ ...prev, ...obj }))
    }

    useEffect(() => {
        if (isCreateOrderSuccess) {
            setTimeout(() => toast.success("Заказ создан"), 100)
        }

        if (isCreateOrderError) {
            if (createOrderError && "status" in createOrderError) {
                toast.error((createOrderError.data as IErrorResponse).message)
            } else {
                toast.error("Произошла неизвесная ошибка")
            }
        }
    }, [isCreateOrderSuccess, isCreateOrderError])

    const onSaveChanges = async () => {
        const createOrderData = changes

        const result = await createOrder(createOrderData).unwrap()
        if (result.success === true) {
            router.push('/orders/' + result.data)
        }
    }

    const onStateChanges = (data: Partial<IOrderState>) => {
        const result = { ...state, ...data }

        setState(result)
        onCollectChanges({
            services: result.services.map(({ id, ...data }) => data),
            offers: result.offers.map(({ id }) => ({ id }))
        })
    }

    const mustBeSaved = useMemo(() => {
        return Object.values(changes).some(c => c !== undefined)
    }, [changes])

    return (
        <MainLayout>
            <div className="px-6 my-4 max-w-5xl mx-auto">
                <div className="flex items-center space-x-4">
                    <Link href="/orders" className="p-2 font-bold border-[1px] border-gray-400 rounded-md">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 19L3 12M3 12L10 5M3 12H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                    <h1 className="text-xl font-medium">Создание заказа</h1>
                </div>
                <div className="my-4 flex flex-col space-y-4 pb-4 border-b-[1px] lg:flex-row lg:space-x-4 lg:space-y-0">
                    <div className="flex-1 space-y-4">
                        <OrderProducts
                            offers={state.offers}
                            onChange={onStateChanges}
                        />
                        <Service
                            services={state.services}
                            region={changes.mailingRegion ?? null}
                            onChange={onStateChanges}
                        />
                        <Payment
                            services={state.services}
                            offers={state.offers}
                        />
                    </div>
                    <div className="space-y-4 lg:w-80">
                        <Note
                            note={null}
                            onChange={onCollectChanges}
                        />
                        <Customer
                            userId={null}
                            onChange={onCollectChanges}
                        />
                        <Address
                            mailingAddress={null}
                            mailingCity={null}
                            mailingCountry={null}
                            mailingRegion={null}
                            userId={changes.userId || null}
                            onChange={onCollectChanges}
                        />
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className=""></div>
                    <div className="flex justify-end">
                        <button className={`${mustBeSaved ? "bg-green-600" : "bg-gray-300"} px-4 py-2 text-white font-medium rounded-md`} disabled={!mustBeSaved} onClick={onSaveChanges}>Создать</button>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default New
