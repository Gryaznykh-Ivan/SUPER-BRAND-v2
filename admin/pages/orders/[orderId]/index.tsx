import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'


import { useRouter } from 'next/router'
import MainLayout from '../../../components/layouts/Main'
import FulfillmentProducts from '../../../components/orders/blocks/FulfillmentProducts'
import PickDelivery from '../../../components/orders/blocks/PickDelivery'
import Customer from '../../../components/orders/blocks/Customer'
import Payment from '../../../components/orders/blocks/Payment'
import Address from '../../../components/orders/blocks/Address'
import Fulfillment from '../../../components/orders/blocks/Fulfillment'
import Service from '../../../components/orders/blocks/Service'
import Note from '../../../components/orders/blocks/Note'
import Timeline from '../../../components/orders/blocks/Timeline'
import { useGetOrderByIdQuery, useUpdateOrderMutation } from '../../../services/orderService'
import { IErrorResponse, OrderUpdateRequest } from '../../../types/api'
import { toast } from 'react-toastify'
import { IOrderState } from '../../../types/store'
import OrderStatus from '../../../components/orders/cards/OrderStatus'
import PaymentStatus from '../../../components/orders/cards/PaymentStatus'


function Index() {
    const router = useRouter()


    const { isError, error, isLoading, data } = useGetOrderByIdQuery({ orderId: Number(router.query.orderId as string) })

    const [updateOrder, { isSuccess: isUpdateOrderSuccess, isError: isUpdateOrderError, error: updateOrderError }] = useUpdateOrderMutation()

    const [changes, setChanges] = useState<OrderUpdateRequest>({})
    const onCollectChanges = (obj: OrderUpdateRequest) => {
        setChanges(prev => ({ ...prev, ...obj }))
    }

    const [state, setState] = useState<IOrderState>({
        offers: [],
        services: []
    })

    useEffect(() => {
        if (data?.data) {
            setState({
                offers: data.data.products,
                services: data.data.services
            })
        }
    }, [data?.data])

    useEffect(() => {
        if (isUpdateOrderSuccess) {
            toast.success("Заказ обновлен")
        }

        if (isUpdateOrderError) {
            if (updateOrderError && "status" in updateOrderError) {
                toast.error((updateOrderError.data as IErrorResponse).message)
            } else {
                toast.error("Произошла неизвесная ошибка")
            }
        }
    }, [isUpdateOrderSuccess, isUpdateOrderError])

    const onSaveChanges = async () => {
        const result = await updateOrder({ orderId: Number(router.query.orderId as string), ...changes }).unwrap()
        if (result.success === true) {
            setChanges({})
        }
    }

    const onStateChanges = (nData: Partial<IOrderState>) => {
        if (data?.data === undefined) return

        const result = { ...state, ...nData }

        setState(result)

        const createServices = result.services.filter(a => a.id.startsWith("new") === true).map(({ id, ...data }) => data)
        const deleteServices = data?.data.services.filter(a => !result.services.some(c => c.id === a.id)).map(({ id }) => ({ id }))

        const createOffers = result.offers.filter(a => a.id.startsWith("new") === true).map(({ offerId }) => ({ id: offerId }))
        const deleteOffers = data.data.products.filter(a => !result.offers.some(c => c.id === a.id)).map(({ id }) => ({ id }))

        onCollectChanges({
            createServices: createServices.length !== 0 ? createServices : undefined,
            deleteServices: deleteServices.length !== 0 ? deleteServices : undefined,
            createOffers: createOffers.length !== 0 ? createOffers : undefined,
            deleteOffers: deleteOffers.length !== 0 ? deleteOffers : undefined,
        })
    }

    const mustBeSaved = useMemo(() => {
        return Object.values(changes).some(c => c !== undefined)
    }, [changes])


    return (
        <MainLayout>
            <div className="px-6 my-4 max-w-5xl mx-auto">
                {isError &&
                    <div className="flex flex-col items-center py-5">
                        <div className="text-2xl font-bold text-red-600">Что-то пошло не так</div>
                        {(error && "status" in error) &&
                            <div className="text-gray-500">{(error.data as IErrorResponse).message}</div>
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
                    <>
                        <div className="flex items-center space-x-4">
                            <Link href="/orders" className="p-2 font-bold border-[1px] border-gray-400 rounded-md">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 19L3 12M3 12L10 5M3 12H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                            <div className="flex-1 flex space-x-2">
                                <h1 className="text-xl font-medium">Заказ №{data.data.id}</h1>
                                <PaymentStatus status={data.data.paymentStatus} />
                                <OrderStatus status={data.data.orderStatus} />
                            </div>
                            <div className="flex items-center">
                                <Link href="/orders" className="p-2 font-bold hover:bg-gray-200 rounded-md">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M2.45801 12C3.73201 7.943 7.52301 5 12 5C16.478 5 20.268 7.943 21.542 12C20.268 16.057 16.478 19 12 19C7.52301 19 3.73201 16.057 2.45801 12Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                        <div className="my-4 flex flex-col space-y-4 pb-4 lg:flex-row lg:space-x-4 lg:space-y-0 border-b-[1px]">
                            <div className="flex-1 space-y-4">
                                <FulfillmentProducts
                                    offers={state.offers}
                                    onChange={onStateChanges}
                                />
                                {data.data.fulfillments.map(fulfillment =>
                                    <Fulfillment
                                        key={fulfillment.id}
                                        id={fulfillment.id}
                                        offers={fulfillment.products}
                                        status={fulfillment.status}
                                    />
                                )}
                                <Service
                                    services={state.services}
                                    region={data.data.mailingRegion}
                                    onChange={onStateChanges}
                                />
                                <Payment
                                    orderId={data.data.id}
                                    offers={[...state.offers, ...data.data.fulfillments.map(fulfillment => fulfillment.products).reduce((a, c) => [...a, ...c], [])]}
                                    services={state.services}
                                    priceDiffrence={ data.data.totalPrice - data.data.paid }
                                />
                                <Timeline
                                    orderId={data.data.id}
                                />
                            </div>
                            <div className="space-y-4 lg:w-80">
                                <Note
                                    note={data.data.note}
                                    onChange={onCollectChanges}
                                />
                                <Customer
                                    userId={data.data.userId}
                                    onChange={onCollectChanges}
                                />
                                <Address
                                    mailingAddress={data.data.mailingAddress}
                                    mailingCity={data.data.mailingCity}
                                    mailingCountry={data.data.mailingCountry}
                                    mailingRegion={data.data.mailingRegion}
                                    userId={data.data.userId}
                                    onChange={onCollectChanges}
                                />
                            </div>
                        </div>
                        <div className={`flex justify-between rounded-md ${mustBeSaved && "sticky left-10 right-0 bottom-4 bg-gray-800 p-4 transition-colors duration-200"}`}>
                            <div className="">

                            </div>
                            <div className="flex justify-end">
                                <button className={`${mustBeSaved ? "bg-green-600" : "bg-gray-300"} px-4 py-2 text-white font-medium rounded-md`} disabled={!mustBeSaved} onClick={onSaveChanges}>Сохранить</button>
                            </div>
                        </div>
                    </>
                }
            </div>
        </MainLayout>
    )
}

export default Index
