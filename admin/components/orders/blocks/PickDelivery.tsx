/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react'
import { CollectionCreateRequest, CollectionUpdateRequest, ICollectionProduct, IErrorResponse, IProduct } from '../../../types/api';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Select from '../../inputs/Select';


interface IProps {
    // onChange: (obj: any) => void;
}

export default function PickDelivery({  }: IProps) {
    const router = useRouter()

    return (
        <div className="">
            <div className="mt-2">
                <label htmlFor="deliveryProfile" className="text-sm">Профиль</label>
                <Select id="deliveryProfile" options={{ P1: "Долгая доставка", P2: "Быстрая доставка" }} onChange={() => { }} />
            </div>
            <div className="mt-4 space-y-2">
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
    )
}
