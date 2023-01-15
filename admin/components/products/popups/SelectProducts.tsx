/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Modal from '../../portals/Modal'
import SearchInput from '../../inputs/SearchInput';
import { useLazyGetProductsBySearchQuery } from '../../../services/productService';
import { useRouter } from 'next/router';

interface IProps {
    title: string;
    collectionId: string;
    onClose: () => void;
}

export default function SelectProducts({ title, collectionId, onClose }: IProps) {
    const router = useRouter()
    const itemPerPage = 20

    const [getProductBySearch, { isError, isFetching, data, error }] = useLazyGetProductsBySearchQuery();
    const [query, setQuery] = useState({
        q: "",
        limit: itemPerPage,
        skip: 0,
        notInCollectionId: collectionId
    })

    useEffect(() => {
        setQuery(prev => ({ ...prev, limit: itemPerPage, skip: 0, notInCollectionId: collectionId }))
    }, [router.query.available])

    useEffect(() => {
        getProductBySearch(query)
    }, [query])

    const onSearch = (q: string) => {
        setQuery(prev => ({ ...prev, q, limit: itemPerPage, skip: 0 }))
    }

    const onNextPage = () => {
        if (data?.data.length !== itemPerPage) return

        setQuery(prev => ({ ...prev, skip: prev.skip + prev.limit }))
    }

    const onPrevPage = () => {
        if (query.skip === 0) return

        setQuery(prev => ({ ...prev, skip: prev.skip - prev.limit }))
    }


    return (
        <Modal>
            <div className="fixed inset-0 bg-black bg-opacity-20 z-30 flex items-center justify-center" onClick={onClose}>
                <div className="w-full max-w-lg bg-white rounded-md" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center justify-between p-5 border-b-[1px]">
                        <h2 className="font-medium">{title}</h2>
                        <button className="p-2" onClick={onClose}>
                            <svg className="rotate-45" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 4V12M12 12V20M12 12H20M12 12H4" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <div className="max-h-[60vh] overflow-y-auto">
                        <div className="p-5 border-b-[1px] space-y-4">
                            <div className="flex flex-col">
                                <SearchInput placeholder="Поиск" onChange={() => { }} />
                            </div>
                        </div>
                        <div className="divide-y-[1px] max-h-96 overflow-y-auto">
                            <div className="flex items-center px-5 py-2 space-x-4 hover:bg-gray-100">
                                <div className="">
                                    <input type="checkbox" name="" id="test" className="rounded" />
                                </div>
                                <div className="relative w-12 aspect-square border-[1px] rounded-md">
                                    <Image fill src={`/assets/images/air-force1.jpg`} className="object-contain" alt="" />
                                </div>
                                <div className="text-sm flex-1">Air Jordan 1 Low "Shattered Backboard"</div>
                            </div>
                            <div className="flex items-center px-5 py-2 space-x-4 hover:bg-gray-100">
                                <div className="">
                                    <input type="checkbox" name="" id="test" className="rounded" />
                                </div>
                                <div className="relative w-12 aspect-square border-[1px] rounded-md">
                                    <Image fill src={`/assets/images/air-force1.jpg`} className="object-contain" alt="" />
                                </div>
                                <div className="text-sm flex-1">Air Jordan 1 Low "Shattered Backboard"</div>
                            </div>
                            <div className="flex items-center px-5 py-2 space-x-4 hover:bg-gray-100">
                                <div className="">
                                    <input type="checkbox" name="" id="test" className="rounded" />
                                </div>
                                <div className="relative w-12 aspect-square border-[1px] rounded-md">
                                    <Image fill src={`/assets/images/air-force1.jpg`} className="object-contain" alt="" />
                                </div>
                                <div className="text-sm flex-1">Air Jordan 1 Low "Shattered Backboard"</div>
                            </div>
                            <div className="flex items-center px-5 py-2 space-x-4 hover:bg-gray-100">
                                <div className="">
                                    <input type="checkbox" name="" id="test" className="rounded" />
                                </div>
                                <div className="relative w-12 aspect-square border-[1px] rounded-md">
                                    <Image fill src={`/assets/images/air-force1.jpg`} className="object-contain" alt="" />
                                </div>
                                <div className="text-sm flex-1">Air Jordan 1 Low "Shattered Backboard"</div>
                            </div>
                            <div className="flex items-center px-5 py-2 space-x-4 hover:bg-gray-100">
                                <div className="">
                                    <input type="checkbox" name="" id="test" className="rounded" />
                                </div>
                                <div className="relative w-12 aspect-square border-[1px] rounded-md">
                                    <Image fill src={`/assets/images/air-force1.jpg`} className="object-contain" alt="" />
                                </div>
                                <div className="text-sm flex-1">Air Jordan 1 Low "Shattered Backboard"</div>
                            </div>
                            <div className="flex items-center px-5 py-2 space-x-4 hover:bg-gray-100">
                                <div className="">
                                    <input type="checkbox" name="" id="test" className="rounded" />
                                </div>
                                <div className="relative w-12 aspect-square border-[1px] rounded-md">
                                    <Image fill src={`/assets/images/air-force1.jpg`} className="object-contain" alt="" />
                                </div>
                                <div className="text-sm flex-1">Air Jordan 1 Low "Shattered Backboard"</div>
                            </div>
                        </div>
                    </div>
                    <div className="p-5 border-t-[1px]">
                        <div className="flex justify-end space-x-4">
                            <button className="border-gray-500 border-[1px] text-gray-800 px-4 py-2 font-medium rounded-md" onClick={onClose}>Отмена</button>
                            <button className="bg-green-700 px-4 py-2 text-white font-medium rounded-md">Готово</button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
