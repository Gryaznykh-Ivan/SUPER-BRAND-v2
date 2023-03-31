import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import MainLayout from '../../../components/layouts/Main'
import Comment from '../../../components/offers/blocks/Comment'
import DeliveryProfile from '../../../components/offers/blocks/DeliveryProfile'
import PickVariant from '../../../components/offers/blocks/PickVariant'
import Prices from '../../../components/offers/blocks/Prices'
import Provider from '../../../components/offers/blocks/Provider'
import StatusBlock from '../../../components/offers/blocks/Status'
import OfferStatus from '../../../components/offers/cards/OfferStatus'
import { useDeleteOfferMutation, useGetOfferByIdQuery, useUpdateOfferMutation } from '../../../services/offerService'
import { IErrorResponse, OfferUpdateRequest } from '../../../types/api'



function New() {
    const router = useRouter()

    const { isError, error, isLoading, data } = useGetOfferByIdQuery({ offerId: router.query.offerId as string })

    const [updateOffer, { isSuccess: isUpdateOfferSuccess, isError: isUpdateOfferError, error: updateOfferError }] = useUpdateOfferMutation()
    const [deleteOffer, { isSuccess: isDeleteOfferSuccess, isError: isDeleteOfferError, error: deleteOfferError }] = useDeleteOfferMutation()

    const [changes, setChanges] = useState<OfferUpdateRequest>({})
    const onCollectChanges = (obj: OfferUpdateRequest) => {
        setChanges(prev => ({ ...prev, ...obj }))
    }

    useEffect(() => {
        if (isUpdateOfferSuccess) {
            toast.success("Оффер обновлен")
        }

        if (isUpdateOfferError) {
            if (updateOfferError && "status" in updateOfferError) {
                toast.error((updateOfferError.data as IErrorResponse)?.message)
            } else {
                toast.error("Произошла неизвесная ошибка")
            }
        }
    }, [isUpdateOfferSuccess, isUpdateOfferError])

    useEffect(() => {
        if (isDeleteOfferSuccess) {
            setTimeout(() => toast.success("Оффер удален"), 100)
        }

        if (isDeleteOfferError) {
            if (deleteOfferError && "status" in deleteOfferError) {
                toast.error((deleteOfferError.data as IErrorResponse)?.message)
            } else {
                toast.error("Произошла неизвесная ошибка")
            }
        }
    }, [isDeleteOfferSuccess, isDeleteOfferError])

    const onSaveChanges = async () => {
        const result = await updateOffer({ offerId: router.query.offerId as string, ...changes }).unwrap()
        if (result.success === true) {
            setChanges({})
        }
    }

    const mustBeSaved = useMemo(() => {
        return Object.values(changes).some(c => c !== undefined)
    }, [changes])

    const onOfferDelete = async () => {
        const result = await deleteOffer({ offerId: router.query.offerId as string }).unwrap();
        if (result.success === true) {
            setChanges({})
            router.push("/offers")
        }
    }

    return (
        <MainLayout>
            <div className="px-6 my-4 max-w-5xl mx-auto flex flex-col">
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
                    <>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <Link href="/offers" className="p-2 font-bold border-[1px] border-gray-400 rounded-md">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 19L3 12M3 12L10 5M3 12H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Link>
                                <h1 className="text-xl font-medium">Оффер <OfferStatus status={data.data.status} /></h1>
                            </div>
                            <div className="flex justify-end">
                                {data.data.orderId !== null &&
                                    <Link href={`/orders/${data.data.orderId}`} className="hover:bg-gray-300 p-2 text-gray-700 font-medium rounded-md">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 8H19M5 8C4.46957 8 3.96086 7.78929 3.58579 7.41421C3.21071 7.03914 3 6.53043 3 6C3 5.46957 3.21071 4.96086 3.58579 4.58579C3.96086 4.21071 4.46957 4 5 4H19C19.5304 4 20.0391 4.21071 20.4142 4.58579C20.7893 4.96086 21 5.46957 21 6C21 6.53043 20.7893 7.03914 20.4142 7.41421C20.0391 7.78929 19.5304 8 19 8M5 8V18C5 18.5304 5.21071 19.0391 5.58579 19.4142C5.96086 19.7893 6.46957 20 7 20H17C17.5304 20 18.0391 19.7893 18.4142 19.4142C18.7893 19.0391 19 18.5304 19 18V8M10 12H14" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </Link>
                                }
                            </div>
                        </div>
                        <div className=" my-4 flex flex-col space-y-4 pb-4 border-b-[1px] lg:flex-row lg:space-x-4 lg:space-y-0">
                            <div className="flex-1 space-y-4">
                                <PickVariant
                                    product={data.data.product}
                                    variant={data.data.variant}
                                    image={data.data.image}
                                    variantId={data.data.variantId}
                                    productId={data.data.productId}
                                    onChange={onCollectChanges}
                                />
                                <Prices
                                    price={data.data.price}
                                    compareAtPrice={data.data.compareAtPrice}
                                    offerPrice={data.data.offerPrice}
                                    onChange={onCollectChanges}
                                />
                                <Comment
                                    comment={data.data.comment}
                                    onChange={onCollectChanges}
                                />
                            </div>
                            <div className="space-y-4 lg:w-80">
                                <StatusBlock
                                    status={data.data.status}
                                    onChange={onCollectChanges}
                                />
                                <DeliveryProfile
                                    deliveryProfileId={data.data.deliveryProfileId}
                                    onChange={onCollectChanges}
                                />
                                <Provider
                                    providerId={data.data.userId}
                                    onChange={onCollectChanges}
                                />
                            </div>
                        </div>
                        <div className={`flex justify-between rounded-md ${mustBeSaved && "sticky left-10 right-0 bottom-4 bg-gray-800 p-4 transition-colors duration-200"}`}>
                            <div className="">
                                {mustBeSaved ?
                                    <button className="border-red-600 border-[1px] text-red-600 px-4 py-2 font-medium rounded-md hover:bg-red-700 hover:text-white" onClick={() => router.reload()}>Отменить</button>
                                    :
                                    <button className="border-red-600 border-[1px] text-red-600 px-4 py-2 font-medium rounded-md hover:bg-red-700 hover:text-white" onClick={onOfferDelete}>Удалить</button>
                                }
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

export default New
