/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react'
import { CollectionCreateRequest, CollectionUpdateRequest, ICollectionProduct, IErrorResponse, IProduct } from '../../../types/api';
import { useRouter } from 'next/router';
import Link from 'next/link';


interface IProps {
    onChange: (obj: any) => void;
}

export default function PickDelivery({ onChange }: IProps) {
    const router = useRouter()

    return (
        <div className="rounded-md bg-white shadow-sm">
            <div className="p-5 border-b-[1px] flex justify-between items-center">
                <h2 className="font-semibold">Способ доставки</h2>
            </div>
            <div className="p-5 space-y-4">
                <div className="">
                    <div className="font-medium text-sm mb-2">Товары с быстрой доставкой</div>
                    <div className="space-y-2">
                        <label className="block border-[1px] rounded-md p-3 text-sm">
                            <div className="flex items-center">
                                <input type="checkbox" readOnly name="" className="rounded" />
                                <div className="flex-1 ml-3">Доставка СДЭК</div>
                                <div className="flex space-x-4 text-gray-500">
                                    <div className="">2-4 дня</div>
                                    <div className="">500 руб.</div>
                                </div>
                            </div>
                        </label>
                        <label className="block border-[1px] rounded-md p-3 text-sm">
                            <div className="flex items-center">
                                <input type="checkbox" readOnly name="" className="rounded" />
                                <div className="flex-1 ml-3">Курьерская доставка СДЭК</div>
                                <div className="flex space-x-4 text-gray-500">
                                    <div className="">3-4 дня</div>
                                    <div className="">1500 руб.</div>
                                </div>
                            </div>
                        </label>
                        <label className="block border-[1px] rounded-md p-3 text-sm">
                            <div className="flex items-center">
                                <input type="checkbox" readOnly name="" className="rounded" />
                                <div className="flex-1 ml-3">Доставка DPD</div>
                                <div className="flex space-x-4 text-gray-500">
                                    <div className="">2-5 дня</div>
                                    <div className="">300 руб.</div>
                                </div>
                            </div>
                        </label>
                    </div>
                </div>
                <div className="">
                    <div className="font-medium text-sm mb-2">Товары с долгой доставкой</div>
                    <div className="space-y-2">
                        <label className="block border-[1px] rounded-md p-3 text-sm">
                            <div className="flex items-center">
                                <input type="checkbox" readOnly name="" className="rounded" />
                                <div className="flex-1 ml-3">Курьерская доставка СДЭК</div>
                                <div className="flex space-x-4 text-gray-500">
                                    <div className="">2-4 дня</div>
                                    <div className="">500 руб.</div>
                                </div>
                            </div>
                        </label>
                        <label className="block border-[1px] rounded-md p-3 text-sm">
                            <div className="flex items-center">
                                <input type="checkbox" readOnly name="" className="rounded" />
                                <div className="flex-1 ml-3">Доставка DPD</div>
                                <div className="flex space-x-4 text-gray-500">
                                    <div className="">4-6 дня</div>
                                    <div className="">400 руб.</div>
                                </div>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}
