import React, { useEffect, useState } from 'react'
import { OfferCreateRequest } from '../../../types/api';
import Input from '../../inputs/Input'

interface IProps {
    price: string | null;
    offerPrice: string | null;
    compareAtPrice: string | null;
    onChange: (obj: OfferCreateRequest) => void;
}

export default function Prices({ onChange, ...data }: IProps) {
    const [state, setState] = useState({
        price: data.price ?? "",
        offerPrice: data.offerPrice ?? "",
        compareAtPrice: data.compareAtPrice ?? "",
    })

    useEffect(() => {
        const localState = Object.entries(state)
        const changes = localState.map(([key, value]) => {
            if (data[key as keyof typeof data] === null && value === "") {
                return [key, undefined]
            }

            if (data[key as keyof typeof data] !== null && value === "") {
                return [key, null]
            }

            if (data[key as keyof typeof data] === value) {
                return [key, undefined]
            }

            return [key, value]
        })

        onChange(Object.fromEntries(changes))
    }, [state])

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(prev => ({ ...prev, [e.target.name]: e.target.value.replace(/[^0-9.]/g, "") }))
    }

    return (
        <div className="rounded-md bg-white shadow-sm">
            <div className="p-5 border-b-[1px]">
                <h2 className="font-medium">Цены</h2>
            </div>
            <div className="p-5">
                <div className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="sPrice" className="text-sm text-gray-600 mb-1">Цена поставщика</label>
                        <Input type="text" id="sPrice" placeholder="Цена поставщика" name="offerPrice" value={state.offerPrice} onChange={onInputChange} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="price" className="text-sm text-gray-600 mb-1">Цена на сайте</label>
                            <Input type="text" id="price" placeholder="Цена на сайте" name="price" value={state.price} onChange={onInputChange} />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="compareAtPrice" className="text-sm text-gray-600 mb-1">Цена до скидки</label>
                            <Input type="text" id="compareAtPrice" placeholder="Цена до скидки" name="compareAtPrice" value={state.compareAtPrice} onChange={onInputChange} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
