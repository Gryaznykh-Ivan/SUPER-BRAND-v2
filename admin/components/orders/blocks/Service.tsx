/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react'
import { CollectionCreateRequest, CollectionUpdateRequest, ICollectionProduct, IErrorResponse, IProduct } from '../../../types/api';
import { useRouter } from 'next/router';
import Link from 'next/link';


interface IProps {
    onChange: (obj: any) => void;
}

export default function Service({ onChange }: IProps) {
    const router = useRouter()

    return (
        <div className="rounded-md bg-white shadow-sm">
            <div className="p-5 border-b-[1px] flex justify-between items-center">
                <h2 className="font-semibold">Дополнительные услуги</h2>
            </div>
            <div className="">
                <div className="flex items-center px-5 py-2 space-x-4 hover:bg-gray-100">
                    <div className="flex-1">
                        <div className="">Скидка</div>
                        <div className="text-sm text-gray-500">Скидка на все 5%</div>
                    </div>
                    <div className="">Бесплатно</div>
                    <button className="p-2 rounded-md hover:bg-gray-200">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}
