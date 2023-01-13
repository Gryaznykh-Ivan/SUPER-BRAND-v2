import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { IOption, VariantCreateRequest, VariantUpdateRequest } from '../../../types/api';
import Input from '../../inputs/Input'

interface IProps {
    options: IOption[];
    option0: string | null;
    option1: string | null;
    option2: string | null;
    barcode: string | null;
    SKU: string | null;
    onChange: (obj: VariantCreateRequest | VariantUpdateRequest) => void;
}

export default function GeneralInfo({ onChange, options, ...data }: IProps) {
    const [state, setState] = useState({
        option0: data.option0 ?? "",
        option1: data.option1 ?? "",
        option2: data.option2 ?? "",
        barcode: data.barcode ?? "",
        SKU: data.SKU ?? "",
    })

    useEffect(() => {
        console.log(data)
        setState({
            option0: data.option0 ?? "",
            option1: data.option1 ?? "",
            option2: data.option2 ?? "",
            barcode: data.barcode ?? "",
            SKU: data.SKU ?? "",
        })
    }, [data.SKU, data.barcode, data.option0, data.option1, data.option2])

    useEffect(() => {
        const localState = Object.entries(state)
        const changes = localState.map(([key, value]) => {
            if (key.startsWith("option") && options.find(c => `option${c.option}` === key) === undefined) {
                return [key, undefined]
            }

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
        <div className="rounded-md bg-white shadow-sm">
            <div className="p-5 border-b-[1px]">
                <h2 className="font-medium">Основное</h2>
            </div>
            <div className="p-5">
                <div className="space-y-4">
                    {options.map(option => (
                        <div key={option.id} className="flex flex-col">
                            <label htmlFor={option.id} className="text-sm text-gray-600 mb-1">{option.title}</label>
                            <Input type="text" id={option.id} placeholder={option.title} name={`option${option.option}`} value={state[`option${option.option}` as keyof typeof state]} onChange={onInputChange} />
                        </div>
                    ))}
                    <div className="grid grid-cols-2 gap-4">
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
            </div>
        </div>
    )
}
