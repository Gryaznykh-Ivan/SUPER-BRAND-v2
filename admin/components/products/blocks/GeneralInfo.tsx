import React, { useEffect, useState } from 'react'
import { ProductCreateRequest, ProductUpdateRequest } from '../../../types/api';
import Input from '../../inputs/Input'
import TextArea from '../../inputs/TextArea'

interface IProps {
    title: string | null;
    description: string | null;
    onChange: (obj: ProductCreateRequest | ProductUpdateRequest) => void;
}

export default function GeneralInfo({ onChange, ...data }: IProps) {
    const [state, setState] = useState({
        title: data.title ?? "",
        description: data.description ?? "",
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
        <div className="rounded-md bg-white shadow-sm p-5">
            <div className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="title" className="text-sm text-gray-600 mb-1">Название продукта</label>
                    <Input type="text" id="title" placeholder="Название продукта" name="title" value={ state.title } onChange={onInputChange} />
                    <div className="">123</div>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="description" className="text-sm text-gray-600 mb-1">Описание</label>
                    <TextArea id="description" placeholder="Описание" name="description" value={ state.description } onChange={onInputChange} />
                </div>
            </div>
        </div>
    )
}
