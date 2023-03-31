import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import GeneralInfo from '../../components/collections/blocks/GeneralInfo'
import SeoSearch from '../../components/collections/blocks/SeoSearch'
import MainLayout from '../../components/layouts/Main'
import { useCreateCollectionMutation } from '../../services/collectionService'
import { CollectionCreateRequest, IErrorResponse } from '../../types/api'
import { toast } from 'react-toastify'
import CollectionProducts from '../../components/collections/blocks/CollectionProducts'
import CreateCollectionProducts from '../../components/collections/blocks/CreateCollectionProducts'

export default function New() {
    const router = useRouter()

    const [createCollection, { isSuccess: isCreateCollectionSuccess, isError: isCreateCollectionError, error: createCollectionError }] = useCreateCollectionMutation()

    const [changes, setChanges] = useState<CollectionCreateRequest>({})
    const onCollectChanges = (obj: CollectionCreateRequest) => {
        setChanges(prev => ({ ...prev, ...obj }))
    }

    useEffect(() => {
        if (isCreateCollectionSuccess) {
            setTimeout(() => toast.success("Продукт создан"), 100)
        }

        if (isCreateCollectionError) {
            if (createCollectionError && "status" in createCollectionError) {
                toast.error((createCollectionError.data as IErrorResponse)?.message)
            } else {
                toast.error("Произошла неизвесная ошибка")
            }
        }
    }, [isCreateCollectionSuccess, isCreateCollectionError])

    const onSaveChanges = async () => {
        const createCollectionData = changes

        const result = await createCollection(createCollectionData).unwrap()
        if (result.success === true) {
            setChanges({})
            router.push('/collections/' + result.data)
        }
    }

    const mustBeSaved = useMemo(() => {
        return Object.values(changes).some(c => c !== undefined)
    }, [changes])

    return (
        <MainLayout>
            <div className="px-6 my-4 max-w-3xl mx-auto">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/collections" className="p-2 font-bold border-[1px] border-gray-400 rounded-md">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 19L3 12M3 12L10 5M3 12H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                        <h1 className="text-xl font-medium">Создание коллекции</h1>
                    </div>
                    <div className="flex justify-end">

                    </div>
                </div>
                <div className="my-4 flex flex-col space-y-4 pb-4 border-b-[1px] lg:flex-row lg:space-x-4 lg:space-y-0">
                    <div className="flex-1 space-y-4">
                        <GeneralInfo
                            title={null}
                            description={null}
                            onChange={onCollectChanges}
                        />
                        <CreateCollectionProducts
                            connectProducts={changes.connectProducts}
                            onChange={onCollectChanges}
                        />
                        <SeoSearch
                            metaTitle={null}
                            metaDescription={null}
                            handle={null}
                            onChange={onCollectChanges}
                        />
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className=""></div>
                    <div className="flex justify-end">
                        <button className={`${mustBeSaved ? "bg-green-600" : "bg-gray-300"} px-4 py-2 text-white font-medium rounded-md`} disabled={mustBeSaved === false} onClick={onSaveChanges}>Создать</button>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
