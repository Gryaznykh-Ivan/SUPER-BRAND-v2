import React, { useEffect, useState } from 'react'
import { ProductCreateRequest, ProductUpdateRequest } from '../../../types/api';
import Input from '../../inputs/Input'
import TextArea from '../../inputs/TextArea'

interface IProps {
    metaTitle: string | null;
    metaDescription: string | null;
    handle: string | null;
    defaultSnippet: boolean | null;
    onChange: (obj: ProductCreateRequest | ProductUpdateRequest) => void;
}

export default function CreateSeoSearch({ onChange, ...data }: IProps) {
    const [state, setState] = useState({
        metaTitle: data.metaTitle ?? "",
        metaDescription: data.metaDescription ?? "",
        handle: data.handle ?? "",
        defaultSnippet: data.defaultSnippet ?? true,
    })

    useEffect(() => {
        setState(prev => ({
            ...prev,
            handle: data.handle ?? "",
            metaTitle: data.metaTitle ?? "",
            metaDescription: data.metaDescription ?? "",
            defaultSnippet: data.defaultSnippet ?? true,
        }))
    }, [data.handle, data.metaDescription, data.metaTitle, data.defaultSnippet])

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

    const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(prev => ({ ...prev, [e.target.name]: e.target.checked }))
    }


    return (
        <div className="rounded-md bg-white shadow-sm">
            <div className="flex justify-center items-center p-2">
                <h2 className="flex-1 font-semibold p-3">Поиск и SEO</h2>
                <label className="p-3">
                    <span className="mr-3 text-sm text-gray-500 cursor-pointer">По умолчанию</span>
                    <input type="checkbox" className="rounded cursor-pointer" name="defaultSnippet" checked={state.defaultSnippet} onChange={onCheckboxChange} />
                </label>
            </div>
            {state.defaultSnippet === false &&
                <div className="space-y-4 p-5 border-t-[1px]">
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
                    </div>
                </div>
            }
        </div>
    )
}
