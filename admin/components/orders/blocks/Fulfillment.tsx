/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import SearchInput from '../../inputs/SearchInput'
import SelectProducts from '../../collections/popups/SelectProducts'
import { CollectionCreateRequest, CollectionUpdateRequest, ICollectionProduct, IErrorResponse, IProduct } from '../../../types/api';
import ImageLoader from '../../image/ImageLoader';
import { useLazyGetCollectionProductsQuery } from '../../../services/collectionService';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Status from '../../products/cards/Status';
import SelectOffers from '../popups/SelectOffers';

export default function Fulfillment() {
    const router = useRouter()

    return (
        <div className="rounded-md bg-white shadow-sm">
            <div className="p-5 border-b-[1px] flex justify-between items-center">
                <div className="font-semibold">Отправлен</div>
                <div className="text-gray-400 text-sm">номер 1</div>
            </div>
            <div className="divide-y-[1px] overflow-y-auto border-b-[1px]">
                <div className="flex items-center px-5 py-2 space-x-4 hover:bg-gray-100">
                    <div className="relative w-12 aspect-square border-[1px] rounded-md">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 16L8.586 11.414C8.96106 11.0391 9.46967 10.8284 10 10.8284C10.5303 10.8284 11.0389 11.0391 11.414 11.414L16 16M14 14L15.586 12.414C15.9611 12.0391 16.4697 11.8284 17 11.8284C17.5303 11.8284 18.0389 12.0391 18.414 12.414L20 14M14 8H14.01M6 20H18C18.5304 20 19.0391 19.7893 19.4142 19.4142C19.7893 19.0391 20 18.5304 20 18V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex-1">
                        <Link className="text-sm hover:underline" href={`/products/123`}>TEST PREVEW</Link>
                        <div className="text-sm text-gray-500">US 5</div>
                    </div>
                    <div className="">45000₽</div>
                </div>
            </div>
            <div className="p-3 flex justify-end space-x-2">
                <button className="bg-gray-400 px-4 py-2 text-white font-medium rounded-md">Изменить</button>
            </div>
        </div>
    )
}
