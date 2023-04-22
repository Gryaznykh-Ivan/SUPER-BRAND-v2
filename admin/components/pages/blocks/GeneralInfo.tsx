import React, { useEffect, useState } from 'react'
import { PageCreateRequest, PageUpdateRequest } from '../../../types/api';
import Input from '../../inputs/Input'
import ReactJodit from '../../textEditor/ReactJodit';

interface IProps {
    title: string | null;
    content: string | null;
    onChange: (obj: PageCreateRequest | PageUpdateRequest) => void;
}

export default function GeneralInfo({ onChange, ...data }: IProps) {
    const [state, setState] = useState({
        title: data.title ?? "",
        content: data.content ?? "",
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

    const onTextChange = (value: string) => {
        setState(prev => ({ ...prev, content: value !== "<p><br></p>" ? value : "" }))
    }

    return (
        <div className="rounded-md bg-white shadow-sm p-5">
            <div className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="title" className="text-sm text-gray-600 mb-1">Название страницы</label>
                    <Input type="text" id="title" placeholder="Название страницы" name="title" value={state.title} onChange={onInputChange} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="description" className="text-sm text-gray-600 mb-1">Содержание</label>
                    <ReactJodit value={state.content} onChange={onTextChange} />
                </div>
            </div>
        </div>
    )
}
