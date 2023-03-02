import React, { useEffect, useState } from 'react'
import { ProductCreateRequest, ProductUpdateRequest } from '../../../types/api';
import Input from '../../inputs/Input'
import TextArea from '../../inputs/TextArea'

interface IProps {
    metaTitle: string | null;
    metaDescription: string | null;
    handle: string | null;
    onChange: (obj: ProductCreateRequest | ProductUpdateRequest) => void;
}

export default function SeoTags({ onChange, ...data }: IProps) {
    const [state, setState] = useState({
        metaTitle: data.metaTitle ?? "",
        metaDescription: data.metaDescription ?? "",
        handle: data.handle ?? "",
    })

    useEffect(() => {
        setState(prev => ({
            ...prev,
            handle: data.handle ?? "",
            metaTitle: data.metaTitle ?? "",
            metaDescription: data.metaDescription ?? "",
        }))
    }, [data.handle, data.metaDescription, data.metaTitle])

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
        <div className="rounded-md bg-white shadow-sm">
            <h2 className="font-semibold p-5 border-b-[1px]">SEO теги</h2>
            <div className="space-y-4 p-5">
                <div className="flex flex-col">
                    <div className="flex justify-between mb-1">
                        <label htmlFor="metaTitle" className="text-sm text-gray-600">Мета название</label>
                        <div className="text-gray-500 text-sm">{state.metaTitle.length} из 70</div>
                    </div>
                    <Input type="text" id="metaTitle" placeholder="Мета название" name="metaTitle" value={state.metaTitle} onChange={onInputChange} />
                </div>
                <div className="flex flex-col">
                    <div className="flex justify-between mb-1">
                        <label htmlFor="metaDescription" className="text-sm text-gray-600">Мета описание</label>
                        <div className="text-gray-500 text-sm">{state.metaDescription.length} из 320</div>
                    </div>
                    <TextArea id="metaDescription" placeholder="мета описание" name="metaDescription" value={state.metaDescription} onChange={onInputChange} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="handle" className="text-sm text-gray-600 mb-1">URL ручка</label>
                    <Input type="text" id="handle" placeholder="URL ручка" name="handle" value={state.handle} onChange={onInputChange} />
                    <div className="text-gray-400 text-sm mt-1">Доступ к товару по предыдущей ссылке будет потерен, что плохо для SEO</div>
                </div>
            </div>
        </div>
    )
}
