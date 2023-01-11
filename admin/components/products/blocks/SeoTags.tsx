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
                    <label htmlFor="metaTitle" className="text-sm text-gray-600 mb-1">Мета название</label>
                    <Input type="text" id="metaTitle" placeholder="Мета название" name="metaTitle" value={ state.metaTitle } onChange={onInputChange} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="metaDescription" className="text-sm text-gray-600 mb-1">Мета описание</label>
                    <TextArea id="metaDescription" placeholder="мета описание" name="metaDescription" value={ state.metaDescription } onChange={onInputChange} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="handle" className="text-sm text-gray-600 mb-1">URL ручка</label>
                    <Input type="text" id="handle" placeholder="URL ручка" name="handle" value={ state.handle } onChange={onInputChange} />
                </div>
            </div>
        </div>
    )
}
