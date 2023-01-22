import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'


import MainLayout from '../../components/layouts/Main'
import GeneralInfo from '../../components/products/blocks/GeneralInfo'

import SeoTags from '../../components/products/blocks/SeoTags'

import Status from '../../components/offers/blocks/Status'
import DeliveryProfile from '../../components/offers/blocks/DeliveryProfile'
import Prices from '../../components/offers/blocks/Prices'
import PickVariant from '../../components/offers/blocks/PickVariant'
import Provider from '../../components/offers/blocks/Provider'
import Comment from '../../components/offers/blocks/Comment'
import { IErrorResponse, OfferCreateRequest } from '../../types/api'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { useCreateOfferMutation } from '../../services/offerService'

function New() {
    const router = useRouter()

    const [createOffer, { isSuccess: isCreateOfferSuccess, isError: isCreateOfferError, error: createOfferError, data }] = useCreateOfferMutation()

    const [changes, setChanges] = useState<OfferCreateRequest>({})
    const onCollectChanges = (obj: OfferCreateRequest) => {
        console.log(obj)
        setChanges(prev => ({ ...prev, ...obj }))
    }

    useEffect(() => {
        if (isCreateOfferSuccess) {
            setTimeout(() => toast.success("Оффер создан"), 100)
        }

        if (isCreateOfferError) {
            if (createOfferError && "status" in createOfferError) {
                toast.error((createOfferError.data as IErrorResponse).message)
            } else {
                toast.error("Произошла неизвесная ошибка")
            }
        }
    }, [isCreateOfferSuccess, isCreateOfferError])

    const onSaveChanges = async () => {
        const createOfferData = changes

        const result = await createOffer(createOfferData).unwrap()
        if (result.success === true) {
            router.push('/offers/' + result.data)
        }
    }

    const mustBeSaved = useMemo(() => {
        return Object.values(changes).some(c => c !== undefined)
    }, [changes])


    return (
        <MainLayout>
            <div className="px-6 my-4 max-w-5xl mx-auto">
                <div className="flex items-center space-x-4">
                    <Link href="/offers" className="p-2 font-bold border-[1px] border-gray-400 rounded-md">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 19L3 12M3 12L10 5M3 12H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                    <h1 className="text-xl font-medium">Создание оффера</h1>
                </div>
                <div className="my-4 flex flex-col space-y-4 pb-4 border-b-[1px] lg:flex-row lg:space-x-4 lg:space-y-0">
                    <div className="flex-1 space-y-4">
                        <PickVariant
                            variantId={null}
                            onChange={onCollectChanges}
                        />
                        <Prices
                            price={null}
                            compareAtPrice={null}
                            offerPrice={null}
                            onChange={onCollectChanges}
                        />
                        <Comment
                            comment={null}
                            onChange={onCollectChanges}
                        />
                    </div>
                    <div className="space-y-4 lg:w-80">
                        <Status
                            status={"OFFERED"}
                            onChange={onCollectChanges}
                        />
                        <DeliveryProfile
                            deliveryProfileId={"default"}
                            onChange={onCollectChanges}
                        />
                        <Provider
                            providerId={null}
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
