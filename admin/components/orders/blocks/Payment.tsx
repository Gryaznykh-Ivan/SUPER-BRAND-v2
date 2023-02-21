/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react'
import { CollectionCreateRequest, CollectionUpdateRequest, ICollectionProduct, IErrorResponse, IProduct } from '../../../types/api';
import { useRouter } from 'next/router';
import Link from 'next/link';


interface IProps {
    
}

export default function Payment({  }: IProps) {
    const router = useRouter()

    return (
        <div className="rounded-md bg-white shadow-sm">
            <div className="p-5 border-b-[1px] flex justify-between items-center">
                <h2 className="font-semibold">Оплата</h2>
            </div>
            <div className="p-5 border-b-[1px]">
                <div className="grid grid-cols-4 gap-4 text-gray-600 text-sm">
                    <div className="">Подытог</div>
                    <div className="col-span-3 flex justify-between">
                        <div className=""></div>
                        <div className="">100 руб.</div>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-4 text-gray-600 text-sm">
                    <div className="">Доставка</div>
                    <div className="col-span-3 flex justify-between">
                        <div className="">Быстрая доставка СДЭК</div>
                        <div className="">Бесплатно</div>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-4 text-gray-600 text-sm">
                    <div className="">Скидка</div>
                    <div className="col-span-3 flex justify-between">
                        <div className=""></div>
                        <div className="">100 руб.</div>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-4 text-gray-600 text-sm">
                    <div className="">Промокод 5KLFG</div>
                    <div className="col-span-3 flex justify-between">
                        <div className="">Бесплатная доставка</div>
                        <div className=""></div>
                    </div>
                </div>
                <div className="flex justify-between text-lg font-semibold">
                    <div className="">Итог</div>
                    <div className="">500 руб.</div>
                </div>
            </div>
            <div className="p-5 border-b-[1px]">
                <div className="flex justify-between text-sm text-red-600">
                    <div className="">Выдолжны закрыть задолжность</div>
                    <div className="">500 руб.</div>
                </div>
            </div>
            <div className="p-3 flex justify-end space-x-2">
                <button className="border-gray-400 border-[1px] px-4 py-2 font-medium rounded-md text-sm">Закрыть счет</button>
            </div>
        </div>
    )
}
