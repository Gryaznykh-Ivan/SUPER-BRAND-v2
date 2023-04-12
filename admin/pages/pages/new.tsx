import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import GeneralInfo from '../../components/pages/blocks/GeneralInfo'
import SeoSearch from '../../components/pages/blocks/SeoSearch'
import MainLayout from '../../components/layouts/Main'
import { useCreatePageMutation } from '../../services/pageService'
import { PageCreateRequest, IErrorResponse } from '../../types/api'
import { toast } from 'react-toastify'

export default function New() {
    const router = useRouter()

    const [createPage, { isSuccess: isCreatePageSuccess, isError: isCreatePageError, error: createPageError }] = useCreatePageMutation()

    const [changes, setChanges] = useState<PageCreateRequest>({})
    const onCollectChanges = (obj: PageCreateRequest) => {
        setChanges(prev => ({ ...prev, ...obj }))
    }

    useEffect(() => {
        if (isCreatePageSuccess) {
            setTimeout(() => toast.success("Страница создана"), 100)
        }

        if (isCreatePageError) {
            if (createPageError && "status" in createPageError) {
                toast.error((createPageError.data as IErrorResponse)?.message)
            } else {
                toast.error("Произошла неизвесная ошибка")
            }
        }
    }, [isCreatePageSuccess, isCreatePageError])

    const onSaveChanges = async () => {
        const createPageData = changes

        const result = await createPage(createPageData).unwrap()
        if (result.success === true) {
            setChanges({})
            router.push('/pages/' + result.data)
        }
    }

    const mustBeSaved = useMemo(() => {
        return Object.values(changes).some(c => c !== undefined) && changes.title !== undefined
    }, [changes])

    return (
        <MainLayout>
            <div className="px-6 my-4 max-w-3xl mx-auto">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/pages" className="p-2 font-bold border-[1px] border-gray-400 rounded-md">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 19L3 12M3 12L10 5M3 12H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                        <h1 className="text-xl font-medium">Создание страницы</h1>
                    </div>
                    <div className="flex justify-end">

                    </div>
                </div>
                <div className="my-4 flex flex-col space-y-4 pb-4 border-b-[1px] lg:flex-row lg:space-x-4 lg:space-y-0">
                    <div className="flex-1 space-y-4">
                        <GeneralInfo
                            title={null}
                            content={null}
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
