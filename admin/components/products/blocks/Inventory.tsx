import React, { useEffect, useState } from 'react'
import { ProductCreateRequest, ProductUpdateRequest } from '../../../types/api';
import Input from '../../inputs/Input'
import TextArea from '../../inputs/TextArea'

interface IProps {
    SKU: string | null;
    barcode: string | null;
    onChange: (obj: ProductCreateRequest | ProductUpdateRequest) => void;
}

export default function Inventory({ onChange, ...data }: IProps) {
    const [state, setState] = useState({
        SKU: data.SKU ?? "",
        barcode: data.barcode ?? "",
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
        setState(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <div className="rounded-md bg-white shadow-sm ">
            <h2 className="font-semibold p-5 border-b-[1px]">Инвентаризация</h2>
            <div className="p-5 grid grid-cols-2 gap-5">
                <div className="flex flex-col">
                    <label htmlFor="SKU" className="text-sm text-gray-600 mb-1">SKU</label>
                    <Input type="text" id="SKU" placeholder="SKU" name="SKU" value={state.SKU} onChange={onInputChange} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="barcode" className="text-sm text-gray-600 mb-1">Штрих-код</label>
                    <Input type="text" id="barcode" placeholder="Штрих-код" name="barcode" value={state.barcode} onChange={onInputChange} />
                </div>
            </div>
        </div>
    )
}
