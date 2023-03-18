import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import Input from '../../../components/inputs/Input'
import MainLayout from '../../../components/layouts/Main'
import ProductsToReturn from '../../../components/orders/blocks/ProductsToReturn'
import TrackingInformation from '../../../components/orders/blocks/TrackingInformation'
import { useCreateReturnMutation, useGetOrderByIdQuery } from '../../../services/orderService'
import { IErrorResponse, IReturnProduct, OrderReturnCreateRequest } from '../../../types/api'

export default function Return() {
    const router = useRouter()

    const [createReturn, { isSuccess: isCreateReturnSuccess, isError: isCreateReturnError, error: createReturnError, data }] = useCreateReturnMutation()

    const [changes, setChanges] = useState<OrderReturnCreateRequest>({})
    const onCollectChanges = (obj: OrderReturnCreateRequest) => {
        setChanges(prev => ({ ...prev, ...obj }))
    }

    useEffect(() => {
        if (isCreateReturnSuccess) {
            setTimeout(() => toast.success("Возврат создан"), 100)
        }

        if (isCreateReturnError) {
            if (createReturnError && "status" in createReturnError) {
                toast.error((createReturnError.data as IErrorResponse).message)
            } else {
                toast.error("Произошла неизвесная ошибка")
            }
        }
    }, [isCreateReturnSuccess, isCreateReturnError])

    const onCreateReturn = async () => {
        const createReturnData = {
            ...changes,
            orderId: Number(router.query.orderId as string)
        }

        const result = await createReturn(createReturnData).unwrap()
        if (result.success === true) {
            setChanges({})
            router.push('/orders/' + router.query.orderId)
        }
    }

    const mustBeSaved = useMemo(() => {
        return Object.values(changes).some(c => c !== undefined)
    }, [changes])

    return (
        <MainLayout>
            <div className="px-6 my-4 max-w-5xl mx-auto">
                <div className="flex items-center space-x-4">
                    <Link href={`/orders/${router.query.orderId}`} className="p-2 font-bold border-[1px] border-gray-400 rounded-md">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 19L3 12M3 12L10 5M3 12H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                    <h1 className="flex-1 text-xl font-medium">Возврат по заказу</h1>
                    <div className="flex items-center"></div>
                </div>
                <div className="my-4 flex flex-col space-y-4 pb-4 lg:flex-row lg:space-x-4 lg:space-y-0">
                    <div className="flex-1 space-y-4">
                        <ProductsToReturn
                            offers={changes.offers ?? []}
                            onChange={onCollectChanges}
                        />
                    </div>
                    <div className="space-y-4 lg:w-80">
                        <div className="bg-white shadow-sm rounded-md">
                            <div className="p-5 flex justify-between items-center">
                                <h2 className="font-semibold">Итог</h2>
                            </div>
                            <div className="px-5 pb-5 space-y-4 border-b-[1px]">
                                {changes.offers?.map(offer =>
                                    <ul key={offer.id} className="list-disc ml-5">
                                        <li>
                                            <div className="">Возврат товара</div>
                                            <div className="text-sm text-gray-500">Причина: {offer.reason}</div>
                                        </li>
                                    </ul>
                                )}
                            </div>
                            <div className="flex p-3">
                                <button className={`${mustBeSaved ? "bg-green-600" : "bg-gray-300"} flex-1 px-4 py-2 text-white font-medium rounded-md`} disabled={!mustBeSaved} onClick={onCreateReturn}>Создать возврат</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
